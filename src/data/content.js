// Semua teks dwibahasa: { id: '...', en: '...' }
// Angka bersifat perkiraan/dibulatkan dari sumber publik yang dicantumkan.

const WM = (file, w = 900) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;

export const UI = {
  nav: {
    home: { id: 'Beranda', en: 'Home' },
    about: { id: 'Tentang', en: 'About' },
    climate: { id: 'Iklim & Es', en: 'Climate & Ice' },
    ocean: { id: 'Lautan', en: 'Ocean' },
    forest: { id: 'Hutan', en: 'Forest' },
    action: { id: 'Aksi Nyata', en: 'Take Action' },
    contact: { id: 'Kontak', en: 'Contact' },
  },
  cta: { id: 'Mulai menjelajah', en: 'Start exploring' },
  sources: { id: 'Sumber', en: 'Sources' },
  approx: {
    id: 'Angka perkiraan, dibulatkan dari sumber publik.',
    en: 'Approximate figures, rounded from public sources.',
  },
};

export const HERO = [
  {
    key: 'climate',
    stat: '1,1°C',
    title: { id: 'Bumi sudah memanas', en: 'The Earth is already warming' },
    text: {
      id: 'Suhu global kini sekitar 1,1°C di atas masa pra-industri. Es kutub mencair, laut naik, cuaca makin ekstrem.',
      en: 'Global temperature is now about 1.1°C above pre-industrial levels. Polar ice melts, seas rise, weather turns extreme.',
    },
    image: WM('Petermann_Glacier,_Greenland_ESA383315.jpg', 1200),
    credit: 'ESA / Copernicus (Wikimedia Commons)',
    target: 'climate',
  },
  {
    key: 'ocean',
    stat: '11 Mt',
    title: { id: 'Lautan tersedak plastik', en: 'The ocean is choking on plastic' },
    text: {
      id: 'Sekitar 11 juta ton plastik masuk ke laut tiap tahun. Pecahannya, mikroplastik, kini ada di rantai makanan kita.',
      en: 'About 11 million tonnes of plastic enter the ocean each year. Its fragments, microplastics, are now in our food chain.',
    },
    image: WM('Microplastic.jpg', 1200),
    credit: 'Oregon State University (Wikimedia Commons)',
    target: 'ocean',
  },
  {
    key: 'forest',
    stat: '420 Mha',
    title: { id: 'Hutan hujan menyusut', en: 'Rainforests are shrinking' },
    text: {
      id: 'Sejak 1990, sekitar 420 juta hektare hutan hilang. Kalimantan dan Amazon menyimpan karbon dan separuh lebih spesies darat.',
      en: 'Since 1990 roughly 420 million hectares of forest have been lost. Borneo and the Amazon store carbon and over half of land species.',
    },
    image: WM('Aerial_view_of_the_Amazon_Rainforest.jpg', 1200),
    credit: 'Wikimedia Commons',
    target: 'forest',
  },
];

export const ABOUT = {
  title: { id: 'Tiga krisis, satu planet', en: 'Three crises, one planet' },
  text: {
    id: 'Perubahan iklim, sampah plastik laut, dan deforestasi saling memperparah. Hutan yang hilang melepas karbon yang memanaskan bumi; bumi yang panas menaikkan laut dan merusak terumbu; laut yang tercemar kehilangan kemampuan menyerap karbon. Kalabumi mengajakmu memahami ketiganya, lalu bertindak.',
    en: 'Climate change, ocean plastic and deforestation feed each other. Lost forests release carbon that heats the planet; a hotter planet raises seas and bleaches reefs; a polluted ocean absorbs less carbon. Kalabumi helps you understand all three, then act.',
  },
  links: [
    { k: 'climate', id: 'Es mencair, laut naik', en: 'Ice melts, seas rise' },
    { k: 'ocean', id: 'Plastik jadi mikroplastik', en: 'Plastic becomes microplastic' },
    { k: 'forest', id: 'Hutan jadi emisi', en: 'Forest becomes emissions' },
  ],
};

