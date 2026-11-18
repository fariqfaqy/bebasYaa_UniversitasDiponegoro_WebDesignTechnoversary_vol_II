import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Github, Instagram, Move } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 'fariq',
    code: 'KLB-001',
    name: 'Fariq Faqy Rozzaqy',
    photo: '/team-fariq.jpg',
    photoPos: 'center 20%',
    role: { id: 'PROGRAMMER', en: 'PROGRAMMER' },
    accent: '#38bdf8',
    strapColor: '#0284c7',
    badgeText: 'bebasYaa',
    socials: [
      { label: '@zzaqy._', href: 'https://www.instagram.com/zzaqy._/', icon: Instagram },
      { label: 'GitHub', href: 'https://github.com/fariqfaqy', icon: Github },
    ],
  },
  {
    id: 'rizka',
    code: 'KLB-002',
    name: 'Rizka Mufida',
    photo: '/team-rizka.jpg',
    photoPos: '50% 28%',
    role: { id: 'DESIGNER', en: 'DESIGNER' },
    accent: '#fb7185',
    strapColor: '#e11d48',
    badgeText: 'bebasYaa',
    socials: [
      { label: '@mfda_a', href: 'https://www.instagram.com/mfda_a/', icon: Instagram },
    ],
  },
];

function BatikCorner({ side = 'left', color = '#fb7185' }) {
  const isLeft = side === 'left';
  return (
    <svg
      viewBox="0 0 80 80"
      className={`idcard-batik-corner is-${side}`}
      aria-hidden="true"
    >
      <g opacity="0.88">
        <circle cx={isLeft ? 0 : 80} cy="80" r="38" fill="rgba(255,255,255,0.08)" />
        <circle cx={isLeft ? 0 : 80} cy="80" r="24" fill={color} opacity="0.22" />
        <ellipse
          cx={isLeft ? 24 : 56}
          cy="56"
          rx="18"
          ry="9"
          transform={`rotate(${isLeft ? -45 : 45} ${isLeft ? 24 : 56} 56)`}
          fill={color}
          opacity="0.85"
        />
        <ellipse cx={isLeft ? 40 : 40} cy="80" rx="14" ry="7" fill="#ffffff" opacity="0.35" />
        <ellipse cx={isLeft ? 0 : 80} cy="40" rx="7" ry="14" fill="#ffffff" opacity="0.35" />
        <circle cx={isLeft ? 26 : 54} cy="54" r="5" fill="#ffffff" />
        <circle cx={isLeft ? 26 : 54} cy="54" r="2.5" fill="#0b1626" />
        <circle cx={isLeft ? 12 : 68} cy="36" r="2.2" fill={color} />
        <circle cx={isLeft ? 36 : 44} cy="60" r="2.2" fill={color} />
        <circle cx={isLeft ? 22 : 58} cy="74" r="2.2" fill="#ffffff" />
        <circle cx={isLeft ? 6 : 74} cy="58" r="2" fill="#ffffff" />
      </g>
    </svg>
  );
}

