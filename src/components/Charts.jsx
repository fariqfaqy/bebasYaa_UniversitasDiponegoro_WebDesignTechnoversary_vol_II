import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValueEvent } from 'motion/react';
import { MoveHorizontal, Play, Pause } from 'lucide-react';

function AnimatedValue({ value, decimals = 2 }) {
  const spring = useSpring(value, { stiffness: 220, damping: 26, mass: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplay(Number(latest.toFixed(decimals)));
  });

  return <>{display}</>;
}

// Grafik interaktif dengan cursor scrubbing mulus, spring crosshair/callout, dan timeline otomatis
export function LineChart({ data, unit, color = '#f97316' }) {
  const [hover, setHover] = useState(data.length - 1);
  const [playing, setPlaying] = useState(false);
  const svgRef = useRef(null);

  const W = 620, H = 270, PL = 50, PR = 28, PT = 34, PB = 38;
  const xs = data.map((d) => d.y);
  const vs = data.map((d) => d.v);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const v0 = Math.min(...vs, 0);
  const v1 = Math.max(...vs);
  const X = (y) => PL + ((y - x0) / (x1 - x0 || 1)) * (W - PL - PR);
  const Y = (v) => H - PB - ((v - v0) / (v1 - v0 || 1)) * (H - PT - PB);

  const path = data.map((d, i) => `${i ? 'L' : 'M'}${X(d.y).toFixed(1)},${Y(d.v).toFixed(1)}`).join(' ');
  const area = `${path} L${X(x1).toFixed(1)},${Y(v0).toFixed(1)} L${X(x0).toFixed(1)},${Y(v0).toFixed(1)} Z`;
  const h = data[hover] || data[data.length - 1];
  const uid = color.replace('#', '');
  const ticks = [v0, (v0 + v1) / 2, v1];
  const decimals = data.some((d) => !Number.isInteger(d.v)) ? (String(h.v).split('.')[1]?.length || 1) : 0;

  useEffect(() => {
    setHover(data.length - 1);
    setPlaying(false);
  }, [data]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = setInterval(() => {
      setHover((prev) => {
        if (prev >= data.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 650);
    return () => clearInterval(timer);
  }, [playing, data.length]);

  const handleTogglePlay = () => {
    if (!playing && hover >= data.length - 1) {
      setHover(0);
    }
    setPlaying((p) => !p);
  };

  const handlePointerScrub = (clientX) => {
    const svg = svgRef.current;
    if (!svg || !data.length) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((clientX - rect.left) / rect.width) * W;
    let nearestIdx = 0;
    let minDist = Infinity;
    for (let i = 0; i < data.length; i += 1) {
      const dist = Math.abs(X(data[i].y) - svgX);
      if (dist < minDist) {
        minDist = dist;
        nearestIdx = i;
      }
    }
    if (nearestIdx !== hover) {
      setPlaying(false);
      setHover(nearestIdx);
    }
  };

  const hx = X(h.y);
  const hy = Y(h.v);
  const badgeX = Math.max(PL + 42, Math.min(W - PR - 42, hx));
  const badgeY = Math.max(24, hy - 20);
  const springCfg = { type: 'spring', stiffness: 320, damping: 28, mass: 0.55 };

  return (
    <div className="chart">
      <div className="chart-head">
        <div className="chart-readout">
          <strong style={{ color }}>
            <AnimatedValue value={h.v} decimals={decimals} />
            {unit}
          </strong>
          <span className="chart-year">({h.y})</span>
          <button
            type="button"
            className={`chart-play-btn ${playing ? 'on' : ''}`}
            onClick={handleTogglePlay}
            style={{ borderColor: playing ? color : undefined }}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            <span>{playing ? 'Jeda' : 'Putar'}</span>
          </button>
        </div>

        <div className="chart-pills">
          {data.map((d, i) => {
            const isActive = i === hover;
            return (
              <button
                key={d.y}
                type="button"
                className={`chart-pill ${isActive ? 'on' : ''}`}
                style={{ position: 'relative', color: isActive ? '#ffffff' : undefined }}
                onClick={() => {
                  setPlaying(false);
                  setHover(i);
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId={`chart-pill-bg-${uid}`}
                    transition={springCfg}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 999,
                      background: color,
                      zIndex: 0,
                    }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{d.y}</span>
              </button>
            );
          })}
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        className="chart-svg"
        onMouseMove={(e) => handlePointerScrub(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) handlePointerScrub(e.touches[0].clientX);
        }}
        style={{ cursor: 'crosshair', touchAction: 'pan-y' }}
      >
        <defs>
          <linearGradient id={`grad-${uid}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".42" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <clipPath id={`clip-active-${uid}`}>
            <motion.rect
              x={0}
              y={0}
              height={H}
              animate={{ width: hx + 2 }}
              transition={springCfg}
            />
          </clipPath>
          <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {ticks.map((tv, idx) => (
          <g key={idx}>
            <line
              x1={PL}
              x2={W - PR}
              y1={Y(tv)}
              y2={Y(tv)}
              stroke="rgba(15,36,56,.09)"
              strokeDasharray="4 4"
            />
            <text x={PL - 8} y={Y(tv) + 4} textAnchor="end" fontSize="10.5" fill="rgba(15,36,56,.58)">
              {Number.isInteger(tv) ? tv : tv.toFixed(1)}
            </text>
          </g>
        ))}

        {v0 < 0 && (
          <line x1={PL} x2={W - PR} y1={Y(0)} y2={Y(0)} stroke="rgba(15,36,56,.25)" strokeDasharray="3 3" />
        )}

        {/* Bar vertikal latar lembut di setiap titik data */}
        {data.map((d, i) => {
          const bx = X(d.y);
          const by = Y(d.v);
          const bZero = Y(v0);
          return (
            <motion.line
              key={`bar-${d.y}`}
              x1={bx}
              x2={bx}
              initial={{ y1: bZero, y2: bZero }}
              whileInView={{ y1: by, y2: bZero }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
              stroke={color}
              strokeWidth={1.5}
              strokeOpacity={0.16}
              strokeDasharray="2 3"
            />
          );
        })}

        {/* Area gradien bawah kurva */}
        <motion.path
          key={`area-${path}`}
          d={area}
          fill={`url(#grad-${uid})`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        />

        {/* Kurva dasar redup */}
        <motion.path
          key={`base-${path}`}
          initial={{ pathLength: 0, opacity: 0.3 }}
          whileInView={{ pathLength: 1, opacity: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Kurva aktif menyala yang mengikuti kursor tahun dengan mulus */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${uid})`}
          clipPath={`url(#clip-active-${uid})`}
        />

        {/* Garis crosshair vertikal yang meluncur mulus saat ganti tahun */}
        <motion.line
          animate={{ x1: hx, x2: hx, y1: hy, y2: Y(v0) }}
          transition={springCfg}
          stroke={color}
          strokeWidth="2.4"
          strokeOpacity="0.65"
        />

        {/* Titik-titik data */}
        {data.map((d, i) => {
          const active = i === hover;
          const prevX = i > 0 ? X(data[i - 1].y) : -999;
          const showLabel = i === 0 || i === data.length - 1 || (X(d.y) - prevX > 38 && X(x1) - X(d.y) > 34);
          return (
            <g
              key={d.y}
              onClick={() => {
                setPlaying(false);
                setHover(i);
              }}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={X(d.y)}
                cy={Y(d.v)}
                r={active ? 4.5 : 3.8}
                fill="#ffffff"
                stroke={color}
                strokeWidth="2.2"
              />
              {showLabel && (
                <text
                  x={X(d.y)}
                  y={H - 11}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={active ? '700' : '500'}
                  fill={active ? '#0f2438' : 'rgba(15,36,56,.6)'}
                >
                  {d.y}
                </text>
              )}
            </g>
          );
        })}

        {/* Kursor aktif meluncur mulus (pulse ring + titik hitam) */}
        <motion.g
          animate={{ x: hx, y: hy }}
          transition={springCfg}
          style={{ pointerEvents: 'none' }}
        >
          <circle cx={0} cy={0} r="13" fill={color} fillOpacity=".24" className="chart-pulse-ring" />
          <circle cx={0} cy={0} r="6.8" fill="#0f2438" stroke={color} strokeWidth="2.8" />
        </motion.g>

        {/* Floating Callout Badge yang meluncur mulus mengikuti titik aktif */}
        <motion.g
          animate={{ x: badgeX, y: badgeY }}
          transition={springCfg}
          style={{ pointerEvents: 'none' }}
        >
          <rect x="-40" y="-18" width="80" height="21" rx="10.5" fill="#0f2438" />
          <text x="0" y="-4" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#ffffff">
            {h.v}{unit}
          </text>
        </motion.g>
      </svg>
    </div>
  );
}

// Perbandingan foto nyata gletser Papua: arsip 1936 vs citra satelit modern
export function GlacierCompare({ before, now, beforeImg, nowImg, hint }) {
  const [pos, setPos] = useState(50);
  const stageRef = useRef(null);

  const updateFromPointer = (clientX) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, Math.round(pct))));
  };

  return (
    <div className="compare">
      <div
        ref={stageRef}
        className="compare-stage"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) updateFromPointer(e.clientX);
        }}
      >
        <div className="compare-layer">
          <img src={nowImg} alt={now} className="scene-img" loading="lazy" />
        </div>
        <div className="compare-layer" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={beforeImg} alt={before} className="scene-img" loading="lazy" />
        </div>
        <div className="compare-handle" style={{ left: `${pos}%` }}>
          <span className="compare-knob"><MoveHorizontal size={15} /></span>
        </div>
        <span className="compare-tag left">{before}</span>
        <span className="compare-tag right">{now}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        aria-label={hint}
      />
      <small>{hint}</small>
    </div>
  );
}
