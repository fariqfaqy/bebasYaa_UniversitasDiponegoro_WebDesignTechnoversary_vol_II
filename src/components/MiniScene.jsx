import React from 'react';

// Thumbnail adegan SVG mini untuk kartu hero (tanpa foto)
export default function MiniScene({ k }) {
  if (k === 'climate') {
    return (
      <svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" className="mini-scene">
        <defs>
          <linearGradient id="mcSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8ccbec" />
            <stop offset="100%" stopColor="#ffe0bd" />
          </linearGradient>
        </defs>
        <rect width="300" height="380" fill="url(#mcSky)" />
        <circle cx="222" cy="150" r="46" fill="#fdba74" opacity="0.55" />
        <circle cx="222" cy="150" r="26" fill="#f97316" />
        <polygon points="-20,300 110,120 250,300" fill="#6f95ae" />
        <polygon points="110,120 150,200 124,190 108,214 86,188 70,200" fill="#ffffff" />
        <polygon points="150,300 230,210 330,300" fill="#a9c6d8" />
        <rect y="290" width="300" height="90" fill="#5bb6e6" />
        <polygon points="40,300 78,252 124,300" fill="#ffffff" />
        <polygon points="40,300 124,300 104,336 62,336" fill="#8fd0f0" />
      </svg>
    );
  }
  if (k === 'ocean') {
    return (
      <svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" className="mini-scene">
        <defs>
          <linearGradient id="moSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4f1ff" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <rect width="300" height="380" fill="url(#moSky)" />
        <polygon points="60,0 90,0 150,380 10,380" fill="#ffffff" opacity="0.16" />
        <polygon points="200,0 226,0 290,380 150,380" fill="#ffffff" opacity="0.12" />
        <g fill="#075985" opacity="0.5">
          <ellipse cx="90" cy="140" rx="30" ry="11" />
          <polygon points="64,140 42,128 42,152" />
          <ellipse cx="210" cy="220" rx="24" ry="9" />
          <polygon points="232,220 250,210 250,230" />
        </g>
        <circle cx="60" cy="300" r="7" fill="rgba(255,255,255,0.6)" />
        <circle cx="240" cy="270" r="5" fill="rgba(255,255,255,0.6)" />
        <path d="M0,330 Q80,300 150,330 T300,320 L300,380 L0,380 Z" fill="#fde68a" />
        <path d="M70,340 C66,300 50,280 38,258 M70,340 C72,296 70,276 76,254 M70,340 C78,304 96,284 110,262" stroke="#f97316" strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M236,344 C232,312 222,296 212,278 M236,344 C240,310 248,296 260,282" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 380" preserveAspectRatio="xMidYMid slice" className="mini-scene">
      <defs>
        <linearGradient id="mfSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaf9d3" />
          <stop offset="100%" stopColor="#86dba0" />
        </linearGradient>
      </defs>
      <rect width="300" height="380" fill="url(#mfSky)" />
      <polygon points="70,0 100,0 190,380 -10,380" fill="#fef9c3" opacity="0.4" />
      <path d="M0,230 Q90,180 170,226 T300,206 L300,380 L0,380 Z" fill="#4ade80" opacity="0.7" />
      <g>
        <rect x="58" y="210" width="10" height="90" rx="4" fill="#6b4c35" />
        <circle cx="36" cy="196" r="34" fill="#15803d" />
        <circle cx="86" cy="192" r="36" fill="#15803d" />
        <circle cx="62" cy="162" r="40" fill="#22c55e" />
      </g>
      <g>
        <rect x="204" y="236" width="10" height="82" rx="4" fill="#6b4c35" />
        <circle cx="184" cy="224" r="28" fill="#ca8a04" />
        <circle cx="228" cy="220" r="30" fill="#ca8a04" />
        <circle cx="206" cy="196" r="34" fill="#facc15" />
      </g>
      <path d="M0,320 Q120,290 220,318 T300,308 L300,380 L0,380 Z" fill="#16a34a" />
      <circle cx="140" cy="260" r="3.5" fill="#fde047" />
      <circle cx="250" cy="170" r="3" fill="#fde047" />
    </svg>
  );
}
