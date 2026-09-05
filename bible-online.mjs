import { readFileSync, createReadStream, existsSync } from 'node:fs';
import path from 'node:path';

const aliases = 'gn ex lv nm dt js jz rt 1sm 2sm 1rs 2rs 1cr 2cr ed ne et job sl pv ec ct is jr lm ez dn os jl am ob jn mq na hc sf ag zc ml mt mc lc jo at rm 1co 2co gl ef fp cl 1ts 2ts 1tm 2tm tt fm hb tg 1pe 2pe 1jo 2jo 3jo jd ap'.split(' ');
export function createBibleHandler(root, requestChapter = fetch) {
  const catalog = JSON.parse(readFileSync(path.join(root, 'data/bibles/catalog.json'), 'utf8'));
  const books = catalog.versions.find(v => v.id === 'porbr2018').books;
  const personalPdf = path.join(root, 'private/novo-testamento-judaico.pdf');
  return async function handleBible(request, response, url) {
    if (!url.pathname.startsWith('/api/bible/')) return false;
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    const json = (status, body) => { response.writeHead(status, {'Content-Type':'application/json; charset=utf-8'}); response.end(JSON.stringify(body)); };
    if (request.method !== 'GET') { json(405, {error:'Método não permitido'}); return true; }
    if (url.pathname === '/api/bible/personal.pdf') {
      const address = request.socket.remoteAddress;
      if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address) || !existsSync(personalPdf)) {
        json(404, {error:'Documento pessoal disponível apenas neste computador'}); return true;
      }
      response.writeHead(200, {'Content-Type':'application/pdf', 'Content-Disposition':'inline; filename="novo-testamento-judaico.pdf"'});
      createReadStream(personalPdf).pipe(response);
      return true;
    }
    const match = url.pathname.match(/^\/api\/bible\/(nvi|nvt|acf)\/([A-Z0-9]{3})\/(\d+)$/);
    if (!match) { json(404, {error:'Versão ou referência não suportada'}); return true; }
    const [, versionId, code, chapterString] = match;
    const book = books.find(b => b.code === code), chapter = Number(chapterString);
    if (!book || chapter < 1 || chapter > book.chapters) { json(400, {error:'Referência inválida'}); return true; }
    try {
      const upstream = await requestChapter(`https://abibliadigital.api.br/api/verses/${versionId}/${aliases[book.order - 1]}/${chapter}`, {signal:AbortSignal.timeout(15000), headers:{Accept:'application/json'}});
      if (!upstream.ok) { json(upstream.status === 429 ? 429 : 502, {error:'A fonte está indisponível ou atingiu o limite de consultas. Tente novamente.'}); return true; }
      const data = await upstream.json();
      const verses = data.verses;
      if (data.book?.version !== versionId || Number(data.chapter?.number) !== chapter || !Array.isArray(verses) || !verses.length || verses.some((v, i) => !Number.isInteger(v.number) || v.number < 1 || (i > 0 && v.number <= verses[i-1].number) || typeof v.text !== 'string' || !v.text.trim())) throw new Error('Resposta inválida');
      json(200, {versionId, bookCode:code, bookName:book.name, bookOrder:book.order, chapter, verses:verses.map(v=>({number:v.number,end:v.number,text:v.text}))});
    } catch {
      json(502, {error:'Não foi possível consultar a fonte. Verifique a conexão e tente novamente.'});
    }
    return true;
  };
}
