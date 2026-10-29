import { describe, expect, it } from 'vitest';
import { compareAnswer } from './answerDiff';
import { parseRuby } from '../data/types';

describe('Japanese answer differences', () => {
  const school = parseRuby('[学校|がっこう]');
  it('points to a substituted small kana, dakuten, or particle', () => {
    const diff = compareAnswer('がつこう', school);
    expect(diff.message).toBe('2번째 글자: 「つ」 → 「っ」');
    expect(diff.parts.filter((p) => p.kind !== 'equal')).toEqual([
      { kind: 'replace', actual: 'つ', expected: 'っ', actualStart: 1 },
    ]);
    expect(compareAnswer('かっこう', school).message).toBe('1번째 글자: 「か」 → 「が」');
    expect(compareAnswer('きょうわ', parseRuby('[今日|きょう]は')).message).toBe(
      '4번째 글자: 「わ」 → 「は」',
    );
  });
  it('marks a missing character while keeping the rest aligned', () => {
    const diff = compareAnswer('がこう', school);
    expect(diff.message).toBe('2번째에 「っ」를 넣어 주세요.');
    expect(diff.parts.map((p) => [p.kind, p.actual, p.expected])).toEqual([
      ['equal', 'が', 'が'],
      ['missing', '', 'っ'],
      ['equal', 'こう', 'こう'],
    ]);
    expect(compareAnswer('がっこ', school).message).toBe('4번째에 「う」를 넣어 주세요.');
  });
  it('marks extra input without shifting the matching suffix', () => {
    const diff = compareAnswer('があっこう', school);
    expect(diff.message).toBe('2번째 「あ」는 빼 주세요.');
    expect(diff.parts.map((p) => [p.kind, p.actual, p.expected])).toEqual([
      ['equal', 'が', 'が'],
      ['extra', 'あ', ''],
      ['equal', 'っこう', 'っこう'],
    ]);
  });
  it('compares mixed kanji/kana against the closest accepted conversion', () => {
    const segments = parseRuby('[今日|きょう]は[学校|がっこう]へ[行|い]きます。');
    const diff = compareAnswer('今日はがっこうへいきまし', segments);
    expect(diff.parts.map((p) => p.expected).join('')).toBe('今日はがっこうへいきます');
    expect(diff.parts.filter((p) => p.kind !== 'equal')).toEqual([
      { kind: 'replace', actual: 'し', expected: 'す', actualStart: 11 },
    ]);
    for (const answer of [
      '今日は学校へ行きます',
      'きょうは学校へいきます',
      '今日はがっこうへ行きます',
    ]) {
      expect(compareAnswer(answer, segments).message).toBe('');
    }
  });
  it('compares kana input with readings and respects the same normalization as grading', () => {
    expect(compareAnswer('ｶﾞｯｺｳ。 ', school).message).toBe('');
    expect(compareAnswer('か\u3099っこう！', school).message).toBe('');
    const unrelated = compareAnswer('あ', parseRuby('[猫|ねこ]'));
    expect(unrelated.parts.map((p) => p.expected).join('')).toBe('ねこ');
  });
  it('handles fully missing input, repeated letters, and mistakes at both ends', () => {
    expect(compareAnswer('', school).parts).toEqual([
      { kind: 'missing', actual: '', expected: 'がっこう', actualStart: 0 },
    ]);
    expect(
      compareAnswer('がっっこう', school).parts.filter((p) => p.kind !== 'equal'),
    ).toHaveLength(1);
    const diff = compareAnswer('かっこえ', school);
    expect(diff.parts.filter((p) => p.kind === 'replace')).toHaveLength(2);
  });
});
