import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const toVisibility = (v) => (v <= 0.005 ? 'hidden' : 'visible');

/* =========================================================================
   KOMPONEN ORIGAMI PRESISI (Simetris, Utuh, & Berfaset Lipatan Kertas)
   ========================================================================= */

function OrigamiCrane({ x, y, scale = 1, color = '#ffffff', shade = '#cbd5e1', flip = false, cls = 'anim-crane-fly' }) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale})`}>
      <g className={cls} stroke="rgba(255,255,255,0.5)" strokeWidth="0.9" strokeLinejoin="round">
        {/* Sayap belakang */}
        <polygon points="-10,-2 12,-2 -2,-36" fill={shade} opacity="0.88" className="anim-wing-back" />
        {/* Badan lipatan berlian */}
        <polygon points="-34,6 -4,-7 18,3 -12,15" fill={shade} />
        <polygon points="-4,-7 18,3 4,4 -12,15" fill={color} />
        {/* Leher & paruh */}
        <polygon points="12,3 28,-22 20,4" fill={color} />
        <polygon points="28,-22 43,-14 26,-10" fill={shade} />
        {/* Ekor */}
        <polygon points="-34,6 -48,-18 -20,1" fill={color} />
        {/* Sayap depan */}
        <polygon points="-12,0 14,0 2,-38" fill={color} className="anim-wing" />
      </g>
    </g>
  );
}

function OrigamiButterfly({ x, y, scale = 1, c1 = '#facc15', c2 = '#f97316', cls = 'anim-crane-fly' }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <g className={cls} stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinejoin="round">
        <g className="anim-wing-center">
          {/* Sayap kiri atas + faset dalam */}
          <polygon points="-1,-2 -28,-22 -22,4 -1,4" fill={c1} />
          <polygon points="-1,-2 -20,-12 -14,2 -1,4" fill={c2} opacity="0.55" />
          {/* Sayap kiri bawah */}
          <polygon points="-1,4 -18,4 -13,22 -1,10" fill={c2} />
          {/* Sayap kanan atas + faset dalam */}
          <polygon points="1,-2 28,-22 22,4 1,4" fill={c2} />
          <polygon points="1,-2 20,-12 14,2 1,4" fill={c1} opacity="0.55" />
          {/* Sayap kanan bawah */}
          <polygon points="1,4 18,4 13,22 1,10" fill={c1} />
        </g>
        {/* Badan tengah */}
        <polygon points="0,-11 2.5,2 0,15 -2.5,2" fill="#0f2438" />
      </g>
    </g>
  );
}

function OrigamiBoat({ x, y, scale = 1, color = '#ffffff', shade = '#bae6fd', cls = 'anim-bob-1' }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <g className={cls} stroke="rgba(255,255,255,0.55)" strokeWidth="1" strokeLinejoin="round">
        {/* Lambung perahu kertas klasik dengan lipatan haluan & buritan */}
        <polygon points="-54,-2 0,2 -34,22" fill={shade} />
        <polygon points="0,2 54,-2 34,22" fill={shade} />
        <polygon points="-34,22 0,2 34,22" fill="#7dd3fc" />
        {/* Layar segitiga lipatan tengah */}
        <polygon points="-24,1 0,-38 0,2" fill={color} />
        <polygon points="0,-38 24,1 0,2" fill={shade} />
      </g>
    </g>
  );
}

function OrigamiWhale({ x, y, scale = 1, c1 = '#38bdf8', c2 = '#0284c7', c3 = '#075985', flip = false, opacity = 0.85 }) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale})`} opacity={opacity}>
      <g className="anim-bob-1" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinejoin="round">
        {/* Kepala & punggung berfaset */}
        <polygon points="-96,12 -36,-42 56,-26 10,24" fill={c1} />
        <polygon points="-36,-42 56,-26 10,-6" fill="#7dd3fc" opacity="0.45" />
        <polygon points="56,-26 126,6 10,24" fill={c2} />
        {/* Perut bawah */}
        <polygon points="-96,12 10,24 -34,44" fill="#e0f2fe" />
        <polygon points="10,24 126,6 56,34" fill={c3} />
        {/* Sirip dada */}
        <polygon points="-20,22 10,24 -12,56" fill={c2} />
        {/* Ekor bercabang */}
        <polygon points="126,6 165,-28 148,6" fill={c1} />
        <polygon points="126,6 166,34 148,6" fill={c3} />
      </g>
    </g>
  );
}

function OrigamiTurtle({ x, y, scale = 1, c1 = '#4ade80', c2 = '#22c55e', c3 = '#15803d', flip = false, opacity = 0.85 }) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale})`} opacity={opacity}>
      <g className="anim-bob-2" stroke="rgba(255,255,255,0.45)" strokeWidth="0.9" strokeLinejoin="round">
        {/* Sirip depan kiri & kanan */}
        <polygon points="12,-20 46,-60 34,-10" fill={c1} />
        <polygon points="12,20 46,60 34,10" fill={c2} />
        {/* Sirip belakang kiri & kanan */}
        <polygon points="-34,-16 -58,-34 -44,-6" fill={c2} />
        <polygon points="-34,16 -58,34 -44,6" fill={c3} />
        {/* Ekor kecil */}
        <polygon points="-46,0 -62,-4 -62,4" fill={c3} />
        {/* Cangkang 4 faset luar + berlian tengah */}
        <polygon points="-46,0 0,-30 0,0" fill={c2} />
        <polygon points="0,-30 46,0 0,0" fill={c1} />
        <polygon points="-46,0 0,30 0,0" fill={c3} />
        <polygon points="0,30 46,0 0,0" fill={c2} />
        <polygon points="-22,0 0,-14 22,0 0,14" fill="#86efac" opacity="0.45" />
        {/* Kepala */}
        <polygon points="46,0 68,-10 76,0 68,10" fill={c1} />
      </g>
    </g>
  );
}

function OrigamiFish({ x, y, scale = 1, c1 = '#facc15', c2 = '#f97316', flip = false }) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale})`} stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" strokeLinejoin="round">
      <g className="anim-bob-1">
        <polygon points="0,0 32,-16 54,0 32,0" fill={c1} />
        <polygon points="0,0 54,0 32,16" fill={c2} />
        <polygon points="18,-9 28,-22 34,-11" fill={c2} />
        <polygon points="0,0 -18,-13 -12,0" fill={c1} />
        <polygon points="0,0 -18,13 -12,0" fill={c2} />
      </g>
    </g>
  );
}

