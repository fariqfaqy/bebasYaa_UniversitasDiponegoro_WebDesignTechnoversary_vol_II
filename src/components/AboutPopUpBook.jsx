import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, ArrowRight, RotateCw } from 'lucide-react';

const SLIDES = [
  {
    key: 'climate',
    cover: '#c2410c',
    accent: '#f97316',
    title: { id: '01. IKLIM & ES', en: '01. CLIMATE & ICE' },
    leftLines: {
      id: ['Suhu bumi naik +1,1°C', 'Es kutub & Salju Papua', 'terus menyusut tiap tahun.'],
      en: ['Earth warmed +1.1°C', 'Polar & Papua glaciers', 'keep shrinking every year.'],
    },
    rightLines: {
      id: ['Muka laut naik 20+ cm', 'Cuaca ekstrem menguat', 'mengancam wilayah pesisir.'],
      en: ['Sea level up 20+ cm', 'Extreme weather grows', 'threatening coastal cities.'],
    },
  },
  {
    key: 'ocean',
    cover: '#0369a1',
    accent: '#0ea5e9',
    title: { id: '02. LAUTAN PLASTIK', en: '02. OCEAN PLASTIC' },
    leftLines: {
      id: ['11 juta ton plastik', 'masuk ke laut tiap tahun', 'terurai jadi mikroplastik.'],
      en: ['11M tonnes of plastic', 'enter oceans each year', 'breaking into microplastics.'],
    },
    rightLines: {
      id: ['Ditelan plankton & ikan', 'Mengancam penyu, karang', 'hingga rantai pangan kita.'],
      en: ['Eaten by plankton & fish', 'Threatens turtles, reefs', 'and our own food web.'],
    },
  },
  {
    key: 'forest',
    cover: '#15803d',
    accent: '#22c55e',
    title: { id: '03. HUTAN HUJAN', en: '03. RAINFORESTS' },
    leftLines: {
      id: ['420 juta ha hutan hilang', 'Kalimantan & Amazon', 'penjaga karbon planet.'],
      en: ['420M ha forest lost', 'Borneo & the Amazon', 'guard global carbon.'],
    },
    rightLines: {
      id: ['Flora & fauna terdesak', 'Pembukaan lahan melepas', 'emisi pemanas bumi.'],
      en: ['Flora & fauna cornered', 'Land clearing releases', 'planet-warming carbon.'],
    },
  },
];

// Tekstur serat kertas prosedural (bump & grain) untuk kesan kertas asli
function createPaperGrainTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 44;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  return tex;
}

// Halaman buku melengkung alami (gull-wing arch dari lipatan tengah ke tepi luar)
function createCurvedPageGeometry(width, depth, isRight, segs = 28) {
  const geo = new THREE.PlaneGeometry(width, depth, segs, 1);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    // t = 0 di lipatan tengah, 1 di tepi luar
    const t = (x + width / 2) / width;
    const u = isRight ? t : 1 - t;
    // Lengkungan kertas alami: naik dari lipatan tengah, melandai di tepi luar
    const arch = Math.sin(u * Math.PI) * 0.17 + u * 0.03;
    pos.setY(i, arch);
  }
  geo.computeVertexNormals();
  return geo;
}

