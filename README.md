# GameVault - Marketplace Akun Game Premium

Website marketplace akun game modern dengan desain profesional dan produk hardcoded.

## Fitur

### Frontend
- **Hero Section Modern**: Tampilan hero yang menarik dengan animasi smooth
- **Product Cards Elegan**: Kartu produk dengan hover effect dan informasi lengkap
- **Responsive Grid**: Layout otomatis untuk mobile (1 kolom), tablet (2 kolom), desktop (3-4 kolom)
- **Tombol WhatsApp Otomatis**: Integrasi WhatsApp untuk pembelian langsung
- **Testimonial Slider**: Slider testimoni dengan auto-scroll dan navigasi
- **Loading Screen Modern**: Animasi loading saat halaman dimuat
- **Navbar Blur**: Efek blur pada navbar saat scroll
- **Fade-up Animations**: Animasi elemen saat scroll
- **Lazy Loading Images**: Optimasi performa dengan lazy loading
- **Vercel Speed Insights**: Tracking performa dan Core Web Vitals otomatis

## Teknologi

- HTML5
- CSS3 (Custom CSS, tanpa framework)
- Vanilla JavaScript
- Font: Poppins (Google Fonts)

## Warna

- Background utama: `#0f0f0f`
- Secondary background: `#161616`
- Card: `#1a1a1a`
- Text: `#f5f5f5`
- Accent: `#ff7a00` (Orange Gaming)
- Hover: `#ff9a3c`
- Success: `#10b981`
- Danger: `#ef4444`

## Cara Menggunakan

### 1. Buka Website

1. Buka file `index.html` di browser
2. Pastikan koneksi internet aktif untuk memuat Google Fonts
3. Website siap digunakan

### 2. Menambah / Edit Produk

Edit file **`products.js`** saja. Contoh menambah produk:

```javascript
{
    id: 'id-unik',
    title: 'Nama Akun',
    game: 'NAMA GAME',
    description: 'Ringkas di kartu',
    descriptionFull: 'Lengkap di popup detail',
    thumbnail: 'akun/foto-kartu.jpg',      // foto di daftar produk
    detailImage: 'akun/foto-detail.jpg',   // foto popup (boleh beda!)
    price: '1.500.000',
    features: ['Fitur 1', 'Fitur 2', 'Fitur 3'],
    specs: ['Spesifikasi 1', 'Spesifikasi 2']
}
```

**Klik foto** pada kartu = buka detail. Tombol hijau = langsung WhatsApp.

Jika `detailImage` sama dengan `thumbnail`, isi path yang sama. Kosongkan `detailImage` tidak perlu — otomatis pakai `thumbnail`.

### 3. Nomor WhatsApp

Edit bagian atas `products.js`:

```javascript
const SITE_CONFIG = {
    whatsapp: '6281944090188',      // 081944090188
    whatsappDisplay: '0819 4409 0188'
};
```

## Struktur File

```
shopff/
├── index.html
├── styles.css
├── script.js
├── products.js     # ← data produk & nomor WA (edit di sini)
├── README.md
├── img/            # Logo & banner
└── akun/           # Gambar produk
```

## Upload ke GitHub

Proyek ini **bisa di-upload ke GitHub** (website statis HTML/CSS/JS).

### Langkah singkat

1. Buat akun di [github.com](https://github.com) jika belum punya.
2. Buat repository baru (misalnya `gamevault-shop`), **tanpa** README otomatis.
3. Di folder project, jalankan:

```bash
cd shopff
git init
git add .
git commit -m "Initial commit: GameVault marketplace"
git branch -M main
git remote add origin https://github.com/USERNAME/gamevault-shop.git
git push -u origin main
```

4. Aktifkan **GitHub Pages** (opsional, website online gratis):
   - Repository → **Settings** → **Pages**
   - Source: branch `main`, folder `/ (root)`
   - Simpan — URL live: `https://USERNAME.github.io/gamevault-shop/`

Pastikan folder `img/` dan `akun/` ikut di-commit agar gambar tampil.

## Kustomisasi

### Mengubah Warna

Edit file `styles.css` dan ubah variabel CSS di `:root`:

```css
:root {
    --bg-primary: #0f0f0f;
    --bg-secondary: #161616;
    --bg-card: #1a1a1a;
    --text-primary: #f5f5f5;
    --accent: #ff7a00;
    --accent-hover: #ff9a3c;
    /* ... */
}
```

### Mengubah Font

Ganti font di file `index.html` dan `admin.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=FONT_NAME:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Lalu update di CSS:

```css
body {
    font-family: 'FONT_NAME', sans-serif;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Gambar tidak muncul

1. Pastikan URL gambar valid dan dapat diakses
2. Cek koneksi internet
3. Cek console browser untuk error (F12 > Console)

### Tombol WhatsApp tidak berfungsi

1. Pastikan nomor WhatsApp sudah diubah di `script.js`
2. Cek apakah format nomor sudah benar (tanpa tanda + atau spasi)
3. Pastikan WhatsApp terinstall di device

### Animasi tidak berjalan

1. Pastikan JavaScript ter-load dengan benar
2. Cek browser console untuk error
3. Pastikan browser mendukung CSS animations

## Vercel Speed Insights

Website ini sudah terintegrasi dengan Vercel Speed Insights untuk tracking performa otomatis. Speed Insights akan:
- Melacak Core Web Vitals (LCP, FID, CLS)
- Mengukur performa loading dan interaktivitas
- Memberikan insights untuk optimasi

### Aktivasi Speed Insights

Speed Insights akan aktif secara otomatis setelah:
1. Deploy website ke Vercel
2. Enable Speed Insights di Vercel dashboard
3. Script tracking akan otomatis dimuat dari `/_vercel/speed-insights/script.js`

Dashboard Speed Insights dapat diakses di Vercel project dashboard Anda untuk melihat metrik performa real-time.

## Deployment

### Deploy ke Hosting Statis

Upload semua file ke hosting provider Anda:

**Netlify:**
1. Drag and drop folder `shopff` ke Netlify dashboard
2. Website akan langsung live

**Vercel (Recommended for Speed Insights):**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` di folder project
3. Enable Speed Insights di Vercel dashboard untuk tracking performa

**GitHub Pages:**
1. Push ke GitHub repository
2. Enable GitHub Pages di repository settings
3. Pilih branch main/folder root

**Hosting Lain:**
Upload file `index.html`, `styles.css`, dan `script.js` ke hosting provider Anda (cPanel, Hostinger, dll).

**Note:** Vercel Speed Insights hanya akan berfungsi ketika di-deploy ke Vercel. Untuk hosting lain, script tracking tidak akan berpengaruh.

## License

Free untuk penggunaan pribadi dan komersial.

## Support

Untuk pertanyaan atau issues, silakan buka issue di repository atau hubungi developer.
