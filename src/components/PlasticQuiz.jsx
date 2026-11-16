import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Award } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function PlasticQuiz({ quiz, lang }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const total = quiz.questions.length;
  const maxScore = total * 2;
  const done = step >= total;
  const level = quiz.levels.find((l) => score <= l.max) || quiz.levels[quiz.levels.length - 1];
  const q = quiz.questions[step];

  const pct = done ? Math.round((score / maxScore) * 100) : Math.round((step / total) * 100);
  const radius = 44;
  const circ = 2 * Math.PI * radius;

  return (
    <div className="card quiz">
      <div className="quiz-top">
        <div>
          <span className="quiz-badge">
            {!done && q?.topic ? q.topic[lang] : 'Kalabumi Check'}
          </span>
          <h3>{quiz.title[lang]}</h3>
          {quiz.subtitle && <p className="quiz-sub">{quiz.subtitle[lang]}</p>}
        </div>
        {!done && (
          <span className="quiz-counter">
            {step + 1} / {total}
          </span>
        )}
      </div>

      <div className="quiz-progress">
        <i style={{ width: `${pct}%` }} />
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <p className="quiz-q">{q.q[lang]}</p>
            <div className="quiz-opts">
              {q.a.map((a, idx) => (
                <button
                  key={a.t.en}
                  type="button"
                  onClick={() => {
                    setScore(score + a.p);
                    setStep(step + 1);
                  }}
                >
                  <span className="opt-key">{LETTERS[idx]}</span>
                  <span>{a.t[lang]}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="quiz-result"
          >
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
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </svg>
              <div className="gauge-val">
                <strong>{score}</strong>
                <span>/{maxScore}</span>
              </div>
            </div>

            <div className="quiz-result-body">
              <div className="quiz-result-label">
                <Award size={16} />
                <span>{quiz.result[lang]}</span>
              </div>
              <p>{level.t[lang]}</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setStep(0);
                  setScore(0);
                }}
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
