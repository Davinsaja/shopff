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
 */

const SITE_CONFIG = {
    whatsapp: '6281944090188', // 081944090188
    whatsappDisplay: '0819 4409 0188'
};

const PRODUCTS = [
    {
        id: 'ml-mythic-glory',
        title: 'Akun Mythic Glory',
        game: 'MOBILE LEGENDS',
        description: 'Akun MLBB rank Mythic Glory, 120 hero, 150 skin, event pass lengkap.',
        descriptionFull: 'Akun MLBB dengan rank Mythic Glory, 120 hero, 150 skin, dan banyak event pass. Akun sudah lengkap hero & skin premium.',
        thumbnail: 'akun/ml1.jpeg',
        detailImage: 'akun/ml1.jpeg', // ganti path lain jika ingin foto detail berbeda
        price: '2.500.000',
        features: ['Mythic Glory', '120 Hero', '150 Skin'],
        specs: ['Mythic Glory', '120 Hero', '150 Skin', 'All Event Pass', 'Full Emblem', 'High Win Rate']
    },
    {
        id: 'ff-grandmaster',
        title: 'Akun Grandmaster',
        game: 'FREE FIRE',
        description: 'Akun FF Grandmaster, full bundle, elite pass season 1–50.',
        descriptionFull: 'Akun Free Fire rank Grandmaster, full bundle, elite pass lengkap, banyak skin langka & item premium.',
        thumbnail: 'akun/ff1.jpeg',
        detailImage: 'akun/ff1.jpeg',
        price: '1.800.000',
        features: ['Grandmaster', 'Full Bundle', 'Elite Pass Lengkap'],
        specs: ['Grandmaster', 'Full Bundle', 'Elite Pass Lengkap', 'Rare Skins', 'High K/D Ratio', 'Many Characters']
    },
    {
        id: 'pubg-conqueror',
        title: 'Akun Conqueror',
        game: 'PUBG MOBILE',
        description: 'Akun PUBGM Conqueror, 500+ skin, rare item & season pass.',
        descriptionFull: 'Akun PUBG Mobile rank Conqueror, 500+ skin, banyak rare item, season pass lengkap.',
        thumbnail: 'img/feeposter.png',
        detailImage: 'img/feeposter.png',
        price: '3.200.000',
        features: ['Conqueror', '500+ Skin', 'Rare Items'],
        specs: ['Conqueror', '500+ Skin', 'Rare Items', 'Mythic Weapons', 'High Rating', 'Complete Collection']
    },
    {
        id: 'valorant-immortal',
        title: 'Akun Immortal',
        game: 'VALORANT',
        description: 'Akun Valorant Immortal, all agents & skin premium.',
        descriptionFull: 'Akun Valorant rank Immortal, semua agent unlocked, skin premium & battle pass lengkap.',
        thumbnail: 'img/feeposter.png',
        detailImage: 'img/banner1.jpeg',
        price: '4.500.000',
        features: ['Immortal', 'All Agents', 'Premium Skins'],
        specs: ['Immortal', 'All Agents', 'Premium Skins', 'High MMR', 'Complete Collection', 'Rare Skins']
    }
];
