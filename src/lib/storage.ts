import type { Mode } from '../data/types';
import { localDate } from './practice';

export type Settings = {
  furigana: boolean;
  meaning: 'ko' | 'en' | 'both';
  count: 5 | 10 | 20;
  dailyGoal: 10 | 20 | 30;
};
export type PracticeRecord = {
  id: string;
  date: string;
  mode: Mode;
  total: number;
  correct: number;
  skipped: number;
  attempts: number;
  characters: number;
  seconds: number;
  title: string;
};
export type SavedData = { version: 1; settings: Settings; history: PracticeRecord[] };
export const defaultSettings: Settings = {
  furigana: true,
  meaning: 'both',
  count: 10,
  dailyGoal: 20,
};
const key = 'kanari:v1';

export function loadData(): SavedData {
  const fallback: SavedData = { version: 1, settings: { ...defaultSettings }, history: [] };
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? 'null');
    if (!parsed || parsed.version !== 1) return fallback;
    const s = parsed.settings ?? {};
    return {
      version: 1,
      settings: {
        furigana: typeof s.furigana === 'boolean' ? s.furigana : true,
        meaning: ['ko', 'en', 'both'].includes(s.meaning) ? s.meaning : 'both',
        count: [5, 10, 20].includes(s.count) ? s.count : 10,
        dailyGoal: [10, 20, 30].includes(s.dailyGoal) ? s.dailyGoal : 20,
      },
      history: Array.isArray(parsed.history)
        ? parsed.history.filter(validRecord).slice(0, 500)
        : [],
    };
  } catch {
    return fallback;
  }
}

function validRecord(r: unknown): r is PracticeRecord {
  if (!r || typeof r !== 'object') return false;
  const v = r as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.title === 'string' &&
    typeof v.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(v.date) &&
    ['kana', 'word', 'sentence', 'passage'].includes(String(v.mode)) &&
    ['total', 'correct', 'skipped', 'attempts', 'characters', 'seconds'].every(
      (k) => typeof v[k] === 'number' && Number.isFinite(v[k]) && (v[k] as number) >= 0,
    )
  );
}

export function saveData(data: SavedData): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function streak(history: PracticeRecord[], now = new Date()): number {
  const days = new Set(history.filter((r) => r.correct > 0).map((r) => r.date));
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!days.has(localDate(cursor))) cursor.setDate(cursor.getDate() - 1);
  let count = 0;
  while (days.has(localDate(cursor))) {
    count++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}
