import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const sourceRoot = path.join(root, 'data', 'sources');
const outputRoot = path.join(root, 'data', 'bibles');
const importRoot = path.join(root, 'supabase', 'import');

const books = [
  ['GEN','Gênesis'],['EXO','Êxodo'],['LEV','Levítico'],['NUM','Números'],['DEU','Deuteronômio'],
  ['JOS','Josué'],['JDG','Juízes'],['RUT','Rute'],['1SA','1 Samuel'],['2SA','2 Samuel'],
  ['1KI','1 Reis'],['2KI','2 Reis'],['1CH','1 Crônicas'],['2CH','2 Crônicas'],['EZR','Esdras'],
  ['NEH','Neemias'],['EST','Ester'],['JOB','Jó'],['PSA','Salmos'],['PRO','Provérbios'],
  ['ECC','Eclesiastes'],['SOL','Cântico dos Cânticos'],['ISA','Isaías'],['JER','Jeremias'],['LAM','Lamentações'],
  ['EZE','Ezequiel'],['DAN','Daniel'],['HOS','Oseias'],['JOE','Joel'],['AMO','Amós'],
  ['OBA','Obadias'],['JON','Jonas'],['MIC','Miqueias'],['NAH','Naum'],['HAB','Habacuque'],
  ['ZEP','Sofonias'],['HAG','Ageu'],['ZEC','Zacarias'],['MAL','Malaquias'],['MAT','Mateus'],
  ['MAR','Marcos'],['LUK','Lucas'],['JOH','João'],['ACT','Atos'],['ROM','Romanos'],
  ['1CO','1 Coríntios'],['2CO','2 Coríntios'],['GAL','Gálatas'],['EPH','Efésios'],['PHI','Filipenses'],
  ['COL','Colossenses'],['1TH','1 Tessalonicenses'],['2TH','2 Tessalonicenses'],['1TI','1 Timóteo'],['2TI','2 Timóteo'],
  ['TIT','Tito'],['PHM','Filemom'],['HEB','Hebreus'],['JAM','Tiago'],['1PE','1 Pedro'],
  ['2PE','2 Pedro'],['1JO','1 João'],['2JO','2 João'],['3JO','3 João'],['JUD','Judas'],['REV','Apocalipse']
].map(([code, name], index) => ({ code, name, order: index + 1 }));

const bookByCode = new Map(books.map(book => [book.code, book]));
const versions = [
  {
    id: 'almeida1911', abbreviation: 'AL1911', name: 'Almeida 1911', language: 'pt-BR', completeness: 'Bíblia completa',
    license: 'Domínio público (texto de 1911)', licenseUrl: 'https://github.com/BibliaJFAAL/JFAAL',
    sourceUrl: 'https://github.com/BibliaJFAAL/JFAAL/tree/main/original',
    attribution: 'João Ferreira de Almeida, edição de 1911. Digitalização disponibilizada na pasta original do projeto BibliaJFAAL/JFAAL. Grafia histórica preservada; não é a revisão por inteligência artificial do projeto.',
    recommended: true,
    description: 'Almeida histórica, com grafia de 1911. Para leitura tradicional e comparação.'
  },
  {
    id: 'porbr2018', abbreviation: 'BLIVRE', name: 'Bíblia Livre', language: 'pt-BR', completeness: 'Bíblia completa',
    recommended: true,
    description: 'Atualização de Almeida de 1819, edição Textus Receptus. A fonte informa que o trabalho continua em andamento.',
    license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://ebible.org/porbr2018/',
    attribution: 'Bíblia Livre, Copyright © 2018 Diego Santos, Mario Sérgio e Marco Teles. Licença Creative Commons Atribuição 4.0 Brasil.'
  },
  {
    id: 'porbrbsl', abbreviation: 'BPM', name: 'Bíblia Portuguesa Mundial', language: 'pt-BR', completeness: 'Bíblia completa',
    license: 'Domínio público', licenseUrl: 'https://ebible.org/publicdomain.htm',
    sourceUrl: 'https://ebible.org/porbrbsl/',
    attribution: 'Bíblia Portuguesa Mundial. Texto disponibilizado em domínio público por eBible.org.'
  },
  {
    id: 'portft', abbreviation: 'T4T', name: 'Tradução para Tradutores', language: 'pt-BR', completeness: 'Novo Testamento',
    license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://ebible.org/portft/',
    attribution: 'A Bíblia Sagrada, Tradução para Tradutores. Copyright © 2018 Ellis W. Deibler, Jr. CC BY-SA 4.0.'
  },
  {
    id: 'poronbv', abbreviation: 'ONBV', name: 'Biblica® Open Nova Bíblia Viva™ 2007', language: 'pt-BR', completeness: 'Bíblia completa',
    recommended: true,
    description: 'Linguagem acessível e tradução mais livre. Complemento de comparação, não uma tradução literal como a King James.',
    license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://ebible.org/poronbv/',
    attribution: 'Biblica® Open Nova Bíblia Viva™. Copyright © 2007, 2010 Biblica, Inc. Usado com permissão. CC BY-SA 4.0. O trabalho original está disponível gratuitamente em biblica.com e open.bible.'
  },
  {
    id: 'porblt', abbreviation: 'BLT', name: 'Bíblia Livre Para Todos', language: 'pt-BR', completeness: 'Novo Testamento',
    license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://ebible.org/porblt/',
    attribution: 'Bíblia Livre Para Todos. Copyright © 2022 Free Bible Ministry, Inc. CC BY-SA 4.0.'
  }
];

