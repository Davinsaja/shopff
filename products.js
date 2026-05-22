/**
 * ============================================
 *  DATA PRODUK — edit file ini saja
 * ============================================
 *
 * thumbnail  = foto di kartu produk (tampilan depan)
 * detailImage = foto di popup detail (boleh beda, misal screenshot lengkap)
 *              kosongkan detailImage untuk pakai foto yang sama dengan thumbnail
 *
 * price      = tampilan harga (contoh: "2.500.000")
 * category   = 'ml' | 'ff' | 'pubg' | 'lainnya' (untuk filter)
 * soldOut    = true jika akun sudah terjual (❌ + badge Sold Out + tombol nonaktif)
 *              contoh: soldOut: true
 */

const SITE_CONFIG = {
    whatsapp: '6281944090188', // 081944090188
    whatsappDisplay: '0819 4409 0188',
    instagram: 'https://www.instagram.com/dapin.saja?igsh=NWxjaWt3bTc3cGlk',
    tagline: 'Marketplace akun game premium terpercaya. Tempat terbaik untuk beli akun Free Fire, Mobile Legends, PUBG & game lainnya.',
    locationName: 'VinszStore',
    locationAddress: 'Indonesia · Transaksi online via WhatsApp'
};

/** FAQ — pertanyaan & jawaban (accordion) */
const FAQ_ITEMS = [
    {
        question: 'Bagaimana cara membeli akun di VinszStore?',
        answer: 'Pilih akun di katalog, klik foto untuk detail, lalu tekan tombol Beli via WhatsApp. Admin akan membalas dan memandu proses pembayaran hingga akun diterima.'
    },
    {
        question: 'Apakah akun yang dijual aman dan sesuai deskripsi?',
        answer: 'Setiap akun dicek sebelum dijual. Kami menampilkan status ✅ Tersedia atau ❌ Sold Out secara jelas. Jika ada ketidaksesuaian, hubungi admin via WhatsApp.'
    },
    {
        question: 'Metode pembayaran apa yang tersedia?',
        answer: 'Pembayaran dilakukan via transfer bank, e-wallet, atau metode lain yang disepakati dengan admin melalui chat WhatsApp.'
    },
    {
        question: 'Berapa lama proses pengiriman akun?',
        answer: 'Setelah pembayaran dikonfirmasi, akun biasanya dikirim dalam 5–30 menit pada jam operasional. Di luar jam tersebut, proses bisa sedikit lebih lama.'
    },
    {
        question: 'Apakah bisa tukar atau refund?',
        answer: 'Refund hanya berlaku jika akun bermasalah saat pertama kali login dan belum ada perubahan data. Syarat & ketentuan akan dijelaskan admin saat transaksi.'
    },
    {
        question: 'Kenapa beberapa akun bertanda Sold Out?',
        answer: 'Akun dengan status ❌ Sold Out sudah terjual. Anda bisa meminta rekomendasi akun serupa dengan rank atau harga mirip melalui WhatsApp.'
    }
];

/**
 * category: 'ml' | 'ff' | 'pubg' | 'lainnya' — untuk filter tombol
 * soldOut: true = akun sudah terjual (tampil ❌, overlay sold out)
 */

const PRODUCTS = [
    {
        id: 'ml-mythic-glory',
        category: 'ml',
        soldOut: false,
        title: 'Akun Mythic Glory',
        game: 'MOBILE LEGENDS',
        description: 'Akun MLBB rank Mythic Glory, 120 hero, 150 skin, event pass lengkap.',
        descriptionFull: 'Akun MLBB dengan rank Mythic Glory, 120 hero, 150 skin, dan banyak event pass. Akun sudah lengkap hero & skin premium.',
        thumbnail: 'akun/detailml1.jpg',
        detailImage: 'akun/detailml1.jpg',
        price: '2.500.000',
        features: ['Mythic Glory', '120 Hero', '150 Skin'],
        specs: ['Mythic Glory', '120 Hero', '150 Skin', 'All Event Pass', 'Full Emblem', 'High Win Rate']
    },
    {
        id: 'ff-grandmaster',
        category: 'ff',
        soldOut: false,
        title: 'Akun Grandmaster',
        game: 'FREE FIRE',
        description: 'Akun FF Grandmaster, full bundle, elite pass season 1–50.',
        descriptionFull: 'Akun Free Fire rank Grandmaster, full bundle, elite pass lengkap, banyak skin langka & item premium.',
        thumbnail: 'akun/detailff1.jpg',
        detailImage: 'akun/detailff1.jpg',
        price: '1.800.000',
        features: ['Grandmaster', 'Full Bundle', 'Elite Pass Lengkap'],
        specs: ['Grandmaster', 'Full Bundle', 'Elite Pass Lengkap', 'Rare Skins', 'High K/D Ratio', 'Many Characters']
    },
    {
        id: 'pubg-conqueror',
        category: 'pubg',
        soldOut: true,
        title: 'Akun Conqueror',
        game: 'PUBG MOBILE',
        description: 'Akun PUBGM Conqueror, 500+ skin, rare item & season pass.',
        descriptionFull: 'Akun PUBG Mobile rank Conqueror, 500+ skin, banyak rare item, season pass lengkap.',
        thumbnail: 'img/logojumbotron.png',
        detailImage: 'img/logojumbotron.png',
        price: '3.200.000',
        features: ['Conqueror', '500+ Skin', 'Rare Items'],
        specs: ['Conqueror', '500+ Skin', 'Rare Items', 'Mythic Weapons', 'High Rating', 'Complete Collection']
    },
    {
        id: 'valorant-immortal',
        category: 'lainnya',
        soldOut: false,
        title: 'Akun Immortal',
        game: 'VALORANT',
        description: 'Akun Valorant Immortal, all agents & skin premium.',
        descriptionFull: 'Akun Valorant rank Immortal, semua agent unlocked, skin premium & battle pass lengkap.',
        thumbnail: 'img/icontama.png',
        detailImage: 'img/icontama.png',
        price: '4.500.000',
        features: ['Immortal', 'All Agents', 'Premium Skins'],
        specs: ['Immortal', 'All Agents', 'Premium Skins', 'High MMR', 'Complete Collection', 'Rare Skins']
    }
];
