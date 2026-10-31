import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const sourceCommit = '9586bd8228a747962df1ee8692730422fb7eb2ec';
const sourceUrl = `https://raw.githubusercontent.com/midvash/bible-data/${sourceCommit}/versions/he/wlc/wlc.json`;
const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`WLC download failed: ${response.status}`);
const source = await response.json();
const catalogPath = new URL('../data/bibles/catalog.json', import.meta.url);
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const portugueseBooks = catalog.versions.find(version => version.id === 'porbr2018')?.books;
if (!portugueseBooks || source.books.length !== 39) throw new Error('Unexpected WLC book count');

const books = source.books.map((book, index) => ({
  code: portugueseBooks[index].code,
  name: portugueseBooks[index].name,
  order: index + 1,
  chapters: book.chapters.length,
}));
const chapters = source.books.flatMap((book, index) => book.chapters.map(chapter => ({
  bookCode: books[index].code,
  bookName: books[index].name,
  bookOrder: index + 1,
  chapter: chapter.chapter,
  verses: chapter.verses.map(verse => ({ number: verse.number, end: verse.number, text: verse.text })),
})));
const verseCount = chapters.reduce((count, chapter) => count + chapter.verses.length, 0);
if (chapters.length !== 929 || verseCount !== 23318) throw new Error(`Unexpected WLC size: ${chapters.length} chapters, ${verseCount} verses`);

const version = {
  id: 'wlc',
  abbreviation: 'WLC',
  name: 'Hebraico · Códice de Leningrado',
  language: 'he',
  completeness: 'Antigo Testamento',
  license: 'Uso livre com atribuição',
  licenseUrl: 'https://tanach.us/Pages/Tanach.xml#License',
  sourceUrl: `https://github.com/midvash/bible-data/tree/${sourceCommit}/versions/he/wlc`,
  attribution: 'Westminster Leningrad Codex, Westminster Hebrew Institute. Texto hebraico do Antigo Testamento.',
  recommended: false,
  description: 'Texto hebraico massorético dos 39 livros do Antigo Testamento. Leitura da direita para a esquerda.',
};
const payload = { formatVersion: 1, version, books, chapters };
const compressed = gzipSync(Buffer.from(JSON.stringify(payload)), { level: 9, mtime: 0 });
const packageFile = new URL('../data/bibles/wlc.json.gz', import.meta.url);
await writeFile(packageFile, compressed);
const catalogEntry = {
  ...version,
  packageFile: 'data/bibles/wlc.json.gz',
  byteSize: compressed.length,
  sha256: createHash('sha256').update(compressed).digest('hex'),
  verseCount,
  bookCount: books.length,
  books,
};
catalog.versions = catalog.versions.filter(item => item.id !== version.id);
catalog.versions.push(catalogEntry);
await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`WLC: ${books.length} books, ${chapters.length} chapters, ${verseCount} verses, ${compressed.length} bytes`);
