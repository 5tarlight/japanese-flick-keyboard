import { kana } from '../data/kana';
import { passages } from '../data/passages';
import { sentences } from '../data/sentences';
import { words } from '../data/words';
import type { Mode, PracticeItem, Segment, SentenceLength } from '../data/types';

export const modeNames: Record<Mode, string> = {
  kana: '한 글자',
  word: '단어',
  sentence: '문장',
  passage: '장문',
};
export const library = [...kana, ...words, ...sentences, ...passages];
export const contentCount = words.length + sentences.length + passages.length;

export type Course = {
  mode: Mode;
  kanaRow: string;
  wordCategory: string;
  sentenceLength: SentenceLength;
  passageId: string;
};
export const defaultCourse: Course = {
  mode: 'kana',
  kanaRow: 'a',
  wordCategory: 'all',
  sentenceLength: 'short',
  passageId: passages[0].id,
};

/** Normalize IME variants but retain meaningful kana (including small kana and long vowels). */
export function normalize(value: string): string {
  return value
    .normalize('NFKC')
    .replace(/[ァ-ヶ]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .replace(/[\s。、，,.！？!?「」『』"“”‘’（）()・]/g, '');
}

export function textOf(segments: Segment[]): string {
  return segments.map((s) => s.text).join('');
}
export function readingOf(segments: Segment[]): string {
  return segments.map((s) => s.reading ?? s.text).join('');
}

/** Dynamic parsing accepts kanji, kana, and a mix of the two without exponential variant generation. */
export function isCorrect(input: string, segments: Segment[]): boolean {
  const answer = normalize(input);
  if (!answer) return false;
  let positions = new Set([0]);
  for (const segment of segments) {
    const options = [
      ...new Set([normalize(segment.text), normalize(segment.reading ?? segment.text)]),
    ];
    const next = new Set<number>();
    for (const pos of positions) {
      for (const option of options) {
        if (answer.startsWith(option, pos)) next.add(pos + option.length);
      }
    }
    positions = next;
    if (!positions.size) return false;
  }
  return positions.has(answer.length);
}

export function poolFor(course: Course): PracticeItem[] {
  switch (course.mode) {
    case 'kana':
      return kana.filter((item) => course.kanaRow === 'all' || item.category === course.kanaRow);
    case 'word':
      return words.filter(
        (item) => course.wordCategory === 'all' || item.category === course.wordCategory,
      );
    case 'sentence':
      return sentences.filter((item) => item.length === course.sentenceLength);
    case 'passage':
      return passages.filter((item) => item.id === course.passageId);
  }
}

export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function splitPassage(item: PracticeItem): PracticeItem[] {
  const result: PracticeItem[] = [];
  let current: Segment[] = [];
  const flush = () => {
    if (!normalize(textOf(current))) return;
    result.push({ ...item, id: `${item.id}-part-${result.length}`, segments: current });
    current = [];
  };
  for (const segment of item.segments) {
    if (segment.reading) {
      current.push(segment);
      continue;
    }
    for (const chunk of segment.text.match(/[^。！？]+[。！？]?|[。！？]/g) ?? []) {
      current.push({ text: chunk });
      if (/[。！？]$/.test(chunk)) flush();
    }
  }
  flush();
  return result;
}

export function buildSession(course: Course, count: number): PracticeItem[] {
  const pool = poolFor(course);
  if (!pool.length) return [];
  if (course.mode === 'passage') return splitPassage(pool[0]);
  const result: PracticeItem[] = [];
  while (result.length < count) {
    const batch = shuffle(pool);
    if (result.length && batch.length > 1 && result.at(-1)?.id === batch[0].id)
      [batch[0], batch[1]] = [batch[1], batch[0]];
    result.push(...batch.slice(0, count - result.length));
  }
  return result;
}

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  return mins ? `${mins}분 ${seconds % 60}초` : `${seconds}초`;
}