function LanyardIdCard({ member, lang, index }) {
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Kemiringan kartu & tali lanyard lentur mengikuti tarikan pengguna
  const rotate = useTransform(x, [-140, 0, 140], [15, 0, -15]);
  const strapPath = useTransform([x, y], ([lx, ly]) => {
    const endX = 140 + lx;
    const endY = 54 + ly;
    const ctrlX = 140 + lx * 0.22;
    const ctrlY = Math.max(22, endY * 0.65);
    return `M 140 0 Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
  });

  return (
    <div className="lanyard-slot-wrap">
      <div className="lanyard-slot">
        {/* Jangkar tali lanyard 1 tali di bagian atas */}
        <div className="lanyard-anchor" style={{ background: member.strapColor }} aria-hidden="true" />

        {/* 1 Tali Lanyard elastis dengan corak jahitan khas kartu lanyard */}
        <svg viewBox="0 0 280 84" className="lanyard-strap-svg" aria-hidden="true">
          <motion.path
            d={strapPath}
            fill="none"
            stroke="rgba(15, 36, 56, 0.15)"
            strokeWidth="22"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.22 }}
          />
          <motion.path
            d={strapPath}
            fill="none"
            stroke={member.strapColor}
            strokeWidth="18"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.22 }}
          />
          <motion.path
            d={strapPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.42)"
            strokeWidth="3"
            strokeDasharray="6 5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.22 }}
          />
        </svg>

        {/* Kontainer Animasi Bergulir & Berayun 3D Saat Scroll Masuk Viewport */}
        <motion.div
          className="idcard-roll-container"
          initial={{
            y: -160,
            opacity: 0,
            rotateZ: index % 2 === 0 ? -16 : 16,
            rotateX: 42,
            scale: 0.86,
          }}
          whileInView={{
            y: [-160, 26, -12, 4, 0],
            opacity: [0, 1, 1, 1, 1],
            rotateZ: index % 2 === 0 ? [-16, 11, -5, 2, 0] : [16, -11, 5, -2, 0],
            rotateX: [42, -14, 6, -2, 0],
            scale: [0.86, 1.04, 0.98, 1.01, 1],
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.25,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.22,
            times: [0, 0.48, 0.72, 0.88, 1],
          }}
        >
          {/* Kartu ID Card Interaktif (Dapat ditarik-tarik secara lentur) */}
          <motion.div
            className={`idcard-badge-wrap ${dragging ? 'is-dragging' : ''}`}
            style={{ x, y, rotate, '--card-accent': member.accent }}
            drag
            dragConstraints={{ left: -140, right: 140, top: -30, bottom: 160 }}
            dragElastic={0.72}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 135, bounceDamping: 10 }}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
          >
            {/* Klip Gantungan Logam & Lubang Slot Oval ID Card */}
            <div className="idcard-top-hardware" aria-hidden="true">
              <div className="idcard-metal-clip">
                <span className="idcard-clip-swivel" />
                <span className="idcard-clip-hook" />
              </div>
              <div className="idcard-slot-hole" />
            </div>

            <div className="idcard-inner-card">
              {/* Header: Bersih tanpa 'asistensi mengajar', hanya logo & identitas Kalabumi */}
              <div className="idcard-head-row">
                <div className="idcard-head-brand">
                  <span className="idcard-org-title">KALABUMI</span>
                  <span className="idcard-member-code">{member.code}</span>
                </div>
                <div className="idcard-head-badge">
                  <img src="/kalabumi-logo.png" alt="Kalabumi" className="idcard-mini-logo" />
                  <span className="idcard-team-tag">{member.badgeText}</span>
                </div>
              </div>

              {/* Frame Foto Kubah / Arch dengan Bintang Berkilau */}
              <div className="idcard-photo-stage">
                <span className="idcard-sparkle sp-1">✦</span>
                <span className="idcard-sparkle sp-2">✧</span>
                <span className="idcard-sparkle sp-3">✦</span>
                <span className="idcard-sparkle sp-4">✧</span>

                <div className="idcard-arch-frame">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="idcard-photo-img"
                    style={{ objectPosition: member.photoPos }}
                    loading="eager"
                  />
                </div>
              </div>

              {/* Banner Melengkung Bawah (Deep Navy + Ornamen Batik Kawung) */}
              <div className="idcard-bottom-banner">
                {/* Ornamen Batik Kawung Kiri & Kanan */}
                <BatikCorner side="left" color={member.accent} />
                <BatikCorner side="right" color={member.accent} />

                <div className="idcard-banner-content">
                  {/* Hanya 'PROGRAMMER' atau 'DESIGNER' tanpa kata 'DIVISI' */}
                  <span className="idcard-divisi-pill">{member.role[lang]}</span>
                  <h4 className="idcard-member-name">{member.name}</h4>
                  <p className="idcard-sub-info">TIM {member.badgeText}</p>

                  {/* Tombol Media Sosial yang Bersih */}
                  <div className="idcard-social-links" onPointerDown={(e) => e.stopPropagation()}>
                    {member.socials.map((soc) => {
                      const Icon = soc.icon;
                      return (
                        <a
                          key={soc.label}
                          href={soc.href}
                          target="_blank"
                          rel="noreferrer"
                          className="idcard-soc-btn"
                          aria-label={`${member.name} ${soc.label}`}
                        >
                          <Icon size={13} />
                          <span>{soc.label}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lanyard-drag-hint">
              <Move size={11} />
              <span>{lang === 'id' ? 'Tarik & lepaskan kartu' : 'Pull & release badge'}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function TeamLanyardCards({ lang }) {
  return (
    <div className="team-lanyard-section">
      <div className="team-lanyard-head">
        <span className="kicker">{lang === 'id' ? 'Tim Pengembang' : 'Creators'}</span>
        <h3>{lang === 'id' ? 'Kenalan dengan Pembuat Kalabumi' : 'Meet the Kalabumi Creators'}</h3>
        <p>
          {lang === 'id'
            ? 'Tarik-tarik ID Card kami di bawah untuk melihat profil, kontak, dan media sosial.'
            : 'Pull and play with our ID badges below to view our roles, contact, and social links.'}
        </p>
      </div>

      <div className="team-lanyard-grid">
        {TEAM_MEMBERS.map((m, idx) => (
          <LanyardIdCard key={m.id} member={m} lang={lang} index={idx} />
        ))}
      </div>
    </div>
  );
}