export const CLIMATE = {
  kicker: { id: 'Bab 1', en: 'Chapter 1' },
  title: { id: 'Iklim & Es yang Menghilang', en: 'Climate & Vanishing Ice' },
  intro: {
    id: 'Tahukah kamu? Kenaikan suhu bumi hanya 1,1°C saja sudah cukup untuk mencairkan es kutub dan pegunungan tinggi lebih cepat, menaikkan air laut, serta memperkuat badai dan gelombang panas.',
    en: 'Did you know? Just a 1.1°C rise in Earth\'s temperature is already enough to melt polar and mountain ice faster, raise sea levels, and supercharge storms and heatwaves.',
  },
  impacts: [
    {
      key: 'ice',
      image: WM('The_calving_front_of_Petermann_Glacier_in_northern_Greenland.jpg', 800),
      status: { id: 'KRITIS KUTUB', en: 'POLAR ALERT' },
      title: { id: 'Es kutub mencair', en: 'Polar ice melting' },
      text: {
        id: 'Es laut Arktik pada September menyusut sekitar 12-13% per dekade sejak 1979, dan lapisan es Greenland serta Antartika terus kehilangan massa.',
        en: 'September Arctic sea ice has shrunk about 12-13% per decade since 1979, and the Greenland and Antarctic ice sheets keep losing mass.',
      },
      detail: {
        id: 'Ketika es putih mencair dan digantikan air laut yang gelap, permukaan bumi menyerap lebih banyak panas matahari (efek albedo). Hal ini mempercepat pemanasan global dan mengganggu arus laut dunia.',
        en: 'As bright white ice melts into dark ocean water, Earth absorbs more solar heat (the albedo effect), accelerating global warming and disrupting ocean currents.',
      },
    },
    {
      key: 'wave',
      image: WM('Flooded-park-climate-change.jpg', 800),
      status: { id: 'ANCAMAN PESISIR', en: 'COASTAL RISK' },
      title: { id: 'Muka air laut naik', en: 'Sea level rise' },
      text: {
        id: 'Laut global naik sekitar 20 cm sejak 1901 dan laju kenaikannya meningkat. Kota pesisir seperti Jakarta dan Semarang paling rentan.',
        en: 'Global sea level has risen about 20 cm since 1901 and the pace is accelerating. Coastal cities like Jakarta and Semarang are most exposed.',
      },
      detail: {
        id: 'Kenaikan muka air laut dipicu oleh dua hal utama: pencairan es daratan (gletser dan lapisan es kutub) serta pemuaian air laut saat suhunya menghangat. Banjir rob makin sering merendam pemukiman pesisir.',
        en: 'Sea level rise is driven by melting land ice and thermal expansion of warming seawater. Tidal flooding increasingly inundates coastal communities.',
      },
    },
    {
      key: 'storm',
      image: WM('Coastal_flooding_from_Cyclone_Hamish_in_Queensland_2009.jpg', 800),
      status: { id: 'CUACA EKSTREM', en: 'EXTREME WEATHER' },
      title: { id: 'Cuaca ekstrem', en: 'Extreme weather' },
      text: {
        id: 'Atmosfer yang lebih hangat menyimpan lebih banyak uap air: hujan lebih deras, kekeringan lebih panjang, gelombang panas lebih sering.',
        en: 'A warmer atmosphere holds more water vapour: heavier rain, longer droughts, more frequent heatwaves.',
      },
      detail: {
        id: 'Setiap kenaikan 1°C membuat atmosfer menampung sekitar 7% lebih banyak uap air. Akibatnya badai tropis dan curah hujan ekstrem menjadi jauh lebih merusak, sementara wilayah kering mengalami kekeringan berkepanjangan.',
        en: 'Each 1°C of warming lets the atmosphere hold about 7% more water vapour, supercharging storms and heavy rainfall while intensifying droughts elsewhere.',
      },
    },
  ],
  papua: {
    title: { id: 'Salju Abadi Papua', en: "Papua's Eternal Snow" },
    text: {
      id: 'Tahukah kamu, di Indonesia yang tropis ini ternyata ada salju abadi? Di Puncak Jaya (Pegunungan Jayawijaya), Papua, tersimpan satu-satunya gletser tropis kita. Sayangnya, luasnya menyusut dari belasan km² pada pertengahan abad ke-19 menjadi sekitar 0,2 km² pada 2022 (BMKG) dan diperkirakan bisa hilang dalam beberapa tahun ke depan, padahal gunung bersalju ini sangat sakral bagi masyarakat adat Papua.',
      en: "Did you know tropical Indonesia actually has eternal snow? High on Puncak Jaya in Papua lies our only tropical glacier. Sadly, it shrank from over ten km² in the mid-1800s to about 0.2 km² in 2022 (BMKG) and may vanish within years, even though the snow-capped peak is sacred to Indigenous Papuans.",
    },
    before: { id: '1936 (Arsip Ekspedisi)', en: '1936 (Expedition Archive)' },
    now: { id: 'Citra Satelit Modern', en: 'Modern Satellite View' },
    beforeImg: WM('Puncak_Jaya_icecap_1936.jpg', 900),
    nowImg: WM('The_Carstensz_Glacier,_in_New_Guinea,_is_poised_to_disappear.jpg', 900),
    hint: { id: 'Geser untuk membandingkan kondisi gletser Puncak Jaya', en: 'Drag to compare Puncak Jaya glacier' },
    credit: {
      id: 'Foto: Arsip Ekspedisi 1936 & Satelit Copernicus Sentinel-2 (Wikimedia Commons)',
      en: 'Photos: 1936 Expedition Archive & Copernicus Sentinel-2 (Wikimedia Commons)',
    },
    chartTitle: { id: 'Luas es Puncak Jaya (km², perkiraan)', en: 'Puncak Jaya ice area (km², approx.)' },
    series: [
      { y: 1850, v: 19 },
      { y: 1936, v: 8 },
      { y: 1972, v: 6 },
      { y: 2000, v: 2.5 },
      { y: 2016, v: 0.6 },
      { y: 2022, v: 0.2 },
    ],
  },
  chart: {
    title: { id: 'Data iklim interaktif', en: 'Interactive climate data' },
    tabs: [
      { k: 'temp', id: 'Suhu (°C)', en: 'Temperature (°C)' },
      { k: 'sea', id: 'Muka laut (cm)', en: 'Sea level (cm)' },
    ],
    temp: {
      unit: '°C',
      note: { id: 'Anomali suhu global terhadap rata-rata 1951-1980 (NASA GISS, dibulatkan).', en: 'Global temperature anomaly vs 1951-1980 mean (NASA GISS, rounded).' },
      data: [
        { y: 1880, v: -0.2 }, { y: 1900, v: -0.1 }, { y: 1920, v: -0.25 }, { y: 1940, v: 0.1 },
        { y: 1960, v: 0 }, { y: 1980, v: 0.26 }, { y: 2000, v: 0.42 }, { y: 2010, v: 0.72 },
        { y: 2020, v: 1.0 }, { y: 2023, v: 1.17 },
      ],
    },
    sea: {
      unit: 'cm',
      note: { id: 'Kenaikan muka laut rata-rata global sejak 1900 (gabungan pengukuran pasang-surut dan satelit, dibulatkan).', en: 'Global mean sea level rise since 1900 (tide gauges + satellites, rounded).' },
      data: [
        { y: 1900, v: 0 }, { y: 1930, v: 4 }, { y: 1960, v: 8 }, { y: 1990, v: 14 },
        { y: 2010, v: 20 }, { y: 2023, v: 25 },
      ],
    },
  },
  sources: 'IPCC AR6 (2021), NASA, BMKG, Klein & Kincaid (2006), Copernicus Sentinel-2',
};

