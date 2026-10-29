import { describe, expect, it, vi, afterEach } from 'vitest';
import {
  buildSession,
  contentCount,
  defaultCourse,
  isCorrect,
  library,
  normalize,
  readingOf,
  splitPassage,
  textOf,
} from './practice';
import { passages } from '../data/passages';
import { sentences } from '../data/sentences';
import { words } from '../data/words';
import { kana, kanaRows } from '../data/kana';
import { parseRuby } from '../data/types';
import { defaultSettings, loadData, saveData, streak } from './storage';
import type { PracticeRecord } from './storage';

afterEach(() => vi.unstubAllGlobals());

describe('original practice library', () => {
  it('contains more than 900 distinct words and texts with both translations', () => {
    expect(contentCount).toBeGreaterThanOrEqual(900);
    expect(words.length).toBe(600);
    expect(sentences.length).toBe(300);
    for (const length of ['short', 'middle', 'long']) {
      expect(sentences.filter((item) => item.length === length)).toHaveLength(100);
    }
    expect(passages.length).toBe(12);
    expect(new Set(library.map((item) => item.id)).size).toBe(library.length);
    expect(
      new Set([...words, ...sentences, ...passages].map((item) => textOf(item.segments))).size,
    ).toBe(contentCount);
    for (const item of library) {
      expect(item.ko, item.id).toBeTruthy();
      expect(item.en, item.id).toBeTruthy();
      expect(textOf(item.segments), item.id).not.toMatch(/[\[\]|]/);
      expect(readingOf(item.segments), item.id).not.toMatch(/[一-龯]/);
      expect(isCorrect(textOf(item.segments), item.segments), item.id).toBe(true);
      expect(isCorrect(readingOf(item.segments), item.segments), item.id).toBe(true);
    }
  });
  it('includes all 46 basic kana plus voiced and small kana', () => {
    expect(
      kanaRows
        .slice(0, 10)
        .map((row) => row.chars)
        .join(''),
    ).toHaveLength(46);
    expect(new Set(kana.map((item) => textOf(item.segments))).size).toBe(kana.length);
    expect(kana.length).toBe(81);
  });
  it('splits every passage without losing or duplicating characters', () => {
    for (const passage of passages) {
      const parts = splitPassage(passage);
      expect(parts).toHaveLength(4);
      expect(parts.map((item) => textOf(item.segments)).join('')).toBe(textOf(passage.segments));
      expect(parts.map((item) => readingOf(item.segments)).join('')).toBe(
        readingOf(passage.segments),
      );
    }
  });
});

describe('Japanese IME answer matching', () => {
  const segments = parseRuby('[今日|きょう]は[学校|がっこう]へ[行|い]きます。');
  it('accepts kanji, kana, and mixed conversions', () => {
    for (const input of [
      '今日は学校へ行きます。',
      'きょうはがっこうへいきます',
      '今日はがっこうへ行きます',
      'きょうは学校へいきます。',
    ])
      expect(isCorrect(input, segments)).toBe(true);
  });
  it('normalizes width, katakana, spacing, punctuation, and combining dakuten', () => {
    expect(isCorrect('キョウハ ガッコウヘ イキマス！', segments)).toBe(true);
    expect(normalize('ｶﾞ か\u3099。')).toBe('がが');
  });
  it('rejects empty input, incorrect kana, missing characters, and extra text', () => {
    for (const input of [
      '',
      '。  ',
      'きようはがつこうへいきます',
      'きょうはがっこうへいきま',
      '今日は学校へ行きますよ',
    ])
      expect(isCorrect(input, segments)).toBe(false);
  });
  it('preserves small kana, long vowels, and actual particles', () => {
    expect(isCorrect('おばさん', [{ text: '叔母さん', reading: 'おばさん' }])).toBe(true);
    expect(isCorrect('おばあさん', [{ text: '叔母さん', reading: 'おばさん' }])).toBe(false);
    expect(isCorrect('きょうわがっこうえいきます', segments)).toBe(false);
  });
});

describe('session construction', () => {
  it('uses the selected row and never repeats at batch boundaries', () => {
    const session = buildSession(defaultCourse, 20);
    expect(session).toHaveLength(20);
    expect(session.every((item) => item.category === 'a')).toBe(true);
    for (let i = 1; i < session.length; i++) expect(session[i].id).not.toBe(session[i - 1].id);
    expect(new Set(session.slice(0, 5).map((item) => item.id)).size).toBe(5);
  });
  it('respects category, length, count, and passage selections', () => {
    const wordSession = buildSession({ ...defaultCourse, mode: 'word', wordCategory: '자연' }, 10);
    expect(wordSession.every((item) => item.category === '자연')).toBe(true);
    expect(new Set(wordSession.map((item) => item.id)).size).toBe(10);
    expect(
      buildSession({ ...defaultCourse, mode: 'sentence', sentenceLength: 'long' }, 5).every(
        (item) => item.length === 'long',
      ),
    ).toBe(true);
    expect(
      buildSession({ ...defaultCourse, mode: 'passage', passageId: passages[1].id }, 20),
    ).toHaveLength(4);
    expect(buildSession({ ...defaultCourse, kanaRow: 'missing' }, 5)).toEqual([]);
  });
});

describe('local records', () => {
  const record = (date: string): PracticeRecord => ({
    id: date,
    date,
    mode: 'kana',
    total: 5,
    correct: 5,
    skipped: 0,
    attempts: 5,
    characters: 5,
    seconds: 20,
    title: '한 글자 연습',
  });
  it('handles corrupt data, blocked storage, and invalid settings safely', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => '{corrupt',
      setItem: () => {
        throw new Error('quota');
      },
    });
    expect(loadData().settings).toEqual(defaultSettings);
    expect(saveData(loadData())).toBe(false);
    vi.stubGlobal('localStorage', {
      getItem: () =>
        JSON.stringify({
          version: 1,
          settings: { count: -5, meaning: 'bad', furigana: false },
          history: [record('2026-10-29'), {}],
        }),
    });
    const saved = loadData();
    expect(saved.history).toHaveLength(1);
    expect(saved.settings).toEqual({ ...defaultSettings, furigana: false });
  });
  it('counts consecutive local calendar dates including a streak continuing from yesterday', () => {
    const now = new Date(2026, 9, 29, 12);
    expect(
      streak(
        [record('2026-10-29'), record('2026-10-28'), record('2026-10-28'), record('2026-10-27')],
        now,
      ),
    ).toBe(3);
    expect(streak([record('2026-10-28'), record('2026-10-27')], now)).toBe(2);
    expect(streak([record('2026-10-27')], now)).toBe(0);
  });
});
