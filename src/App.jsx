import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'motion/react';
import {
  Globe2,
  Snowflake,
  Waves,
  Trees,
  Languages,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
  ArrowUp,
  Mail,
  MapPin,
  Users,
  Check,
  Send,
  BookOpen,
  Activity,
  Clock,
  Sparkles,
  Play,
  Pause,
  ChevronDown,
} from 'lucide-react';
import { UI, HERO, ABOUT, CLIMATE, OCEAN, FOREST, ACTION } from './data/content';
import HeroSection from './components/HeroSection';
import AboutPopUpBook from './components/AboutPopUpBook';
import SceneStage from './components/SceneStage';
import { LineChart, GlacierCompare } from './components/Charts';
import PlasticQuiz from './components/PlasticQuiz';
import ForestFanDeck from './components/ForestFanDeck';
import MarineCreatureMap from './components/MarineCreatureMap';
import ActionGarden from './components/ActionGarden';
import TeamLanyardCards from './components/TeamLanyardCards';
import { VectorArt } from './components/VectorArt';
import { ScrollReveal } from './components/ScrollChoreo';

const SECTIONS = ['home', 'about', 'climate', 'ocean', 'forest', 'action', 'contact'];
const NAV_LINKS = ['home', 'about', 'climate', 'ocean', 'forest', 'contact'];
const fade = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

function Chapter({ id, data, lang, children }) {
  const accentMap = { climate: '#f97316', ocean: '#0ea5e9', forest: '#22c55e' };
  const accent = accentMap[id] || '#f97316';
  return (
    <section id={id} className={`chapter ch-${id}`}>
      <div className="container">
        <ScrollReveal as="header" fromX={-36} fromY={48} className="chapter-head">
          <span className="kicker">{data.kicker[lang]}</span>
          <h2>{data.title[lang]}</h2>
          <div className="chapter-dyk-box" style={{ '--dyk-accent': accent }}>
            <div className="chapter-dyk-lens" aria-hidden="true">
              <motion.svg
                viewBox="0 0 64 64"
                className="chapter-dyk-svg"
                animate={{
                  x: [-4, 5, -2, 4, -4],
                  y: [-3, 4, 2, -3, -3],
                  rotate: [-7, 6, -3, 5, -7],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <line x1="40" y1="40" x2="56" y2="56" stroke="#0f2438" strokeWidth="7" strokeLinecap="round" />
                <line x1="40" y1="40" x2="56" y2="56" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="26" cy="26" r="18" fill="rgba(255, 255, 255, 0.72)" stroke="#0f2438" strokeWidth="4.2" />
                <circle cx="26" cy="26" r="14" fill="none" stroke={accent} strokeWidth="1.6" opacity="0.7" />
                <path d="M17,19 Q22,14 29,15" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
              </motion.svg>
            </div>
            <div className="chapter-dyk-text">
              <span className="chapter-dyk-pill">
                <Sparkles size={11} />
                {lang === 'id' ? 'Tahukah kamu?' : 'Did you know?'}
              </span>
              <p>{data.intro[lang]}</p>
            </div>
          </div>
        </ScrollReveal>
        {children}
        <ScrollReveal fromY={28} className="src-bar">
          <BookOpen size={14} />
          <span>{UI.sources[lang]}: {data.sources}</span>
        </ScrollReveal>
      </div>
    </section>
  );
}

const STAT_ICONS = [Activity, Clock, Sparkles];
const FLOW_COLORS = ['#0ea5e9', '#06b6d4', '#22c55e', '#f59e0b', '#f97316'];

function Stats({ items, lang }) {
  return (
    <div className="stats">
      {items.map((s, idx) => {
        const Icon = STAT_ICONS[idx % STAT_ICONS.length];
        return (
          <ScrollReveal
            key={s.v}
            fromX={(idx - 1) * 32}
            fromY={56 + idx * 14}
            className="stat"
          >
            <div className="stat-fold" aria-hidden="true" />
            <div className="stat-top">
              <span className="stat-num-tag">0{idx + 1}</span>
              <span className="stat-icon-badge" aria-hidden="true">
                <Icon size={16} />
              </span>
            </div>
            <strong>{s.v}</strong>
            <span>{s.t[lang]}</span>
            <motion.div
              className="stat-meter"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.75, delay: idx * 0.12, ease: 'easeOut' }}
            />
          </ScrollReveal>
        );
      })}
    </div>
  );
}