export const OCEAN = {
  kicker: { id: 'Bab 2', en: 'Chapter 2' },
  title: { id: 'Lautan Plastik & Mikroplastik', en: 'Ocean Plastic & Microplastics' },
  intro: {
    id: 'Tahukah kamu? Plastik yang kita buang tidak pernah benar-benar hilang, lho! Ia hanya pecah menjadi serpihan mikroplastik (< 5 mm) yang kini ditemukan mulai dari palung laut terdalam sampai es Arktik.',
    en: "Did you know? The plastic we throw away never truly disappears! It just breaks into tiny microplastics (under 5 mm) now found from the deepest ocean trenches all the way to Arctic ice.",
  },
  stats: [
    { v: '11 Mt', t: { id: 'plastik masuk laut per tahun', en: 'plastic enters the ocean yearly' } },
    { v: '450 th', t: { id: 'botol plastik butuh waktu terurai', en: 'years for a plastic bottle to break down' } },
    { v: '#2', t: { id: 'Indonesia: penyumbang sampah plastik laut terbesar kedua (studi 2015)', en: 'Indonesia: 2nd largest marine plastic contributor (2015 study)' } },
  ],
  chain: {
    title: { id: 'Perjalanan mikroplastik', en: 'Journey of a microplastic' },
    steps: [
      { id: 'Botol & kantong plastik', en: 'Bottles & bags' },
      { id: 'Terurai oleh matahari & ombak', en: 'Broken by sun & waves' },
      { id: 'Dimakan plankton', en: 'Eaten by plankton' },
      { id: 'Masuk ke ikan & kerang', en: 'Enters fish & shellfish' },
      { id: 'Sampai ke piring kita', en: 'Reaches our plate' },
    ],
  },
  speciesTitle: { id: 'Siapa yang terdampak?', en: 'Who is affected?' },
  species: [
    {
      key: 'turtle',
      image: WM('Green_turtle_swimming_over_coral_reefs_in_Kona.jpg', 700),
      status: { id: 'TERANCAM', en: 'ENDANGERED' },
      name: { id: 'Penyu', en: 'Sea turtles' },
      text: { id: 'Salah mengira kantong plastik sebagai ubur-ubur, lalu tersumbat pencernaannya.', en: 'Mistake plastic bags for jellyfish and suffer blocked digestion.' },
      detail: {
        id: 'Lebih dari separuh penyu laut di dunia diperkirakan pernah menelan sampah plastik. Kantong plastik yang mengapung terlihat persis seperti ubur-ubur, makanan utama penyu. Plastik yang menumpuk di lambung menimbulkan rasa kenyang palsu, menyumbat usus, hingga membuat penyu lemas dan gagal bertelur di pantai.',
        en: 'Over half of the world\'s sea turtles are estimated to have ingested plastic debris. Floating bags closely resemble jellyfish, their natural prey. Accumulated plastic creates false fullness, blocks the digestive tract, and leaves turtles too weak to swim or nest safely.',
      },
    },
    {
      key: 'plankton',
      image: WM('Zooplankton.jpg', 700),
      status: { id: 'DASAR RANTAI PANGAN', en: 'FOOD WEB BASE' },
      name: { id: 'Plankton', en: 'Plankton' },
      text: { id: 'Menelan mikroplastik dan membawanya naik ke seluruh rantai makanan laut.', en: 'Swallow microplastics and carry them up the whole marine food chain.' },
      detail: {
        id: 'Zooplankton menelan partikel mikroplastik berukuran mikrometer karena ukurannya mirip fitoplankton. Ketika plankton dimakan ikan kecil, lalu ikan predator besar, konsentrasi mikroplastik dan bahan kimia beracunnya mengalami bioakumulasi hingga berujung di meja makan manusia.',
        en: 'Zooplankton ingest micron-sized plastic particles that mimic natural phytoplankton. As small fish eat plankton and larger predators feed on them, microplastics and absorbed toxins bioaccumulate up the food web all the way to human plates.',
      },
    },
    {
      key: 'coral',
      image: WM('Colorful_underwater_landscape_of_a_coral_reef.jpg', 700),
      status: { id: 'RENTAN PENYAKIT', en: 'DISEASE RISK' },
      name: { id: 'Terumbu karang', en: 'Coral reefs' },
      text: { id: 'Plastik yang menyangkut meningkatkan risiko penyakit karang secara drastis.', en: 'Plastic draped on corals greatly raises disease risk.' },
      detail: {
        id: 'Studi menunjukkan kemungkinan terumbu karang terkena penyakit melonjak dari 4% menjadi 89% ketika bersentuhan dengan sampah plastik. Plastik menggores jaringan polip, menghalangi sinar matahari untuk fotosintesis alga simbiotik, serta membawa bakteri patogen mematikan bagi ekosistem rumah seperempat spesies laut ini.',
        en: 'Research shows disease likelihood on coral reefs jumps from 4% to 89% when in contact with plastic debris. Plastic abrades coral tissue, blocks sunlight needed by symbiotic algae, and delivers harmful pathogens to an ecosystem supporting a quarter of all marine life.',
      },
    },
    {
      key: 'whale',
      image: WM('HumpbackWhaleBreaching.jpg', 700),
      status: { id: 'TERJERAT & TERTELAN', en: 'ENTANGLEMENT' },
      name: { id: 'Paus & lumba-lumba', en: 'Whales & dolphins' },
      text: { id: 'Terjerat jaring hantu dan menelan sampah plastik saat mencari makan.', en: 'Tangled in ghost nets and swallow plastic while feeding.' },
      detail: {
        id: 'Mamalia laut penyaring seperti paus balin menelan ribuan liter air setiap kali makan sehingga ikut menyaring mikroplastik dan sampah kemasan. Di sisi lain, alat tangkap ikan bekas yang terbengkalai (ghost gear) terus menjerat lumba-lumba dan paus, melukai sirip, dan menghalangi mereka naik ke permukaan untuk bernapas.',
        en: 'Filter-feeding whales take in thousands of litres of water per gulp, inevitably swallowing microplastics and packaging debris. Meanwhile, discarded ghost fishing nets entangle dolphins and whales, cutting into fins and preventing them from surfacing to breathe.',
      },
    },
  ],
  quiz: {
    title: { id: 'Kuis Evaluasi Bumi: Seberapa Paham & Peduli Kamu?', en: 'Earth Check Quiz: How Aware & Eco-Friendly Are You?' },
    subtitle: {
      id: 'Uji pemahaman dan kebiasaan harianmu terhadap 3 krisis utama: Iklim & Es, Lautan Plastik, serta Hutan Hujan.',
      en: 'Test your knowledge and daily habits across all 3 crises: Climate & Ice, Ocean Plastic, and Rainforests.',
    },
    restart: { id: 'Ulangi Kuis', en: 'Retry Quiz' },
    result: { id: 'Skor & Pencapaianmu', en: 'Your Score & Achievement' },
    questions: [
      {
        ch: 'climate',
        topic: { id: 'Bab 1 · Iklim & Es', en: 'Chapter 1 · Climate & Ice' },
        q: { id: 'Di mana letak satu-satunya gletser/salju abadi tropis di Indonesia yang kini hampir punah?', en: 'Where is Indonesia\'s only tropical glacier that is now nearly gone?' },
        a: [
          { t: { id: 'Gunung Semeru, Jawa Timur', en: 'Mount Semeru, East Java' }, p: 0 },
          { t: { id: 'Puncak Jaya (Pegunungan Jayawijaya, Papua)', en: 'Puncak Jaya (Jayawijaya Range, Papua)' }, p: 2 },
          { t: { id: 'Gunung Kerinci, Sumatera', en: 'Mount Kerinci, Sumatra' }, p: 0 },
          { t: { id: 'Gunung Rinjani, Lombok', en: 'Mount Rinjani, Lombok' }, p: 0 },
        ],
      },
      {
        ch: 'climate',
        topic: { id: 'Bab 1 · Iklim & Energi', en: 'Chapter 1 · Climate & Energy' },
        q: { id: 'Bagaimana kebiasaanmu dalam menggunakan listrik dan transportasi sehari-hari?', en: 'How do you manage electricity and daily transport?' },
        a: [
          { t: { id: 'Kadang hemat, masih sering pakai kendaraan pribadi', en: 'Sometimes save power, mostly private vehicle' }, p: 1 },
          { t: { id: 'Jarang memperhatikan konsumsi energi', en: 'Rarely pay attention to energy use' }, p: 0 },
          { t: { id: 'Hemat listrik & sering jalan kaki/sepeda/transportasi umum', en: 'Save power & often walk, cycle or use transit' }, p: 2 },
          { t: { id: 'Selalu menyalakan AC & lampu sepanjang hari', en: 'Always leave AC & lights on all day' }, p: 0 },
        ],
      },
      {
        ch: 'climate',
        topic: { id: 'Bab 1 · Pemanasan Global', en: 'Chapter 1 · Global Warming' },
        q: { id: 'Sekitar berapa kenaikan suhu rata-rata global saat ini dibanding masa pra-industri?', en: 'Roughly how much has global average temperature risen compared to pre-industrial times?' },
        a: [
          { t: { id: 'Sekitar 0,1°C saja', en: 'Only about 0.1°C' }, p: 0 },
          { t: { id: 'Sekitar 1,1°C', en: 'About 1.1°C' }, p: 2 },
          { t: { id: 'Sudah turun 0,5°C', en: 'Dropped by 0.5°C' }, p: 0 },
          { t: { id: 'Belum berubah sama sekali', en: 'Has not changed at all' }, p: 0 },
        ],
      },
      {
        ch: 'ocean',
        topic: { id: 'Bab 2 · Lautan Plastik', en: 'Chapter 2 · Ocean Plastic' },
        q: { id: 'Berapa kali seminggu kamu memakai botol, gelas, atau kantong plastik sekali pakai?', en: 'How often a week do you use single-use plastic bottles, cups or bags?' },
        a: [
          { t: { id: '1-3 kali seminggu', en: '1-3 times a week' }, p: 1 },
          { t: { id: 'Hampir tidak pernah (selalu bawa tumbler & tas sendiri)', en: 'Almost never (always bring my own bottle & bag)' }, p: 2 },
          { t: { id: 'Hampir setiap hari', en: 'Nearly every day' }, p: 0 },
          { t: { id: 'Selalu pakai plastik baru tiap belanja', en: 'Always use new plastic every purchase' }, p: 0 },
        ],
      },
      {
        ch: 'ocean',
        topic: { id: 'Bab 2 · Mikroplastik', en: 'Chapter 2 · Microplastics' },
        q: { id: 'Apa yang terjadi pada sampah plastik yang masuk ke lautan?', en: 'What happens to plastic waste that enters the ocean?' },
        a: [
          { t: { id: 'Larut menjadi air murni dalam beberapa bulan', en: 'Dissolves into pure water within months' }, p: 0 },
          { t: { id: 'Menguap bersama air laut ke atmosfer', en: 'Evaporates with seawater into the air' }, p: 0 },
          { t: { id: 'Pecah menjadi mikroplastik (<5 mm) dan masuk ke rantai makanan laut', en: 'Breaks into microplastics (<5 mm) and enters the food chain' }, p: 2 },
          { t: { id: 'Berubah menjadi terumbu karang baru', en: 'Turns into new coral reefs' }, p: 0 },
        ],
      },
      {
        ch: 'ocean',
        topic: { id: 'Bab 2 · Terumbu Karang', en: 'Chapter 2 · Coral Reefs' },
        q: { id: 'Apa dampak plastik yang menyangkut pada terumbu karang menurut penelitian?', en: 'What happens when plastic debris drapes over coral reefs?' },
        a: [
          { t: { id: 'Risiko penyakit karang melonjak drastis dari 4% ke 89%', en: 'Coral disease risk jumps sharply from 4% to 89%' }, p: 2 },
          { t: { id: 'Membantu karang tumbuh lebih cepat', en: 'Helps coral grow faster' }, p: 0 },
          { t: { id: 'Tidak berdampak apa pun pada karang', en: 'Has no impact on corals' }, p: 0 },
          { t: { id: 'Membuat air laut menjadi lebih jernih', en: 'Makes seawater clearer' }, p: 0 },
        ],
      },
      {
        ch: 'forest',
        topic: { id: 'Bab 3 · Hutan Hujan', en: 'Chapter 3 · Rainforests' },
        q: { id: 'Apa peran utama hutan hujan tropis Kalimantan dan Amazon bagi iklim bumi?', en: 'What is the primary role of Borneo and Amazon rainforests for Earth\'s climate?' },
        a: [
          { t: { id: 'Hanya sebagai penghasil kayu industri', en: 'Only a source of industrial timber' }, p: 0 },
          { t: { id: 'Menyimpan puluhan miliar ton karbon, mengatur hujan, & rumah >50% spesies darat', en: 'Store billions of tonnes of carbon, regulate rain & shelter >50% of land species' }, p: 2 },
          { t: { id: 'Tidak berhubungan dengan suhu bumi', en: 'Unrelated to global temperature' }, p: 0 },
          { t: { id: 'Sekadar tempat wisata tanpa fungsi ekologis', en: 'Just a tourist spot with no ecological role' }, p: 0 },
        ],
      },
      {
        ch: 'forest',
        topic: { id: 'Bab 3 · Konsumsi & Hutan', en: 'Chapter 3 · Consumption & Forests' },
        q: { id: 'Saat membeli produk kertas, tisu, atau olahan kelapa sawit, apakah kamu memperhatikan label ramah hutan (FSC/RSPO)?', en: 'When buying paper, tissue or palm-oil products, do you check eco-labels (FSC/RSPO)?' },
        a: [
          { t: { id: 'Belum pernah memperhatikan', en: 'Never paid attention yet' }, p: 0 },
          { t: { id: 'Kadang-kadang jika terlihat di kemasan', en: 'Sometimes if visible on packaging' }, p: 1 },
          { t: { id: 'Ya, berusaha memilih produk bersertifikat & hemat kertas', en: 'Yes, I choose certified products & save paper' }, p: 2 },
          { t: { id: 'Selalu memakai tisu & kertas berlebihan', en: 'Always use excess tissue & paper' }, p: 0 },
        ],
      },
    ],
    levels: [
      { minPct: 100, badge: { id: 'Duta Kalabumi Sempurna', en: 'Perfect Kalabumi Ambassador' }, t: { id: 'Luar biasa! Semua jawaban tepat dan kebiasaanmu sangat ramah bumi. Kamu berhak atas lencana emas Penjaga Bumi!', en: 'Incredible! Every answer is spot-on and your habits protect the Earth. You earned the Golden Earth Steward badge!' } },
      { minPct: 80, badge: { id: 'Penjaga Bumi Tangguh', en: 'Resilient Earth Guardian' }, t: { id: 'Hebat! Pemahamanmu tentang iklim, laut, dan hutan sangat kuat. Sedikit lagi menuju skor sempurna!', en: 'Great job! Your grasp of climate, oceans and forests is strong. Almost a perfect score!' } },
      { minPct: 60, badge: { id: 'Penggerak Hijau', en: 'Green Mover' }, t: { id: 'Cukup baik! Kamu sudah mengerti dasar krisis bumi. Tingkatkan konsistensi aksi di bab yang skornya masih rendah.', en: 'Good progress! You understand the core crises. Boost your consistency in the lower-scoring chapters.' } },
      { minPct: 35, badge: { id: 'Penjelajah Peduli', en: 'Caring Explorer' }, t: { id: 'Awal yang bagus! Coba baca ulang kartu fakta di bab yang masih terlewat, lalu uji kembali pemahamanmu.', en: 'Nice start! Revisit the fact cards in the chapters you missed and try the quiz again.' } },
      { minPct: 0, badge: { id: 'Langkah Pertama', en: 'First Step' }, t: { id: 'Saatnya memulai! Jelajahi kembali 3 bab Kalabumi dan mulai dari kebiasaan kecil seperti membawa botol minum sendiri.', en: 'Time to begin! Explore the 3 Kalabumi chapters and start with small habits like carrying a reusable bottle.' } },
    ],
  },
  sources: 'UNEP (2021), Jambeck et al. (2015), NOAA, Rochman et al. (2015)',
};

