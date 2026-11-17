import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Award, Trophy, Sparkles, CheckCircle2, Flame, Play, Clock, XCircle, ArrowRight } from 'lucide-react';

const QUESTION_TIME = 15;

const KAHOOT_TILES = [
  { key: 'red', bg: '#e11d48', shadow: '#9f1239', shape: 'triangle' },
  { key: 'blue', bg: '#0284c7', shadow: '#075985', shape: 'diamond' },
  { key: 'amber', bg: '#d97706', shadow: '#92400e', shape: 'circle' },
  { key: 'green', bg: '#16a34a', shadow: '#14532d', shape: 'square' },
];

function TileShape({ shape }) {
  return (
    <svg viewBox="0 0 24 24" className="kahoot-shape" aria-hidden="true">
      {shape === 'triangle' && <polygon points="12,3 22,20 2,20" fill="#ffffff" />}
      {shape === 'diamond' && <polygon points="12,2 22,12 12,22 2,12" fill="#ffffff" />}
      {shape === 'circle' && <circle cx="12" cy="12" r="9" fill="#ffffff" />}
      {shape === 'square' && <rect x="4" y="4" width="16" height="16" rx="2" fill="#ffffff" />}
    </svg>
  );
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const CONFETTI_SPECS = [
  { x: -72, y: -48, rot: -35, c: '#facc15' },
  { x: 76, y: -44, rot: 40, c: '#22c55e' },
  { x: -88, y: 12, rot: -65, c: '#0ea5e9' },
  { x: 88, y: 16, rot: 55, c: '#f97316' },
  { x: -54, y: -74, rot: 25, c: '#f97316' },
  { x: 56, y: -72, rot: -25, c: '#facc15' },
  { x: -48, y: 58, rot: 45, c: '#4ade80' },
  { x: 52, y: 56, rot: -45, c: '#38bdf8' },
  { x: 0, y: -84, rot: 18, c: '#facc15' },
  { x: -96, y: -18, rot: -20, c: '#fb923c' },
  { x: 96, y: -16, rot: 22, c: '#22c55e' },
  { x: 0, y: 72, rot: 0, c: '#facc15' },
];

export default function PlasticQuiz({ quiz, lang }) {
  const [started, setStarted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [kahootPts, setKahootPts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [pickedIdx, setPickedIdx] = useState(null);
  const [lastGain, setLastGain] = useState(null);
  const advanceTimerRef = useRef(null);
  const [chapterScores, setChapterScores] = useState({
    climate: { got: 0, max: 0 },
    ocean: { got: 0, max: 0 },
    forest: { got: 0, max: 0 },
  });

  // Acak urutan pilihan jawaban setiap kali kuis dimulai/diulang
  const shuffledQuestions = useMemo(
    () =>
      quiz.questions.map((q) => ({
        ...q,
        a: shuffleArray(q.a),
      })),
    [quiz.questions, attempt]
  );

  const total = shuffledQuestions.length;
  const maxScore = total * 2;
  const done = step >= total;
  const scorePct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const isPerfect = done && score === maxScore;

  const level =
    quiz.levels.find((l) => scorePct >= l.minPct) ||
    quiz.levels[quiz.levels.length - 1];
  const q = shuffledQuestions[step];

  const goNextQuestion = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    setPickedIdx(null);
    setLastGain(null);
    setTimeLeft(QUESTION_TIME);
    setStep((s) => s + 1);
  };

  // Bersihkan timer saat unmount
  useEffect(() => () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
  }, []);

  // Countdown timer per soal saat mode main aktif
  useEffect(() => {
    if (!started || done || pickedIdx !== null) return undefined;
    if (timeLeft <= 0) {
      const ch = q?.ch || 'ocean';
      setPickedIdx(-1);
      setStreak(0);
      setLastGain({ pts: 0, p: 0, timeout: true });
      setChapterScores((prev) => ({
        ...prev,
        [ch]: { got: prev[ch]?.got || 0, max: (prev[ch]?.max || 0) + 2 },
      }));
      advanceTimerRef.current = setTimeout(goNextQuestion, 1150);
      return undefined;
    }

    const tick = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(tick);
  }, [started, done, pickedIdx, timeLeft, q]);

  const pct = !started ? 0 : done ? scorePct : Math.round((step / total) * 100);
  const radius = 44;
  const circ = 2 * Math.PI * radius;

  const handleSelect = (opt, idx) => {
    if (pickedIdx !== null) return;
    setPickedIdx(idx);
    const ch = q.ch || 'ocean';

    const speedBonus = Math.round((timeLeft / QUESTION_TIME) * 100);
    const earnedPts = opt.p === 2 ? 200 + speedBonus + streak * 30 : opt.p === 1 ? 100 : 0;
    const nextStreak = opt.p === 2 ? streak + 1 : 0;

    setScore((prev) => prev + opt.p);
    setKahootPts((prev) => prev + earnedPts);
    setStreak(nextStreak);
    setBestStreak((b) => Math.max(b, nextStreak));
    setLastGain({ pts: earnedPts, p: opt.p, timeout: false });

    setChapterScores((prev) => ({
      ...prev,
      [ch]: {
        got: (prev[ch]?.got || 0) + opt.p,
        max: (prev[ch]?.max || 0) + 2,
      },
    }));

    advanceTimerRef.current = setTimeout(goNextQuestion, 1050);
  };

  const handleReset = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    setAttempt((a) => a + 1);
    setStarted(false);
    setStep(0);
    setScore(0);
    setKahootPts(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(QUESTION_TIME);
    setPickedIdx(null);
    setLastGain(null);
    setChapterScores({
      climate: { got: 0, max: 0 },
      ocean: { got: 0, max: 0 },
      forest: { got: 0, max: 0 },
    });
  };

  const chapterLabels = {
    climate: { id: 'Iklim & Es', en: 'Climate & Ice', color: '#f97316' },
    ocean: { id: 'Lautan', en: 'Ocean', color: '#0ea5e9' },
    forest: { id: 'Hutan Hujan', en: 'Rainforest', color: '#22c55e' },
  };

  return (
    <div className={`card quiz quiz-kahoot ${isPerfect ? 'quiz-perfect' : ''}`}>
      <div className="quiz-top">
        <div>
          <span className="quiz-badge">
            {started && !done && q?.topic ? q.topic[lang] : 'Kalabumi Arena'}
          </span>
          <h3>{quiz.title[lang]}</h3>
          {quiz.subtitle && <p className="quiz-sub">{quiz.subtitle[lang]}</p>}
        </div>

        {started && !done && (
          <div className="kahoot-hud">
            <span className="kahoot-pts-pill">{kahootPts.toLocaleString()} pts</span>
            {streak > 0 && (
              <motion.span
                key={streak}
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                className="kahoot-streak-pill"
              >
                <Flame size={13} /> x{streak}
              </motion.span>
            )}
            <span className="quiz-counter">
              {step + 1} / {total}
            </span>
          </div>
        )}
      </div>

      <div className="quiz-progress">
        <i style={{ width: `${pct}%` }} />
      </div>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="kahoot-lobby"
          >
            <div className="kahoot-shapes-preview" aria-hidden="true">
              {KAHOOT_TILES.map((t) => (
                <span key={t.key} className="kahoot-mini-tile" style={{ background: t.bg }}>
                  <TileShape shape={t.shape} />
                </span>
              ))}
            </div>
            <p className="kahoot-lobby-desc">
              {lang === 'id'
                ? `${total} soal cepat lintas 3 bab (${QUESTION_TIME} detik/soal). Jawab cepat & tepat untuk kumpulkan streak dan raih trofi emas!`
                : `${total} fast questions across 3 chapters (${QUESTION_TIME}s each). Answer fast and accurately to build streaks and unlock the golden trophy!`}
            </p>
            <button type="button" className="btn kahoot-start-btn" onClick={() => setStarted(true)}>
              <Play size={16} />
              <span>{lang === 'id' ? 'Mulai Kuis Sekarang' : 'Start Quiz Now'}</span>
            </button>
          </motion.div>
        ) : !done ? (
          <motion.div
            key={`${attempt}-${step}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            {/* Timer Bar ala Kahoot */}
            <div className="kahoot-timer-row">
              <div className={`kahoot-timer-badge ${timeLeft <= 5 ? 'danger' : ''}`}>
                <Clock size={13} />
                <span>{timeLeft}s</span>
              </div>
              <div className="kahoot-timer-track">
                <motion.div
                  className={`kahoot-timer-fill ${timeLeft <= 5 ? 'danger' : ''}`}
                  animate={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'linear' }}
                />
              </div>
            </div>

            <div className="kahoot-q-box">
              <p className="quiz-q">{q.q[lang]}</p>
            </div>

            {/* Banner Feedback Instan setelah menjawab */}
            {lastGain && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`kahoot-feedback ${lastGain.p === 2 ? 'ok' : lastGain.p === 1 ? 'mid' : 'bad'}`}
              >
                {lastGain.p === 2 ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                <span>
                  {lastGain.timeout
                    ? (lang === 'id' ? 'Waktu habis! +0 pts' : 'Time is up! +0 pts')
                    : lastGain.p === 2
                    ? (lang === 'id' ? `Tepat sekali! +${lastGain.pts} pts` : `Spot on! +${lastGain.pts} pts`)
                    : lastGain.p === 1
                    ? (lang === 'id' ? `Cukup baik! +${lastGain.pts} pts` : `Not bad! +${lastGain.pts} pts`)
                    : (lang === 'id' ? 'Kurang tepat! +0 pts' : 'Not quite! +0 pts')}
                </span>
                <button type="button" className="kahoot-next-inline" onClick={goNextQuestion}>
                  <span>{lang === 'id' ? 'Lanjut' : 'Next'}</span>
                  <ArrowRight size={13} />
                </button>
              </motion.div>
            )}

            {/* Grid 2x2 Kartu Jawaban Berwarna + Bentuk Geometri ala Kahoot */}
            <div className="kahoot-grid">
              {q.a.map((a, idx) => {
                const tile = KAHOOT_TILES[idx % KAHOOT_TILES.length];
                const revealed = pickedIdx !== null;
                const isBest = a.p === 2;
                const isPicked = pickedIdx === idx;
                return (
                  <motion.button
                    key={a.t.en}
                    type="button"
                    whileTap={!revealed ? { scale: 0.97 } : undefined}
                    className={`kahoot-tile ${revealed && isBest ? 'is-correct' : ''} ${revealed && !isBest ? 'is-dim' : ''} ${isPicked ? 'is-picked' : ''}`}
                    style={{ '--tile-bg': tile.bg, '--tile-shadow': tile.shadow }}
                    onClick={() => handleSelect(a, idx)}
                    disabled={revealed}
                  >
                    <span className="kahoot-shape-box">
                      <TileShape shape={tile.shape} />
                    </span>
                    <span className="kahoot-tile-text">{a.t[lang]}</span>
                    {revealed && isBest && <CheckCircle2 size={18} className="kahoot-tile-check" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="quiz-result"
          >
            {isPerfect ? (
              <div className="quiz-achievement-stage" aria-live="polite">
                {CONFETTI_SPECS.map((cf, idx) => (
                  <motion.span
                    key={idx}
                    className="quiz-confetti"
                    style={{ background: cf.c }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: cf.x,
                      y: cf.y,
                      scale: [0.2, 1.15, 0.85],
                      rotate: cf.rot * 2,
                    }}
                    transition={{ duration: 1.4, delay: 0.15 + idx * 0.03, ease: 'easeOut' }}
                  />
                ))}

                <motion.div
                  className="quiz-trophy-medal"
                  initial={{ scale: 0.3, rotateY: -180, opacity: 0 }}
                  animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.08 }}
                >
                  <Trophy size={38} />
                  <span className="quiz-trophy-pct">100%</span>
                </motion.div>

                <motion.div
                  className="quiz-unlock-pill"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Sparkles size={13} />
                  <span>{lang === 'id' ? 'ACHIEVEMENT TERBUKA' : 'ACHIEVEMENT UNLOCKED'}</span>
                </motion.div>
              </div>
            ) : (
              <div className="quiz-gauge">
                <svg viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r={radius} className="gauge-bg" />
                  <motion.circle
                    cx="55"
                    cy="55"
                    r={radius}
                    className="gauge-fg"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ * (1 - score / maxScore) }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                  />
                </svg>
                <div className="gauge-val">
                  <strong>{scorePct}%</strong>
                  <span>{score}/{maxScore}</span>
                </div>
              </div>
            )}

            <div className="quiz-result-body">
              <div className="kahoot-podium-stats">
                <span className="kahoot-pts-pill">{kahootPts.toLocaleString()} pts</span>
                <span className="kahoot-streak-pill">
                  <Flame size={13} /> {lang === 'id' ? 'Streak terbaik:' : 'Best streak:'} x{bestStreak}
                </span>
              </div>
              <div className="quiz-result-label">
                <Award size={16} />
                <span>{level.badge ? level.badge[lang] : quiz.result[lang]}</span>
              </div>
              <p>{level.t[lang]}</p>

              <div className="quiz-breakdown">
                {(['climate', 'ocean', 'forest']).map((ch) => {
                  const info = chapterLabels[ch];
                  const st = chapterScores[ch];
                  const chPct = st.max > 0 ? Math.round((st.got / st.max) * 100) : 0;
                  return (
                    <div key={ch} className="quiz-ch-pill" style={{ '--ch-col': info.color }}>
                      <span>{info[lang]}</span>
                      <strong>
                        {chPct === 100 && <CheckCircle2 size={12} />}
                        {chPct}%
                      </strong>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="btn btn-outline"
                onClick={handleReset}
              >
                <RotateCcw size={15} /> {quiz.restart[lang]}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
