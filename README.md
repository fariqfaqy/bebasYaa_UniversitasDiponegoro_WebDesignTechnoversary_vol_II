# KALABUMI - Portal Edukasi Interaktif Krisis Bumi

**KALABUMI** adalah website edukasi interaktif dwibahasa (**Indonesia / English**) yang mengajak pengunjung memahami tiga krisis lingkungan utama di bumi serta mendorong aksi nyata sehari-hari melalui visual origami, buku pop-up 3D, peta interaktif, grafik data, dan kuis gamifikasi.

---

## Deskripsi Website

Website ini dirancang sebagai pengalaman bertutur visual (*scroll storytelling*) dengan gaya penyampaian **"Tahukah kamu?"** yang ramah dan mudah dipahami:

1. **Beranda (`#home`)**: Hero slider interaktif 3 topik utama (*Iklim & Es*, *Lautan*, dan *Hutan Hujan*) dengan latar adegan origami dinamis.
2. **Tentang (`#about`)**: Buku Pop-Up 3D berbasis WebGL (`Three.js`) yang terbuka otomatis saat digulir dan dapat diputar serta dibalik halamannya ke kiri atau kanan.
3. **Bab 1 · Iklim & Es (`#climate`)**:
   - Kartu dampak krisis iklim dengan modal detail (*card flip 3D*).
   - Perbandingan visual **Salju Abadi Papua (Puncak Jaya)** tahun 1936 vs citra satelit modern beserta grafik penyusutan es.
   - Grafik interaktif anomali suhu global dan kenaikan muka air laut dengan *cursor scrubbing* dan tombol putar linimasa.
4. **Bab 2 · Lautan Plastik & Mikroplastik (`#ocean`)**:
   - Alur **Perjalanan Mikroplastik** model zigzag 5 tahap lengkap dengan ilustrasi mini reaktif di tiap tahap.
   - **Peta Makhluk Air Interaktif** yang memetakan zona kedalaman dan dampak plastik pada Penyu, Plankton, Terumbu Karang, serta Paus & Lumba-lumba.
5. **Bab 3 · Hutan Hujan (`#forest`)**:
   - Tab wilayah interaktif **Kalimantan (Borneo)**, **Amazon**, serta sorotan isu hutan yang sedang tren di Indonesia (**Raja Ampat & Tambang**, **Papua & Merauke**, **Sumatra: Tesso Nilo & Leuser**).
   - **Forest Fan Deck** berisi 10 kartu flora dan fauna kunci beserta filter kategori.
   - **Rantai Dampak Deforestasi** dengan pohon origami reaktif di tengah diagram domino.
6. **Aksi Nyata & Kuis (`#action`)**:
   - **Taman Origami Interaktif (`ActionGarden`)** yang tumbuh otomatis seiring pengguna mencentang aksi harian (*sticky* saat menggulir).
   - **Kuis Evaluasi Bumi bergaya Kahoot**: timer 15 detik per soal, grid jawaban 2×2 berwarna dan berbentuk geometri, sistem skor cepat & *streak*, rincian skor per bab, serta animasi trofi dan konfeti saat skor 100%.
7. **Kontak & Profil Tim (`#contact`)**:
   - Informasi kolaborasi dan formulir kirim pesan.
   - **ID Card Lanyard Interaktif** pembuat Kalabumi yang dapat diklik dari ikon bulat dan ditarik-tarik dengan efek tali lentur.

---

## Nama Tim dan Anggota

**Nama Tim:** `bebasYaa`

| Nama Anggota | Peran | Media Sosial |
| :--- | :--- | :--- |
| **Fariq Faqy Rozzaqy** | Programmer | [Instagram @zzaqy._](https://www.instagram.com/zzaqy._/) · [GitHub fariqfaqy](https://github.com/fariqfaqy) |
| **Rizka Mufida** | Designer | [Instagram @mfda_a](https://www.instagram.com/mfda_a/) |

---

## Teknologi yang Digunakan

- **React 18** + **Vite 5**
- **Motion (`motion/react`)** untuk animasi transisi, gestur tarik lanyard, dan koreografi scroll
- **Three.js** untuk Buku Pop-Up 3D interaktif
- **Lucide React** untuk ikon antarmuka

---

## Petunjuk Instalasi dan Cara Menjalankan Project

### Prasyarat
- **Node.js** (disarankan v18 ke atas) dan **npm** sudah terpasang di perangkat.

### Langkah Instalasi
1. **Clone repositori**
   ```bash
   git clone https://github.com/fariqfaqy/alamkuy.git
   cd alamkuy
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

### Cara Menjalankan Project
- **Mode Pengembangan (Development Server):**
  ```bash
  npm run dev
  ```
  Setelah berjalan, buka alamat yang muncul di terminal (umumnya `http://localhost:5173`).

- **Build Produksi:**
  ```bash
  npm run build
  ```

- **Pratinjau Hasil Build Produksi:**
  ```bash
  npm run preview
  ```