// Tekstur halaman buku cetak dengan garis tepi, tipografi, dan serat kertas
function createPageTexture(title, lines, accentHex, isRight) {
  const c = document.createElement('canvas');
  c.width = 640;
  c.height = 800;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#fbf4e4';
  ctx.fillRect(0, 0, c.width, c.height);

  // Serat kertas tipis
  for (let i = 0; i < 3200; i++) {
    ctx.fillStyle = i % 2 ? 'rgba(130,100,65,0.025)' : 'rgba(255,255,255,0.06)';
    ctx.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
  }

  // Bayangan lipatan tengah buku
  const g = isRight
    ? ctx.createLinearGradient(0, 0, 74, 0)
    : ctx.createLinearGradient(c.width, 0, c.width - 74, 0);
  g.addColorStop(0, 'rgba(92, 68, 44, 0.28)');
  g.addColorStop(0.5, 'rgba(92, 68, 44, 0.08)');
  g.addColorStop(1, 'rgba(92, 68, 44, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(isRight ? 0 : c.width - 74, 0, 74, c.height);

  // Bingkai tipis halaman
  ctx.strokeStyle = 'rgba(120, 95, 65, 0.16)';
  ctx.lineWidth = 2;
  ctx.strokeRect(32, 32, c.width - 64, c.height - 64);

  // Teks dicetak di area bawah halaman (seperti foto referensi buku pop-up)
  ctx.fillStyle = accentHex;
  ctx.fillRect(54, 528, 92, 6);

  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 28px Oswald, sans-serif';
  ctx.fillText(title, 54, 572);

  ctx.fillStyle = '#475569';
  ctx.font = '20px "Plus Jakarta Sans", sans-serif';
  lines.forEach((line, idx) => {
    ctx.fillText(line, 54, 616 + idx * 30);
  });

  // Baris teks kecil di paling bawah
  ctx.fillStyle = 'rgba(30, 41, 59, 0.16)';
  for (let i = 0; i < 2; i++) {
    ctx.fillRect(54, 720 + i * 18, i === 1 ? 260 : 510, 6);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Helper membuat potongan kertas die-cut berlukis cat air + bayangan sesuai siluet alpha!
function createDieCutCard(w, h, drawFn, paperBump) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = Math.round(512 * (h / w));
  const ctx = c.getContext('2d');
  drawFn(ctx, c.width, c.height);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    bumpMap: paperBump,
    bumpScale: 0.008,
    alphaTest: 0.45,
    roughness: 0.86,
    metalness: 0.01,
    side: THREE.DoubleSide,
  });

  const geo = new THREE.PlaneGeometry(w, h);
  geo.translate(0, h / 2, 0);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  // Custom depth material agar bayangan mengikuti bentuk siluet potongan kertas
  mesh.customDepthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
    map: tex,
    alphaTest: 0.45,
  });
  return mesh;
}