export const FOREST = {
  kicker: { id: 'Bab 3', en: 'Chapter 3' },
  title: { id: 'Hutan Hujan: Paru-paru Dunia', en: 'Rainforests: Lungs of the World' },
  intro: {
    id: 'Tahukah kamu? Hutan hujan tropis Kalimantan, Papua, dan Amazon bekerja seperti AC raksasa dan gudang karbon bumi yang mengatur hujan sekaligus menjadi rumah bagi lebih dari separuh spesies darat dunia!',
    en: "Did you know? Tropical rainforests in Borneo, Papua, and the Amazon act like Earth's giant air conditioner and carbon vault, regulating rainfall while sheltering over half of all land species!",
  },
  stats: [
    { v: '420 Mha', t: { id: 'hutan hilang sejak 1990 (FAO)', en: 'forest lost since 1990 (FAO)' } },
    { v: '>30%', t: { id: 'tutupan hutan Kalimantan hilang 1973-2015', en: 'Borneo forest cover lost 1973-2015' } },
    { v: '~100.000', t: { id: 'orangutan Kalimantan hilang 1999-2015', en: 'Bornean orangutans lost 1999-2015' } },
  ],
  regions: [
    {
      k: 'borneo',
      isIndonesia: true,
      highlight: { id: 'Sorotan Indonesia · Deforestasi Sawit & Tambang', en: 'Indonesia Spotlight · Palm Oil & Mining' },
      name: { id: 'Kalimantan (Borneo)', en: 'Borneo' },
      image: WM('Borneo_rainforest.jpg', 900),
      wildlifeImage: WM('Orang_Utan,_Semenggok_Forest_Reserve,_Sarawak,_Borneo,_Malaysia.JPG', 700),
      text: {
        id: 'Salah satu hutan tertua di dunia (±140 juta tahun). Dibuka untuk perkebunan sawit, tambang, dan HTI. Orangutan, bekantan, dan macan dahan kehilangan habitat.',
        en: 'One of the oldest forests on Earth (~140 million years). Cleared for oil palm, mining and timber plantations. Orangutans, proboscis monkeys and clouded leopards lose habitat.',
      },
      species: [
        { id: 'Orangutan (Kritis)', en: 'Orangutan (Critically Endangered)' },
        { id: 'Bekantan', en: 'Proboscis monkey' },
        { id: 'Macan dahan', en: 'Sunda clouded leopard' },
      ],
    },
    {
      k: 'amazon',
      name: { id: 'Amazon', en: 'Amazon' },
      image: WM('Amazon_rainforest.jpg', 900),
      wildlifeImage: WM('Aerial_view_of_the_Amazon_Rainforest.jpg', 700),
      text: {
        id: 'Hutan hujan terbesar di dunia, menyimpan puluhan miliar ton karbon. Ekspansi peternakan dan kebakaran mendorongnya mendekati titik kritis. Catatan: Amazon bukan penghasil 20% oksigen dunia; perannya yang utama adalah menyimpan karbon dan mengatur hujan.',
        en: "The largest rainforest, storing tens of billions of tonnes of carbon. Cattle ranching and fires push it toward a tipping point. Note: the Amazon does not make 20% of the world's oxygen; its key roles are storing carbon and regulating rainfall.",
      },
      species: [
        { id: 'Jaguar', en: 'Jaguar' },
        { id: 'Macaw', en: 'Macaw' },
        { id: 'Lumba-lumba sungai', en: 'River dolphin' },
      ],
    },
    {
      k: 'raja-ampat',
      isIndonesia: true,
      isTrending: true,
      highlight: { id: 'Isu Tren Indonesia · Tambang Nikel Pulau Kecil', en: 'Trending in Indonesia · Small-Island Nickel Mining' },
      name: { id: 'Raja Ampat & Tambang', en: 'Raja Ampat & Mining' },
      image: WM('Piaynemo_Island,_Raja_Ampat,_West_Papua,_Indonesia.jpg', 900),
      wildlifeImage: WM('Pulau_Piaynemo,_Raja_Ampat.jpg', 700),
      text: {
        id: 'Ekspansi tambang nikel di pulau-pulau kecil Raja Ampat, Papua Barat Daya, terus menuai sorotan karena mengancam hutan pesisir dan ekosistem terumbu karang di jantung Segitiga Terumbu Karang dunia. Meski pemerintah sempat mencabut empat izin tambang, masyarakat adat dan koalisi lingkungan mendesak keterbukaan SK serta penghentian operasi di pulau kecil seperti Pulau Gag.',
        en: 'Nickel mining expansion across small islands in Raja Ampat, Southwest Papua, remains under intense scrutiny for threatening coastal forests and coral reef ecosystems in the Coral Triangle. Although four mining permits were revoked, Indigenous communities and environmental groups continue pushing for full transparency and a halt to small-island mining such as on Gag Island.',
      },
      species: [
        { id: 'Hutan Pulau Kecil', en: 'Small-Island Coastal Forest' },
        { id: 'Terumbu Karang Segitiga', en: 'Coral Triangle Reefs' },
        { id: 'Cenderawasih Merah', en: 'Red Bird-of-Paradise' },
      ],
    },
    {
      k: 'papua-merauke',
      isIndonesia: true,
      isTrending: true,
      highlight: { id: 'Isu Tren Indonesia · Food Estate & Lahan Gambut', en: 'Trending in Indonesia · Food Estate & Peatlands' },
      name: { id: 'Papua & Merauke', en: 'Papua & Merauke' },
      image: WM('Taman_Nasional_Lorentz.jpg', 900),
      wildlifeImage: WM('Mountain_River_Landscape_Along_the_Nabire–Enarotali_Trans-Papua_Highway,_Central_Papua,_Indonesia.jpg', 700),
      text: {
        id: 'Pembukaan hutan dan lahan gambut skala besar untuk proyek lumbung pangan (Food Estate) dan perkebunan tebu di Merauke, Papua Selatan, memicu kekhawatiran atas lonjakan emisi karbon dan hilangnya ruang hidup masyarakat adat. Kelompok masyarakat adat dan koalisi sipil terus menagih janji penghentian deforestasi serta menempuh jalur hukum untuk melindungi hutan primer Papua.',
        en: 'Large-scale forest and peatland clearing for the Food Estate and sugarcane megaprojects in Merauke, South Papua, has sparked alarm over rising carbon emissions and the loss of Indigenous ancestral lands. Indigenous groups and civil coalitions are actively pressing for zero-deforestation pledges and pursuing legal challenges to protect Papua\'s primary forests.',
      },
      species: [
        { id: 'Hutan Primer & Gambut Papua', en: 'Papua Primary & Peat Forest' },
        { id: 'Kasuari Gelambir Ganda', en: 'Southern Cassowary' },
        { id: 'Kanguru Pohon', en: 'Tree-Kangaroo' },
      ],
    },
    {
      k: 'sumatra-leuser',
      isIndonesia: true,
      isTrending: true,
      highlight: { id: 'Isu Tren Indonesia · Sawit Ilegal & Koridor Gajah', en: 'Trending in Indonesia · Illegal Palm Oil & Elephant Corridors' },
      name: { id: 'Sumatra (Tesso Nilo & Leuser)', en: 'Sumatra (Tesso Nilo & Leuser)' },
      image: WM('Taman_Nasional_Gunung_Leuser.jpg', 900),
      wildlifeImage: WM('Hutan_Gunung_Leuser_Aceh.jpg', 700),
      text: {
        id: 'Taman Nasional Tesso Nilo di Riau dan Ekosistem Leuser di Aceh-Sumatra Utara menghadapi tekanan berat akibat perambahan hutan untuk perkebunan sawit ilegal dan fragmentasi habitat satwa liar. Pemerintah dan tim gabungan satgas tengah melakukan penertiban lahan sawit, relokasi, dan reforestasi untuk memulihkan koridor hidup Gajah Sumatera yang kian kritis.',
        en: 'Tesso Nilo National Park in Riau and the Leuser Ecosystem in Aceh-North Sumatra face severe pressure from illegal oil palm encroachment and wildlife habitat fragmentation. Authorities and joint task forces are conducting plantation clearances, relocations, and reforestation drives to restore critical corridors for the critically endangered Sumatran Elephant.',
      },
      species: [
        { id: 'Gajah Sumatera', en: 'Sumatran Elephant' },
        { id: 'Harimau Sumatera', en: 'Sumatran Tiger' },
        { id: 'Orangutan Sumatera', en: 'Sumatran Orangutan' },
      ],
    },
  ],
  cascade: {
    title: { id: 'Rantai dampak deforestasi', en: 'Deforestation cascade' },
    steps: [
      { id: 'Hutan ditebang / dibakar', en: 'Forest cut / burned' },
      { id: 'Karbon terlepas ke atmosfer', en: 'Carbon released' },
      { id: 'Habitat satwa terpecah', en: 'Habitat fragments' },
      { id: 'Hujan & tanah terganggu', en: 'Rain & soil disrupted' },
    ],
  },
  fanDeck: {
    title: { id: 'Flora & Fauna Kunci Hutan Hujan', en: 'Key Rainforest Flora & Fauna' },
    subtitle: {
      id: 'Eksplorasi tumbuhan dan satwa penjaga ekosistem hutan Kalimantan dan Amazon yang terancam deforestasi.',
      en: 'Explore plants and wildlife guarding Borneo and Amazon rainforests threatened by deforestation.',
    },
    filters: [
      { k: 'all', id: 'Semua', en: 'All' },
      { k: 'fauna', id: 'Fauna', en: 'Fauna' },
      { k: 'flora', id: 'Flora', en: 'Flora' },
      { k: 'borneo', id: 'Kalimantan', en: 'Borneo' },
      { k: 'amazon', id: 'Amazon', en: 'Amazon' },
    ],
    cta: { id: 'Klik untuk detail', en: 'Click for details' },
    cards: [
      {
        id: 'orangutan',
        region: 'borneo',
        kind: 'fauna',
        color: 'green',
        name: { id: 'Orangutan Kalimantan', en: 'Bornean Orangutan' },
        habitat: { id: 'Hutan Rawa Gambut & Dipterokarpa', en: 'Peat Swamp & Dipterocarp Forest' },
        status: { id: 'KRITIS', en: 'CRITICALLY ENDANGERED' },
        image: WM('Orang_Utan,_Semenggok_Forest_Reserve,_Sarawak,_Borneo,_Malaysia.JPG', 700),
        detail: {
          id: 'Penyebar biji alami hutan tropis Kalimantan. Populasinya menyusut tajam akibat pembukaan lahan sawit, tambang, dan kebakaran gambut.',
          en: 'A vital seed disperser in Borneo. Its population has dropped sharply due to oil palm expansion, mining and peat fires.',
        },
      },
      {
        id: 'anggrek-hitam',
        region: 'borneo',
        kind: 'flora',
        color: 'yellow',
        name: { id: 'Anggrek Hitam Kalimantan', en: 'Black Orchid of Borneo' },
        habitat: { id: 'Epifit Hutan Dataran Rendah', en: 'Lowland Rainforest Epiphyte' },
        status: { id: 'TERLINDUNGI', en: 'PROTECTED' },
        image: WM('Coelogynepandurata.jpg', 700),
        detail: {
          id: 'Flora endemik Kalimantan berlidah hitam khas yang tumbuh menempel pada pohon tua. Penebangan hutan primer membuat habitat alaminya makin langka.',
          en: 'Endemic Bornean orchid with a distinctive black lip growing on old-growth trees. Logging makes its wild habitat increasingly rare.',
        },
      },
      {
        id: 'bekantan',
        region: 'borneo',
        kind: 'fauna',
        color: 'orange',
        name: { id: 'Bekantan', en: 'Proboscis Monkey' },
        habitat: { id: 'Hutan Mangrove & Tepi Sungai', en: 'Mangrove & Riverine Forest' },
        status: { id: 'TERANCAM', en: 'ENDANGERED' },
        image: WM('Proboscis_monkey_(Nasalis_larvatus)_male_Labuk_Bay.jpg', 700),
        detail: {
          id: 'Primata endemik Kalimantan yang bergantung pada hutan tepi sungai dan bakau. Konversi pesisir memutus jalur jelajah alaminya.',
          en: 'Endemic to Borneo and dependent on riverside and mangrove forests. Coastal conversion fragments its natural range.',
        },
      },
      {
        id: 'ulin',
        region: 'borneo',
        kind: 'flora',
        color: 'green',
        name: { id: 'Kayu Ulin Kalimantan', en: 'Bornean Ironwood' },
        habitat: { id: 'Hutan Hujan Primer Dataran Rendah', en: 'Primary Lowland Rainforest' },
        status: { id: 'RENTAN', en: 'VULNERABLE' },
        image: WM('Eusideroxylon_zwageri.JPG', 700),
        detail: {
          id: 'Pohon keras berumur ratusan tahun penyimpan karbon tinggi di Kalimantan. Tumbuh sangat lambat dan terancam penebangan ilegal serta alih fungsi lahan.',
          en: 'Centuries-old hardwood tree storing massive carbon in Borneo. Very slow-growing and threatened by illegal logging and land clearing.',
        },
      },
      {
        id: 'macan-dahan',
        region: 'borneo',
        kind: 'fauna',
        color: 'blue',
        name: { id: 'Macan Dahan', en: 'Sunda Clouded Leopard' },
        habitat: { id: 'Kanopi Hutan Primer Kalimantan', en: 'Borneo Primary Forest Canopy' },
        status: { id: 'RENTAN', en: 'VULNERABLE' },
        image: WM('Clouded_leopard.jpg', 700),
        detail: {
          id: 'Predator puncak di hutan Kalimantan yang sangat pemalu. Membutuhkan hutan utuh berkanopi rapat agar tetap bertahan.',
          en: 'An elusive apex predator of Borneo that needs intact, dense-canopy forest to survive.',
        },
      },
      {
        id: 'victoria-amazonica',
        region: 'amazon',
        kind: 'flora',
        color: 'green',
        name: { id: 'Teratai Raksasa Amazon', en: 'Giant Amazon Water Lily' },
        habitat: { id: 'Perairan Tenang Cekungan Amazon', en: 'Calm Amazon Basin Waters' },
        status: { id: 'INDIKATOR AIR', en: 'WATER INDICATOR' },
        image: WM('Victoria_amazonica.jpg', 700),
        detail: {
          id: 'Tumbuhan air ikonik Amazon berdaun hingga 3 meter. Kualitas air sungai yang keruh akibat sedimentasi deforestasi mengganggu pertumbuhannya.',
          en: 'Iconic Amazon aquatic plant with leaves up to 3 meters wide. Sediment runoff from deforestation disrupts its river habitats.',
        },
      },
      {
        id: 'jaguar',
        region: 'amazon',
        kind: 'fauna',
        color: 'orange',
        name: { id: 'Jaguar', en: 'Jaguar' },
        habitat: { id: 'Hutan Lembah & Lahan Basah Amazon', en: 'Amazon Basin & Wetlands' },
        status: { id: 'HAMPIR TERANCAM', en: 'NEAR THREATENED' },
        image: WM('Jaguar_(Panthera_onca).JPG', 700),
        detail: {
          id: 'Kucing besar penjaga keseimbangan rantai makanan Amazon. Ekspansi peternakan dan kebakaran hutan menyempitkan wilayah burunya.',
          en: 'The largest cat in the Americas, keeping Amazon food webs balanced. Cattle ranching and fires shrink its territory.',
        },
      },
      {
        id: 'kacang-brasil',
        region: 'amazon',
        kind: 'flora',
        color: 'yellow',
        name: { id: 'Pohon Kacang Brasil', en: 'Brazil Nut Tree' },
        habitat: { id: 'Hutan Primer Utuh Amazon', en: 'Intact Amazon Old-Growth' },
        status: { id: 'RENTAN', en: 'VULNERABLE' },
        image: WM('Bertholletia_excelsa.jpg', 700),
        detail: {
          id: 'Raksasa kanopi Amazon yang penyerbukannya bergantung pada lebah hutan utuh. Deforestasi memutus rantai ekologi antara pohon, lebah, dan satwa penyebar bijinya.',
          en: 'An Amazon canopy giant relying on wild forest bees for pollination. Deforestation breaks the ecological link between tree, bee and seed dispersers.',
        },
      },
      {
        id: 'macaw',
        region: 'amazon',
        kind: 'fauna',
        color: 'orange',
        name: { id: 'Macaw Merah', en: 'Scarlet Macaw' },
        habitat: { id: 'Pohon Tinggi Hutan Hujan Amazon', en: 'Emergent Amazon Canopy' },
        status: { id: 'TERDESAK', en: 'HABITAT LOSS' },
        image: WM('Scarlet_Macaw_(Ara_macao).jpg', 700),
        imgPosition: 'center top',
        detail: {
          id: 'Burung paruh bengkok berwarna cerah yang bersarang di lubang pohon tua raksasa. Penebangan pohon tua menghilangkan tempat bersarangnya.',
          en: 'Brightly coloured macaw that nests in cavities of giant old-growth trees. Logging removes its nesting sites.',
        },
      },
      {
        id: 'inia',
        region: 'amazon',
        kind: 'fauna',
        color: 'blue',
        name: { id: 'Lumba-lumba Sungai', en: 'Amazon River Dolphin' },
        habitat: { id: 'Daerah Aliran Sungai Amazon', en: 'Amazon River Basin' },
        status: { id: 'TERANCAM', en: 'ENDANGERED' },
        image: WM('Inia_geoffrensis_179341177.jpg', 700),
        detail: {
          id: 'Lumba-lumba air tawar terbesar di dunia. Terancam oleh bendungan, pencemaran merkuri tambang, dan kerusakan hutan tepi sungai.',
          en: 'The largest freshwater dolphin, threatened by dams, mining mercury pollution and riverside deforestation.',
        },
      },
    ],
  },
  sources: 'FAO FRA 2020, Gaveau et al. (2016), Voigt et al. (2018), IUCN, WWF',
};