function OrigamiDeer({ x, y, scale = 1, c1 = '#fb923c', c2 = '#f97316', c3 = '#c2410c', flip = false }) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale})`} stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeLinejoin="round">
      {/* Ekor */}
      <polygon points="-26,-2 -34,-10 -24,-8" fill="#fef08a" />
      {/* 4 Kaki utuh proporsional */}
      <polygon points="-24,2 -16,8 -22,38 -27,38" fill={c3} />
      <polygon points="-14,6 -8,10 -10,38 -15,38" fill={c2} />
      <polygon points="14,6 20,4 18,38 13,38" fill={c3} />
      <polygon points="22,2 28,-2 31,38 26,38" fill={c2} />
      {/* Badan & dada berfaset */}
      <polygon points="-26,-2 16,-14 28,2 -14,12" fill={c2} />
      <polygon points="-26,-2 -14,12 12,8 28,2" fill={c3} />
      <polygon points="12,-10 28,2 22,12 10,4" fill={c1} opacity="0.85" />
      {/* Leher, kepala, telinga & tanduk */}
      <g className="anim-deer-head">
        <polygon points="16,-14 28,2 34,-24 24,-26" fill={c1} />
        <polygon points="24,-26 48,-20 35,-13 26,-16" fill={c2} />
        <polygon points="24,-26 18,-34 26,-30" fill={c3} />
        <polygon points="28,-26 22,-44 30,-33" fill="#fde047" />
        <polygon points="32,-26 39,-42 36,-29" fill="#facc15" />
      </g>
    </g>
  );
}

function OrigamiPine({ x, y, scale = 1, c1 = '#22c55e', c2 = '#15803d' }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <g className="anim-sway-trees" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeLinejoin="round">
        <polygon points="-5,0 5,0 3,-32 -3,-32" fill="#5c402c" />
        <polygon points="0,-160 -36,-92 0,-92" fill={c1} />
        <polygon points="0,-160 36,-92 0,-92" fill={c2} />
        <polygon points="0,-122 -48,-52 0,-52" fill={c1} />
        <polygon points="0,-122 48,-52 0,-52" fill={c2} />
        <polygon points="0,-82 -58,-18 0,-18" fill={c1} />
        <polygon points="0,-82 58,-18 0,-18" fill={c2} />
      </g>
    </g>
  );
}

function OrigamiPinwheel({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="-3" y="0" width="6" height="115" fill="#15803d" />
      <g className="anim-spin-turbine" stroke="rgba(255,255,255,0.45)" strokeWidth="0.9" strokeLinejoin="round">
        {[
          [0, '#22c55e', '#16a34a'],
          [90, '#facc15', '#eab308'],
          [180, '#f97316', '#ea580c'],
          [270, '#38bdf8', '#0284c7'],
        ].map(([deg, c1, c2]) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <polygon points="0,0 -12,-46 16,-32" fill={c1} />
            <polygon points="0,0 16,-32 6,-6" fill={c2} />
          </g>
        ))}
        <circle cx="0" cy="0" r="5" fill="#ffffff" />
      </g>
    </g>
  );
}

function OrigamiSprout({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <g className="anim-sway-trees" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeLinejoin="round">
        <polygon points="-3,0 3,0 1.5,-44 -1.5,-44" fill="#15803d" />
        <polygon points="0,-32 -34,-54 -14,-68 0,-42" fill="#4ade80" />
        <polygon points="0,-32 -14,-68 0,-42" fill="#22c55e" />
        <polygon points="0,-38 34,-62 14,-74 0,-46" fill="#facc15" />
        <polygon points="0,-38 14,-74 0,-46" fill="#eab308" />
      </g>
    </g>
  );
}

/* =========================================================================
   KOMPONEN RUMAH & MANUSIA ORIGAMI (Berfaset Lipatan Kertas & Utuh)
   ========================================================================= */

function OrigamiHuman({
  x,
  y,
  scale = 1,
  jacket = '#facc15',
  jacketShade = '#eab308',
  hair = '#1e293b',
  skin = '#fde68a',
  pants = '#0f172a',
  hasPack = true,
  hasPole = false,
  wave = false,
  flip = false,
  cls = 'anim-bob-1',
}) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale})`}>
      <g className={cls} stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeLinejoin="round">
        {/* Ransel (opsional) */}
        {hasPack && (
          <g>
            <polygon points="-14,16 -4,14 -4,44 -14,42" fill="#c2410c" />
            <polygon points="-14,16 -4,14 -4,24 -14,24" fill="#f97316" />
          </g>
        )}
        {/* Kaki kiri & kanan melangkah + sepatu */}
        <polygon points="-4,46 3,46 -3,78 -9,78" fill={pants} />
        <polygon points="-10,78 -2,78 0,83 -11,83" fill="#475569" />
        <polygon points="4,46 11,46 15,78 9,78" fill="#1e293b" />
        <polygon points="9,78 18,78 20,83 8,83" fill="#334155" />
        {/* Lengan belakang */}
        {wave ? (
          <polygon points="8,16 26,-6 30,-2 12,22" fill={jacketShade} />
        ) : (
          <polygon points="7,16 19,36 14,39 4,22" fill={jacketShade} />
        )}
        {/* Tongkat pendaki (opsional) */}
        {hasPole && <line x1="17" y1="36" x2="24" y2="83" stroke="#e2e8f0" strokeWidth="1.8" />}
        {/* Badan/Jaket origami 2 faset */}
        <polygon points="-5,14 9,14 13,47 -7,47" fill={jacket} />
        <polygon points="2,14 9,14 13,47 2,47" fill={jacketShade} />
        {/* Lengan depan */}
        <polygon points="-5,16 -13,37 -7,39 -1,22" fill={jacket} />
        {/* Leher & Kepala berfaset + topi/rambut */}
        <polygon points="0,9 5,9 5,14 0,14" fill={skin} />
        <polygon points="-4,-2 8,-2 10,8 2,12 -6,6" fill={skin} />
        <polygon points="-6,0 -2,-7 9,-6 10,1 2,-1" fill={hair} />
      </g>
    </g>
  );
}

