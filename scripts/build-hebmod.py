"""Build the complete public-domain Hebrew Bible from eBible's VPL export."""

import gzip
import hashlib
import io
import json
import re
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_URL = "https://ebible.org/Scriptures/heb_vpl.zip"
SOURCE_SHA256 = "0a08df27df529508bcaa2e27bbc226356bcbb274ba090d1ae2cb567998eaf51c"
CATALOG_PATH = ROOT / "data/bibles/catalog.json"
PACKAGE_PATH = ROOT / "data/bibles/hebmod.json.gz"

request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "Mozilla/5.0"})
archive = urllib.request.urlopen(request, timeout=30).read()
if hashlib.sha256(archive).hexdigest() != SOURCE_SHA256:
    raise ValueError("The Hebrew source archive has changed; review it before rebuilding")
with zipfile.ZipFile(io.BytesIO(archive)) as source:
    lines = source.read("heb_vpl.txt").decode("utf-8-sig").splitlines()

catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
books = [dict(book) for book in next(version for version in catalog["versions"] if version["id"] == "porbr2018")["books"]]
chapters = []
chapter_map = {}
book_map = {book["code"]: book for book in books}
for line in lines:
    match = re.fullmatch(r"([A-Z0-9]+) (\d+):(\d+) (.+)", line)
    if not match:
        raise ValueError(f"Unexpected VPL line: {line[:80]}")
    code, chapter_number, verse_number, text = match.groups()
    book = book_map.get(code)
    if book is None:
        raise ValueError(f"Unknown book: {code}")
    key = (code, int(chapter_number))
    if key not in chapter_map:
        chapter_map[key] = {
            "bookCode": code,
            "bookName": book["name"],
            "bookOrder": book["order"],
            "chapter": int(chapter_number),
            "verses": [],
        }
        chapters.append(chapter_map[key])
    chapter_map[key]["verses"].append({"number": int(verse_number), "end": int(verse_number), "text": text})

if len(books) != 66 or len(chapters) != 1189 or len(lines) != 31102:
    raise ValueError("The Hebrew Bible is not complete")
for book in books:
    for chapter in range(1, book["chapters"] + 1):
        if (book["code"], chapter) not in chapter_map:
            raise ValueError(f"Missing chapter: {book['code']} {chapter}")
for chapter in chapters:
    numbers = [verse["number"] for verse in chapter["verses"]]
    if numbers != list(range(1, len(numbers) + 1)):
        raise ValueError(f"Missing verse in {chapter['bookCode']} {chapter['chapter']}")

version = {
    "id": "hebmod",
    "abbreviation": "HEB",
    "name": "Bíblia Hebraica · 66 livros",
    "language": "he",
    "completeness": "Bíblia completa",
    "license": "Domínio público",
    "licenseUrl": "https://ebible.org/Bible/details.php?id=heb",
    "sourceUrl": "https://ebible.org/Bible/details.php?id=heb",
    "attribution": "The Holy Bible in Modern Hebrew. Tradução do Novo Testamento por Franz Delitzsch. Fonte: eBible.org.",
    "recommended": False,
    "description": "Antigo e Novo Testamento em hebraico, com 66 livros. Leitura da direita para a esquerda.",
}
payload = {"formatVersion": 1, "version": version, "books": books, "chapters": chapters}
compressed = gzip.compress(json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8"), compresslevel=9, mtime=0)
PACKAGE_PATH.write_bytes(compressed)
catalog["versions"] = [entry for entry in catalog["versions"] if entry["id"] not in ("wlc", "hebmod")]
catalog["versions"].append({
    **version,
    "packageFile": "data/bibles/hebmod.json.gz",
    "byteSize": len(compressed),
    "sha256": hashlib.sha256(compressed).hexdigest(),
    "verseCount": len(lines),
    "bookCount": len(books),
    "books": books,
})
CATALOG_PATH.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"HEBMOD: {len(books)} books, {len(chapters)} chapters, {len(lines)} verses, {len(compressed)} bytes")