export const ACTION = {
  title: { id: 'Apa yang bisa kamu lakukan?', en: 'What can you do?' },
  intro: {
    id: 'Perubahan besar dimulai dari kebiasaan kecil. Pilih satu per bab, lakukan minggu ini.',
    en: 'Big change starts with small habits. Pick one per chapter and do it this week.',
  },
  groups: [
    {
      k: 'climate',
      title: { id: 'Untuk iklim', en: 'For climate' },
      tips: [
        { id: 'Hemat listrik & pilih transportasi umum atau sepeda', en: 'Save electricity; use public transport or cycle' },
        { id: 'Kurangi makanan olahan daging merah', en: 'Eat less red meat' },
        { id: 'Dukung energi terbarukan', en: 'Support renewable energy' },
      ],
    },
    {
      k: 'ocean',
      title: { id: 'Untuk lautan', en: 'For the ocean' },
      tips: [
        { id: 'Bawa botol minum, tas, dan wadah makan sendiri', en: 'Carry your own bottle, bag and container' },
        { id: 'Pilah sampah dan ikut bersih pantai', en: 'Sort waste and join beach clean-ups' },
        { id: 'Pilih produk tanpa mikroplastik', en: 'Choose microplastic-free products' },
      ],
    },
    {
      k: 'forest',
      title: { id: 'Untuk hutan', en: 'For forests' },
      tips: [
        { id: 'Pilih produk kayu/kertas bersertifikat FSC', en: 'Choose FSC-certified wood and paper' },
        { id: 'Pilih minyak sawit bersertifikat RSPO', en: 'Choose RSPO-certified palm oil' },
        { id: 'Tanam pohon dan jaga ruang hijau', en: 'Plant trees and protect green space' },
      ],
    },
  ],
  orgsTitle: { id: 'Organisasi yang bisa kamu dukung (donasi bersifat opsional)', en: 'Organisations you can support (donating is optional)' },
  orgs: [
    { name: 'WWF Indonesia', url: 'https://www.wwf.id' },
    { name: 'WALHI', url: 'https://www.walhi.or.id' },
    { name: 'Greenpeace Indonesia', url: 'https://www.greenpeace.org/indonesia' },
    { name: 'Sungai Watch', url: 'https://sungai.watch' },
    { name: 'Borneo Orangutan Survival Foundation', url: 'https://orangutan.or.id' },
  ],
  contactTitle: { id: 'Hubungi kami', en: 'Contact us' },
  contactText: { id: 'Punya masukan, data, atau ingin berkolaborasi? Tulis pesanmu.', en: 'Have feedback, data or want to collaborate? Write to us.' },
  form: {
    name: { id: 'Nama', en: 'Name' },
    email: { id: 'Email', en: 'Email' },
    msg: { id: 'Pesan', en: 'Message' },
    send: { id: 'Kirim', en: 'Send' },
    thanks: { id: 'Terima kasih! Pesanmu tercatat.', en: 'Thank you! Your message is noted.' },
  },
  footer: {
    id: 'Kalabumi: portal edukasi krisis lingkungan global. Data: IPCC, NASA, UNEP, FAO, BMKG, IUCN, WWF.',
    en: 'Kalabumi: educational portal on the global environmental crisis. Data: IPCC, NASA, UNEP, FAO, BMKG, IUCN, WWF.',
  },
};
