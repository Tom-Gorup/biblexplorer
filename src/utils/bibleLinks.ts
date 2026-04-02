const bookMap: Record<string, string> = {
  '1 Chr': '1 Chronicles',
  '2 Chr': '2 Chronicles',
  '1 Sam': '1 Samuel',
  '2 Sam': '2 Samuel',
  '1 Kgs': '1 Kings',
  '2 Kgs': '2 Kings',
  'Matt': 'Matthew',
  'Gen': 'Genesis',
  'Exod': 'Exodus',
  'Num': 'Numbers',
  'Deut': 'Deuteronomy',
  'Josh': 'Joshua',
  'Judg': 'Judges',
  'Isa': 'Isaiah',
  'Jer': 'Jeremiah',
  'Ezek': 'Ezekiel',
  'Neh': 'Nehemiah',
  'Heb': 'Hebrews',
};

export function toBibleGatewayUrl(ref: string): string {
  let normalized = ref.trim();

  for (const [abbr, full] of Object.entries(bookMap)) {
    if (normalized.startsWith(abbr + ' ')) {
      normalized = full + normalized.slice(abbr.length);
      break;
    }
  }

  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(normalized)}&version=ESV`;
}

/** Split a compound reference like "Matt 1:16; Luke 3:23" into individual refs */
export function splitRefs(ref: string): string[] {
  return ref.split(/;\s*/).map(r => r.trim()).filter(Boolean);
}
