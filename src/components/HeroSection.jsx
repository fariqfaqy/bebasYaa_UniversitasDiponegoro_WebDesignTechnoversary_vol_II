import React, { useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];
const GLOW = {
  climate: 'radial-gradient(circle at 24% 46%, rgba(249,115,22,0.34), transparent 52%)',
  ocean: 'radial-gradient(circle at 24% 46%, rgba(14,165,233,0.36), transparent 52%)',
  forest: 'radial-gradient(circle at 24% 46%, rgba(34,197,94,0.36), transparent 52%)',
};

export default function HeroSection({ slides, slide, setSlide, lang, ui, onExplore }) {
  const ref = useRef(null);
  const h = slides[slide];
  const L = lang;

  // Koreografi keluar hero saat di-scroll (zero-delay, langsung mengikuti scroll)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.9, 0]);
  const deckY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const deckOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0]);
  const deckScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const queue = Array.from({ length: slides.length - 1 }, (_, i) => {
    const idx = (slide + 1 + i) % slides.length;
    return { item: slides[idx], idx };
  });

  const prev = () => setSlide((slide + slides.length - 1) % slides.length);
  const next = () => setSlide((slide + 1) % slides.length);

  return (
    <section id="home" ref={ref} className={`hero hero-${h.key}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={h.key}
          className="hero-glow"
          style={{ background: GLOW[h.key] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        />
      </AnimatePresence>

      <div className="container hero-stage-grid">
        <motion.div className="hero-inner" style={{ y: textY, opacity: textOpacity }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${h.key}-${L}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            >
              <span className="hero-badge">{ui.nav[h.target][L]}</span>
              <div className="hero-stat">{h.stat}</div>
              <h1>{h.title[L]}</h1>
              <p>{h.text[L]}</p>

              <div className="hero-actions">
                <motion.button
                  type="button"
                  className="btn"
                  onClick={() => onExplore(h.target)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span>{ui.cta[L]}</span>
                  <ArrowRight size={17} />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="hero-ctrl">
            <motion.button type="button" className="ctrl-btn" onClick={prev} aria-label="Prev" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <ChevronLeft size={18} />
            </motion.button>
            <div className="hero-dots">
              {slides.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  className={i === slide ? 'on' : ''}
                  onClick={() => setSlide(i)}
                  aria-label={s.title[L]}
                />
              ))}
            </div>
            <motion.button type="button" className="ctrl-btn" onClick={next} aria-label="Next" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
              <ChevronRight size={18} />
            </motion.button>
            <span className="hero-index">
              0{slide + 1} / 0{slides.length}
            </span>
          </div>
        </motion.div>

        <motion.div className="hero-deck" style={{ y: deckY, opacity: deckOpacity, scale: deckScale }}>
          {queue.map(({ item, idx }, order) => (
            <motion.button
              key={item.key}
              type="button"
              layout
              initial={{ opacity: 0, y: 40, rotate: order ? 3 : -3 }}
              animate={{ opacity: 1, y: 0, rotate: order ? 2 : -2 }}
              whileHover={{ y: -10, rotate: 0, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              onClick={() => setSlide(idx)}
              className={`hero-card hero-card-${item.key}`}
            >
              <img src={item.image} alt={item.title[L]} loading="lazy" />
              <div className="hero-card-overlay" />
              <div className="hero-card-meta">
                <span className="hero-card-kicker">{ui.nav[item.target][L]}</span>
                <strong className="hero-card-stat">{item.stat}</strong>
                <h3>{item.title[L]}</h3>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
