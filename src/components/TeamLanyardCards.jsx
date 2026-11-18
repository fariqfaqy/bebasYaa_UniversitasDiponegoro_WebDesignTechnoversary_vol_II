import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Github, Instagram, Move } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    id: 'fariq',
    code: 'KLB-001',
    name: 'Fariq Faqy Rozzaqy',
    role: { id: 'Programmer', en: 'Programmer' },
    accent: '#0ea5e9',
    strapColor: '#0284c7',
    initials: 'FF',
    bio: {
      id: 'Merancang arsitektur interaktif, animasi web 3D, & performa Kalabumi.',
      en: 'Engineered Kalabumi\'s interactive architecture, 3D book & smooth motion.',
    },
    socials: [
      { label: '@zzaqy._', href: 'https://www.instagram.com/zzaqy._/', icon: Instagram },
      { label: 'GitHub', href: 'https://github.com/fariqfaqy', icon: Github },
    ],
  },
  {
    id: 'rizka',
    code: 'KLB-002',
    name: 'Rizka Mufida',
    role: { id: 'Designer', en: 'Designer' },
    accent: '#f97316',
    strapColor: '#ea580c',
    initials: 'RM',
    bio: {
      id: 'Menata identitas visual, palet warna, ilustrasi origami, & pengalaman pengguna.',
      en: 'Crafted visual identity, color system, origami art direction & UX flow.',
    },
    socials: [
      { label: '@mfda_a', href: 'https://www.instagram.com/mfda_a/', icon: Instagram },
    ],
  },
];

function LanyardIdCard({ member, lang, index }) {
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Kemiringan kartu & tali lanyard lentur mengikuti tarikan pengguna
  const rotate = useTransform(x, [-140, 0, 140], [18, 0, -18]);
  const strapPath = useTransform([x, y], ([lx, ly]) => {
    const endX = 140 + lx;
    const endY = 52 + ly;
    const ctrlX = 140 + lx * 0.22;
    const ctrlY = Math.max(20, endY * 0.65);
    return `M 140 6 Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
  });

  return (
    <div className="lanyard-slot-wrap">
      <motion.div
        className="lanyard-slot"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          type: 'spring',
          stiffness: 140,
          damping: 18,
          delay: index * 0.2,
        }}
      >
        {/* Jangkar tali lanyard di bagian atas */}
        <div className="lanyard-anchor" style={{ background: member.strapColor }} aria-hidden="true" />

        {/* Tali lanyard meluncur keluar dari atas saat scroll & lentur mengikuti tarikan */}
        <svg viewBox="0 0 280 80" className="lanyard-strap-svg" aria-hidden="true">
          <motion.path
            d={strapPath}
            fill="none"
            stroke={member.strapColor}
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.2,
            }}
          />
          <motion.path
            d={strapPath}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.2,
            }}
          />
        </svg>

        {/* Kartu ID turun halus bersama tali, lalu sangat lentur saat ditarik & dilepas */}
        <motion.div
          className={`lanyard-card ${dragging ? 'is-dragging' : ''}`}
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
          {/* Klip logam lanyard */}
          <div className="lanyard-clip">
            <span className="lanyard-clip-metal" aria-hidden="true" />
          </div>

          {/* Header strip ID Card */}
          <div className="lanyard-card-top" style={{ background: member.accent }}>
            <span>KALABUMI CREW</span>
            <strong>{member.code}</strong>
          </div>

          <div className="lanyard-card-body">
            <div className="lanyard-profile-row">
              <div className="lanyard-avatar" style={{ borderColor: member.accent }}>
                <svg viewBox="0 0 80 80" className="lanyard-avatar-svg" aria-hidden="true">
                  <defs>
                    <linearGradient id={`av-${member.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={member.accent} />
                      <stop offset="100%" stopColor="#0f2438" />
                    </linearGradient>
                  </defs>
                  <rect width="80" height="80" fill={`url(#av-${member.id})`} />
                  <polygon points="0,80 40,46 80,80" fill="rgba(255,255,255,0.16)" />
                  <circle cx="40" cy="30" r="14" fill="rgba(255,255,255,0.24)" />
                </svg>
                <span className="lanyard-initials">{member.initials}</span>
              </div>

              <div className="lanyard-identity">
                <span className="lanyard-role-pill" style={{ color: member.accent }}>
                  {member.role[lang]}
                </span>
                <h4>{member.name}</h4>
              </div>
            </div>

            <p className="lanyard-bio">{member.bio[lang]}</p>

            <div className="lanyard-socials" onPointerDown={(e) => e.stopPropagation()}>
              {member.socials.map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="lanyard-soc-btn"
                    aria-label={`${member.name} ${soc.label}`}
                  >
                    <Icon size={14} />
                    <span>{soc.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lanyard-drag-hint">
            <Move size={11} />
            <span>{lang === 'id' ? 'Tarik & lepaskan kartu' : 'Pull & release badge'}</span>
          </div>
        </motion.div>
      </motion.div>
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