// Gambar kanopi awan laser-cut krem seperti latar foto referensi
function drawCloudBackdrop(ctx, W, H, tint = '#f4ead5', outline = '#dfd0b4') {
  ctx.fillStyle = tint;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 8;

  ctx.beginPath();
  ctx.moveTo(W * 0.04, H);
  ctx.lineTo(W * 0.04, H * 0.56);
  ctx.arc(W * 0.18, H * 0.52, W * 0.14, Math.PI, 0, false);
  ctx.arc(W * 0.38, H * 0.34, W * 0.18, Math.PI * 0.9, 0.1, false);
  ctx.arc(W * 0.62, H * 0.28, W * 0.2, Math.PI * 0.95, 0, false);
  ctx.arc(W * 0.84, H * 0.48, W * 0.13, Math.PI * 0.85, 0, false);
  ctx.lineTo(W * 0.96, H);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lubang ukiran kertas (cutout)
  ctx.globalCompositeOperation = 'destination-out';
  [
    [W * 0.34, H * 0.42, W * 0.055, H * 0.04],
    [W * 0.64, H * 0.34, W * 0.065, H * 0.045],
    [W * 0.82, H * 0.54, W * 0.045, H * 0.032],
  ].forEach(([cx, cy, rx, ry]) => {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalCompositeOperation = 'source-over';
}

// Gambar pohon cat air papercraft dengan tepi kertas tipis
function drawWatercolorTree(ctx, W, H, c1, c2, trunk = '#5c402c') {
  // Batang & cabang
  ctx.strokeStyle = trunk;
  ctx.lineCap = 'round';
  ctx.lineWidth = W * 0.075;
  ctx.beginPath();
  ctx.moveTo(W * 0.5, H * 0.98);
  ctx.lineTo(W * 0.5, H * 0.45);
  ctx.stroke();

  ctx.lineWidth = W * 0.04;
  ctx.beginPath();
  ctx.moveTo(W * 0.5, H * 0.62);
  ctx.lineTo(W * 0.32, H * 0.42);
  ctx.moveTo(W * 0.5, H * 0.58);
  ctx.lineTo(W * 0.68, H * 0.4);
  ctx.stroke();

  // Rumpun daun berlapis dengan gradasi cat air
  const grad = ctx.createRadialGradient(W * 0.45, H * 0.28, W * 0.05, W * 0.5, H * 0.36, W * 0.42);
  grad.addColorStop(0, c1);
  grad.addColorStop(1, c2);

  ctx.fillStyle = grad;
  ctx.strokeStyle = '#faf3e3';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(W * 0.5, H * 0.3, W * 0.24, 0, Math.PI * 2);
  ctx.arc(W * 0.3, H * 0.4, W * 0.18, 0, Math.PI * 2);
  ctx.arc(W * 0.7, H * 0.39, W * 0.19, 0, Math.PI * 2);
  ctx.arc(W * 0.42, H * 0.46, W * 0.17, 0, Math.PI * 2);
  ctx.arc(W * 0.58, H * 0.46, W * 0.17, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

// Gambar pegunungan berfaset & salju
function drawMountainLayer(ctx, W, H, rockDark, rockLight, snow = true) {
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, rockLight);
  grad.addColorStop(1, rockDark);

  ctx.fillStyle = grad;
  ctx.strokeStyle = '#faf3e3';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(W * 0.04, H);
  ctx.lineTo(W * 0.25, H * 0.36);
  ctx.lineTo(W * 0.38, H * 0.52);
  ctx.lineTo(W * 0.56, H * 0.1);
  ctx.lineTo(W * 0.76, H * 0.48);
  ctx.lineTo(W * 0.88, H * 0.34);
  ctx.lineTo(W * 0.96, H);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Sisi bayangan gunung
  ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
  ctx.beginPath();
  ctx.moveTo(W * 0.56, H * 0.1);
  ctx.lineTo(W * 0.76, H * 0.48);
  ctx.lineTo(W * 0.58, H);
  ctx.lineTo(W * 0.48, H * 0.58);
  ctx.closePath();
  ctx.fill();

  if (snow) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(W * 0.56, H * 0.1);
    ctx.lineTo(W * 0.44, H * 0.36);
    ctx.lineTo(W * 0.52, H * 0.32);
    ctx.lineTo(W * 0.58, H * 0.4);
    ctx.lineTo(W * 0.67, H * 0.32);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(W * 0.25, H * 0.36);
    ctx.lineTo(W * 0.18, H * 0.52);
    ctx.lineTo(W * 0.26, H * 0.48);
    ctx.lineTo(W * 0.32, H * 0.54);
    ctx.closePath();
    ctx.fill();
  }
}

// Gambar ombak laut berbusa
function drawOceanWave(ctx, W, H, cTop, cBot) {
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, cTop);
  grad.addColorStop(1, cBot);
  ctx.fillStyle = grad;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 7;

  ctx.beginPath();
  ctx.moveTo(W * 0.03, H);
  ctx.quadraticCurveTo(W * 0.18, H * 0.22, W * 0.35, H * 0.45);
  ctx.quadraticCurveTo(W * 0.52, H * 0.12, W * 0.72, H * 0.44);
  ctx.quadraticCurveTo(W * 0.86, H * 0.24, W * 0.97, H);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// Gambar paus bungkuk melompat
function drawWhaleCutout(ctx, W, H) {
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#0284c7');
  grad.addColorStop(1, '#0f2438');
  ctx.fillStyle = grad;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(W * 0.2, H * 0.95);
  ctx.quadraticCurveTo(W * 0.22, H * 0.2, W * 0.55, H * 0.18);
  ctx.quadraticCurveTo(W * 0.78, H * 0.22, W * 0.74, H * 0.65);
  ctx.quadraticCurveTo(W * 0.88, H * 0.58, W * 0.92, H * 0.72);
  ctx.quadraticCurveTo(W * 0.75, H * 0.82, W * 0.62, H * 0.95);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function buildClimateDiorama(paperBump) {
  const g = new THREE.Group();

  // Awan laser-cut krem di belakang
  const cloud = createDieCutCard(3.7, 1.55, (c, w, h) => drawCloudBackdrop(c, w, h), paperBump);
  cloud.position.set(0, 0.08, -1.18);
  g.add(cloud);

  // Matahari oranye-kuning cat air
  const sun = createDieCutCard(
    0.95,
    0.95,
    (c, w, h) => {
      const gr = c.createRadialGradient(w / 2, h / 2, w * 0.1, w / 2, h / 2, w * 0.45);
      gr.addColorStop(0, '#fde047');
      gr.addColorStop(0.65, '#f97316');
      gr.addColorStop(1, '#ea580c');
      c.fillStyle = gr;
      c.strokeStyle = '#fffbeb';
      c.lineWidth = 6;
      c.beginPath();
      c.arc(w / 2, h / 2, w * 0.42, 0, Math.PI * 2);
      c.fill();
      c.stroke();
    },
    paperBump
  );
  sun.position.set(0.05, 0.72, -0.92);
  sun.userData.floatY = 0.72;
  g.add(sun);

  // 3 Lapisan Pegunungan Puncak Jaya & Kutub
  const mBack = createDieCutCard(3.0, 1.48, (c, w, h) => drawMountainLayer(c, w, h, '#334155', '#64748b', true), paperBump);
  mBack.position.set(0, 0.08, -0.58);
  g.add(mBack);

  const mLeft = createDieCutCard(2.0, 1.25, (c, w, h) => drawMountainLayer(c, w, h, '#475569', '#94a3b8', true), paperBump);
  mLeft.position.set(-0.9, 0.14, 0.05);
  g.add(mLeft);

  const mRight = createDieCutCard(1.85, 1.15, (c, w, h) => drawMountainLayer(c, w, h, '#3f4f63', '#7c8ea3', true), paperBump);
  mRight.position.set(0.95, 0.14, 0.12);
  g.add(mRight);

  // Bongkahan es kertas di depan
  const floe = createDieCutCard(2.2, 0.52, (c, w, h) => drawOceanWave(c, w, h, '#e0f2fe', '#7dd3fc'), paperBump);
  floe.position.set(0, 0.1, 0.65);
  floe.userData.bobPhase = 0.6;
  g.add(floe);

  return g;
}

function buildOceanDiorama(paperBump) {
  const g = new THREE.Group();

  const cloud = createDieCutCard(3.7, 1.5, (c, w, h) => drawCloudBackdrop(c, w, h, '#e0f2fe', '#bae6fd'), paperBump);
  cloud.position.set(0, 0.08, -1.18);
  g.add(cloud);

  const w1 = createDieCutCard(3.4, 1.35, (c, w, h) => drawOceanWave(c, w, h, '#0284c7', '#0369a1'), paperBump);
  w1.position.set(0, 0.08, -0.65);
  w1.userData.swayPhase = 0;
  g.add(w1);

  const whale = createDieCutCard(1.3, 1.15, drawWhaleCutout, paperBump);
  whale.position.set(-0.1, 0.16, -0.15);
  whale.userData.bobPhase = 0.8;
  g.add(whale);

  const w2 = createDieCutCard(3.1, 1.05, (c, w, h) => drawOceanWave(c, w, h, '#38bdf8', '#0ea5e9'), paperBump);
  w2.position.set(0, 0.12, 0.25);
  w2.userData.swayPhase = 1.4;
  g.add(w2);

  // Terumbu karang cat air kuning & oranye di depan
  const cLeft = createDieCutCard(1.1, 0.95, (c, w, h) => drawWatercolorTree(c, w, h, '#fde047', '#f97316', '#ea580c'), paperBump);
  cLeft.position.set(-1.15, 0.14, 0.55);
  g.add(cLeft);

  const cRight = createDieCutCard(1.05, 0.9, (c, w, h) => drawWatercolorTree(c, w, h, '#fb923c', '#ea580c', '#c2410c'), paperBump);
  cRight.position.set(1.15, 0.14, 0.52);
  g.add(cRight);

  const w3 = createDieCutCard(2.6, 0.65, (c, w, h) => drawOceanWave(c, w, h, '#bae6fd', '#38bdf8'), paperBump);
  w3.position.set(0, 0.1, 0.78);
  w3.userData.swayPhase = 2.6;
  g.add(w3);

  return g;
}

function buildForestDiorama(paperBump) {
  const g = new THREE.Group();

  // Kanopi awan krem di belakang persis gaya referensi
  const cloud = createDieCutCard(3.7, 1.55, (c, w, h) => drawCloudBackdrop(c, w, h), paperBump);
  cloud.position.set(0, 0.08, -1.18);
  g.add(cloud);

  // Teras bukit hijau berlapis
  const hillBack = createDieCutCard(3.1, 1.15, (c, w, h) => drawOceanWave(c, w, h, '#86efac', '#22c55e'), paperBump);
  hillBack.position.set(0, 0.08, -0.7);
  g.add(hillBack);

  // Pohon-pohon cat air berlapis (hijau, kuning, oranye)
  const treeSpecs = [
    [-1.15, 0.1, -0.35, 1.2, '#4ade80', '#15803d'],
    [0.05, 0.08, -0.48, 1.35, '#22c55e', '#166534'],
    [1.15, 0.1, -0.3, 1.2, '#86efac', '#16a34a'],
    [-0.65, 0.14, 0.18, 1.02, '#fde047', '#eab308'],
    [0.75, 0.14, 0.2, 1.05, '#fb923c', '#ea580c'],
    [-1.4, 0.12, 0.55, 0.85, '#22c55e', '#15803d'],
    [1.35, 0.12, 0.58, 0.88, '#facc15', '#ca8a04'],
  ];

  treeSpecs.forEach(([x, y, z, sc, c1, c2], idx) => {
    const t = createDieCutCard(sc, sc * 1.15, (c, w, h) => drawWatercolorTree(c, w, h, c1, c2), paperBump);
    t.position.set(x, y, z);
    t.userData.swayPhase = idx * 0.9;
    g.add(t);
  });

  // Sungai biru melintas di depan
  const river = createDieCutCard(1.5, 0.48, (c, w, h) => drawOceanWave(c, w, h, '#7dd3fc', '#0ea5e9'), paperBump);
  river.position.set(0.05, 0.1, 0.72);
  g.add(river);

  return g;
}

export default function AboutPopUpBook({ activeIndex, onChangeIndex, onGoChapter, links, lang }) {
  const mountRef = useRef(null);
  const activeIdxRef = useRef(activeIndex);
  const flipTriggerRef = useRef(null);
  const flipDirRef = useRef(1);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (activeIdxRef.current !== activeIndex) {
      const prev = activeIdxRef.current;
      // Tentukan arah balik halaman: -1 (ke kiri/sebelumnya) atau +1 (ke kanan/berikutnya)
      const diff = (activeIndex - prev + SLIDES.length) % SLIDES.length;
      const dir = diff === SLIDES.length - 1 ? -1 : 1;
      activeIdxRef.current = activeIndex;
      if (flipTriggerRef.current) flipTriggerRef.current(activeIndex, dir);
    }
  }, [activeIndex]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 4.35, 7.25);
    camera.lookAt(0, 0.48, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    el.appendChild(renderer.domElement);

    // Pencahayaan studio hangat agar kertas & bayangan tampak realistis
    scene.add(new THREE.HemisphereLight('#ffffff', '#d6cfc2', 1.35));

    const sun = new THREE.DirectionalLight('#fff6e5', 1.9);
    sun.position.set(4.8, 8.5, 5.5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 22;
    sun.shadow.camera.left = -4.5;
    sun.shadow.camera.right = 4.5;
    sun.shadow.camera.top = 4.5;
    sun.shadow.camera.bottom = -4.5;
    sun.shadow.bias = -0.0006;
    scene.add(sun);

    const rim = new THREE.DirectionalLight('#bae6fd', 0.65);
    rim.position.set(-5, 4, -3.5);
    scene.add(rim);

    // Lantai bayangan transparan di bawah buku
    const shadowFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 14),
      new THREE.ShadowMaterial({ opacity: 0.18 })
    );
    shadowFloor.rotation.x = -Math.PI / 2;
    shadowFloor.position.y = -0.22;
    shadowFloor.receiveShadow = true;
    scene.add(shadowFloor);

    const paperBump = createPaperGrainTexture();

    const book = new THREE.Group();
    book.position.y = -0.18;
    scene.add(book);

    // Sampul Hardcover bertekstur
    const coverMat = new THREE.MeshStandardMaterial({
      color: SLIDES[activeIdxRef.current].cover,
      bumpMap: paperBump,
      bumpScale: 0.012,
      roughness: 0.78,
      metalness: 0.04,
    });

    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 3.92), coverMat);
    spine.position.y = -0.1;
    spine.castShadow = true;
    book.add(spine);

    const leftCover = new THREE.Mesh(new THREE.BoxGeometry(2.92, 0.09, 3.9), coverMat);
    leftCover.position.set(-1.6, -0.09, 0);
    leftCover.rotation.z = -0.025;
    leftCover.castShadow = true;
    leftCover.receiveShadow = true;
    book.add(leftCover);

    const rightCover = new THREE.Mesh(new THREE.BoxGeometry(2.92, 0.09, 3.9), coverMat);
    rightCover.position.set(1.6, -0.09, 0);
    rightCover.rotation.z = 0.025;
    rightCover.castShadow = true;
    rightCover.receiveShadow = true;
    book.add(rightCover);

    // Tumpukan ketebalan tepi halaman (layered page stack) kiri & kanan
    const stackMat = new THREE.MeshStandardMaterial({
      color: '#ede3cf',
      bumpMap: paperBump,
      bumpScale: 0.015,
      roughness: 0.9,
    });
    const leftStack = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.14, 3.68), stackMat);
    leftStack.position.set(-1.49, 0.01, 0);
    leftStack.castShadow = true;
    leftStack.receiveShadow = true;
    book.add(leftStack);

    const rightStack = new THREE.Mesh(new THREE.BoxGeometry(2.74, 0.14, 3.68), stackMat);
    rightStack.position.set(1.49, 0.01, 0);
    rightStack.castShadow = true;
    rightStack.receiveShadow = true;
    book.add(rightStack);

    // Pita pembatas buku menjulur di bawah lipatan tengah
    const ribbon = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.02, 0.75),
      new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 0.6 })
    );
    ribbon.position.set(0.06, -0.08, 2.15);
    ribbon.rotation.y = 0.18;
    ribbon.castShadow = true;
    book.add(ribbon);

    // Halaman atas melengkung realistis
    const textures = SLIDES.map((s) => ({
      left: createPageTexture(s.title[lang], s.leftLines[lang], s.accent, false),
      right: createPageTexture(s.title[lang], s.rightLines[lang], s.accent, true),
    }));

    const leftPageMat = new THREE.MeshStandardMaterial({
      map: textures[activeIdxRef.current].left,
      bumpMap: paperBump,
      bumpScale: 0.008,
      roughness: 0.88,
    });
    const rightPageMat = new THREE.MeshStandardMaterial({
      map: textures[activeIdxRef.current].right,
      bumpMap: paperBump,
      bumpScale: 0.008,
      roughness: 0.88,
    });

    const leftArchGeo = createCurvedPageGeometry(2.76, 3.68, false);
    const leftArch = new THREE.Mesh(leftArchGeo, leftPageMat);
    leftArch.position.set(-1.46, 0.082, 0);
    leftArch.receiveShadow = true;
    book.add(leftArch);

    const rightArchGeo = createCurvedPageGeometry(2.76, 3.68, true);
    const rightArch = new THREE.Mesh(rightArchGeo, rightPageMat);
    rightArch.position.set(1.46, 0.082, 0);
    rightArch.receiveShadow = true;
    book.add(rightArch);

    // Lembaran pembalik halaman melengkung (Page Flip 3D)
    const flipPivot = new THREE.Group();
    flipPivot.position.set(0, 0.1, 0);
    const flipGeo = createCurvedPageGeometry(2.72, 3.66, true, 16);
    const flipSheet = new THREE.Mesh(
      flipGeo,
      new THREE.MeshStandardMaterial({
        color: '#fbf4e4',
        bumpMap: paperBump,
        bumpScale: 0.008,
        roughness: 0.85,
        side: THREE.DoubleSide,
      })
    );
    flipSheet.position.set(1.38, 0, 0);
    flipSheet.castShadow = true;
    flipPivot.add(flipSheet);
    flipPivot.visible = false;
    book.add(flipPivot);

    // 3 Diorama Pop-Up Die-Cut Realistis
    const dioramas = [
      buildClimateDiorama(paperBump),
      buildOceanDiorama(paperBump),
      buildForestDiorama(paperBump),
    ];
    dioramas.forEach((d, idx) => {
      d.position.y = 0.08;
      d.visible = idx === activeIdxRef.current;
      d.scale.set(1, idx === activeIdxRef.current ? 1 : 0.001, 1);
      book.add(d);
    });

    let currentSlide = activeIdxRef.current;
    let nextSlide = currentSlide;
    let phase = 'idle';
    let progress = 1;
    let flipDir = 1;
    let targetColor = new THREE.Color(SLIDES[currentSlide].cover);

    flipTriggerRef.current = (targetIdx, dir = 1) => {
      if (targetIdx === currentSlide && phase === 'idle') return;
      nextSlide = targetIdx;
      flipDir = dir;
      phase = 'foldOut';
      progress = 0;
      flipPivot.visible = true;
      flipPivot.rotation.z = flipDir === 1 ? 0 : Math.PI;
      targetColor = new THREE.Color(SLIDES[targetIdx].cover);
    };

    let rotY = 0;
    let rotX = 0.02;
    let targetRotY = 0;
    let targetRotX = 0.02;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      targetRotY = Math.max(-0.5, Math.min(0.5, targetRotY + dx * 0.006));
      targetRotX = Math.max(-0.18, Math.min(0.24, targetRotX + dy * 0.004));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = (e) => {
      if (dragging && moved < 18) {
        const rect = dom.getBoundingClientRect();
        const isLeftHalf = e.clientX < rect.left + rect.width / 2;
        if (isLeftHalf) {
          flipDirRef.current = -1;
          onChangeIndex((activeIdxRef.current - 1 + SLIDES.length) % SLIDES.length);
        } else {
          flipDirRef.current = 1;
          onChangeIndex((activeIdxRef.current + 1) % SLIDES.length);
        }
      }
      dragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let clock = 0;
    let raf = 0;
    let inView = true;

    const visObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
        });
      },
      { rootMargin: '150px' }
    );
    visObs.observe(el);

    const easeOutBack = (t) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!inView && phase === 'idle') return;
      clock += 0.016;

      coverMat.color.lerp(targetColor, 0.08);

      if (phase === 'foldOut') {
        progress = Math.min(1, progress + 0.065);
        const s = Math.max(0.001, 1 - progress);
        dioramas[currentSlide].scale.set(1, s, 1);
        dioramas[currentSlide].rotation.x = progress * 0.4;
        flipPivot.rotation.z =
          flipDir === 1
            ? progress * (Math.PI * 0.5)
            : Math.PI - progress * (Math.PI * 0.5);

        if (progress >= 1) {
          dioramas[currentSlide].visible = false;
          dioramas[currentSlide].rotation.x = 0;
          currentSlide = nextSlide;
          dioramas[currentSlide].visible = true;
          dioramas[currentSlide].scale.set(1, 0.001, 1);
          leftPageMat.map = textures[currentSlide].left;
          rightPageMat.map = textures[currentSlide].right;
          leftPageMat.needsUpdate = true;
          rightPageMat.needsUpdate = true;
          phase = 'popIn';
          progress = 0;
        }
      } else if (phase === 'popIn') {
        progress = Math.min(1, progress + 0.045);
        const popY = Math.max(0.001, easeOutBack(progress));
        dioramas[currentSlide].scale.set(1, popY, 1);
        dioramas[currentSlide].rotation.x = (1 - progress) * -0.22;
        flipPivot.rotation.z =
          flipDir === 1
            ? Math.PI * 0.5 + progress * (Math.PI * 0.5)
            : Math.PI * 0.5 - progress * (Math.PI * 0.5);

        if (progress >= 1) {
          phase = 'idle';
          flipPivot.visible = false;
          dioramas[currentSlide].scale.set(1, 1, 1);
          dioramas[currentSlide].rotation.x = 0;
        }
      }

      dioramas[currentSlide].children.forEach((child) => {
        if (child.userData.floatY !== undefined) {
          child.position.y = child.userData.floatY + Math.sin(clock * 2.1) * 0.04;
        } else if (child.userData.bobPhase !== undefined) {
          child.position.y = 0.12 + Math.sin(clock * 1.9 + child.userData.bobPhase) * 0.03;
        }
        if (child.userData.swayPhase !== undefined) {
          child.rotation.z = Math.sin(clock * 1.5 + child.userData.swayPhase) * 0.025;
        }
      });

      if (!dragging) {
        targetRotY = Math.sin(clock * 0.42) * 0.13;
      }
      rotY += (targetRotY - rotY) * 0.08;
      rotX += (targetRotX - rotX) * 0.08;
      book.rotation.y = rotY;
      book.rotation.x = rotX;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      visObs.disconnect();
      dom.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (dom.parentNode === el) el.removeChild(dom);
    };
  }, [lang, onChangeIndex]);

  const activeLink = links[activeIndex] || links[0];

  const prevSlide = () => onChangeIndex((activeIndex - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => onChangeIndex((activeIndex + 1) % SLIDES.length);

  return (
    <div
      className="popup-frameless"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="popup-stage-row">
        <button
          type="button"
          className="popup-side-nav left"
          onClick={prevSlide}
          aria-label="Slide buku sebelumnya"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="popup-canvas-open" ref={mountRef} aria-label="3D Pop-Up Book" />

        <button
          type="button"
          className="popup-side-nav right"
          onClick={nextSlide}
          aria-label="Slide buku berikutnya"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className={`popup-floating-hint ${hovered ? 'show' : ''}`}>
        <RotateCw size={13} />
        <span>
          {lang === 'id'
            ? 'Tekan sisi kiri/kanan buku untuk ganti slide, atau geser untuk memutar 3D'
            : 'Click left/right side of book to switch slide, or drag to rotate 3D'}
        </span>
      </div>

      <div className="popup-controls-bar">
        <button
          type="button"
          className="popup-arrow"
          onClick={prevSlide}
          aria-label="Prev chapter"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="popup-tabs">
          {links.map((l, i) => (
            <button
              key={l.k}
              type="button"
              className={`popup-tab popup-tab-${l.k} ${activeIndex === i ? 'on' : ''}`}
              onClick={() => onChangeIndex(i)}
            >
              <span>0{i + 1}</span>
              <strong>{l[lang]}</strong>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="popup-arrow"
          onClick={nextSlide}
          aria-label="Next chapter"
        >
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          className="popup-go-btn"
          onClick={() => onGoChapter(activeLink.k)}
        >
          <span>{lang === 'id' ? 'Jelajahi Bab' : 'Explore Chapter'}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