function parseVpl(source, versionId) {
  const records = [];
  for (const [index, rawLine] of source.split(/\r?\n/).entries()) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = rawLine.match(/^([1-3A-Z]{3})\s+(\d+):(\d+)(?:-(\d+))?\s*(.*)$/u);
    if (!match) throw new Error(`${versionId}: linha VPL inválida ${index + 1}`);
    const [, bookCode, chapter, verseStart, verseEnd, text] = match;
    const book = bookByCode.get(bookCode);
    if (!book) throw new Error(`${versionId}: livro desconhecido ${bookCode}`);
    records.push({
      versionId, bookCode, bookName: book.name, bookOrder: book.order,
      chapter: Number(chapter), verseStart: Number(verseStart), verseEnd: Number(verseEnd || verseStart), text
    });
  }
  return records;
}

function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function buildPackage(version, records) {
  const grouped = new Map();
  for (const record of records) {
    const key = `${record.bookCode}:${record.chapter}`;
    if (!grouped.has(key)) grouped.set(key, { bookCode: record.bookCode, bookName: record.bookName, bookOrder: record.bookOrder, chapter: record.chapter, verses: [] });
    grouped.get(key).verses.push({ number: record.verseStart, end: record.verseEnd, text: record.text });
  }
  const chapters = [...grouped.values()].sort((a, b) => a.bookOrder - b.bookOrder || a.chapter - b.chapter);
  const packageBooks = books
    .map(book => ({ ...book, chapters: chapters.filter(chapter => chapter.bookCode === book.code).length }))
    .filter(book => book.chapters > 0);
  return { formatVersion: 1, version, books: packageBooks, chapters };
}

await mkdir(outputRoot, { recursive: true });
await mkdir(importRoot, { recursive: true });
const catalog = [];
const allCsv = [['version_id','book_code','book_name','book_order','chapter','verse_start','verse_end','verse_text'].map(csvCell).join(',')];

for (const version of versions) {
  const sourcePath = path.join(sourceRoot, version.id, version.id === 'almeida1911' ? 'original.json' : `${version.id}_vpl.txt`);
  const source = await readFile(sourcePath, 'utf8');
  const records = version.id === 'almeida1911'
    ? JSON.parse(source).books.flatMap(sourceBook => {
      const book = books[sourceBook.nr - 1];
      if (!book) throw new Error('Livro Almeida desconhecido');
      return sourceBook.chapters.flatMap(chapter => chapter.verses.map(verse => ({
        versionId: version.id, bookCode: book.code, bookName: book.name, bookOrder: book.order,
        chapter: chapter.chapter, verseStart: verse.verse, verseEnd: verse.verse, text: verse.text
      })));
    })
    : parseVpl(source, version.id);
  const biblePackage = buildPackage(version, records);
  if (version.recommended) {
    if (biblePackage.books.length !== 66 || biblePackage.chapters.length !== 1189) throw new Error(`${version.id}: Bíblia incompleta`);
    const references = new Set();
    for (const record of records) {
      const key = `${record.bookCode}:${record.chapter}:${record.verseStart}`;
      if (references.has(key) || !record.text.trim() || record.verseStart < 1 || record.verseEnd < record.verseStart) throw new Error(`${version.id}: versículo inválido ${key}`);
      references.add(key);
    }
    for (const book of biblePackage.books) {
      const chapters = biblePackage.chapters.filter(chapter => chapter.bookCode === book.code);
      if (chapters.some((chapter, index) => chapter.chapter !== index + 1)) throw new Error(`${version.id}: lacuna de capítulo em ${book.code}`);
    }
  }
  const json = JSON.stringify(biblePackage);
  const compressed = gzipSync(Buffer.from(json), { level: 9 });
  const fileName = `${version.id}.json.gz`;
  await writeFile(path.join(outputRoot, fileName), compressed);
  for (const record of records) {
    allCsv.push([
      record.versionId, record.bookCode, record.bookName, record.bookOrder, record.chapter,
      record.verseStart, record.verseEnd, record.text
    ].map(csvCell).join(','));
  }
  catalog.push({
    ...version,
    packageFile: `data/bibles/${fileName}`,
    byteSize: compressed.byteLength,
    sha256: createHash('sha256').update(compressed).digest('hex'),
    verseCount: records.length,
    bookCount: biblePackage.books.length,
    books: biblePackage.books
  });
}

await writeFile(path.join(outputRoot, 'catalog.json'), JSON.stringify({ formatVersion: 1, generatedAt: new Date().toISOString(), versions: catalog }, null, 2));
const versionCsv = [
  ['id','abbreviation','name','language','completeness','license','license_url','source_url','attribution','package_path','package_bytes','package_sha256','verse_count','book_count'].map(csvCell).join(','),
  ...catalog.map(version => [
    version.id, version.abbreviation, version.name, version.language, version.completeness, version.license,
    version.licenseUrl, version.sourceUrl, version.attribution, version.packageFile, version.byteSize,
    version.sha256, version.verseCount, version.bookCount
  ].map(csvCell).join(','))
];
await writeFile(path.join(importRoot, 'bible-versions.csv'), `${versionCsv.join('\n')}\n`);
await writeFile(path.join(importRoot, 'bible-verses.csv'), `${allCsv.join('\n')}\n`);

console.log(`Geradas ${catalog.length} versões e ${allCsv.length - 1} registros bíblicos.`);
for (const version of catalog) console.log(`${version.abbreviation}: ${version.verseCount} registros, ${version.bookCount} livros, ${version.byteSize} bytes.`);
