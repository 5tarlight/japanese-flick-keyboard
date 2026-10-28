import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Flame,
  Flower2,
  GraduationCap,
  Keyboard,
  Leaf,
  RotateCcw,
  Settings2,
  Sparkles,
  Target,
  Trophy,
  Volume2,
  X,
  ChartNoAxesColumnIncreasing,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { kanaRows } from './data/kana';
import { words, wordCategories } from './data/words';
import { sentences } from './data/sentences';
import { passages } from './data/passages';
import type { Mode, PracticeItem, Segment, SentenceLength } from './data/types';
import {
  buildSession,
  contentCount,
  defaultCourse,
  formatDuration,
  isCorrect,
  localDate,
  modeNames,
  normalize,
  poolFor,
  readingOf,
} from './lib/practice';
import type { Course } from './lib/practice';
import { loadData, saveData, streak } from './lib/storage';
import type { PracticeRecord, SavedData, Settings } from './lib/storage';
import { useViewport } from './hooks/useViewport';

type Page = 'practice' | 'history' | 'settings';
type Run = { course: Course; items: PracticeItem[]; id: string };
const modeIcons: Record<Mode, LucideIcon> = {
  kana: Keyboard,
  word: BookOpen,
  sentence: GraduationCap,
  passage: Leaf,
};
const modeDescriptions: Record<Mode, string> = {
  kana: '손끝으로 익히는 히라가나',
  word: '익숙한 단어부터 차근차근',
  sentence: '짧은 한 문장으로 한 걸음 더',
  passage: '이야기를 따라, 자연스럽게',
};

