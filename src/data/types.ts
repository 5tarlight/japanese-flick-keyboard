export type Mode = 'kana' | 'word' | 'sentence' | 'passage';
export type SentenceLength = 'short' | 'middle' | 'long';
export type Segment = { text: string; reading?: string };
export type PracticeItem = {
  id: string;
  mode: Mode;
  category: string;
  segments: Segment[];
  ko: string;
  en: string;
  length?: SentenceLength;
  title?: string;
};

/** Our original content uses [漢字|かな] to retain per-word ruby and mixed-IME answers. */
export function parseRuby(source: string): Segment[] {
  const parts: Segment[] = [];
  const pattern = /\[([^|\]]+)\|([^\]]+)\]/g;
  let cursor = 0;
  for (const match of source.matchAll(pattern)) {
    if (match.index! > cursor) parts.push({ text: source.slice(cursor, match.index) });
    parts.push({ text: match[1], reading: match[2] });
    cursor = match.index! + match[0].length;
  }
  if (cursor < source.length) parts.push({ text: source.slice(cursor) });
  return parts;
}

export function readRows(source: string): string[][] {
  return source
    .trim()
    .split('\n')
    .map((line) => line.trim().split('|'));
}
