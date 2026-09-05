import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader


BOOKS = {
    "Genesis": ("GEN", 50), "Exodus": ("EXO", 40), "Leviticus": ("LEV", 27),
    "Numbers": ("NUM", 36), "Deuteronomy": ("DEU", 34), "Joshua": ("JOS", 24),
    "Judges": ("JDG", 21), "Ruth": ("RUT", 4), "1 Samuel": ("1SA", 31),
    "2 Samuel": ("2SA", 24), "1 Kings": ("1KI", 22), "2 Kings": ("2KI", 25),
    "1 Chronicles": ("1CH", 29), "2 Chronicles": ("2CH", 36), "Ezra": ("EZR", 10),
    "Nehemiah": ("NEH", 13), "Esther": ("EST", 10), "Job": ("JOB", 42),
    "Psalm": ("PSA", 150), "Proverbs": ("PRO", 31), "Ecclesiastes": ("ECC", 12),
    "Song of Solomon": ("SNG", 8), "Isaiah": ("ISA", 66), "Jeremiah": ("JER", 52),
    "Lamentations": ("LAM", 5), "Ezekiel": ("EZK", 48), "Daniel": ("DAN", 12),
    "Hosea": ("HOS", 14), "Joel": ("JOL", 3), "Amos": ("AMO", 9),
    "Obadiah": ("OBA", 1), "Jonah": ("JON", 4), "Micah": ("MIC", 7),
    "Nahum": ("NAM", 3), "Habakkuk": ("HAB", 3), "Zephaniah": ("ZEP", 3),
    "Haggai": ("HAG", 2), "Zechariah": ("ZEC", 14), "Malachi": ("MAL", 4),
    "Matthew": ("MAT", 28), "Mark": ("MRK", 16), "Luke": ("LUK", 24),
    "John": ("JHN", 21), "Acts": ("ACT", 28), "Romans": ("ROM", 16),
    "1 Corinthians": ("1CO", 16), "2 Corinthians": ("2CO", 13), "Galatians": ("GAL", 6),
    "Ephesians": ("EPH", 6), "Philippians": ("PHP", 4), "Colossians": ("COL", 4),
    "1 Thessalonians": ("1TH", 5), "2 Thessalonians": ("2TH", 3),
    "1 Timothy": ("1TI", 6), "2 Timothy": ("2TI", 4), "Titus": ("TIT", 3),
    "Philemon": ("PHM", 1), "Hebrews": ("HEB", 13), "James": ("JAS", 5),
    "1 Peter": ("1PE", 5), "2 Peter": ("2PE", 3), "1 John": ("1JN", 5),
    "2 John": ("2JN", 1), "3 John": ("3JN", 1), "Jude": ("JUD", 1),
    "Revelation": ("REV", 22),
}


def extract_entries(pdf_path):
    reader = PdfReader(pdf_path)
    entries = {}
    current = None
    for page in reader.pages:
        for raw_line in (page.extract_text() or "").splitlines():
            line = " ".join(raw_line.split())
            match = re.match(r"^(\d{1,3})\.\s+(.+)$", line)
            if match:
                current = int(match.group(1))
                entries[current] = match.group(2)
            elif current is not None and line:
                entries[current] += f" {line}"
    if sorted(entries) != list(range(1, 366)):
        raise ValueError(f"Expected days 1-365, found {len(entries)} entries")
    return entries


def expand_chapters(spec):
    chapters = []
    for token in (part.strip() for part in spec.split(",")):
        if not token:
            continue
        if "-" in token:
            start, end = (int(value) for value in token.split("-", 1))
            chapters.extend(range(start, end + 1))
        else:
            chapters.append(int(token))
    return chapters


def parse_segment(segment):
    segment = segment.strip().replace("Psalms ", "Psalm ")
    for name in sorted(BOOKS, key=len, reverse=True):
        code, chapter_count = BOOKS[name]
        if segment == name:
            return [{"code": code, "chapter": chapter} for chapter in range(1, chapter_count + 1)]
        if segment.startswith(f"{name} "):
            spec = segment[len(name) + 1:]
            chapters = expand_chapters(spec)
            if any(chapter < 1 or chapter > chapter_count for chapter in chapters):
                raise ValueError(f"Invalid chapter in {segment}")
            return [{"code": code, "chapter": chapter} for chapter in chapters]
    raise ValueError(f"Unsupported reading segment: {segment}")


def parse_reading(reading):
    replacements = {
        "1 & 2 Thessalonians": "1 Thessalonians; 2 Thessalonians",
        "Colossians, Philemon": "Colossians; Philemon",
        "2 Peter, Jude": "2 Peter; Jude",
        "2, 3 John": "2 John; 3 John",
    }
    normalized = replacements.get(reading, reading)
    chapters = []
    for segment in normalized.split(";"):
        chapters.extend(parse_segment(segment))
    return chapters


def main():
    source = Path(sys.argv[1] if len(sys.argv) > 1 else ".tmp-plan-source/chronological-plan.pdf")
    target = Path(sys.argv[2] if len(sys.argv) > 2 else "data/chronological-plan.json")
    entries = extract_entries(source)
    days = [{"day": day, "reading": entries[day], "chapters": parse_reading(entries[day])} for day in range(1, 366)]
    flattened = [(item["code"], item["chapter"]) for day in days for item in day["chapters"]]
    expected = {(code, chapter) for code, count in BOOKS.values() for chapter in range(1, count + 1)}
    if len(flattened) != 1189 or set(flattened) != expected or len(set(flattened)) != len(flattened):
        missing = sorted(expected - set(flattened))
        duplicates = sorted(item for item in set(flattened) if flattened.count(item) > 1)
        raise ValueError(f"Invalid sequence: {len(flattened)} chapters, missing={missing}, duplicates={duplicates}")
    payload = {
        "source": "https://www.blueletterbible.org/assets-v3/pdf/dbrp/1Yr_ChronologicalPlan.pdf",
        "sourceTitle": "Blue Letter Bible - 1-Year Chronological Plan",
        "dayCount": len(days),
        "chapterCount": len(flattened),
        "days": days,
    }
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {target}: {len(days)} days, {len(flattened)} chapters")


if __name__ == "__main__":
    main()
