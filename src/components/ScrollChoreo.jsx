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
      initial={{ opacity: 0, x: fromX * 0.6, y: fromY, scale: scaleIn }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.12, margin: '600px 0px -40px 0px' }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
