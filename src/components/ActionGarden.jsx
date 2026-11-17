import React from 'react';
import { motion } from 'motion/react';
import { Check, RotateCcw, Sparkles, Snowflake, Waves, Trees } from 'lucide-react';
import { ScrollReveal } from './ScrollChoreo';

const LEVEL_INFO = [
  { min: 0, id: 'Benih Harapan', en: 'Seed of Hope', color: '#64748b' },
  { min: 1, id: 'Tunas Hijau', en: 'Green Sprout', color: '#0ea5e9' },
  { min: 4, id: 'Penjaga Bumi', en: 'Earth Guardian', color: '#22c55e' },
  { min: 7, id: 'Pahlawan Kalabumi', en: 'Kalabumi Hero', color: '#f97316' },
  { min: 9, id: 'Duta Bumi Sempurna', en: 'Master Earth Steward', color: '#eab308' },
];

function getLevel(count) {
  let current = LEVEL_INFO[0];
  for (const lv of LEVEL_INFO) {
    if (count >= lv.min) current = lv;
  }
  return current;
}

export default function ActionGarden({ groups, checkedTips, onToggleTip, onResetTips, lang }) {
  const total = groups.reduce((acc, g) => acc + g.tips.length, 0);
  const count = Object.values(checkedTips).filter(Boolean).length;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const level = getLevel(count);

  const co2Saved = count * 12;
  const plasticSaved = count * 18;

  return (
    <div className="action-interactive-wrap">
      {/* Taman Origami Hidup yang Tumbuh Saat Aksi Dicentang */}
      <ScrollReveal fromY={48} className="card action-garden-card">
        <div className="action-garden-visual" aria-hidden="true">
          <svg viewBox="0 0 340 200" preserveAspectRatio="xMidYMid slice" className="action-garden-svg">
            <defs>
              <linearGradient id="gardenSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={count >= 7 ? '#fef9c3' : '#e0f2fe'} />
                <stop offset="100%" stopColor="#dcfce7" />
              </linearGradient>
            </defs>
            <rect width="340" height="200" rx="18" fill="url(#gardenSky)" />

            {/* Matahari origami bersinar makin terang */}
            <motion.g
              animate={{
                scale: 0.72 + (count / total) * 0.42,
                rotate: count * 18,
                opacity: 0.45 + (count / total) * 0.55,
              }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              style={{ transformOrigin: '278px 46px' }}
            >
              <polygon points="278,18 296,28 306,46 296,64 278,74 260,64 250,46 260,28" fill="#fde047" />
              <polygon points="278,26 290,34 298,46 290,58 278,66 266,58 258,46 266,34" fill="#facc15" />
            </motion.g>

            {/* Bukit hijau dasar */}
            <polygon points="0,200 0,152 110,136 225,156 340,138 340,200" fill="#4ade80" />
            <polygon points="0,200 95,164 240,174 340,156 340,200" fill="#22c55e" />

            {/* Tahap >= 1: Tunas origami muncul */}
            {[
              { x: 64, y: 158, min: 1 },
              { x: 148, y: 162, min: 2 },
              { x: 266, y: 156, min: 3 },
            ].map((sp, idx) => (
              <motion.g
                key={`sp-${idx}`}
                initial={false}
                animate={{
                  scale: count >= sp.min ? 1 : 0,
                  opacity: count >= sp.min ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                style={{ transformOrigin: `${sp.x}px ${sp.y}px` }}
              >
                <rect x={sp.x - 1.5} y={sp.y - 24} width="3" height="24" fill="#15803d" />
                <polygon points={`${sp.x},${sp.y - 18} ${sp.x - 16},${sp.y - 28} ${sp.x - 6},${sp.y - 34}`} fill="#86efac" />
                <polygon points={`${sp.x},${sp.y - 22} ${sp.x + 16},${sp.y - 32} ${sp.x + 6},${sp.y - 38}`} fill="#facc15" />
              </motion.g>
            ))}

            {/* Tahap >= 4: Pohon pinus origami tumbuh */}
            {[
              { x: 102, y: 154, min: 4, c1: '#16a34a', c2: '#14532d' },
              { x: 215, y: 158, min: 5, c1: '#22c55e', c2: '#15803d' },
            ].map((tr, idx) => (
              <motion.g
                key={`tr-${idx}`}
                initial={false}
                animate={{
                  scale: count >= tr.min ? 1 : 0,
                  opacity: count >= tr.min ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                style={{ transformOrigin: `${tr.x}px ${tr.y}px` }}
              >
                <rect x={tr.x - 3} y={tr.y - 14} width="6" height="14" fill="#78350f" />
                <polygon points={`${tr.x},${tr.y - 68} ${tr.x - 22},${tr.y - 28} ${tr.x},${tr.y - 28}`} fill={tr.c1} />
                <polygon points={`${tr.x},${tr.y - 68} ${tr.x + 22},${tr.y - 28} ${tr.x},${tr.y - 28}`} fill={tr.c2} />
                <polygon points={`${tr.x},${tr.y - 46} ${tr.x - 28},${tr.y - 12} ${tr.x},${tr.y - 12}`} fill={tr.c1} />
                <polygon points={`${tr.x},${tr.y - 46} ${tr.x + 28},${tr.y - 12} ${tr.x},${tr.y - 12}`} fill={tr.c2} />
              </motion.g>
            ))}

            {/* Tahap >= 6: Kincir angin origami berputar */}
            <motion.g
              initial={false}
              animate={{ scale: count >= 6 ? 1 : 0, opacity: count >= 6 ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              style={{ transformOrigin: '304px 154px' }}
            >
              <rect x="302.5" y="106" width="3" height="48" fill="#15803d" />
              <g transform="translate(304, 106)">
                <g className="anim-spin-turbine">
                  <polygon points="0,0 -6,-20 8,-14" fill="#0ea5e9" />
                  <polygon points="0,0 20,-6 14,8" fill="#facc15" />
                  <polygon points="0,0 6,20 -8,14" fill="#f97316" />
                  <polygon points="0,0 -20,6 -14,-8" fill="#22c55e" />
                </g>
              </g>
            </motion.g>

            {/* Tahap >= 7: Kupu-kupu & bangau kertas terbang */}
            <motion.g
              initial={false}
              animate={{
                scale: count >= 7 ? 1 : 0,
                opacity: count >= 7 ? 1 : 0,
                y: count >= 7 ? [0, -6, 0] : 0,
              }}
              transition={{ duration: 2.2, repeat: count >= 7 ? Infinity : 0 }}
            >
              <polygon points="154,66 138,54 142,70 154,70" fill="#facc15" />
              <polygon points="154,66 170,54 166,70 154,70" fill="#f97316" />
            </motion.g>

            <motion.g
              initial={false}
              animate={{
                scale: count >= 9 ? 1 : 0,
                opacity: count >= 9 ? 1 : 0,
                x: count >= 9 ? [0, 10, 0] : 0,
              }}
              transition={{ duration: 2.6, repeat: count >= 9 ? Infinity : 0 }}
            >
              <polygon points="72,48 94,42 108,48 88,54" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <polygon points="84,46 94,28 96,46" fill="#ffffff" stroke="#bae6fd" strokeWidth="1" />
            </motion.g>
          </svg>
        </div>

        <div className="action-garden-info">
          <div className="action-garden-head">
            <span className="action-level-pill" style={{ background: level.color }}>
              <Sparkles size={13} />
              {level[lang]}
            </span>
            {count > 0 && (
              <button type="button" className="action-reset-btn" onClick={onResetTips}>
                <RotateCcw size={13} />
                <span>{lang === 'id' ? 'Reset' : 'Reset'}</span>
              </button>
            )}
          </div>

          <h3>
            {lang === 'id'
              ? `Taman Aksimu: ${count} dari ${total} langkah aktif`
              : `Your Action Garden: ${count} of ${total} habits active`}
          </h3>
          <p>
            {lang === 'id'
              ? 'Centang aksi harian di bawah untuk menumbuhkan taman origami dan melihat estimasi dampakmu.'
              : 'Check daily actions below to grow your origami garden and track your estimated impact.'}
          </p>

          <div className="action-progress-track">
            <motion.div
              className="action-progress-fill"
              animate={{ width: `${pct}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            />
          </div>

          <div className="action-impact-pills">
            <div className="action-impact-chip">
              <strong>{pct}%</strong>
              <span>{lang === 'id' ? 'Komitmen' : 'Commitment'}</span>
            </div>
            <div className="action-impact-chip">
              <strong>~{co2Saved} kg</strong>
              <span>{lang === 'id' ? 'CO₂ dicegah/bln' : 'CO₂ avoided/mo'}</span>
            </div>
            <div className="action-impact-chip">
              <strong>~{plasticSaved}</strong>
              <span>{lang === 'id' ? 'Plastik dihindari/bln' : 'Plastics avoided/mo'}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 3 Kartu Checklist Interaktif dengan Progres per Kategori */}
      <div className="grid3">
        {groups.map((g, gi) => {
          const Icon = [Snowflake, Waves, Trees][gi];
          const groupDone = g.tips.filter((t) => !!checkedTips[`${g.k}-${t.en}`]).length;
          const groupFull = groupDone === g.tips.length;
          return (
            <ScrollReveal
              key={g.k}
              fromX={(gi - 1) * 32}
              fromY={58 + gi * 16}
              className={`card tip tip-${g.k} ${groupFull ? 'is-complete' : ''}`}
            >
              <div className="tip-head-row">
                <div className="tip-head">
                  <span className="tip-icon"><Icon size={18} /></span>
                  <h3>{g.title[lang]}</h3>
                </div>
                <span className={`tip-count-badge ${groupFull ? 'full' : ''}`}>
                  {groupDone}/{g.tips.length}
                </span>
              </div>

              <div className="tip-mini-bar">
                <motion.div
                  className="tip-mini-fill"
                  animate={{ width: `${(groupDone / g.tips.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                />
              </div>

              <ul className="checklist">
                {g.tips.map((t) => {
                  const k = `${g.k}-${t.en}`;
                  const done = !!checkedTips[k];
                  return (
                    <li key={t.en}>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        className={`check-item ${done ? 'done' : ''}`}
                        onClick={() => onToggleTip(k)}
                      >
                        <motion.span
                          className="check-box"
                          animate={{ scale: done ? [0.8, 1.18, 1] : 1 }}
                          transition={{ duration: 0.25 }}
                        >
                          {done && <Check size={13} />}
                        </motion.span>
                        <span>{t[lang]}</span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
