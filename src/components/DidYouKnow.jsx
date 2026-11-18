import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function DidYouKnow({ facts, lang, accent = '#f97316' }) {
  const [idx, setIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const current = facts[idx] || facts[0];

  return (
    <div
      className="dyk-card"
      style={{ '--dyk-accent': accent }}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
    >
      {/* Ornamen bintang & lipatan origami lembut di latar */}
      <div className="dyk-ornaments" aria-hidden="true">
        <span className="dyk-spark dyk-spark-1">
          <Sparkles size={14} />
        </span>
        <span className="dyk-spark dyk-spark-2">
          <Sparkles size={11} />
        </span>
      </div>

      {/* Lensa Pembesar Beranimasi */}
      <div className="dyk-lens-stage" aria-hidden="true">
        <svg viewBox="0 0 110 110" className="dyk-lens-bg">
          <circle cx="55" cy="55" r="46" fill="rgba(255,255,255,0.75)" stroke="rgba(15,36,56,0.08)" strokeDasharray="4 4" />
          <path d="M22,66 Q45,42 66,56 T92,42" fill="none" stroke={accent} strokeWidth="2.5" strokeOpacity="0.4" strokeLinecap="round" />
          <circle cx="42" cy="52" r="4" fill={accent} opacity="0.65" />
          <circle cx="68" cy="56" r="5" fill="#0ea5e9" opacity="0.65" />
          <circle cx="55" cy="38" r="3.5" fill="#22c55e" opacity="0.7" />
        </svg>

        <motion.div
          className="dyk-magnifier"
          animate={
            zoomed
              ? { x: 4, y: -4, scale: 1.14, rotate: -6 }
              : { x: 0, y: 0, rotate: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          <svg viewBox="0 0 64 64" className="dyk-lens-svg">
            {/* Gagang lensa */}
            <line x1="40" y1="40" x2="56" y2="56" stroke="#0f2438" strokeWidth="7" strokeLinecap="round" />
            <line x1="40" y1="40" x2="56" y2="56" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
            {/* Bingkai & kaca pembesar */}
            <circle cx="26" cy="26" r="18" fill="rgba(255, 255, 255, 0.48)" stroke="#0f2438" strokeWidth="4.5" />
            <circle cx="26" cy="26" r="15" fill="none" stroke={accent} strokeWidth="1.8" opacity="0.75" />
            {/* Kilau kaca */}
            <path d="M17,19 Q22,14 29,15" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      </div>

      {/* Isi Materi Gaya Penyampaian Presenter */}
      <div className="dyk-body">
        <div className="dyk-head">
          <span className="dyk-badge">
            <Sparkles size={12} />
            {lang === 'id' ? 'Tahukah Kamu?' : 'Did You Know?'}
          </span>
          {facts.length > 1 && (
            <button
              type="button"
              className="dyk-next-btn"
              onClick={() => setIdx((i) => (i + 1) % facts.length)}
            >
              <span>{lang === 'id' ? `Fakta ${idx + 1}/${facts.length}` : `Fact ${idx + 1}/${facts.length}`}</span>
              <ChevronRight size={13} />
            </button>
          )}
        </div>
        <h4>{current.title[lang]}</h4>
        <p>{current.text[lang]}</p>
      </div>
    </div>
  );
}
