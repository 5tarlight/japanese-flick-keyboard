import type { Segment } from '../data/types';
import { normalize, readingOf } from './practice';

export type DiffPart = {
  kind: 'equal' | 'replace' | 'missing' | 'extra';
  actual: string;
  expected: string;
  actualStart: number;
};
export type AnswerDiff = { parts: DiffPart[]; message: string };

type Path = { cost: number; matches: number; expected: string };

function best(paths: Path[]): Path {
  return paths.reduce((a, b) =>
    b.cost < a.cost || (b.cost === a.cost && b.matches > a.matches) ? b : a,
  );
}

/** Pick the nearest allowed mix of kanji/kana, without enumerating every combination. */
function nearestExpected(actual: string[], segments: Segment[]): string {
  if (!actual.some((char) => /\p{Script=Han}/u.test(char))) {
    return normalize(readingOf(segments));
  }
  let previous: Path[] = Array.from({ length: actual.length + 1 }, (_, cost) => ({
    cost,
    matches: 0,
    expected: '',
  }));
  for (const segment of segments) {
    const options = [
      ...new Set([normalize(segment.text), normalize(segment.reading ?? segment.text)]),
    ];
    const alternatives = options.map((option) => {
      let row = previous;
      for (const char of option) {
        const next: Path[] = [
          { ...row[0], cost: row[0].cost + 1, expected: row[0].expected + char },
        ];
        for (let j = 1; j <= actual.length; j++) {
          const equal = char === actual[j - 1];
          next[j] = best([
            {
              cost: row[j - 1].cost + (equal ? 0 : 1),
              matches: row[j - 1].matches + (equal ? 1 : 0),
              expected: row[j - 1].expected + char,
            },
            { ...row[j], cost: row[j].cost + 1, expected: row[j].expected + char },
            { ...next[j - 1], cost: next[j - 1].cost + 1 },
          ]);
        }
        row = next;
      }
      return row;
    });
    previous = previous.map((_, j) => best(alternatives.map((row) => row[j])));
  }
  return previous[actual.length].expected;
}

/** Align characters so a missing/extra character does not mark every following character wrong. */
export function compareAnswer(input: string, segments: Segment[]): AnswerDiff {
  const actual = [...normalize(input)];
  const expected = [...nearestExpected(actual, segments)];
  const costs = Array.from(
    { length: expected.length + 1 },
    () => new Uint32Array(actual.length + 1),
  );
  for (let i = 0; i <= expected.length; i++) costs[i][0] = i;
  for (let j = 0; j <= actual.length; j++) costs[0][j] = j;
  for (let i = 1; i <= expected.length; i++) {
    for (let j = 1; j <= actual.length; j++) {
      costs[i][j] = Math.min(
        costs[i - 1][j - 1] + (expected[i - 1] === actual[j - 1] ? 0 : 1),
        costs[i - 1][j] + 1,
        costs[i][j - 1] + 1,
      );
    }
  }
  const reversed: DiffPart[] = [];
  let i = expected.length,
    j = actual.length;
  while (i || j) {
    if (i && j && expected[i - 1] === actual[j - 1] && costs[i][j] === costs[i - 1][j - 1]) {
      reversed.push({
        kind: 'equal',
        actual: actual[j - 1],
        expected: expected[i - 1],
        actualStart: j - 1,
      });
      i--;
      j--;
    } else if (i && j && costs[i][j] === costs[i - 1][j - 1] + 1) {
      reversed.push({
        kind: 'replace',
        actual: actual[j - 1],
        expected: expected[i - 1],
        actualStart: j - 1,
      });
      i--;
      j--;
    } else if (i && costs[i][j] === costs[i - 1][j] + 1) {
      reversed.push({ kind: 'missing', actual: '', expected: expected[i - 1], actualStart: j });
      i--;
    } else {
      reversed.push({ kind: 'extra', actual: actual[j - 1], expected: '', actualStart: j - 1 });
      j--;
    }
  }
  const parts: DiffPart[] = [];
  for (const part of reversed.reverse()) {
    const last = parts.at(-1);
    if (last?.kind === part.kind) {
      last.actual += part.actual;
      last.expected += part.expected;
    } else parts.push({ ...part });
  }
  const first = parts.find((part) => part.kind !== 'equal');
  let message = '';
  if (first) {
    const position = first.actualStart + 1;
    if (first.kind === 'missing')
      message = `${position}번째에 「${[...first.expected][0]}」를 넣어 주세요.`;
    else if (first.kind === 'extra')
      message = `${position}번째 「${[...first.actual][0]}」는 빼 주세요.`;
    else
      message = `${position}번째 글자: 「${[...first.actual][0]}」 → 「${[...first.expected][0]}」`;
  }
  return { parts, message };
}
