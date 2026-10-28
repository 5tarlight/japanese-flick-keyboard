// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { defaultSettings, loadData, saveData } from './lib/storage';

beforeEach(() => {
  localStorage.clear();
  saveData({ version: 1, settings: { ...defaultSettings, count: 5 }, history: [] });
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  window.scrollTo = vi.fn();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function start() {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: '연습 시작하기 5문제' }));
  return screen.getByRole('textbox', { name: '연습 답안' }) as HTMLTextAreaElement;
}

function currentAnswer() {
  return document.querySelector('.practice-target')!.textContent!;
}

describe('mobile IME practice flow', () => {
  it('also starts on a local Wi-Fi HTTP preview without secure-context UUID support', () => {
    vi.stubGlobal('crypto', {});
    expect(start()).toBeTruthy();
    expect(document.querySelector('.practice-target')).toBeTruthy();
  });

  it('does not judge during composition or submit on the Enter used to commit an IME conversion', () => {
    const clock = vi.spyOn(performance, 'now').mockReturnValue(1000);
    const input = start();
    const answer = currentAnswer();
    expect(document.activeElement).toBe(input);
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: answer } });
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true, keyCode: 229 });
    fireEvent.click(screen.getByRole('button', { name: '확인' }));
    expect(screen.queryByText('정확해요! 잘하고 있어요.')).toBeNull();
    expect(screen.queryByText('조금 달라요. 다시 확인해 보세요.')).toBeNull();
    fireEvent.compositionEnd(input, { data: answer });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    expect(screen.queryByText('정확해요! 잘하고 있어요.')).toBeNull();
    clock.mockReturnValue(1100);
    fireEvent.click(screen.getByRole('button', { name: '확인' }));
    expect(screen.getByText('정확해요! 잘하고 있어요.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '다음 문제' }));
    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
    expect(loadData().history).toHaveLength(0);
  });

  it('records a finished session once, including retries and skipped answers', () => {
    const input = start();
    fireEvent.change(input, { target: { value: 'まちがい' } });
    fireEvent.click(screen.getByRole('button', { name: '확인' }));
    expect(screen.getByText('조금 달라요. 다시 확인해 보세요.')).toBeTruthy();
    for (let i = 0; i < 5; i++) {
      if (i === 2) fireEvent.click(screen.getByRole('button', { name: '건너뛰기' }));
      else {
        fireEvent.change(input, { target: { value: currentAnswer() } });
        fireEvent.click(screen.getByRole('button', { name: '확인' }));
        expect(screen.getByText('정확해요! 잘하고 있어요.')).toBeTruthy();
      }
      fireEvent.click(screen.getByRole('button', { name: i === 4 ? '결과 보기' : '다음 문제' }));
    }
    expect(screen.getByRole('heading', { name: '연습을 마쳤어요!' })).toBeTruthy();
    const records = loadData().history;
    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      total: 5,
      correct: 4,
      attempts: 5,
      skipped: 1,
      characters: 4,
    });
    expect(screen.getByText('67')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '기록' }));
    expect(screen.getByText('1회 완료')).toBeTruthy();
  });

  it('leaves unfinished sessions unrecorded and preserves changed settings', () => {
    start();
    fireEvent.click(screen.getByRole('button', { name: '연습 나가기' }));
    expect(screen.getByRole('dialog')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '나가기' }));
    expect(loadData().history).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: '설정' }));
    fireEvent.click(screen.getByRole('switch', { name: '후리가나 표시' }));
    fireEvent.click(screen.getByRole('button', { name: 'English' }));
    act(() => {
      cleanup();
    });
    render(<App />);
    expect(screen.getByRole('switch', { name: '후리가나 표시' }).getAttribute('aria-checked')).toBe(
      'false',
    );
    expect(loadData().settings.meaning).toBe('en');
  });
});
