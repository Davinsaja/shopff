/**
 * ============================================
 *  DATA PRODUK — edit file ini saja
 * ============================================
 *
 * thumbnail  = foto KECIL di kartu (disarankan < 250 KB, mis. jpeg 800px)
 * detailImage = foto besar di popup detail (dimuat saat dibuka saja)
 *              kosongkan detailImage untuk pakai foto yang sama dengan thumbnail
 *
 * price      = tampilan harga (contoh: "2.500.000")
 * category   = 'ml' | 'ff' | 'pubg' | 'lainnya' (untuk filter)
 * soldOut    = true jika akun sudah terjual (❌ + badge Sold Out + tombol nonaktif)
 *              contoh: soldOut: true
 */

const SITE_CONFIG = {
  whatsapp: "6281944090188", // 081944090188
  whatsappDisplay: "0819 4409 0188",
  instagram: "https://www.instagram.com/dapin.saja?igsh=NWxjaWt3bTc3cGlk",
  tagline:
    "Marketplace akun game premium terpercaya. Tempat terbaik untuk beli akun Free Fire, Mobile Legends, PUBG & game lainnya.",
  locationName: "VinszStore",
  locationAddress: "Indonesia · Transaksi online via WhatsApp",
};

/** FAQ — pertanyaan & jawaban (accordion) */
const FAQ_ITEMS = [
  {
    question: "Bagaimana cara membeli akun di VinszStore?",
    answer:
      "Pilih akun di katalog, klik foto untuk detail, lalu tekan tombol Beli via WhatsApp. Admin akan membalas dan memandu proses pembayaran hingga akun diterima.",
  },
  {
    question: "Apakah akun yang dijual aman dan sesuai deskripsi?",
    answer:
      "Setiap akun dicek sebelum dijual. Kami menampilkan status ✅ Tersedia atau ❌ Sold Out secara jelas. Jika ada ketidaksesuaian, hubungi admin via WhatsApp.",
  },
  {
    question: "Metode pembayaran apa yang tersedia?",
    answer:
      "Pembayaran dilakukan via transfer bank, e-wallet, atau metode lain yang disepakati dengan admin melalui chat WhatsApp.",
  },
  {
    question: "Berapa lama proses pengiriman akun?",
    answer:
      "Setelah pembayaran dikonfirmasi, akun biasanya dikirim dalam 5–30 menit pada jam operasional. Di luar jam tersebut, proses bisa sedikit lebih lama.",
  },
  {
    question: "Apakah bisa tukar atau refund?",
    answer:
      "Refund hanya berlaku jika akun bermasalah saat pertama kali login dan belum ada perubahan data. Syarat & ketentuan akan dijelaskan admin saat transaksi.",
  },
  {
    question: "Kenapa beberapa akun bertanda Sold Out?",
    answer:
      "Akun dengan status ❌ Sold Out sudah terjual. Anda bisa meminta rekomendasi akun serupa dengan rank atau harga mirip melalui WhatsApp.",
  },
];

/**
 * category: 'ml' | 'ff' | 'pubg' | 'lainnya' — untuk filter tombol
 * soldOut: true = akun sudah terjual (tampil ❌, overlay sold out)
 */

const PRODUCTS = [
  {
    id: "ml-sultan76",
    category: "ml",
    soldOut: false,
    title: "Akun ML 76 Hero",
    game: "MOBILE LEGENDS",
    description:
      "Akun ML skin Epic rame, emote rame, ada Karina KOF & Claude Prime.",
    descriptionFull:
      "Akun Mobile Legends dengan 76 Hero dan 116 Skin. Memiliki banyak skin Epic, Special, dan beberapa skin langka seperti Karina KOF serta Claude Prime. Emote rame, efek recall Cosmic Blaze, dan koleksi akun sudah cukup lengkap untuk push rank maupun koleksi.",
    thumbnail: "akun/mlstok4.jpeg",
   
    price: "55.000",

    specs: [
      "76 Hero",
      "116 Skin",
      "Skin Epic Rame",
      "Emote Rame",
      "Karina KOF",
      "Claude Prime",
      "Efek Recall Cosmic Blaze",
      "Kolektor Ahli III",
      "Rank Tinggi",
      "Akun Aman & Bind",
    ],
  },

  {
    id: "ml-mythic-glory",
    category: "ml",
    soldOut: false,
    title: "Akun Mythic Glory",
    game: "MOBILE LEGENDS",
    description:
      "Akun MLBB rank Mythic Glory, 99 hero, 150 skin, Granger Prime.",
    descriptionFull:
      "Akun MLBB dengan rank Mythic Glory, 99 hero, 150 skin, dan banyak Skin Epic, Emblem Max. Pastinya Sudah Aman Dan Log Monton.",
    thumbnail: "akun/detailml1.webp",
    
    price: "60.000",

    specs: [
      "Mythic Glory",
      "99 Hero",
      "150 Skin",
      "Granger Prime",
      "Emblem Max",
      "Skin Epic Rame",
    ],
  },
  {
    id: "ff-sglumut1",
    category: "ff",
    soldOut: true,
    title: "Akun ff Sg Lumut",
    game: "FREE FIRE",
    description: "Akun FF Sg Lumut, Vault 300+, Evogun Aka & mp40.",
    descriptionFull:
      "Akun Free Fire rank sg Lumut, Vault 300+,  Evogun Aka & Mp40, Baju Kece Kece.",
    thumbnail: "akun/detailff1.webp",
    
    price: "150.000",

    specs: [
      "sg Lumut",
      "Vault 300+",
      " Evogun Aka & Mp40",
      "Set Kece",
      "Tinju Loby",
      "Emote Sayap Dll",
    ],
  },
  {
    id: "ml-aldousblazing1",
    category: "ml",
    soldOut: true,
    title: "Akun Ml Aldous Blazing",
    game: "MOBILE LEGENDS",
    description:
      "Akun Ml Skin Aldous Blazing, 100+ skin, 80+ Hero & Harga Miring.",
    descriptionFull:
      "Akun Ml Skin Aldous Blazing, 100+ skin, 80+ Hero, Harga Miring, Log Monton & Sudah Aman.",
    thumbnail: "akun/stokvinml2.jpg",
    detailImage: "akun/stokvinml2.jpg",
    price: "35.000",

    specs: [
      "Blazing Aldous",
      "100+ Skin",
      "80+ Hero",
      "Harga murah",
      "Log Monton",
      "All Aman",
    ],
  },
];