function OrigamiForestCabin({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} stroke="rgba(255,255,255,0.38)" strokeWidth="1" strokeLinejoin="round">
      {/* Cahaya hangat di tanah */}
      <ellipse cx="0" cy="12" rx="150" ry="26" fill="#f97316" opacity="0.32" />
      {/* Cerobong & asap lipat */}
      <polygon points="46,-186 54,-198 62,-186 54,-174" fill="#ffffff" opacity="0.85" className="anim-smoke-1" />
      <polygon points="38,-145 54,-145 54,-172 38,-172" fill="#334155" />
      {/* Dinding samping kanan */}
      <polygon points="0,-165 96,0 128,-12 36,-165" fill="#7c2d12" />
      {/* Atap segitiga A-frame depan */}
      <polygon points="0,-176 -112,6 0,6" fill="#166534" />
      <polygon points="0,-176 0,6 102,6" fill="#14532d" />
      {/* Faset dinding depan krim */}
      <polygon points="0,-140 -76,6 0,6" fill="#fef3c7" />
      <polygon points="0,-140 0,6 76,6" fill="#fde68a" />
      {/* Jendela loteng & pintu hangat */}
      <g className="anim-glow">
        <polygon points="0,-108 -22,-60 22,-60" fill="#f97316" />
        <polygon points="-24,-42 -24,6 24,6 24,-42" fill="#facc15" />
        <polygon points="0,-42 0,6 24,6 24,-42" fill="#ea580c" />
      </g>
      {/* Teras kayu */}
      <polygon points="-86,6 86,6 96,15 -96,15" fill="#9a3412" />
    </g>
  );
}

function OrigamiSnowChalet({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} stroke="rgba(255,255,255,0.55)" strokeWidth="1" strokeLinejoin="round">
      {/* Cerobong asap */}
      <polygon points="28,-126 42,-126 42,-154 28,-154" fill="#475569" />
      <polygon points="35,-168 42,-178 49,-168 42,-158" fill="#ffffff" opacity="0.8" className="anim-smoke-1" />
      {/* Dinding depan & samping */}
      <polygon points="-88,0 0,0 0,-86 -88,-86" fill="#ffffff" />
      <polygon points="0,0 105,-14 105,-94 0,-86" fill="#cbd5e1" />
      {/* Atap salju lipatan tajam */}
      <polygon points="-102,-82 -44,-154 0,-82" fill="#e0f2fe" />
      <polygon points="-44,-154 66,-162 118,-90 0,-82" fill="#bae6fd" />
      <polygon points="-44,-154 66,-162 54,-146 -32,-140" fill="#ffffff" />
      {/* Jendela hangat & pintu */}
      <polygon points="-64,-58 -24,-58 -24,-18 -64,-18" fill="#facc15" className="anim-glow" />
      <polygon points="26,-62 82,-66 82,-24 26,-20" fill="#0f172a" />
      <polygon points="32,-56 54,-58 54,-26 32,-24" fill="#38bdf8" opacity="0.75" />
      <polygon points="58,-58 76,-60 76,-28 58,-26" fill="#f97316" opacity="0.85" />
      {/* Alas salju */}
      <polygon points="-96,0 112,-14 118,-4 -96,10" fill="#94a3b8" />
    </g>
  );
}

function OrigamiWatchtower({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinejoin="round">
      {/* 4 Tiang kayu kokoh + palang silang (bukan garis tipis mengambang) */}
      <polygon points="-54,0 -44,0 -36,-170 -44,-170" fill="#451a03" />
      <polygon points="44,0 54,0 44,-170 36,-170" fill="#78350f" />
      <polygon points="-48,-70 46,-115 48,-105 -46,-60" fill="#92400e" />
      <polygon points="48,-70 -46,-115 -48,-105 46,-60" fill="#78350f" />
      {/* Dek observasi & pagar */}
      <polygon points="-74,-166 74,-166 66,-154 -66,-154" fill="#b45309" />
      <polygon points="-68,-182 68,-182 68,-176 -68,-176" fill="#fde047" />
      {/* Kabin pos pantau */}
      <polygon points="-46,-166 0,-166 0,-230 -46,-230" fill="#fffbeb" />
      <polygon points="0,-166 46,-166 46,-230 0,-230" fill="#fde68a" />
      {/* Jendela menyala */}
      <polygon points="-34,-216 -8,-216 -8,-182 -34,-182" fill="#f97316" className="anim-glow" />
      <polygon points="8,-216 34,-216 34,-182 8,-182" fill="#38bdf8" opacity="0.85" />
      {/* Atap limas origami */}
      <polygon points="0,-288 -66,-226 0,-226" fill="#f97316" />
      <polygon points="0,-288 66,-226 0,-226" fill="#c2410c" />
    </g>
  );
}

function OrigamiEcoVilla({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinejoin="round">
      {/* Sayap kiri rumah */}
      <polygon points="-240,0 -240,-95 -60,-95 -60,0" fill="#ffffff" />
      <polygon points="-255,-95 -150,-165 -55,-95" fill="#22c55e" />
      <polygon points="-150,-165 -55,-95 -150,-95" fill="#15803d" />
      {/* Panel surya di atap kiri */}
      <polygon points="-210,-112 -145,-148 -110,-112 -175,-102" fill="#0284c7" />
      {/* Sayap tengah kaca hangat */}
      <polygon points="-60,0 -60,-125 90,-125 90,0" fill="#fef3c7" />
      <polygon points="-74,-125 15,-185 104,-125" fill="#facc15" />
      <polygon points="15,-185 104,-125 15,-125" fill="#eab308" />
      <polygon points="-36,-96 66,-96 66,0 -36,0" fill="#f97316" className="anim-glow" />
      <polygon points="0,-60 32,-60 32,0 0,0" fill="#7c2d12" />
      {/* Sayap kanan beranda */}
      <polygon points="90,0 90,-95 250,-95 250,0" fill="#e2e8f0" />
      <polygon points="82,-95 175,-155 265,-95" fill="#16a34a" />
      <polygon points="175,-155 265,-95 175,-95" fill="#14532d" />
      {/* Jendela-jendela beranda */}
      <polygon points="118,-72 158,-72 158,-22 118,-22" fill="#38bdf8" opacity="0.85" />
      <polygon points="178,-72 218,-72 218,-22 178,-22" fill="#fde047" opacity="0.9" />
      {/* Teras dasar */}
      <polygon points="-260,0 268,0 278,16 -270,16" fill="#0f172a" />
    </g>
  );
}