function Ruby({
  segments,
  show,
  className = '',
}: {
  segments: Segment[];
  show: boolean;
  className?: string;
}) {
  return (
    <span lang="ja" className={`japanese ${className}`}>
      {segments.map((s, i) =>
        s.reading && show ? (
          <ruby key={i}>
            {s.text}
            <rp>(</rp>
            <rt>{s.reading}</rt>
            <rp>)</rp>
          </ruby>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}

function Meaning({ item, language }: { item: PracticeItem; language: Settings['meaning'] }) {
  return (
    <div className="meaning">
      {language !== 'en' && <p lang="ko">{item.ko}</p>}
      {language !== 'ko' && (
        <p lang="en" className="english">
          {item.en}
        </p>
      )}
    </div>
  );
}

function Toggle({ on, label, onChange }: { on: boolean; label: string; onChange: () => void }) {
  return (
    <button
      type="button"
      className={`toggle ${on ? 'on' : ''}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  );
}

function Brand() {
  return (
    <a
      className="brand"
      href="#"
      aria-label="카나리 연습 홈"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event('kanari-home'));
      }}
    >
      <span className="brand-mark" lang="ja">
        か
      </span>
      <span lang="ja">
        かなり<span className="brand-tag">플릭 연습</span>
      </span>
    </a>
  );
}

export default function App() {
  const [data, setData] = useState<SavedData>(loadData);
  const [saveFailed, setSaveFailed] = useState(false);
  const [page, setPage] = useState<Page>('practice');
  const [course, setCourse] = useState<Course>(defaultCourse);
  const [run, setRun] = useState<Run | null>(null);
  const [result, setResult] = useState<PracticeRecord | null>(null);
  const [help, setHelp] = useState(false);
  useViewport(!!run);

  useEffect(() => {
    setSaveFailed(!saveData(data));
  }, [data]);
  useEffect(() => {
    const home = () => {
      setPage('practice');
      setResult(null);
      window.scrollTo(0, 0);
    };
    window.addEventListener('kanari-home', home);
    return () => window.removeEventListener('kanari-home', home);
  }, []);

  const setSettings = (settings: Settings) => setData((d) => ({ ...d, settings }));
  const start = () => {
    const items = buildSession(course, data.settings.count);
    if (!items.length) return;
    flushSync(() => {
      setResult(null);
      setRun({
        course: { ...course },
        items,
        id:
          globalThis.crypto?.randomUUID?.() ??
          `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      });
    });
  };
  const finish = (record: PracticeRecord) => {
    setData((d) => ({ ...d, history: [record, ...d.history].slice(0, 500) }));
    setRun(null);
    setResult(record);
  };
  const today = data.history
    .filter((r) => r.date === localDate())
    .reduce((sum, r) => sum + r.correct, 0);
  const days = streak(data.history);

  if (run)
    return (
      <Practice
        key={run.id}
        run={run}
        settings={data.settings}
        onSettings={setSettings}
        onFinish={finish}
        onExit={() => setRun(null)}
      />
    );

  return (
    <div className="app-shell">
      <header className="app-header">
        <Brand />
        <button
          className="icon-button help-button"
          aria-label="플릭 키보드 사용 안내"
          onClick={() => setHelp(true)}
        >
          <CircleHelp size={21} />
        </button>
      </header>
      {saveFailed && (
        <p className="save-warning" role="alert">
          기기에 기록을 저장할 수 없어요. 브라우저의 저장 공간 설정을 확인해 주세요.
        </p>
      )}
      {result ? (
        <Results record={result} onAgain={start} onHome={() => setResult(null)} />
      ) : (
        <>
          {page === 'practice' && (
            <main className="home-content">
              <section className="welcome">
                <div className="welcome-top">
                  <p>하루 한 번, 가볍게</p>
                  <span className="streak-badge">
                    <Flame size={14} /> {days}일째
                  </span>
                </div>
                <h1>
                  일본어가
                  <br />
                  손끝에 익도록<span className="heading-dot">.</span>
                </h1>
                <p className="welcome-description">
                  서두르지 않아도 괜찮아요. 한 글자부터 시작해요.
                </p>
                <div className="kana-art" aria-hidden="true">
                  <span>あ</span>
                  <span>い</span>
                  <span>う</span>
                  <Sparkles className="art-spark" size={20} />
                  <span className="art-dot" />
                </div>
              </section>
              <section className="daily-goal" aria-label="오늘의 연습 목표">
                <div className="goal-icon">
                  <Target size={20} />
                </div>
                <div className="goal-copy">
                  <div>
                    <strong>오늘의 작은 목표</strong>
                    <span>
                      <b>{today}</b> / {data.settings.dailyGoal}문제
                    </span>
                  </div>
                  <div className="goal-track">
                    <span
                      style={{
                        width: `${Math.min(100, (today / data.settings.dailyGoal) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </section>
              <section className="course-section">
                <div className="section-heading">
                  <h2>어떤 연습을 해볼까요?</h2>
                  <span>{contentCount.toLocaleString()}개의 단어와 글</span>
                </div>
                <div className="mode-tabs" role="tablist" aria-label="연습 종류">
                  {(Object.keys(modeNames) as Mode[]).map((mode) => {
                    const Icon = modeIcons[mode];
                    return (
                      <button
                        key={mode}
                        role="tab"
                        id={`tab-${mode}`}
                        aria-controls="course-panel"
                        aria-selected={course.mode === mode}
                        className={course.mode === mode ? 'active' : ''}
                        onClick={() => setCourse((c) => ({ ...c, mode }))}
                      >
                        <Icon size={21} strokeWidth={1.8} />
                        <span>{modeNames[mode]}</span>
                      </button>
                    );
                  })}
                </div>
                <div
                  id="course-panel"
                  role="tabpanel"
                  aria-labelledby={`tab-${course.mode}`}
                  className="course-panel"
                >
                  <div className="course-intro">
                    <div>
                      <h3>{modeNames[course.mode]} 연습</h3>
                      <p>{modeDescriptions[course.mode]}</p>
                    </div>
                    <span className={`mode-illustration ${course.mode}`} lang="ja">
                      {course.mode === 'kana'
                        ? 'あ'
                        : course.mode === 'word'
                          ? '言'
                          : course.mode === 'sentence'
                            ? '文'
                            : '読'}
                    </span>
                  </div>
                  {course.mode === 'kana' && (
                    <KanaPicker
                      selected={course.kanaRow}
                      onSelect={(kanaRow) => setCourse((c) => ({ ...c, kanaRow }))}
                    />
                  )}
                  {course.mode === 'word' && (
                    <>
                      <div className="category-chips" aria-label="단어 주제">
                        {['all', ...wordCategories].map((category) => (
                          <button
                            key={category}
                            className={course.wordCategory === category ? 'selected' : ''}
                            aria-pressed={course.wordCategory === category}
                            onClick={() => setCourse((c) => ({ ...c, wordCategory: category }))}
                          >
                            {category === 'all' ? '전체 랜덤' : category}
                          </button>
                        ))}
                      </div>
                      <div className="content-preview">
                        <span className="preview-label">이런 단어를 연습해요</span>
                        <div>
                          {poolFor(course)
                            .slice(0, 3)
                            .map((item) => (
                              <span key={item.id}>
                                <Ruby segments={item.segments} show={data.settings.furigana} />
                                <small>{data.settings.meaning === 'en' ? item.en : item.ko}</small>
                              </span>
                            ))}
                        </div>
                      </div>
                      <p className="pool-count">
                        {poolFor(course).length}개 단어 중 무작위로 출제해요.
                      </p>
                    </>
                  )}
                  {course.mode === 'sentence' && (
                    <div className="length-options">
                      {(
                        [
                          ['short', '짧은 문장', '가볍게 시작하는 일상 표현', 'ひとこと'],
                          ['middle', '보통 문장', '한 호흡으로 이어 쓰는 일본어', 'ひといき'],
                          ['long', '긴 문장', '조금 더 풍부한 생각과 표현', 'じっくり'],
                        ] as const
                      ).map(([length, label, description, ja]) => (
                        <button
                          key={length}
                          className={`length-option ${course.sentenceLength === length ? 'selected' : ''}`}
                          aria-pressed={course.sentenceLength === length}
                          onClick={() =>
                            setCourse((c) => ({ ...c, sentenceLength: length as SentenceLength }))
                          }
                        >
                          <span className="length-symbol" lang="ja">
                            {ja}
                          </span>
                          <span>
                            <strong>
                              {label} <small>{length}</small>
                            </strong>
                            <span>{description}</span>
                          </span>
                          <span className="radio-indicator">
                            {course.sentenceLength === length && <span />}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {course.mode === 'passage' && (
                    <>
                      <p className="passage-note">하나의 이야기를 문장 단위로 이어서 입력해요.</p>
                      <div className="passage-options">
                        {passages.map((item, i) => (
                          <button
                            key={item.id}
                            className={course.passageId === item.id ? 'selected' : ''}
                            aria-pressed={course.passageId === item.id}
                            onClick={() => setCourse((c) => ({ ...c, passageId: item.id }))}
                          >
                            <span className="passage-number">{String(i + 1).padStart(2, '0')}</span>
                            <span>
                              <strong>{item.title}</strong>
                              <small>4문장 · {normalize(readingOf(item.segments)).length}자</small>
                            </span>
                            {course.passageId === item.id ? (
                              <Check size={17} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </section>
              <div className="practice-preferences">
                <span>
                  <span className="ruby-icon" lang="ja">
                    あ<small>字</small>
                  </span>
                  후리가나
                </span>
                <Toggle
                  on={data.settings.furigana}
                  label="후리가나 표시"
                  onChange={() =>
                    setSettings({ ...data.settings, furigana: !data.settings.furigana })
                  }
                />
              </div>
              <div className="home-start">
                <button className="primary-button start-button" onClick={start}>
                  <span>
                    연습 시작하기{' '}
                    <span className="button-detail">
                      {course.mode === 'passage' ? '한 편의 이야기' : `${data.settings.count}문제`}
                    </span>
                  </span>
                  <ArrowRight size={20} />
                </button>
                <p>
                  <Keyboard size={13} /> 휴대폰의 일본어 플릭 키보드를 준비해 주세요.
                </p>
              </div>
              <footer className="home-footer">
                <Flower2 size={15} />
                <span>조금씩, 꾸준히. かなり</span>
              </footer>
            </main>
          )}
          {page === 'history' && (
            <History
              history={data.history}
              goal={data.settings.dailyGoal}
              onStart={() => setPage('practice')}
            />
          )}
          {page === 'settings' && (
            <SettingsPage
              settings={data.settings}
              onChange={setSettings}
              onHelp={() => setHelp(true)}
              onClear={() => setData((d) => ({ ...d, history: [] }))}
            />
          )}
        </>
      )}
      <nav className="bottom-nav" aria-label="주 메뉴">
        {(
          [
            { id: 'practice', label: '연습', icon: Keyboard },
            { id: 'history', label: '기록', icon: ChartNoAxesColumnIncreasing },
            { id: 'settings', label: '설정', icon: Settings2 },
          ] as const
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={page === id && !result ? 'active' : ''}
            aria-current={page === id && !result ? 'page' : undefined}
            onClick={() => {
              setResult(null);
              setPage(id);
              window.scrollTo(0, 0);
            }}
          >
            <Icon size={22} strokeWidth={page === id ? 2.2 : 1.7} />
            <span>{label}</span>
            {page === id && !result && <i />}
          </button>
        ))}
      </nav>
      {help && <Help onClose={() => setHelp(false)} />}
    </div>
  );
}

function KanaPicker({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? kanaRows : kanaRows.slice(0, 10);
  return (
    <>
      <button
        className={`random-option ${selected === 'all' ? 'selected' : ''}`}
        aria-pressed={selected === 'all'}
        onClick={() => onSelect('all')}
      >
        <span className="random-icon">
          <Sparkles size={18} />
        </span>
        <span>
          <strong>전체 히라가나 랜덤</strong>
          <small>기본 · 탁음 · 반탁음 · 작은 글자</small>
        </span>
        <span className="radio-indicator">{selected === 'all' && <span />}</span>
      </button>
      <div className="kana-grid" aria-label="히라가나 행 선택">
        {rows.map((row) => (
          <button
            key={row.id}
            className={`kana-choice ${selected === row.id ? 'selected' : ''}`}
            aria-pressed={selected === row.id}
            onClick={() => onSelect(row.id)}
          >
            <span lang="ja">{row.chars[0]}</span>
            <span>
              <strong>{row.name}</strong>
              <small lang="ja">{row.chars}</small>
            </span>
            {selected === row.id && <Check size={14} />}
          </button>
        ))}
      </div>
      <button
        className="expand-button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? '기본 글자만 보기' : '탁음 · 반탁음 · 작은 글자 더 보기'}
        <ChevronDown size={14} className={expanded ? 'rotated' : ''} />
      </button>
    </>
  );
}

function Practice({
  run,
  settings,
  onSettings,
  onFinish,
  onExit,
}: {
  run: Run;
  settings: Settings;
  onSettings: (s: Settings) => void;
  onFinish: (r: PracticeRecord) => void;
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'wrong' | 'correct' | 'skipped'>('idle');
  const [stats, setStats] = useState({ correct: 0, skipped: 0, attempts: 0, characters: 0 });
  const [exitDialog, setExitDialog] = useState(false);
  const [fullText, setFullText] = useState(false);
  const input = useRef<HTMLTextAreaElement>(null);
  const promptArea = useRef<HTMLElement>(null);
  const composing = useRef(false);
  const lastComposition = useRef(0);
  const started = useRef<number | null>(null);
  const completed = useRef(false);
  const item = run.items[index];
  const settled = feedback === 'correct' || feedback === 'skipped';
  const isPassage = run.course.mode === 'passage';
  const progress = ((index + (settled ? 1 : 0)) / run.items.length) * 100;

  useLayoutEffect(() => {
    input.current?.focus({ preventScroll: true });
  }, []);
  useLayoutEffect(() => {
    if (promptArea.current) promptArea.current.scrollTop = 0;
  }, [index]);

  const beginTimer = () => {
    if (started.current === null) started.current = performance.now();
  };
  const check = () => {
    if (
      composing.current ||
      performance.now() - lastComposition.current < 80 ||
      !normalize(value) ||
      settled
    )
      return;
    beginTimer();
    if (isCorrect(value, item.segments)) {
      setStats((s) => ({
        ...s,
        attempts: s.attempts + 1,
        correct: s.correct + 1,
        characters: s.characters + normalize(readingOf(item.segments)).length,
      }));
      setFeedback('correct');
    } else {
      setStats((s) => ({ ...s, attempts: s.attempts + 1 }));
      setFeedback('wrong');
    }
  };
  const next = () => {
    if (!settled || completed.current) return;
    if (index === run.items.length - 1) {
      completed.current = true;
      const seconds =
        started.current === null
          ? 0
          : Math.max(1, Math.round((performance.now() - started.current) / 1000));
      onFinish({
        id: run.id,
        date: localDate(),
        mode: run.course.mode,
        total: run.items.length,
        ...stats,
        seconds,
        title: isPassage ? (item.title ?? '장문 연습') : `${modeNames[run.course.mode]} 연습`,
      });
    } else {
      setIndex((i) => i + 1);
      setValue('');
      setFeedback('idle');
      setFullText(false);
      if (input.current) {
        input.current.value = '';
        input.current.focus({ preventScroll: true });
      }
    }
  };
  const skip = () => {
    if (settled || composing.current) return;
    beginTimer();
    setStats((s) => ({ ...s, skipped: s.skipped + 1 }));
    setFeedback('skipped');
  };

  return (
    <div className={`practice-screen mode-${run.course.mode}`}>
      <header className="practice-header">
        <button
          className="icon-button"
          aria-label="연습 나가기"
          onClick={() => setExitDialog(true)}
        >
          <X size={22} />
        </button>
        <span>{modeNames[run.course.mode]} 연습</span>
        <span className="practice-counter">
          <b>{index + 1}</b> / {run.items.length}
        </span>
      </header>
      <div
        className="session-progress"
        role="progressbar"
        aria-label="연습 진행률"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <main className="practice-scroll" ref={promptArea}>
        <div className="practice-meta">
          <span>
            {isPassage
              ? item.title
              : run.course.mode === 'kana'
                ? kanaRows.find((r) => r.id === item.category)?.name
                : item.category}
          </span>
          <button
            className={settings.furigana ? 'furigana-button enabled' : 'furigana-button'}
            aria-pressed={settings.furigana}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => onSettings({ ...settings, furigana: !settings.furigana })}
          >
            <span lang="ja">あ</span> 후리가나 {settings.furigana ? '켜짐' : '꺼짐'}
          </button>
        </div>
        <div className={`target-area ${settings.furigana ? 'with-ruby' : ''}`}>
          <Ruby segments={item.segments} show={settings.furigana} className="practice-target" />
          {run.course.mode !== 'kana' && !isPassage && (
            <Meaning item={item} language={settings.meaning} />
          )}
          {run.course.mode === 'kana' && (
            <p className="kana-prompt">같은 히라가나를 입력해 보세요.</p>
          )}
        </div>
        {isPassage && (
          <details
            className="passage-context"
            open={fullText}
            onToggle={(e) => setFullText(e.currentTarget.open)}
          >
            <summary>
              전체 글과 뜻 보기 <ChevronDown size={14} />
            </summary>
            <div>
              <Ruby
                segments={passages.find((p) => p.id === run.course.passageId)!.segments}
                show={settings.furigana}
              />
              <Meaning item={item} language={settings.meaning} />
            </div>
          </details>
        )}
      </main>
      <div className="input-dock">
        <div className={`feedback-line ${feedback}`} aria-live="polite">
          {feedback === 'correct' ? (
            <>
              <Check size={17} />
              <strong>정확해요! 잘하고 있어요.</strong>
            </>
          ) : feedback === 'wrong' ? (
            <>
              <RotateCcw size={15} />
              <span>조금 달라요. 다시 확인해 보세요.</span>
            </>
          ) : feedback === 'skipped' ? (
            <>
              <span>읽기</span>
              <span lang="ja">{readingOf(item.segments)}</span>
            </>
          ) : (
            <>
              <span className="input-label">
                {isPassage ? '이 문장을 입력해 주세요' : '일본어로 입력해 주세요'}
              </span>
              <span className="input-character-count">{[...normalize(value)].length}자</span>
            </>
          )}
        </div>
        <label
          className={`input-wrap ${feedback === 'wrong' ? 'has-error' : ''} ${feedback === 'correct' ? 'has-success' : ''}`}
        >
          <span className="sr-only">연습 답안</span>
          <textarea
            ref={input}
            lang="ja"
            value={value}
            rows={run.course.mode === 'kana' || run.course.mode === 'word' ? 1 : 2}
            placeholder={run.course.mode === 'kana' ? '여기에 입력해요' : 'タップして入力'}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            autoComplete="off"
            enterKeyHint="done"
            aria-invalid={feedback === 'wrong'}
            onChange={(e) => {
              if (!settled) {
                beginTimer();
                setValue(e.target.value);
                if (feedback === 'wrong') setFeedback('idle');
              }
            }}
            onCompositionStart={() => {
              composing.current = true;
              beginTimer();
            }}
            onCompositionEnd={(e) => {
              composing.current = false;
              lastComposition.current = performance.now();
              if (!settled) setValue(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.nativeEvent.isComposing &&
                !composing.current &&
                e.nativeEvent.keyCode !== 229 &&
                performance.now() - lastComposition.current > 80
              ) {
                e.preventDefault();
                if (settled) next();
                else check();
              }
            }}
          />
          {feedback === 'correct' && <Check size={21} className="input-check" />}
        </label>
        <div className="input-actions">
          <button
            className="skip-button"
            onPointerDown={(e) => e.preventDefault()}
            disabled={settled}
            onClick={skip}
          >
            건너뛰기
          </button>
          <button
            className="primary-button check-button"
            onPointerDown={(e) => e.preventDefault()}
            disabled={!settled && !normalize(value)}
            onClick={settled ? next : check}
          >
            {settled ? (index === run.items.length - 1 ? '결과 보기' : '다음 문제') : '확인'}
            {settled ? <ArrowRight size={18} /> : <Check size={18} />}
          </button>
        </div>
        <p className="input-hint">
          {run.course.mode === 'kana'
            ? '휴대폰의 일본어 12키 키보드로 연습해요.'
            : '한자·히라가나 모두 정답이에요. 문장부호는 생략해도 돼요.'}
        </p>
      </div>
      {exitDialog && (
        <Modal
          title="잠시 쉬어갈까요?"
          onClose={() => {
            setExitDialog(false);
            input.current?.focus();
          }}
        >
          <p>
            진행 중인 연습은 기록에 저장되지 않아요.
            <br />
            마지막 문제까지 마치면 기록이 남아요.
          </p>
          <div className="dialog-actions">
            <button className="secondary-button" onClick={onExit}>
              나가기
            </button>
            <button
              className="primary-button"
              onClick={() => {
                setExitDialog(false);
                input.current?.focus();
              }}
            >
              계속 연습
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Results({
  record,
  onAgain,
  onHome,
}: {
  record: PracticeRecord;
  onAgain: () => void;
  onHome: () => void;
}) {
  const accuracy =
    record.attempts + record.skipped
      ? Math.round((record.correct / (record.attempts + record.skipped)) * 100)
      : 0;
  const cpm = record.seconds ? Math.round((record.characters / record.seconds) * 60) : 0;
  return (
    <main className="results-page">
      <div className="result-flower">
        <Flower2 size={64} strokeWidth={1.3} />
        <span>
          <Check size={19} />
        </span>
      </div>
      <p className="result-caption">오늘도 한 걸음 더</p>
      <h1>연습을 마쳤어요!</h1>
      <p className="result-subtitle">
        {record.correct === record.total
          ? '모든 문제를 완성했네요. 수고했어요.'
          : '조금씩 익숙해지고 있어요. 수고했어요.'}
      </p>
      <div className="result-score">
        <span>완성한 문제</span>
        <strong>
          {record.correct}
          <small> / {record.total}</small>
        </strong>
        <span>
          {record.skipped > 0 ? `${record.skipped}문제 건너뜀` : '차곡차곡 쌓이는 나의 일본어'}
        </span>
      </div>
      <div className="result-metrics">
        <div>
          <Target size={20} />
          <strong>
            {accuracy}
            <small>%</small>
          </strong>
          <span>정확도</span>
        </div>
        <div>
          <Keyboard size={20} />
          <strong>
            {cpm}
            <small>자/분</small>
          </strong>
          <span>입력 속도</span>
        </div>
        <div>
          <Trophy size={20} />
          <strong>{formatDuration(record.seconds)}</strong>
          <span>연습 시간</span>
        </div>
      </div>
      <p className="metrics-note">
        정확도는 정답 수 ÷ (확인 횟수 + 건너뛴 수),
        <br />
        속도는 정답의 읽기 글자 수와 연습 시간으로 계산해요.
      </p>
      <button className="primary-button" onClick={onAgain}>
        한 번 더 연습하기 <RotateCcw size={18} />
      </button>
      <button className="text-button" onClick={onHome}>
        다른 연습 고르기
      </button>
    </main>
  );
}

function History({
  history,
  goal,
  onStart,
}: {
  history: PracticeRecord[];
  goal: number;
  onStart: () => void;
}) {
  const correct = history.reduce((s, r) => s + r.correct, 0);
  const seconds = history.reduce((s, r) => s + r.seconds, 0);
  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    return {
      date: localDate(date),
      name: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
      count: history.filter((r) => r.date === localDate(date)).reduce((s, r) => s + r.correct, 0),
    };
  });
  return (
    <main className="secondary-page">
      <div className="page-heading">
        <span className="page-symbol">
          <ChartNoAxesColumnIncreasing size={25} />
        </span>
        <h1>쌓여가는 작은 기록</h1>
        <p>어제보다 조금 더 익숙한 손끝.</p>
      </div>
      <div className="history-summary">
        <div>
          <strong>
            {streak(history)}
            <small>일</small>
          </strong>
          <span>연속 연습</span>
        </div>
        <div>
          <strong>
            {correct}
            <small>문제</small>
          </strong>
          <span>완성한 문제</span>
        </div>
        <div>
          <strong>
            {Math.floor(seconds / 60)}
            <small>분</small>
          </strong>
          <span>함께한 시간</span>
        </div>
      </div>
      <section className="week-section">
        <div className="section-heading">
          <h2>최근 일주일</h2>
          <span>하루 목표 {goal}문제</span>
        </div>
        <div className="week-chart">
          {week.map((day, i) => (
            <div key={day.date} className={i === 6 ? 'today' : ''}>
              <span className="day-count">{day.count || '·'}</span>
              <div className="day-bar">
                <span style={{ height: `${Math.min(100, (day.count / goal) * 100)}%` }} />
              </div>
              <span>{i === 6 ? '오늘' : day.name}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="history-list">
        <div className="section-heading">
          <h2>연습 기록</h2>
          <span>{history.length}회 완료</span>
        </div>
        {!history.length ? (
          <div className="empty-history">
            <Leaf size={36} strokeWidth={1.4} />
            <h3>첫 기록을 기다리고 있어요</h3>
            <p>연습을 끝내면 여기에 기록이 남아요.</p>
            <button className="primary-button" onClick={onStart}>
              첫 연습 시작하기 <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          history.map((record) => {
            const Icon = modeIcons[record.mode];
            return (
              <div className="history-entry" key={record.id}>
                <span className="history-icon">
                  <Icon size={20} />
                </span>
                <div>
                  <strong>{record.title}</strong>
                  <span>
                    {record.date.replaceAll('-', '.')} · {formatDuration(record.seconds)}
                  </span>
                </div>
                <span className="history-completed">
                  {record.correct}
                  <small> / {record.total}문제</small>
                </span>
              </div>
            );
          })
        )}
      </section>
      <p className="storage-note">기록은 이 브라우저에 최근 500회까지 저장돼요.</p>
    </main>
  );
}

function SettingsPage({
  settings,
  onChange,
  onHelp,
  onClear,
}: {
  settings: Settings;
  onChange: (s: Settings) => void;
  onHelp: () => void;
  onClear: () => void;
}) {
  const [clearDialog, setClearDialog] = useState(false);
  const [sources, setSources] = useState(false);
  return (
    <main className="secondary-page settings-page">
      <div className="page-heading">
        <span className="page-symbol">
          <Settings2 size={25} />
        </span>
        <h1>나에게 맞는 연습</h1>
        <p>편한 방식으로, 나만의 속도로.</p>
      </div>
      <section className="settings-group">
        <h2>글자와 뜻</h2>
        <div className="setting-row">
          <div>
            <strong>후리가나 표시</strong>
            <p>한자 위에 히라가나 읽기를 보여줘요.</p>
          </div>
          <Toggle
            label="후리가나 표시"
            on={settings.furigana}
            onChange={() => onChange({ ...settings, furigana: !settings.furigana })}
          />
        </div>
        <div className="setting-block">
          <strong>뜻 표시 언어</strong>
          <div className="segmented-control">
            {(
              [
                ['ko', '한국어'],
                ['en', 'English'],
                ['both', '둘 다'],
              ] as const
            ).map(([value, name]) => (
              <button
                key={value}
                aria-pressed={settings.meaning === value}
                className={settings.meaning === value ? 'selected' : ''}
                onClick={() => onChange({ ...settings, meaning: value })}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="settings-group">
        <h2>연습 페이스</h2>
        <div className="setting-block">
          <strong>한 번에 연습할 문제 수</strong>
          <p>장문은 선택한 글 한 편을 끝까지 연습해요.</p>
          <div className="segmented-control">
            {([5, 10, 20] as const).map((count) => (
              <button
                key={count}
                aria-pressed={settings.count === count}
                className={settings.count === count ? 'selected' : ''}
                onClick={() => onChange({ ...settings, count })}
              >
                {count}문제
              </button>
            ))}
          </div>
        </div>
        <div className="setting-block">
          <strong>오늘의 목표</strong>
          <div className="segmented-control">
            {([10, 20, 30] as const).map((dailyGoal) => (
              <button
                key={dailyGoal}
                aria-pressed={settings.dailyGoal === dailyGoal}
                className={settings.dailyGoal === dailyGoal ? 'selected' : ''}
                onClick={() => onChange({ ...settings, dailyGoal })}
              >
                {dailyGoal}문제
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="settings-group link-settings">
        <button onClick={onHelp}>
          <Keyboard size={19} />
          <span>일본어 플릭 키보드 준비하기</span>
          <ChevronRight size={17} />
        </button>
        <button onClick={() => setSources(true)}>
          <BookOpen size={19} />
          <span>학습 자료와 출처</span>
          <ChevronRight size={17} />
        </button>
        <button onClick={() => setClearDialog(true)}>
          <RotateCcw size={19} />
          <span>연습 기록 초기화</span>
          <ChevronRight size={17} />
        </button>
      </section>
      <p className="storage-note">
        설정과 기록은 이 기기의 브라우저에 저장돼요.
        <br />
        브라우저 데이터를 지우면 함께 삭제돼요.
      </p>
      <footer className="settings-footer">
        <span lang="ja">かなり</span>
        <small>매일 조금씩, 손끝에 일본어.</small>
        <small>v1.0.0</small>
      </footer>
      {clearDialog && (
        <Modal title="기록을 초기화할까요?" onClose={() => setClearDialog(false)}>
          <p>
            이 브라우저에 저장된 모든 연습 기록을 지워요. 지운 기록은 되돌릴 수 없어요. 연습 설정은
            유지돼요.
          </p>
          <div className="dialog-actions">
            <button className="secondary-button" onClick={() => setClearDialog(false)}>
              취소
            </button>
            <button
              className="primary-button"
              onClick={() => {
                onClear();
                setClearDialog(false);
              }}
            >
              기록 지우기
            </button>
          </div>
        </Modal>
      )}
      {sources && (
        <Modal title="학습 자료와 출처" onClose={() => setSources(false)}>
          <div className="source-counts">
            <span>
              단어 <b>{words.length}</b>
            </span>
            <span>
              문장 <b>{sentences.length}</b>
            </span>
            <span>
              장문 <b>{passages.length}</b>
            </span>
          </div>
          <p>
            이 앱의 단어 목록, 예문, 장문과 한국어·영어 뜻은 프로젝트를 위해 직접 작성했어요. 외부의
            문학 작품, 기사, 가사, 사전 데이터베이스를 복제하지 않았어요.
          </p>
          <p>
            학습 자료는 CC0 1.0으로 제공해요. 코드와 자료에 관한 자세한 내용은 저장소의
            CONTENT_SOURCES.md에서 확인할 수 있어요.
          </p>
          <a
            className="external-link"
            href="https://github.com/5tarlight/japanese-flick-keyboard"
            target="_blank"
            rel="noreferrer"
          >
            GitHub 저장소 <ArrowUpRight size={15} />
          </a>
        </Modal>
      )}
    </main>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const controls = ref.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex="0"]',
        );
        if (!controls?.length) return;
        const first = controls[0],
          last = controls[controls.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first || document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last || document.activeElement === ref.current)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = priorOverflow;
      document.removeEventListener('keydown', keydown);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
      >
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" aria-label="닫기" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Help({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="손끝으로 시작하는 일본어" onClose={onClose}>
      <div className="help-keyboard" aria-hidden="true">
        <span>い</span>
        <span>う</span>
        <span>え</span>
        <span>あ</span>
        <span>お</span>
        <ArrowLeft size={17} />
        <ArrowRight size={17} />
      </div>
      <p>
        휴대폰에 <strong>일본어 12키(가나) 키보드</strong>를 추가해 주세요. 글자 키를 누른 채
        위·아래·왼쪽·오른쪽으로 밀어 입력하는 방식이에요.
      </p>
      <ol className="help-steps">
        <li>
          <b>iPhone</b>
          <span>설정 → 일반 → 키보드 → 키보드 → 새로운 키보드 추가 → 일본어 → Kana</span>
        </li>
        <li>
          <b>Android</b>
          <span>
            사용 중인 키보드의 언어 설정에서 일본어를 추가한 뒤 12키 레이아웃을 선택해요. 메뉴
            이름은 기기마다 다를 수 있어요.
          </span>
        </li>
        <li>
          <b>연습할 때</b>
          <span>
            입력창을 누르고 지구본이나 언어 전환 키로 일본어 키보드를 선택해요. 입력을 확정한 다음
            ‘확인’을 눌러 주세요.
          </span>
        </li>
      </ol>
      <p className="help-note">
        <Volume2 size={16} /> は·へ·を 같은 조사도 표시된 글자 그대로 입력해요.
      </p>
      <button className="primary-button" onClick={onClose}>
        준비됐어요 <Check size={18} />
      </button>
    </Modal>
  );
}