const CANOPY_COLORS = ['#16a34a', '#22c55e', '#eab308', '#f97316'];

function MicroStepVisual({ step, active }) {
  return (
    <div className={`flow-step-visual ${active ? 'is-active' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 120 68" className="flow-step-svg">
        <rect width="120" height="68" rx="10" fill={active ? '#e0f2fe' : '#f8fafc'} />
        <path d="M0,46 Q30,38 60,46 T120,46 L120,68 L0,68 Z" fill="rgba(14,165,233,0.14)" />
        {step === 0 && (
          <motion.g
            animate={{ y: active ? [-3, 2, -3] : 0, rotate: active ? [-3, 3, -3] : 0 }}
            transition={{ duration: 2.2, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
          >
            <polygon points="34,20 48,20 51,30 51,52 31,52 31,30" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.4" />
            <rect x="37" y="14" width="8" height="6" rx="1.5" fill="#0284c7" />
            <polygon points="62,24 84,27 80,52 59,49" fill="#facc15" opacity="0.9" stroke="#eab308" strokeWidth="1.3" />
          </motion.g>
        )}
        {step === 1 && (
          <g>
            <polygon points="34,12 40,18 48,16 45,24 52,29 43,31 40,39 35,31 26,29 33,24 30,16" fill="#facc15" />
            {[
              [62, 34, '#0ea5e9'],
              [74, 44, '#f97316'],
              [84, 28, '#22c55e'],
              [94, 42, '#ef4444'],
              [68, 50, '#eab308'],
            ].map(([px, py, pc], idx) => (
              <motion.polygon
                key={idx}
                points={`${px},${py - 4} ${px + 5},${py + 2} ${px - 2},${py + 5}`}
                fill={pc}
                animate={{ y: active ? [0, -4, 0] : 0 }}
                transition={{ duration: 1.2, delay: idx * 0.12, repeat: active ? Infinity : 0 }}
              />
            ))}
          </g>
        )}
        {step === 2 && (
          <motion.g
            animate={{ x: active ? [-4, 4, -4] : 0 }}
            transition={{ duration: 2, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
          >
            <ellipse cx="64" cy="36" rx="22" ry="12" fill="#22c55e" opacity="0.88" />
            <polygon points="42,36 26,26 30,46" fill="#16a34a" />
            <circle cx="68" cy="35" r="3.2" fill="#f97316" />
            <circle cx="58" cy="38" r="2.6" fill="#facc15" />
          </motion.g>
        )}
        {step === 3 && (
          <motion.g
            animate={{ x: active ? [-4, 5, -4] : 0 }}
            transition={{ duration: 2, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
          >
            <polygon points="40,36 70,18 96,36 70,54" fill="#f59e0b" />
            <polygon points="40,36 22,23 28,36 22,49" fill="#ea580c" />
            <circle cx="83" cy="32" r="2.2" fill="#0f2438" />
            <circle cx="67" cy="38" r="3" fill="#ef4444" />
            <circle cx="57" cy="34" r="2.4" fill="#0ea5e9" />
          </motion.g>
        )}
        {step === 4 && (
          <motion.g
            animate={{ scale: active ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1.6, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
          >
            <ellipse cx="60" cy="40" rx="34" ry="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="60" cy="40" rx="24" ry="10" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.2" />
            <polygon points="44,40 62,32 78,40 62,48" fill="#f97316" />
            <circle cx="58" cy="39" r="2.4" fill="#0ea5e9" />
            <circle cx="66" cy="41" r="2.1" fill="#ef4444" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}

function Flow({ title, steps, lang, variant = 'zigzag' }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev >= steps.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 950);
    return () => clearInterval(timer);
  }, [playing, steps.length]);

  const progressPct = steps.length > 1 ? (activeIdx / (steps.length - 1)) * 100 : 100;
  const palette = variant === 'canopy' ? CANOPY_COLORS : FLOW_COLORS;

  return (
    <ScrollReveal fromY={58} className={`flow flow-${variant}`}>
      <div className="flow-header">
        <div>
          <h3>{title[lang]}</h3>
          <p className="flow-sub">
            {lang === 'id'
              ? 'Klik setiap tahap untuk menelusuri alur dampaknya'
              : 'Click any stage to trace the impact pathway'}
          </p>
        </div>
        <button
          type="button"
          className={`flow-play-btn ${playing ? 'on' : ''}`}
          onClick={() => {
            if (!playing && activeIdx >= steps.length - 1) setActiveIdx(0);
            setPlaying((p) => !p);
          }}
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
          <span>
            {playing
              ? (lang === 'id' ? 'Jeda' : 'Pause')
              : (lang === 'id' ? 'Putar Alur' : 'Play Flow')}
          </span>
        </button>
      </div>

      {variant === 'canopy' ? (
        <div className="flow-domino-wrap">
          <div className="flow-domino-col">
            {[0, 2].map((idx) => {
              const s = steps[idx];
              if (!s) return null;
              const stepColor = palette[idx % palette.length];
              const isActive = idx === activeIdx;
              const isPassed = idx <= activeIdx;
              return (
                <div
                  key={s.en}
                  role="button"
                  tabIndex={0}
                  className={`flow-domino-card ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                  style={{ '--step-color': stepColor }}
                  onClick={() => {
                    setPlaying(false);
                    setActiveIdx(idx);
                  }}
                  onMouseEnter={() => {
                    if (!playing) setActiveIdx(idx);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveIdx(idx)}
                >
                  <div className="flow-canopy-head">
                    <span className="flow-node">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="flow-stage-label">
                      {lang === 'id' ? `Domino ${idx + 1}` : `Domino ${idx + 1}`}
                    </span>
                  </div>
                  <p className="flow-step-text">{s[lang]}</p>
                </div>
              );
            })}
          </div>

          {/* Hub Pohon Origami Tengah yang Bereaksi Sesuai Tahap Deforestasi */}
          <div className="flow-domino-hub" aria-hidden="true">
            <svg viewBox="0 0 220 220" className="flow-domino-svg">
              {/* Garis cabang ke 4 kartu */}
              <path d="M 110 110 L 18 52" stroke={activeIdx >= 0 ? '#16a34a' : 'rgba(15,36,56,0.14)'} strokeWidth="3" strokeDasharray="5 5" />
              <path d="M 110 110 L 202 52" stroke={activeIdx >= 1 ? '#eab308' : 'rgba(15,36,56,0.14)'} strokeWidth="3" strokeDasharray="5 5" />
              <path d="M 110 110 L 18 168" stroke={activeIdx >= 2 ? '#f59e0b' : 'rgba(15,36,56,0.14)'} strokeWidth="3" strokeDasharray="5 5" />
              <path d="M 110 110 L 202 168" stroke={activeIdx >= 3 ? '#f97316' : 'rgba(15,36,56,0.14)'} strokeWidth="3" strokeDasharray="5 5" />

              {/* Lingkaran dasar tanah (berubah dari hijau ke kering oranye di tahap 4) */}
              <circle
                cx="110"
                cy="110"
                r="66"
                fill={activeIdx >= 3 ? '#fff7ed' : '#f0fdf4'}
                stroke={palette[activeIdx % palette.length]}
                strokeWidth="2.5"
              />

              {/* Asap karbon naik di tahap >= 1 */}
              {activeIdx >= 1 && (
                <g opacity="0.8">
                  <polygon points="88,46 96,34 104,46 96,56" fill="#94a3b8" className="anim-smoke-1" />
                  <polygon points="122,40 130,28 138,40 130,50" fill="#cbd5e1" className="anim-smoke-1" />
                </g>
              )}

              {/* Batang pohon origami */}
              <polygon points="103,154 117,154 114,108 106,108" fill="#7c2d12" />

              {/* Kanopi pohon (terbelah/memudar saat tahap >= 2) */}
              <motion.g
                animate={{ x: activeIdx >= 2 ? -8 : 0, rotate: activeIdx >= 2 ? -5 : 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <polygon points="110,48 70,116 110,116" fill={activeIdx >= 3 ? '#facc15' : '#22c55e'} />
              </motion.g>
              <motion.g
                animate={{ x: activeIdx >= 2 ? 8 : 0, rotate: activeIdx >= 2 ? 5 : 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <polygon points="110,48 150,116 110,116" fill={activeIdx >= 3 ? '#f97316' : '#15803d'} />
              </motion.g>

              {/* Retak/kering tanah di tahap 4 */}
              {activeIdx >= 3 && (
                <path d="M 74 156 L 96 150 L 114 158 L 146 152" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </svg>
            <span className="flow-hub-caption" style={{ color: palette[activeIdx % palette.length] }}>
              {lang === 'id' ? `Efek ${activeIdx + 1} / ${steps.length}` : `Effect ${activeIdx + 1} / ${steps.length}`}
            </span>
          </div>

          <div className="flow-domino-col">
            {[1, 3].map((idx) => {
              const s = steps[idx];
              if (!s) return null;
              const stepColor = palette[idx % palette.length];
              const isActive = idx === activeIdx;
              const isPassed = idx <= activeIdx;
              return (
                <div
                  key={s.en}
                  role="button"
                  tabIndex={0}
                  className={`flow-domino-card ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                  style={{ '--step-color': stepColor }}
                  onClick={() => {
                    setPlaying(false);
                    setActiveIdx(idx);
                  }}
                  onMouseEnter={() => {
                    if (!playing) setActiveIdx(idx);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveIdx(idx)}
                >
                  <div className="flow-canopy-head">
                    <span className="flow-node">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="flow-stage-label">
                      {lang === 'id' ? `Domino ${idx + 1}` : `Domino ${idx + 1}`}
                    </span>
                  </div>
                  <p className="flow-step-text">{s[lang]}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flow-pipeline">
          {/* Garis penghubung zigzag SVG */}
          <svg viewBox="0 0 1000 180" preserveAspectRatio="none" className="flow-zigzag-svg" aria-hidden="true">
            <path
              d="M 100 32 L 300 112 L 500 32 L 700 112 L 900 32"
              fill="none"
              stroke="rgba(15, 36, 56, 0.14)"
              strokeWidth="4"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              d="M 100 32 L 300 112 L 500 32 L 700 112 L 900 32"
              fill="none"
              stroke="url(#flowZigGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progressPct / 100 }}
              transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            />
            <defs>
              <linearGradient id="flowZigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>

          <ol>
            {steps.map((s, i) => {
              const stepColor = palette[i % palette.length];
              const isActive = i === activeIdx;
              const isPassed = i <= activeIdx;
              return (
                <li
                  key={s.en}
                  className={`flow-step ${i % 2 === 1 ? 'is-down' : 'is-up'} ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                  style={{ '--step-color': stepColor }}
                  onClick={() => {
                    setPlaying(false);
                    setActiveIdx(i);
                  }}
                  onMouseEnter={() => {
                    if (!playing) setActiveIdx(i);
                  }}
                >
                  <div className="flow-node-wrap">
                    <span className="flow-node">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flow-card-body">
                    <span className="flow-stage-label">
                      {lang === 'id' ? `Tahap ${i + 1}` : `Stage ${i + 1}`}
                    </span>
                    <p className="flow-step-text">{s[lang]}</p>
                    <MicroStepVisual step={i} active={isActive} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </ScrollReveal>
  );
}

export default function App() {
  const [lang, setLang] = useState('id');
  const [active, setActive] = useState('home');
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState('temp');
  const [region, setRegion] = useState('borneo');
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [aboutIdx, setAboutIdx] = useState(0);
  const [detailModal, setDetailModal] = useState(null);
  const [sent, setSent] = useState(false);
  const [checkedTips, setCheckedTips] = useState({});

  const { scrollYProgress } = useScroll();

  // 3D Mouse-Tilt Micro-Parallax (1 listener global untuk semua lapisan)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.3 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  // Mencegah blok teks biru, drag, dan copy di luar form input
  useEffect(() => {
    const isInput = (el) => {
      if (!(el instanceof Element)) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    };
    const block = (e) => {
      if (!isInput(e.target)) e.preventDefault();
    };
    const blockKeys = (e) => {
      if (isInput(e.target)) return;
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'a', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    document.addEventListener('selectstart', block);
    document.addEventListener('dragstart', block);
    document.addEventListener('keydown', blockKeys);
    return () => {
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.removeEventListener('selectstart', block);
      document.removeEventListener('dragstart', block);
      document.removeEventListener('keydown', blockKeys);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Kunci scroll halaman saat melihat modal detail konten (harus close dulu baru bisa scroll)
  useEffect(() => {
    if (!detailModal) {
      document.body.style.overflow = '';
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    const preventScroll = (e) => {
      if (e.target instanceof Element && e.target.closest('.detail-modal-card')) return;
      e.preventDefault();
    };
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [detailModal]);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO.length), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTip = (key) => {
    setCheckedTips((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const h = HERO[slide];
  const reg = FOREST.regions.find((r) => r.k === region);
  const chart = CLIMATE.chart[tab];
  const L = lang;

  return (
    <div className={`app theme-${active}`}>
      <SceneStage mouseX={smoothMouseX} mouseY={smoothMouseY} heroKey={h.key} />

      <header className="nav-wrap">
        <nav className="nav">
          <button className="brand" onClick={() => go('home')}>
            <img src="/kalabumi-logo.png" alt="Kalabumi Logo" className="brand-logo-img" />
            <span>KALABUMI</span>
          </button>

          <div className={`nav-links ${menu ? 'open' : ''}`}>
            {NAV_LINKS.map((id) => (
              <button
                key={id}
                className={active === id ? 'on' : ''}
                onClick={() => go(id)}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nav-text">{UI.nav[id === 'home' ? 'home' : id][L]}</span>
              </button>
            ))}
          </div>

          <div className="nav-right">
            <button
              className="lang"
              onClick={() => setLang(L === 'id' ? 'en' : 'id')}
              aria-label="Language"
            >
              <Languages size={14} />
              <span>{L === 'id' ? 'ID' : 'EN'}</span>
            </button>

            <button
              className={`nav-cta ${active === 'action' ? 'on' : ''}`}
              onClick={() => go('action')}
            >
              <span>{UI.nav.action[L]}</span>
              <ArrowRight size={14} />
            </button>

            <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">
              {menu ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
      </header>

      <aside className="rail" aria-label="Chapters">
        {SECTIONS.map((id) => (
          <button
            key={id}
            className={active === id ? 'on' : ''}
            onClick={() => go(id)}
            title={UI.nav[id][L]}
          >
            <span>{UI.nav[id][L]}</span>
            <i />
          </button>
        ))}
      </aside>

      {/* HERO */}
      <HeroSection
        slides={HERO}
        slide={slide}
        setSlide={setSlide}
        lang={L}
        ui={UI}
        onExplore={go}
      />

      {/* ABOUT */}
      <section id="about" className="about">
        <div className="container">
          <ScrollReveal fromY={52} className="about-box">
            <span className="kicker">{UI.nav.about[L]}</span>
            <h2>{ABOUT.title[L]}</h2>
            <p className="lead">{ABOUT.text[L]}</p>
          </ScrollReveal>

          <ScrollReveal fromY={72} scaleIn={0.92}>
            <AboutPopUpBook
              activeIndex={aboutIdx}
              onChangeIndex={setAboutIdx}
              onGoChapter={go}
              links={ABOUT.links}
              lang={L}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* BAB 1 */}
      <Chapter id="climate" data={CLIMATE} lang={L}>
        <div className="grid3">
          {CLIMATE.impacts.map((c, idx) => (
            <ScrollReveal
              key={c.key}
              fromX={(idx - 1) * 34}
              fromY={60 + idx * 16}
              className="card impact-card clickable-card"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  setDetailModal({
                    image: c.image,
                    badge: c.status[L],
                    title: c.title[L],
                    subtitle: CLIMATE.title[L],
                    text: `${c.text[L]} ${c.detail ? c.detail[L] : ''}`,
                  })
                }
                onKeyDown={(e) => e.key === 'Enter' && setDetailModal({
                  image: c.image,
                  badge: c.status[L],
                  title: c.title[L],
                  subtitle: CLIMATE.title[L],
                  text: `${c.text[L]} ${c.detail ? c.detail[L] : ''}`,
                })}
              >
                <div className="impact-media">
                  <img src={c.image} alt={c.title[L]} loading="lazy" />
                  <span className="card-num">0{idx + 1}</span>
                </div>
                <div className="impact-body">
                  <h3>{c.title[L]}</h3>
                  <p>{c.text[L]}</p>
                  <span className="card-detail-link">
                    {L === 'id' ? 'Lihat detail' : 'View details'} <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal fromY={70} className="split panel">
          <div>
            <span className="kicker">Papua · Puncak Jaya</span>
            <h3 className="h3-lg">{CLIMATE.papua.title[L]}</h3>
            <p>{CLIMATE.papua.text[L]}</p>
            <GlacierCompare
              before={CLIMATE.papua.before[L]}
              now={CLIMATE.papua.now[L]}
              beforeImg={CLIMATE.papua.beforeImg}
              nowImg={CLIMATE.papua.nowImg}
              hint={CLIMATE.papua.hint[L]}
            />
            <small className="note">{CLIMATE.papua.credit[L]}</small>
          </div>
          <div className="card chart-card">
            <h4>{CLIMATE.papua.chartTitle[L]}</h4>
            <LineChart data={CLIMATE.papua.series} unit=" km²" color="#eab308" />
            <small className="note">{UI.approx[L]}</small>
          </div>
        </ScrollReveal>

        <ScrollReveal fromY={68} className="card chart-card">
          <div className="chart-bar">
            <h3>{CLIMATE.chart.title[L]}</h3>
            <div className="tabs">
              {CLIMATE.chart.tabs.map((t) => (
                <button
                  key={t.k}
                  className={tab === t.k ? 'on' : ''}
                  onClick={() => setTab(t.k)}
                >
                  {t[L]}
                </button>
              ))}
            </div>
          </div>
          <LineChart
            key={tab}
            data={chart.data}
            unit={chart.unit}
            color={tab === 'temp' ? '#f97316' : '#0ea5e9'}
          />
          <small className="note">{chart.note[L]} {UI.approx[L]}</small>
        </ScrollReveal>
      </Chapter>

      {/* BAB 2 */}
      <Chapter id="ocean" data={OCEAN} lang={L}>
        <Stats items={OCEAN.stats} lang={L} />
        <Flow title={OCEAN.chain.title} steps={OCEAN.chain.steps} lang={L} variant="zigzag" />
        <ScrollReveal as="h3" fromY={40} className="h3-lg center">{OCEAN.speciesTitle[L]}</ScrollReveal>
        <ScrollReveal fromY={56}>
          <MarineCreatureMap
            species={OCEAN.species}
            lang={L}
            chapterTitle={OCEAN.title[L]}
            onOpenDetail={setDetailModal}
          />
        </ScrollReveal>
      </Chapter>

      {/* BAB 3 */}
      <Chapter id="forest" data={FOREST} lang={L}>
        <Stats items={FOREST.stats} lang={L} />
        <ScrollReveal fromY={64} className="card region-card">
          <div className="tabs region-tabs-desktop">
            {FOREST.regions.map((r) => (
              <button
                key={r.k}
                className={`${region === r.k ? 'on' : ''} ${r.isIndonesia ? 'tab-id' : ''} ${r.isTrending ? 'tab-trending' : ''}`}
                onClick={() => setRegion(r.k)}
              >
                <span>{r.name[L]}</span>
                {r.isTrending ? (
                  <span className="tab-tag tab-tag-trend">{L === 'id' ? 'TREN ID' : 'ID TREND'}</span>
                ) : r.isIndonesia ? (
                  <span className="tab-tag tab-tag-id">ID</span>
                ) : null}
              </button>
            ))}
          </div>

          {/* Dropdown pemilih wilayah yang rapi di mobile */}
          <div className="region-mobile-dropdown">
            <button
              type="button"
              className="region-dropdown-trigger"
              onClick={() => setRegionMenuOpen((o) => !o)}
              aria-expanded={regionMenuOpen}
            >
              <span className="region-trigger-left">
                <Menu size={16} />
                <span>{reg.name[L]}</span>
                {reg.isTrending ? (
                  <span className="tab-tag tab-tag-trend">{L === 'id' ? 'TREN ID' : 'ID TREND'}</span>
                ) : reg.isIndonesia ? (
                  <span className="tab-tag tab-tag-id">ID</span>
                ) : null}
              </span>
              <ChevronDown size={16} className={`region-chevron ${regionMenuOpen ? 'open' : ''}`} />
            </button>

            <AnimatePresence>
              {regionMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="region-dropdown-menu"
                >
                  {FOREST.regions.map((r) => (
                    <button
                      key={`mob-${r.k}`}
                      type="button"
                      className={`region-dropdown-item ${region === r.k ? 'on' : ''}`}
                      onClick={() => {
                        setRegion(r.k);
                        setRegionMenuOpen(false);
                      }}
                    >
                      <span>{r.name[L]}</span>
                      {r.isTrending ? (
                        <span className="tab-tag tab-tag-trend">{L === 'id' ? 'TREN ID' : 'ID TREND'}</span>
                      ) : r.isIndonesia ? (
                        <span className="tab-tag tab-tag-id">ID</span>
                      ) : null}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={reg.k}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`region-grid ${reg.isIndonesia ? 'region-grid-id' : ''}`}
            >
              <div>
                {reg.highlight ? (
                  <div className={`region-highlight-pill ${reg.isTrending ? 'is-trending' : 'is-id'}`}>
                    <span className="region-id-dot" aria-hidden="true" />
                    <span>{reg.highlight[L]}</span>
                  </div>
                ) : (
                  <div className="region-highlight-pill is-global">
                    <span>{L === 'id' ? 'Perspektif Global · Amerika Selatan' : 'Global Perspective · South America'}</span>
                  </div>
                )}
                <h3>{reg.name[L]}</h3>
                <p>{reg.text[L]}</p>
                <div className="chips">
                  {reg.species.map((s) => (
                    <span key={s.en} className="chip">
                      <i className="chip-dot" />
                      {s[L]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="region-collage">
                <img src={reg.image} alt={reg.name[L]} className="collage-main" loading="lazy" />
                <img src={reg.wildlifeImage} alt={reg.species[0][L]} className="collage-sub" loading="lazy" />
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
        <ScrollReveal fromY={70}>
          <ForestFanDeck
            deck={FOREST.fanDeck}
            lang={L}
            onOpenDetail={(card) =>
              setDetailModal({
                image: card.image,
                imgPosition: card.imgPosition || (card.id === 'macaw' ? 'center top' : undefined),
                badge: card.status[L],
                title: card.name[L],
                subtitle: card.habitat[L],
                text: card.detail[L],
              })
            }
          />
        </ScrollReveal>
        <Flow title={FOREST.cascade.title} steps={FOREST.cascade.steps} lang={L} variant="canopy" />
      </Chapter>

      {/* AKSI + KONTAK */}
      <section id="action" className="action">
        <div className="container">
          <ScrollReveal as="header" fromY={48} className="chapter-head">
            <span className="kicker">{UI.nav.action[L]}</span>
            <h2>{ACTION.title[L]}</h2>
            <p>{ACTION.intro[L]}</p>
          </ScrollReveal>

          <ActionGarden
            groups={ACTION.groups}
            checkedTips={checkedTips}
            onToggleTip={toggleTip}
            onResetTips={() => setCheckedTips({})}
            lang={L}
          />

          <ScrollReveal fromY={52} className="orgs-wrap">
            <h3 className="h3-lg center">{ACTION.orgsTitle[L]}</h3>
            <div className="chips center-chips">
              {ACTION.orgs.map((o) => (
                <a key={o.name} className="chip link" href={o.url} target="_blank" rel="noreferrer">
                  <span>{o.name}</span>
                  <ExternalLink size={13} />
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal fromY={64}>
            <PlasticQuiz quiz={OCEAN.quiz} lang={L} />
          </ScrollReveal>
        </div>
      </section>

      {/* HALAMAN KONTAK */}
      <section id="contact" className="contact-section">
        <div className="container">
          <ScrollReveal as="header" fromY={44} className="chapter-head contact-head">
            <span className="kicker">{UI.nav.contact[L]}</span>
            <h2>{ACTION.contactTitle[L]}</h2>
            <p>{ACTION.contactText[L]}</p>
          </ScrollReveal>

          <div className="contact-collab-row">
            <ScrollReveal fromX={-24} fromY={40} className="card contact-collab-card">
              <div className="contact-info">
                <div className="contact-brand-row">
                  <img src="/kalabumi-logo.png" alt="Kalabumi" className="contact-logo-img" />
                  <span className="kicker">KALABUMI</span>
                </div>
                <h3>{L === 'id' ? 'Mari Berkolaborasi untuk Bumi' : 'Collaborate With Us for Earth'}</h3>
                <p>
                  {L === 'id'
                    ? 'Kami terbuka untuk masukan data ilmiah, liputan komunitas lingkungan, dan kerja sama edukasi sekolah maupun kampus.'
                    : 'We welcome scientific data feedback, community spotlight stories, and school or campus educational partnerships.'}
                </p>

                <div className="contact-channels">
                  <div className="contact-channel-item">
                    <span className="contact-ch-icon"><Mail size={16} /></span>
                    <div>
                      <small>Email</small>
                      <strong>halo@kalabumi.id</strong>
                    </div>
                  </div>
                  <div className="contact-channel-item">
                    <span className="contact-ch-icon"><Users size={16} /></span>
                    <div>
                      <small>{L === 'id' ? 'Kolaborasi' : 'Partnership'}</small>
                      <strong>{L === 'id' ? 'Komunitas & Sekolah Hijau' : 'Green Communities & Schools'}</strong>
                    </div>
                  </div>
                  <div className="contact-channel-item">
                    <span className="contact-ch-icon"><MapPin size={16} /></span>
                    <div>
                      <small>{L === 'id' ? 'Lokasi' : 'Location'}</small>
                      <strong>Indonesia</strong>
                    </div>
                  </div>
                </div>

                <form
                  className="contact-form contact-form-inline"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                    e.target.reset();
                  }}
                >
                  <div className="contact-form-grid">
                    <input id="contact-name" name="name" required placeholder={ACTION.form.name[L]} />
                    <input id="contact-email" name="email" required type="email" placeholder={ACTION.form.email[L]} />
                  </div>
                  <textarea id="contact-msg" name="message" required rows="3" placeholder={ACTION.form.msg[L]} />
                  <button className="btn" type="submit">
                    <Send size={15} />
                    <span>{ACTION.form.send[L]}</span>
                  </button>
                  {sent && <p className="ok">{ACTION.form.thanks[L]}</p>}
                </form>
              </div>
            </ScrollReveal>

            <ScrollReveal fromX={24} fromY={40} className="contact-lanyard-col">
              <TeamLanyardCards lang={L} />
            </ScrollReveal>
          </div>
        </div>
        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="footer-brand-head">
                  <img src="/kalabumi-logo.png" alt="Kalabumi" className="footer-logo" />
                  <div>
                    <strong>KALABUMI</strong>
                    <span>{L === 'id' ? 'Edukasi Krisis Bumi' : 'Earth Crisis Education'}</span>
                  </div>
                </div>
                <p className="footer-desc">
                  {L === 'id'
                    ? 'Portal visual interaktif yang merangkum data iklim, lautan, dan hutan hujan agar lebih mudah dipahami dan ditindaklanjuti.'
                    : 'An interactive visual portal translating climate, ocean, and rainforest data into clear stories and daily action.'}
                </p>
                <div className="footer-badges">
                  <span className="footer-dot-pill is-green">{L === 'id' ? 'Iklim & Es' : 'Climate & Ice'}</span>
                  <span className="footer-dot-pill is-blue">{L === 'id' ? 'Lautan' : 'Oceans'}</span>
                  <span className="footer-dot-pill is-orange">{L === 'id' ? 'Hutan Hujan' : 'Rainforests'}</span>
                </div>
              </div>

              <div className="footer-col">
                <h5>{L === 'id' ? 'Jelajahi Bab' : 'Explore Chapters'}</h5>
                <ul className="footer-links">
                  {SECTIONS.map((id) => (
                    <li key={`ft-${id}`}>
                      <button type="button" onClick={() => go(id)}>
                        <ArrowRight size={12} />
                        <span>{UI.nav[id][L]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-col footer-col-top">
                <button type="button" className="footer-top-btn" onClick={() => go('home')}>
                  <ArrowUp size={14} />
                  <span>{L === 'id' ? 'Kembali ke atas' : 'Back to top'}</span>
                </button>
              </div>
            </div>

            <div className="footer-bottom">
              <span>{ACTION.footer[L]}</span>
              <span className="footer-copy">© {new Date().getFullYear()} KALABUMI</span>
            </div>
          </div>
        </footer>
      </section>

      {/* MODAL DETAIL KONTEN (Kunci scroll sampai tombol Close ditekan) */}
      <AnimatePresence>
        {detailModal && (
          <motion.div
            className="fan-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="fan-modal detail-modal-card"
              initial={{ opacity: 0, rotateY: -90, scale: 0.86 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.8 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src={detailModal.image}
                alt={detailModal.title}
                className="fan-modal-img"
                style={detailModal.imgPosition ? { objectPosition: detailModal.imgPosition } : undefined}
              />
              <div className="fan-modal-body">
                <span className="fan-modal-badge">{detailModal.badge}</span>
                <h4>{detailModal.title}</h4>
                <small>{detailModal.subtitle}</small>
                <p>{detailModal.text}</p>
                <button
                  type="button"
                  className="btn detail-close-btn"
                  onClick={() => setDetailModal(null)}
                >
                  <X size={15} />
                  <span>{L === 'id' ? 'Tutup Detail' : 'Close Details'}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
