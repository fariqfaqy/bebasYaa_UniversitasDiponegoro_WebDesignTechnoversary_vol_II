import React from 'react';

// Ilustrasi vektor SVG artistik berlapis untuk seluruh kartu & komponen (tanpa foto)
export function VectorArt({ kind, className = '' }) {
  switch (kind) {
    case 'ice':
      return (
        <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={className}>
          <defs>
            <linearGradient id="vaIceSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#vaIceSky)" />
          <circle cx="315" cy="65" r="32" fill="#fde047" opacity="0.9" />
          <polygon points="20,190 120,65 215,190" fill="#e2e8f0" />
          <polygon points="120,65 215,190 145,190" fill="#94a3b8" />
          <polygon points="165,190 265,45 375,190" fill="#ffffff" />
          <polygon points="265,45 375,190 285,190" fill="#bae6fd" />
          <rect y="185" width="400" height="65" fill="#0284c7" />
          <polygon points="65,195 140,195 125,222 80,222" fill="#e0f2fe" opacity="0.85" />
          <polygon points="220,195 320,195 295,232 245,232" fill="#bae6fd" opacity="0.75" />
        </svg>
      );

    case 'wave':
      return (
        <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={className}>
          <defs>
            <linearGradient id="vaWaveSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#vaWaveSky)" />
          <circle cx="95" cy="70" r="38" fill="#f97316" opacity="0.85" />
          {/* Siluet gedung pesisir terendam */}
          <rect x="240" y="95" width="28" height="95" fill="#334155" />
          <rect x="276" y="75" width="34" height="115" fill="#1e293b" />
          <rect x="318" y="110" width="26" height="80" fill="#475569" />
          <path d="M-20,155 Q90,115 200,155 T420,145 L420,250 L-20,250 Z" fill="#0ea5e9" />
          <path d="M-20,185 Q110,145 230,185 T420,175 L420,250 L-20,250 Z" fill="#0369a1" />
        </svg>
      );

    case 'storm':
      return (
        <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={className}>
          <defs>
            <linearGradient id="vaStormSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#vaStormSky)" />
          <g fill="#334155">
            <ellipse cx="140" cy="75" rx="75" ry="32" />
            <ellipse cx="220" cy="68" rx="85" ry="38" />
            <ellipse cx="290" cy="82" rx="65" ry="28" />
          </g>
          <polygon points="205,95 175,152 202,152 185,205 238,138 208,138" fill="#facc15" />
          <path d="M0,205 Q140,180 280,205 T400,198 L400,250 L0,250 Z" fill="#0f172a" />
        </svg>
      );

    case 'turtle':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#0284c7" />
          <polygon points="60,0 120,0 210,300 10,300" fill="#38bdf8" opacity="0.22" />
          <polygon points="230,0 280,0 370,300 190,300" fill="#38bdf8" opacity="0.16" />
          {/* Penyu hijau */}
          <g transform="translate(200,150) rotate(-18)">
            <ellipse cx="0" cy="0" rx="58" ry="42" fill="#15803d" stroke="#bbf7d0" strokeWidth="3" />
            <ellipse cx="0" cy="0" rx="42" ry="28" fill="#22c55e" />
            <ellipse cx="72" cy="0" rx="18" ry="13" fill="#4ade80" />
            <path d="M25,-36 Q65,-85 85,-45 Q48,-25 25,-36 Z" fill="#4ade80" />
            <path d="M25,36 Q65,85 85,45 Q48,25 25,36 Z" fill="#4ade80" />
            <path d="M-42,-28 Q-75,-52 -68,-22 Z" fill="#22c55e" />
            <path d="M-42,28 Q-75,52 -68,22 Z" fill="#22c55e" />
          </g>
          {/* Kantong plastik mengambang */}
          <path d="M85,85 Q105,65 120,88 L112,125 Q98,115 88,125 Z" fill="rgba(255,255,255,0.45)" />
        </svg>
      );

    case 'plankton':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#0369a1" />
          <circle cx="200" cy="150" r="105" fill="#0ea5e9" opacity="0.25" />
          <circle cx="200" cy="150" r="72" fill="#38bdf8" opacity="0.3" />
          {/* Zooplankton */}
          <ellipse cx="195" cy="148" rx="48" ry="22" fill="#bae6fd" stroke="#ffffff" strokeWidth="3" />
          <circle cx="168" cy="144" r="6" fill="#f97316" />
          <circle cx="192" cy="152" r="5" fill="#facc15" />
          <circle cx="212" cy="145" r="5.5" fill="#f97316" />
          <path d="M148,142 Q105,110 82,128 M148,154 Q105,186 82,168" stroke="#e0f2fe" strokeWidth="3" fill="none" />
          <path d="M242,148 L282,134 M242,148 L282,162" stroke="#e0f2fe" strokeWidth="3" fill="none" />
        </svg>
      );

    case 'coral':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#0ea5e9" />
          <path d="M0,245 Q130,215 260,245 T400,235 L400,300 L0,300 Z" fill="#fde68a" />
          <path d="M120,255 C112,190 82,160 65,120 M120,255 C120,180 122,140 128,95 M120,255 C132,190 158,160 175,125" stroke="#f97316" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M275,260 C268,205 245,175 232,145 M275,260 C278,195 282,160 288,125 M275,260 C288,205 312,180 328,150" stroke="#facc15" strokeWidth="16" strokeLinecap="round" fill="none" />
          <circle cx="195" cy="195" r="34" fill="#22c55e" />
          <circle cx="215" cy="210" r="26" fill="#16a34a" />
        </svg>
      );

    case 'whale':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#075985" />
          <path d="M0,95 Q100,75 200,95 T400,90 L400,0 L0,0 Z" fill="#38bdf8" />
          {/* Paus bungkuk */}
          <path d="M70,185 Q145,105 255,135 Q315,152 345,120 Q335,162 305,175 Q335,192 348,215 Q302,198 255,188 Q165,220 70,185 Z" fill="#0f2438" />
          <path d="M95,188 Q165,208 235,184" stroke="#bae6fd" strokeWidth="4" fill="none" />
          <circle cx="115" cy="168" r="3.5" fill="#ffffff" />
        </svg>
      );

    case 'borneo':
    case 'orangutan':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#dcfce7" />
          <circle cx="310" cy="70" r="42" fill="#fde047" />
          <path d="M0,210 Q120,150 240,200 T400,180 L400,300 L0,300 Z" fill="#4ade80" />
          <path d="M0,245 Q150,200 300,245 T400,230 L400,300 L0,300 Z" fill="#16a34a" />
          {/* Siluet kanopi & orangutan */}
          <rect x="85" y="70" width="18" height="230" fill="#52392a" />
          <circle cx="94" cy="75" r="58" fill="#15803d" />
          <circle cx="145" cy="95" r="44" fill="#22c55e" />
          <circle cx="215" cy="148" r="34" fill="#c2410c" />
          <circle cx="215" cy="112" r="22" fill="#ea580c" />
          <path d="M145,95 Q180,125 215,135" stroke="#9a3412" strokeWidth="10" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'amazon':
    case 'macaw':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#bbf7d0" />
          <path d="M0,185 Q130,130 260,175 T400,165 L400,300 L0,300 Z" fill="#22c55e" />
          {/* Sungai Amazon berkelok */}
          <path d="M160,175 Q220,215 140,255 Q90,280 210,300 L310,300 Q210,270 250,235 Q290,200 210,175 Z" fill="#0ea5e9" />
          {/* Burung Macaw */}
          <g transform="translate(260,105)">
            <ellipse cx="0" cy="0" rx="28" ry="16" fill="#ea580c" />
            <path d="M-10,-4 Q25,-42 52,-18 Q20,6 -10,-4 Z" fill="#facc15" />
            <path d="M-24,2 L-72,22 L-58,4 Z" fill="#0284c7" />
            <circle cx="18" cy="-4" r="4" fill="#ffffff" />
          </g>
        </svg>
      );

    case 'anggrek-hitam':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#14532d" />
          <g transform="translate(200,150)">
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse key={deg} cx="0" cy="-52" rx="22" ry="48" fill="#a3e635" transform={`rotate(${deg})`} />
            ))}
            <ellipse cx="0" cy="12" rx="26" ry="32" fill="#1e293b" stroke="#fde047" strokeWidth="4" />
            <circle cx="0" cy="-4" r="10" fill="#facc15" />
          </g>
        </svg>
      );

    case 'bekantan':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#dcfce7" />
          <circle cx="200" cy="155" r="78" fill="#d97706" />
          <circle cx="200" cy="145" r="52" fill="#fed7aa" />
          <ellipse cx="200" cy="162" rx="18" ry="30" fill="#ea580c" />
          <circle cx="180" cy="132" r="5" fill="#0f2438" />
          <circle cx="220" cy="132" r="5" fill="#0f2438" />
        </svg>
      );

    case 'ulin':
    case 'kacang-brasil':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#ecfccb" />
          <path d="M0,250 Q200,220 400,250 L400,300 L0,300 Z" fill="#15803d" />
          <rect x="182" y="110" width="36" height="150" rx="6" fill="#52392a" />
          <circle cx="145" cy="115" r="55" fill="#16a34a" />
          <circle cx="255" cy="115" r="55" fill="#15803d" />
          <circle cx="200" cy="78" r="68" fill="#22c55e" />
        </svg>
      );

    case 'macan-dahan':
    case 'jaguar':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#064e3b" />
          <circle cx="200" cy="155" r="72" fill="#facc15" />
          <polygon points="145,105 162,68 185,95" fill="#eab308" />
          <polygon points="255,105 238,68 215,95" fill="#eab308" />
          <circle cx="174" cy="142" r="8" fill="#0f2438" />
          <circle cx="226" cy="142" r="8" fill="#0f2438" />
          <polygon points="190,165 210,165 200,178" fill="#ea580c" />
          <circle cx="155" cy="175" r="9" fill="#78350f" opacity="0.7" />
          <circle cx="245" cy="175" r="9" fill="#78350f" opacity="0.7" />
          <circle cx="200" cy="112" r="8" fill="#78350f" opacity="0.7" />
        </svg>
      );

    case 'victoria-amazonica':
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#0284c7" />
          <ellipse cx="200" cy="165" rx="125" ry="68" fill="#16a34a" stroke="#86efac" strokeWidth="8" />
          <ellipse cx="200" cy="162" rx="112" ry="56" fill="#22c55e" />
          <circle cx="200" cy="155" r="22" fill="#fef08a" />
          <circle cx="200" cy="155" r="12" fill="#f97316" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className}>
          <rect width="400" height="300" fill="#0ea5e9" />
          <path d="M85,175 Q175,95 285,155 Q325,175 345,150 Q332,188 295,192 Q185,220 85,175 Z" fill="#bae6fd" />
          <circle cx="135" cy="158" r="4" fill="#0f2438" />
        </svg>
      );
  }
}
