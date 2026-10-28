import type { PracticeItem } from './types';

export const kanaRows = [
  { id: 'a', name: '아행', chars: 'あいうえお', hint: 'a · i · u · e · o' },
  { id: 'ka', name: '카행', chars: 'かきくけこ', hint: 'ka · ki · ku · ke · ko' },
  { id: 'sa', name: '사행', chars: 'さしすせそ', hint: 'sa · shi · su · se · so' },
  { id: 'ta', name: '타행', chars: 'たちつてと', hint: 'ta · chi · tsu · te · to' },
  { id: 'na', name: '나행', chars: 'なにぬねの', hint: 'na · ni · nu · ne · no' },
  { id: 'ha', name: '하행', chars: 'はひふへほ', hint: 'ha · hi · fu · he · ho' },
  { id: 'ma', name: '마행', chars: 'まみむめも', hint: 'ma · mi · mu · me · mo' },
  { id: 'ya', name: '야행', chars: 'やゆよ', hint: 'ya · yu · yo' },
  { id: 'ra', name: '라행', chars: 'らりるれろ', hint: 'ra · ri · ru · re · ro' },
  { id: 'wa', name: '와행', chars: 'わをん', hint: 'wa · wo · n' },
  { id: 'ga', name: '가행', chars: 'がぎぐげご', hint: 'ga · gi · gu · ge · go' },
  { id: 'za', name: '자행', chars: 'ざじずぜぞ', hint: 'za · ji · zu · ze · zo' },
  { id: 'da', name: '다행', chars: 'だぢづでど', hint: 'da · ji · zu · de · do' },
  { id: 'ba', name: '바행', chars: 'ばびぶべぼ', hint: 'ba · bi · bu · be · bo' },
  { id: 'pa', name: '파행', chars: 'ぱぴぷぺぽ', hint: 'pa · pi · pu · pe · po' },
  {
    id: 'small',
    name: '작은 글자',
    chars: 'ぁぃぅぇぉゃゅょっゎ',
    hint: '작은 모음 · 요음 · 촉음',
  },
];

export const kana: PracticeItem[] = kanaRows.flatMap((row) =>
  [...row.chars].map((char, i) => ({
    id: `kana-${row.id}-${i}`,
    mode: 'kana',
    category: row.id,
    segments: [{ text: char }],
    ko: row.name,
    en: row.hint.split(' · ')[i] ?? 'small kana',
  })),
);
