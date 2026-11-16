import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, MapPin } from 'lucide-react';

const MAP_ZONES = {
  plankton: {
    x: 20,
    y: 24,
    depth: '0 - 20 m',
    zone: { id: 'Zona Permukaan', en: 'Surface Zone' },
    coords: '02°14\'S • 118°40\'E',
    accent: '#0ea5e9',
  },
  turtle: {
    x: 44,
    y: 48,
    depth: '10 - 40 m',
    zone: { id: 'Padang Lamun & Pesisir', en: 'Seagrass & Coast' },
    coords: '04°52\'S • 121°15\'E',
    accent: '#22c55e',
  },
  coral: {
    x: 31,
    y: 74,
    depth: '15 - 50 m',
    zone: { id: 'Segitiga Terumbu Karang', en: 'Coral Triangle Reef' },
    coords: '06°08\'S • 124°02\'E',
    accent: '#f97316',
  },
  whale: {
    x: 76,
    y: 42,
    depth: '50 - 200 m+',
    zone: { id: 'Laut Lepas & Palung', en: 'Open Ocean & Trench' },
    coords: '08°30\'S • 128°45\'E',
    accent: '#0284c7',
  },
};

export default function MarineCreatureMap({ species, lang, chapterTitle, onOpenDetail }) {
  const [activeKey, setActiveKey] = useState(species[0]?.key || 'turtle');
  const active = species.find((s) => s.key === activeKey) || species[0];
  const activeMeta = MAP_ZONES[active.key] || MAP_ZONES.turtle;

  return (
    <div className="marine-map-wrap">
      {/* Peta Interaktif Zona Makhluk Air */}
      <div className="marine-map-board" role="region" aria-label={lang === 'id' ? 'Peta makhluk air terdampak' : 'Marine creature impact map'}>
        {/* Lapisan kedalaman laut & garis koordinat peta */}
        <svg viewBox="0 0 800 460" preserveAspectRatio="none" className="marine-map-svg" aria-hidden="true">
          <defs>
            <linearGradient id="oceanMapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="45%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
          </defs>
          <rect width="800" height="460" fill="url(#oceanMapGrad)" />

          {/* Grid koordinat lintang / bujur */}
          {[92, 184, 276, 368].map((yPos) => (
            <line key={`h-${yPos}`} x1="0" y1={yPos} x2="800" y2={yPos} stroke="rgba(14, 116, 144, 0.14)" strokeDasharray="5 6" />
          ))}
          {[160, 320, 480, 640].map((xPos) => (
            <line key={`v-${xPos}`} x1={xPos} y1="0" x2={xPos} y2="460" stroke="rgba(14, 116, 144, 0.14)" strokeDasharray="5 6" />
          ))}

          {/* Kontur dasar laut & gugusan karang tipis */}
          <path d="M0,410 Q160,360 320,395 T640,370 T800,400 L800,460 L0,460 Z" fill="rgba(2, 132, 199, 0.16)" />
          <path d="M0,432 Q200,395 420,425 T800,415 L800,460 L0,460 Z" fill="rgba(3, 105, 161, 0.18)" />

          {/* Jalur arus & rantai dampak antar titik makhluk air */}
          <path
            d="M 160 110 C 260 120, 290 190, 352 220 C 310 265, 275 305, 248 340 M 352 220 C 460 220, 520 185, 608 193"
            fill="none"
            stroke="rgba(12, 74, 110, 0.38)"
            strokeWidth="2.2"
            strokeDasharray="6 6"
          />
        </svg>

        {/* Header kompas & skala kedalaman */}
        <div className="marine-map-hud">
          <span className="marine-map-badge">
            <Compass size={14} />
            {lang === 'id' ? 'Peta Zona Makhluk Air' : 'Marine Habitat Map'}
          </span>
          <span className="marine-map-hint">
            {lang === 'id' ? 'Pilih titik makhluk untuk melihat zona' : 'Select a creature pin to inspect zone'}
          </span>
        </div>

        {/* Skala kedalaman di sisi kiri */}
        <div className="marine-depth-rail" aria-hidden="true">
          <span>0 m</span>
          <span>25 m</span>
          <span>60 m</span>
          <span>200 m+</span>
        </div>

        {/* Pin Makhluk Air pada Peta */}
        {species.map((s) => {
          const meta = MAP_ZONES[s.key] || MAP_ZONES.turtle;
          const isActive = s.key === active.key;
          return (
            <button
              key={s.key}
              type="button"
              className={`marine-pin ${isActive ? 'is-active' : ''}`}
              style={{
                left: `${meta.x}%`,
                top: `${meta.y}%`,
                '--pin-accent': meta.accent,
              }}
              onClick={() => setActiveKey(s.key)}
            >
              <span className="marine-pin-pulse" aria-hidden="true" />
              <span className="marine-pin-avatar">
                <img src={s.image} alt={s.name[lang]} loading="lazy" />
              </span>
              <span className="marine-pin-label">
                <strong>{s.name[lang]}</strong>
                <small>{meta.depth}</small>
              </span>
            </button>
          );
        })}
      </div>

      {/* Kartu Sorotan Makhluk Terpilih */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.24 }}
          className="card marine-spotlight"
        >
          <div className="marine-spotlight-photo">
            <img src={active.image} alt={active.name[lang]} />
            <span className="marine-zone-pill" style={{ background: activeMeta.accent }}>
              <MapPin size={12} />
              {activeMeta.zone[lang]}
            </span>
          </div>
          <div className="marine-spotlight-body">
            <div className="marine-spotlight-meta">
              <span className="marine-status-tag">{active.status[lang]}</span>
              <span className="marine-coords">{activeMeta.coords}</span>
            </div>
            <h4>{active.name[lang]}</h4>
            <p className="marine-spotlight-summary">{active.text[lang]}</p>
            {active.detail && <p className="marine-spotlight-detail">{active.detail[lang]}</p>}
            <div className="marine-spotlight-foot">
              <span className="marine-depth-chip">
                {lang === 'id' ? 'Kedalaman:' : 'Depth:'} <strong>{activeMeta.depth}</strong>
              </span>
              <button
                type="button"
                className="btn-inline-detail"
                onClick={() =>
                  onOpenDetail({
                    image: active.image,
                    badge: active.status[lang],
                    title: active.name[lang],
                    subtitle: `${chapterTitle} • ${activeMeta.zone[lang]}`,
                    text: `${active.text[lang]} ${active.detail ? active.detail[lang] : ''}`,
                  })
                }
              >
                {lang === 'id' ? 'Lihat detail' : 'View details'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