/* =========================================================================
   MASTER SCENE STAGE
   ========================================================================= */

export default function SceneStage({ mouseX, mouseY, heroKey = 'climate' }) {
  const { scrollYProgress } = useScroll();

  const bgTiltX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const bgTiltY = useTransform(mouseY, [-1, 1], [-6, 6]);
  const midTiltX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const midTiltY = useTransform(mouseY, [-1, 1], [-12, 12]);
  const fgTiltX = useTransform(mouseX, [-1, 1], [-28, 28]);
  const fgTiltY = useTransform(mouseY, [-1, 1], [-16, 16]);

  // --- SCENE 1: HERO (0.00 -> 0.17) ---
  const s1Opacity = useTransform(scrollYProgress, [0, 0.11, 0.17], [1, 1, 0]);
  const s1Vis = useTransform(s1Opacity, toVisibility);
  const s1MountainY = useTransform(scrollYProgress, [0, 0.17], [0, 85]);
  const s1MountainScale = useTransform(scrollYProgress, [0, 0.17], [1.02, 1.12]);
  const s1CabinY = useTransform(scrollYProgress, [0, 0.16], [0, 195]);
  const s1CabinOpacity = useTransform(scrollYProgress, [0, 0.1, 0.16], [1, 1, 0]);
  const s1TreesX = useTransform(scrollYProgress, [0, 0.16], [0, 130]);
  const s1TreesY = useTransform(scrollYProgress, [0, 0.16], [0, 110]);
  const s1HillY = useTransform(scrollYProgress, [0, 0.16], [0, 240]);

  // --- SCENE 2: TENTANG (0.11 -> 0.31) ---
  const s2Opacity = useTransform(scrollYProgress, [0.1, 0.16, 0.25, 0.31], [0, 1, 1, 0]);
  const s2Vis = useTransform(s2Opacity, toVisibility);
  const s2FarY = useTransform(scrollYProgress, [0.1, 0.17, 0.25, 0.31], [85, 0, 0, -55]);
  const s2MidY = useTransform(scrollYProgress, [0.11, 0.18, 0.25, 0.31], [140, 0, 0, -80]);
  const s2TreesX = useTransform(scrollYProgress, [0.11, 0.18, 0.25, 0.31], [-70, 0, 0, 70]);
  const s2FgY = useTransform(scrollYProgress, [0.12, 0.19, 0.25, 0.31], [185, 0, 0, 130]);

  // --- SCENE 3: BAB 1 IKLIM & ES (0.25 -> 0.54) ---
  const s3Opacity = useTransform(scrollYProgress, [0.24, 0.31, 0.48, 0.54], [0, 1, 1, 0]);
  const s3Vis = useTransform(s3Opacity, toVisibility);
  const s3PeaksY = useTransform(scrollYProgress, [0.24, 0.32, 0.48, 0.54], [90, 0, 0, -50]);
  const s3ChaletY = useTransform(scrollYProgress, [0.25, 0.33, 0.48, 0.54], [135, 0, 0, -75]);
  const s3ChaletScale = useTransform(scrollYProgress, [0.25, 0.34], [1.08, 1]);
  const s3IceFloeX = useTransform(scrollYProgress, [0.25, 0.4, 0.54], [-80, 0, 85]);
  const s3HikersY = useTransform(scrollYProgress, [0.26, 0.35, 0.48, 0.54], [185, 0, 0, 125]);
  const s3BridgeY = useTransform(scrollYProgress, [0.46, 0.53], [280, 0]);
  const s3BridgeOpacity = useTransform(scrollYProgress, [0.46, 0.5, 0.54], [0, 1, 0]);

  // --- SCENE 4: BAB 2 LAUTAN (0.48 -> 0.72) ---
  const s4Opacity = useTransform(scrollYProgress, [0.47, 0.53, 0.66, 0.72], [0, 1, 1, 0]);
  const s4Vis = useTransform(s4Opacity, toVisibility);
  const s4FarY = useTransform(scrollYProgress, [0.48, 0.55, 0.66, 0.72], [75, 0, 0, -45]);
  const s4WhaleX = useTransform(scrollYProgress, [0.48, 0.56, 0.66, 0.72], [-120, 0, 0, 110]);
  const s4WhaleY = useTransform(scrollYProgress, [0.48, 0.56, 0.66, 0.72], [125, 0, 0, -65]);
  const s4TurtleX = useTransform(scrollYProgress, [0.49, 0.57, 0.66, 0.72], [115, 0, 0, -100]);
  const s4ReefY = useTransform(scrollYProgress, [0.49, 0.57, 0.66, 0.72], [185, 0, 0, 150]);

  // --- SCENE 5: BAB 3 HUTAN (0.66 -> 0.89) ---
  const s5Opacity = useTransform(scrollYProgress, [0.65, 0.71, 0.83, 0.89], [0, 1, 1, 0]);
  const s5Vis = useTransform(s5Opacity, toVisibility);
  const s5ForestY = useTransform(scrollYProgress, [0.66, 0.73, 0.86], [70, 0, -35]);
  const s5TowerY = useTransform(scrollYProgress, [0.66, 0.74, 0.83, 0.89], [145, 0, 0, 155]);
  const s5DeerY = useTransform(scrollYProgress, [0.67, 0.75, 0.83, 0.89], [175, 0, 0, 185]);
  const s5BridgeCliffY = useTransform(scrollYProgress, [0.81, 0.89], [310, 0]);
  const s5BridgeCliffOpacity = useTransform(scrollYProgress, [0.81, 0.85, 0.9], [0, 1, 0]);

  // --- SCENE 6: AKSI NYATA (0.83 -> 1.00) ---
  const s6Opacity = useTransform(scrollYProgress, [0.83, 0.89], [0, 1]);
  const s6Vis = useTransform(s6Opacity, toVisibility);
  const s6SunScale = useTransform(scrollYProgress, [0.83, 0.96], [0.85, 1.03]);
  const s6HillsY = useTransform(scrollYProgress, [0.83, 0.93], [100, 0]);
  const s6VillaY = useTransform(scrollYProgress, [0.84, 0.95], [150, 0]);
  const s6VillaScale = useTransform(scrollYProgress, [0.84, 0.96], [1.06, 1]);

  return (
    <div className="stage" aria-hidden="true">
      {/* =====================================================================
          SCENE 2: TENTANG
      ====================================================================== */}
      <motion.div style={{ opacity: s2Opacity, visibility: s2Vis }} className="stage-scene scene-bg-about">
        <motion.div style={{ y: s2FarY, x: bgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <g transform="translate(250, 190)">
              <polygon points="0,-78 55,-55 78,0 55,55 0,78 -55,55 -78,0 -55,-55" fill="#fde047" className="anim-spin-slow" />
              <polygon points="0,-54 38,-38 54,0 38,38 0,54 -38,38 -54,0 -38,-38" fill="#facc15" />
            </g>
            <g className="anim-cloud-drift-1" fill="#ffffff" opacity="0.88">
              <polygon points="340,155 385,115 440,130 485,105 535,155" />
              <polygon points="340,155 440,130 485,155" fill="#e2e8f0" opacity="0.55" />
            </g>
            <g className="anim-cloud-drift-2" fill="#ffffff" opacity="0.78">
              <polygon points="940,175 990,130 1050,150 1100,120 1160,175" />
            </g>
            <polygon points="-80,800 220,340 420,580 580,580" fill="#bae6fd" />
            <polygon points="220,340 580,580 340,800" fill="#7dd3fc" opacity="0.7" />
            <polygon points="580,580 920,310 1280,560 1520,380 1520,800" fill="#bae6fd" />
            <polygon points="920,310 1280,560 940,800" fill="#7dd3fc" opacity="0.65" />
          </svg>
        </motion.div>

        <motion.div style={{ y: s2MidY, x: midTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-60,820 340,480 760,620 1180,470 1520,620 1520,820" fill="#86efac" />
            <polygon points="340,480 760,620 420,820" fill="#4ade80" opacity="0.7" />
            <OrigamiCrane x={380} y={220} scale={1.1} color="#ffffff" shade="#bae6fd" />
            <OrigamiCrane x={620} y={150} scale={0.78} color="#bbf7d0" shade="#22c55e" />
            <OrigamiCrane x={920} y={260} scale={0.95} color="#fef08a" shade="#eab308" flip />
            <OrigamiButterfly x={1150} y={200} scale={0.9} c1="#facc15" c2="#f97316" />
            <OrigamiButterfly x={220} y={320} scale={0.78} c1="#38bdf8" c2="#22c55e" />
            <OrigamiBoat x={760} y={625} scale={0.95} color="#ffffff" shade="#bae6fd" />
          </svg>
        </motion.div>

        <motion.div style={{ y: s2FgY, x: s2TreesX }} className="stage-layer">
          <motion.svg style={{ x: fgTiltX }} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <OrigamiPine x={130} y={695} scale={1} c1="#22c55e" c2="#15803d" />
            <OrigamiPine x={250} y={710} scale={0.76} c1="#4ade80" c2="#16a34a" />
            <OrigamiPine x={1180} y={705} scale={0.8} c1="#facc15" c2="#ca8a04" />
            <OrigamiPine x={1300} y={690} scale={1.08} c1="#f97316" c2="#c2410c" />
            <polygon points="-60,860 360,645 840,700 1240,635 1520,715 1520,860" fill="#fde047" opacity="0.9" />
            <OrigamiDeer x={360} y={610} scale={0.9} />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* =====================================================================
          SCENE 1: HERO (Crossfade mulus tanpa mode="wait")
      ====================================================================== */}
      <motion.div style={{ opacity: s1Opacity, visibility: s1Vis }} className="stage-scene scene-bg-hero-base">
        <AnimatePresence initial={false}>
          {heroKey === 'climate' && (
            <motion.div
              key="hero-climate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="stage-scene scene-bg-hero-climate"
            >
              <motion.div style={{ y: s1MountainY, scale: s1MountainScale, x: bgTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <polygon points="1090,115 1155,152 1155,228 1090,265 1025,228 1025,152" fill="#f97316" opacity="0.7" className="anim-glow" />
                  <polygon points="1090,138 1135,164 1135,216 1090,242 1045,216 1045,164" fill="#fde047" opacity="0.9" />
                  <polygon points="-80,800 220,250 540,600" fill="#7dd3fc" stroke="rgba(255,255,255,0.45)" />
                  <polygon points="220,250 540,600 220,800" fill="#0284c7" />
                  <polygon points="480,800 840,220 1200,620" fill="#e0f2fe" stroke="rgba(255,255,255,0.6)" />
                  <polygon points="840,220 1200,620 840,800" fill="#0369a1" />
                  <polygon points="840,220 960,355 840,380 725,355" fill="#ffffff" />
                  <polygon points="1060,800 1320,330 1540,800" fill="#bae6fd" />
                  <polygon points="1320,330 1540,800 1320,800" fill="#075985" />
                  <OrigamiCrane x={260} y={195} scale={1.15} color="#ffffff" shade="#bae6fd" />
                  <OrigamiCrane x={390} y={150} scale={0.82} color="#fef08a" shade="#eab308" />
                  <OrigamiCrane x={540} y={215} scale={0.95} color="#ffffff" shade="#cbd5e1" />
                  <OrigamiCrane x={920} y={165} scale={0.75} color="#fed7aa" shade="#f97316" flip />
                </svg>
              </motion.div>
              <motion.div style={{ y: s1CabinY, opacity: s1CabinOpacity, x: midTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <OrigamiBoat x={580} y={620} scale={1.3} color="#ffffff" shade="#bae6fd" cls="anim-bob-1" />
                  <OrigamiBoat x={820} y={640} scale={0.9} color="#fef08a" shade="#facc15" cls="anim-bob-2" />
                  <g transform="translate(1060, 595)">
                    <g className="anim-bob-2">
                      <polygon points="0,45 65,-35 65,45" fill="#ffffff" />
                      <polygon points="65,-35 140,45 65,45" fill="#7dd3fc" />
                    </g>
                  </g>
                  <g transform="translate(240, 610)">
                    <g className="anim-bob-1">
                      <polygon points="0,35 45,-25 45,35" fill="#e0f2fe" />
                      <polygon points="45,-25 98,35 45,35" fill="#38bdf8" />
                    </g>
                  </g>
                </svg>
              </motion.div>
              <motion.div style={{ y: s1HillY, x: fgTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <polygon points="-60,880 -60,655 440,615 980,660 1500,620 1500,880" fill="#075985" stroke="rgba(255,255,255,0.28)" />
                  <polygon points="-60,880 380,685 960,715 1500,670 1500,880" fill="#0c4a6e" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {heroKey === 'ocean' && (
            <motion.div
              key="hero-ocean"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="stage-scene scene-bg-hero-ocean"
            >
              <motion.div style={{ y: s1MountainY, scale: s1MountainScale, x: bgTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <polygon points="240,0 350,0 560,800 90,800" fill="#ffffff" opacity="0.14" />
                  <polygon points="780,0 890,0 1120,800 620,800" fill="#ffffff" opacity="0.12" />
                  <OrigamiWhale x={980} y={280} scale={1.15} opacity={0.9} />
                  <OrigamiWhale x={640} y={375} scale={0.55} c1="#7dd3fc" c2="#0ea5e9" c3="#0369a1" opacity={0.8} />
                </svg>
              </motion.div>
              <motion.div style={{ y: s1CabinY, opacity: s1CabinOpacity, x: midTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <OrigamiTurtle x={520} y={480} scale={1.05} />
                  <OrigamiTurtle x={1180} y={505} scale={0.78} flip />
                  <g className="anim-cloud-drift-1">
                    <OrigamiFish x={240} y={290} scale={1.1} c1="#facc15" c2="#f97316" />
                    <OrigamiFish x={320} y={335} scale={0.8} c1="#ffffff" c2="#bae6fd" />
                    <OrigamiFish x={375} y={260} scale={0.7} c1="#fb923c" c2="#ea580c" />
                  </g>
                  <g className="anim-cloud-drift-2">
                    <OrigamiFish x={1080} y={190} scale={0.9} c1="#facc15" c2="#eab308" flip />
                    <OrigamiFish x={1160} y={225} scale={0.7} c1="#bae6fd" c2="#38bdf8" flip />
                  </g>
                </svg>
              </motion.div>
              <motion.div style={{ y: s1HillY, x: fgTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <polygon points="-60,880 -60,645 360,575 740,645 1120,585 1500,635 1500,880" fill="#0284c7" stroke="rgba(255,255,255,0.35)" />
                  <polygon points="-60,880 400,675 940,705 1500,665 1500,880" fill="#075985" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {heroKey === 'forest' && (
            <motion.div
              key="hero-forest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="stage-scene scene-bg-hero-forest"
            >
              <motion.div style={{ y: s1MountainY, scale: s1MountainScale, x: bgTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <polygon points="-100,800 180,270 520,560" fill="#166534" stroke="rgba(255,255,255,0.22)" />
                  <polygon points="420,800 760,310 1120,620" fill="#15803d" stroke="rgba(255,255,255,0.22)" />
                  <OrigamiButterfly x={320} y={200} scale={1.15} c1="#facc15" c2="#f97316" />
                  <OrigamiButterfly x={460} y={260} scale={0.8} c1="#4ade80" c2="#facc15" />
                  <OrigamiButterfly x={950} y={175} scale={0.95} c1="#fb923c" c2="#facc15" />
                  <OrigamiCrane x={720} y={145} scale={0.9} color="#ffffff" shade="#bbf7d0" />
                </svg>
              </motion.div>
              <motion.div style={{ y: s1CabinY, opacity: s1CabinOpacity, x: midTiltX }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <OrigamiForestCabin x={690} y={632} scale={1.08} />
                </svg>
              </motion.div>
              <motion.div style={{ x: s1TreesX, y: s1TreesY }} className="stage-layer">
                <motion.svg style={{ x: fgTiltX, y: fgTiltY }} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <OrigamiPine x={1015} y={620} scale={1.05} c1="#4ade80" c2="#16a34a" />
                  <OrigamiPine x={1125} y={615} scale={1.3} c1="#22c55e" c2="#15803d" />
                  <OrigamiPine x={1235} y={620} scale={1.0} c1="#facc15" c2="#ca8a04" />
                  <OrigamiDeer x={1075} y={595} scale={1.05} />
                  <OrigamiDeer x={960} y={608} scale={0.82} c1="#fde047" c2="#facc15" c3="#ca8a04" flip />
                </motion.svg>
              </motion.div>
              <motion.div style={{ y: s1HillY }} className="stage-layer">
                <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
                  <polygon points="-60,880 -60,645 420,595 960,640 1500,605 1500,880" fill="#14532d" />
                  <polygon points="-60,880 320,665 880,690 1500,645 1500,880" fill="#052e16" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* =====================================================================
          SCENE 3: BAB 1 IKLIM & ES
      ====================================================================== */}
      <motion.div style={{ opacity: s3Opacity, visibility: s3Vis }} className="stage-scene scene-bg-climate">
        <motion.div style={{ y: s3PeaksY, x: bgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="1140,120 1190,145 1210,195 1185,245 1135,265 1085,240 1065,190 1090,140" fill="#fde047" opacity="0.7" />
            <polygon points="1140,145 1175,165 1185,205 1160,235 1120,235 1095,205 1105,165" fill="#f97316" opacity="0.85" />
            <polygon points="560,600 860,210 860,600" fill="#bae6fd" stroke="rgba(255,255,255,0.5)" />
            <polygon points="860,210 1160,600 860,600" fill="#759bb5" />
            <polygon points="860,210 950,328 860,340 775,328" fill="#ffffff" />
            <polygon points="860,210 950,328 860,340" fill="#e2e8f0" />
            <OrigamiCrane x={240} y={200} scale={1.05} color="#ffffff" shade="#bae6fd" />
            <OrigamiCrane x={430} y={145} scale={0.78} color="#fed7aa" shade="#f97316" />
            <OrigamiCrane x={690} y={175} scale={0.85} color="#ffffff" shade="#cbd5e1" flip />
            <OrigamiCrane x={1010} y={150} scale={0.7} color="#fef08a" shade="#eab308" />
          </svg>
        </motion.div>

        <motion.div style={{ y: s3ChaletY, scale: s3ChaletScale, x: midTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-50,820 -50,565 440,505 940,560 1500,520 1500,820" fill="#d8eaf2" stroke="rgba(255,255,255,0.6)" />
            <polygon points="-50,820 420,575 1080,605 1500,565 1500,820" fill="#edf5f9" />
            <OrigamiSnowChalet x={385} y={525} scale={1.18} />
          </svg>
        </motion.div>

        <motion.div style={{ x: s3IceFloeX, y: s3HikersY }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <g transform="translate(1040, 565)">
              <g className="anim-bob-1">
                <polygon points="0,45 55,-25 55,45" fill="#ffffff" />
                <polygon points="55,-25 125,45 55,45" fill="#7dd3fc" />
              </g>
            </g>
            <g transform="translate(115, 585)">
              <g className="anim-bob-2">
                <polygon points="0,40 42,-20 42,40" fill="#ffffff" />
                <polygon points="42,-20 94,40 42,40" fill="#bae6fd" />
              </g>
            </g>
            <OrigamiBoat x={780} y={595} scale={1.15} color="#ffffff" shade="#bae6fd" />
            <OrigamiBoat x={940} y={620} scale={0.85} color="#fef08a" shade="#facc15" cls="anim-bob-2" />
            <OrigamiBoat x={1250} y={605} scale={0.95} color="#fed7aa" shade="#f97316" cls="anim-bob-1" />
          </svg>
        </motion.div>

        <motion.div style={{ y: s3HikersY, x: fgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-50,880 -50,645 420,590 880,655 1500,625 1500,880" fill="#ffffff" />
            <OrigamiHuman x={545} y={525} scale={1.15} jacket="#facc15" jacketShade="#eab308" hasPack hasPole cls="anim-bob-1" />
            <OrigamiHuman x={615} y={536} scale={1.12} jacket="#f97316" jacketShade="#ea580c" hair="#7c2d12" hasPack wave flip cls="anim-bob-2" />
          </svg>
        </motion.div>

        <motion.div style={{ y: s3BridgeY, opacity: s3BridgeOpacity }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-60,850 -60,640 360,550 760,640 1160,565 1500,610 1500,850" fill="#0ea5e9" />
          </svg>
        </motion.div>
      </motion.div>

      {/* =====================================================================
          SCENE 4: BAB 2 LAUTAN
      ====================================================================== */}
      <motion.div style={{ opacity: s4Opacity, visibility: s4Vis }} className="stage-scene scene-bg-ocean">
        <motion.div style={{ y: s4FarY, x: bgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="220,0 320,0 520,800 80,800" fill="#ffffff" opacity="0.2" />
            <polygon points="680,0 780,0 980,800 540,800" fill="#ffffff" opacity="0.16" />
            <polygon points="1080,0 1160,0 1360,800 940,800" fill="#ffffff" opacity="0.14" />
            <polygon points="280,515 288,505 296,515 288,525" fill="#ffffff" opacity="0.65" className="anim-bubble-1" />
            <polygon points="740,575 750,563 760,575 750,587" fill="#ffffff" opacity="0.6" className="anim-bubble-2" />
            <polygon points="1140,545 1148,535 1156,545 1148,555" fill="#ffffff" opacity="0.6" className="anim-bubble-1" />
          </svg>
        </motion.div>

        <motion.div style={{ x: s4WhaleX, y: s4WhaleY }} className="stage-layer">
          <motion.svg
            style={{ x: midTiltX, y: midTiltY }}
            viewBox="0 0 1440 800"
            preserveAspectRatio="xMidYMax slice"
            className="stage-svg"
          >
            <OrigamiWhale x={980} y={290} scale={1.15} opacity={0.62} />
            <OrigamiWhale x={420} y={195} scale={0.55} c1="#7dd3fc" c2="#0ea5e9" c3="#0369a1" flip opacity={0.55} />
            <g className="anim-cloud-drift-1" opacity="0.75">
              <OrigamiFish x={360} y={230} scale={1.0} c1="#facc15" c2="#f97316" />
              <OrigamiFish x={460} y={265} scale={0.75} c1="#ffffff" c2="#bae6fd" />
              <OrigamiFish x={550} y={210} scale={0.85} c1="#fb923c" c2="#ea580c" />
              <OrigamiFish x={240} y={510} scale={0.75} c1="#4ade80" c2="#16a34a" />
            </g>
            <g className="anim-cloud-drift-2" opacity="0.72">
              <OrigamiFish x={1140} y={430} scale={0.9} c1="#facc15" c2="#eab308" flip />
              <OrigamiFish x={1230} y={465} scale={0.65} c1="#ffffff" c2="#bae6fd" flip />
              <OrigamiFish x={1060} y={475} scale={0.7} c1="#fb923c" c2="#ea580c" flip />
            </g>
          </motion.svg>
        </motion.div>

        <motion.div style={{ x: s4TurtleX, y: s4WhaleY }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <OrigamiTurtle x={230} y={390} scale={0.95} opacity={0.72} />
            <OrigamiTurtle x={760} y={460} scale={0.68} opacity={0.65} flip />
            <OrigamiTurtle x={1240} y={360} scale={0.8} opacity={0.68} flip />
          </svg>
        </motion.div>

        <motion.div style={{ y: s4ReefY, x: fgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-60,860 -60,645 380,590 820,645 1240,605 1500,625 1500,860" fill="#bae6fd" stroke="rgba(255,255,255,0.5)" />
            <polygon points="-60,860 360,665 960,695 1500,675 1500,860" fill="#fde68a" />
            <g className="anim-sway-trees">
              <polygon points="180,715 155,610 190,635" fill="#f97316" />
              <polygon points="180,715 215,600 190,635" fill="#ea580c" />
              <polygon points="310,725 290,645 315,665" fill="#facc15" />
              <polygon points="310,725 335,640 315,665" fill="#eab308" />
              <polygon points="1110,725 1090,645 1115,665" fill="#f97316" />
              <polygon points="1110,725 1135,640 1115,665" fill="#ea580c" />
              <polygon points="1240,720 1210,615 1248,640" fill="#22c55e" />
              <polygon points="1240,720 1278,605 1248,640" fill="#15803d" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* =====================================================================
          SCENE 5: BAB 3 HUTAN
      ====================================================================== */}
      <motion.div style={{ opacity: s5Opacity, visibility: s5Vis }} className="stage-scene scene-bg-forest">
        <motion.div style={{ y: s5ForestY, x: bgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="180,0 280,0 520,800 60,800" fill="#fef08a" opacity="0.28" />
            <polygon points="640,0 740,0 980,800 520,800" fill="#fef08a" opacity="0.22" />
            <polygon points="-50,800 220,455 480,555 760,435 1080,565 1490,465 1490,800" fill="#bbf7d0" stroke="rgba(255,255,255,0.45)" />
            {[110, 175, 240, 305, 370, 435, 500, 565, 630, 695, 760, 825, 1340].map((xPos, idx) => {
              const h = 68 + (idx % 3) * 24;
              const baseY = 590;
              return (
                <g key={xPos}>
                  <polygon points={`${xPos},${baseY - h} ${xPos - 22},${baseY} ${xPos},${baseY}`} fill={idx % 4 === 0 ? '#4ade80' : '#22c55e'} />
                  <polygon points={`${xPos},${baseY - h} ${xPos + 22},${baseY} ${xPos},${baseY}`} fill="#15803d" />
                </g>
              );
            })}
            <OrigamiCrane x={320} y={195} scale={0.95} color="#ffffff" shade="#bbf7d0" />
            <OrigamiCrane x={1150} y={170} scale={0.8} color="#fef08a" shade="#eab308" flip />
            <OrigamiButterfly x={560} y={175} scale={1.0} c1="#facc15" c2="#f97316" />
            <OrigamiButterfly x={780} y={240} scale={0.82} c1="#4ade80" c2="#facc15" />
            <OrigamiButterfly x={210} y={295} scale={0.75} c1="#fb923c" c2="#facc15" />
          </svg>
        </motion.div>

        <motion.div style={{ y: s5TowerY, x: midTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <OrigamiWatchtower x={1065} y={625} scale={1.08} />
          </svg>
        </motion.div>

        <motion.div style={{ y: s5DeerY, x: fgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-60,880 -60,615 480,570 960,615 1500,590 1500,880" fill="#dcfce7" stroke="rgba(255,255,255,0.5)" />
            <OrigamiPine x={140} y={640} scale={0.9} c1="#22c55e" c2="#15803d" />
            <OrigamiPine x={255} y={655} scale={0.72} c1="#facc15" c2="#ca8a04" />
            <OrigamiPine x={1285} y={645} scale={0.95} c1="#f97316" c2="#c2410c" />
            <OrigamiDeer x={630} y={562} scale={1} />
            <OrigamiDeer x={745} y={574} scale={0.8} c1="#fde047" c2="#facc15" c3="#ca8a04" flip />
            <OrigamiDeer x={450} y={576} scale={0.76} />
          </svg>
        </motion.div>

        <motion.div style={{ y: s5BridgeCliffY, opacity: s5BridgeCliffOpacity }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-50,800 -50,420 180,375 380,455 620,395 920,450 1240,365 1500,410 1500,800" fill="#166534" />
          </svg>
        </motion.div>
      </motion.div>

      {/* =====================================================================
          SCENE 6: AKSI NYATA
      ====================================================================== */}
      <motion.div style={{ opacity: s6Opacity, visibility: s6Vis }} className="stage-scene scene-bg-action">
        <motion.div style={{ y: s6HillsY, scale: s6SunScale, x: bgTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <g transform="translate(720, 250)">
              <polygon points="0,-130 92,-92 130,0 92,92 0,130 -92,92 -130,0 -92,-92" fill="#fde047" opacity="0.55" className="anim-spin-slow" />
              <polygon points="0,-88 62,-62 88,0 62,62 0,88 -62,62 -88,0 -62,-62" fill="#facc15" opacity="0.88" />
            </g>
            <OrigamiPinwheel x={180} y={425} scale={1.1} />
            <OrigamiPinwheel x={335} y={445} scale={0.78} />
            <OrigamiPinwheel x={1100} y={435} scale={0.82} />
            <OrigamiPinwheel x={1260} y={410} scale={1.05} />
            <OrigamiCrane x={460} y={195} scale={0.95} color="#ffffff" shade="#fde047" />
            <OrigamiCrane x={1020} y={180} scale={0.8} color="#ffffff" shade="#bae6fd" flip />
            <OrigamiButterfly x={620} y={240} scale={0.9} c1="#22c55e" c2="#facc15" />
            <OrigamiButterfly x={860} y={210} scale={0.85} c1="#f97316" c2="#facc15" />
          </svg>
        </motion.div>

        <motion.div style={{ y: s6VillaY, scale: s6VillaScale, x: midTiltX }} className="stage-layer">
          <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice" className="stage-svg">
            <polygon points="-50,800 -50,460 140,420 290,495 460,450 650,505 880,445 1140,490 1340,405 1500,440 1500,800" fill="#14532d" stroke="rgba(255,255,255,0.3)" />
            <OrigamiSprout x={120} y={510} scale={0.95} />
            <OrigamiSprout x={240} y={525} scale={0.8} />
            <OrigamiSprout x={1210} y={515} scale={0.9} />
            <OrigamiSprout x={1330} y={505} scale={1.0} />
            <OrigamiEcoVilla x={720} y={695} scale={1.25} />
            <OrigamiHuman x={320} y={555} scale={1.15} jacket="#22c55e" jacketShade="#15803d" hasPack={false} wave cls="anim-bob-1" />
            <OrigamiHuman x={1125} y={560} scale={1.12} jacket="#38bdf8" jacketShade="#0284c7" hair="#7c2d12" hasPack={false} flip cls="anim-bob-2" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
