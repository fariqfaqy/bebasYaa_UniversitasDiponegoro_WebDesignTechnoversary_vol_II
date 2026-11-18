import React from 'react';
import { motion } from 'motion/react';

/**
 * Animasi konten saat scroll (masuk & keluar dua arah) yang berjalan
 * di compositor thread tanpa membuat puluhan listener useScroll/useSpring per kartu.
 */
export function ScrollReveal({
  children,
  className = '',
  fromX = 0,
  fromY = 38,
  scaleIn = 0.96,
  as = 'div',
}) {
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      initial={{ opacity: 0, x: fromX * 0.5, y: Math.min(fromY, 34), scale: scaleIn }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
