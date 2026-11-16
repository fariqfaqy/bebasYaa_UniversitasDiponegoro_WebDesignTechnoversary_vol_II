import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react';

export default function ForestFanDeck({ deck, lang, onOpenDetail }) {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(0);

  const items =
    filter === 'all'
      ? deck.cards
      : deck.cards.filter((c) => c.region === filter || c.kind === filter);

  useEffect(() => {
    setIndex(Math.min(1, Math.max(0, items.length - 1)));
  }, [filter, items.length]);

  const activeIdx = Math.min(index, items.length - 1);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="fandeck-wrap">
      <div className="fandeck-head">
        <h3>{deck.title[lang]}</h3>
        <p>{deck.subtitle[lang]}</p>
        <div className="fandeck-filters">
          {deck.filters.map((f) => (
            <button
              key={f.k}
              type="button"
              className={filter === f.k ? 'on' : ''}
              onClick={() => setFilter(f.k)}
            >
              {f[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className="fandeck-stage">
        <button type="button" className="fandeck-nav left" onClick={prev} aria-label="Previous card">
          <ChevronLeft size={20} />
        </button>

        <div className="fandeck-cards">
          {items.map((card, i) => {
            const offset = i - activeIdx;
            const abs = Math.abs(offset);
            const visible = abs <= 2;
            const isCenter = offset === 0;

            return (
              <motion.div
                key={card.id}
                className={`fan-card fan-${card.color} ${isCenter ? 'is-center' : ''}`}
                initial={false}
                animate={{
                  x: offset * 170,
                  y: abs * 20,
                  rotate: offset * 6.5,
                  scale: isCenter ? 1 : Math.max(0.82, 1 - abs * 0.085),
                  opacity: visible ? (isCenter ? 1 : 0.94 - abs * 0.08) : 0,
                  zIndex: 20 - abs,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                style={{ pointerEvents: visible ? 'auto' : 'none' }}
                onClick={() => (isCenter ? onOpenDetail(card) : setIndex(i))}
              >
                <div className="fan-top">
                  <div>
                    <h4>{card.name[lang]}</h4>
                    <span className="fan-hab">{card.habitat[lang]}</span>
                  </div>
                  <span className="fan-status">
                    <ShieldAlert size={12} />
                    <span>{card.status[lang]}</span>
                  </span>
                </div>

                <div className="fan-photo">
                  <img src={card.image} alt={card.name[lang]} loading="lazy" />
                  {isCenter && <span className="fan-cta">{deck.cta[lang]}</span>}
                </div>
              </motion.div>
            );
          })}
        </div>

        <button type="button" className="fandeck-nav right" onClick={next} aria-label="Next card">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
