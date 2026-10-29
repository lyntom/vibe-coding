# E-Tamu Disperkim Kota Samarinda (Production Distribution)

> **Berkas Siap Rilis (Production Build Artifacts)**  
> Sistem Informasi Buku Tamu Digital & Rekapitulasi Pelayanan Publik  
> **Dinas Perumahan dan Kawasan Permukiman (Disperkim) Pemerintah Kota Samarinda**

Repositori ini berisi berkas kompilasi produksi (*static web distribution*) yang siap di-*deploy* langsung ke platform *static hosting* seperti **Cloudflare Pages**, **GitHub Pages**, **Vercel**, **Netlify**, atau server web statis (**Nginx** / **Apache**).

---

## 🔗 Referensi Repositori Kode Sumber
Kode sumber lengkap beserta konfigurasi pengembang, skema data, dan dokumentasi arsitektur tersedia di:  
👉 **[https://github.com/lyntom/vibe-coding](https://github.com/lyntom/vibe-coding)**

---

## 📂 Struktur Berkas Produksi

```text
.
├── _redirects       # Aturan routing SPA untuk Cloudflare Pages (/* /index.html 200)
├── index.html       # HTML entry point beroptimasi tinggi dengan patch isolasi storage
├── assets/          # Bundel JavaScript dan CSS yang telah diminifikasi
│   ├── index-*.js
│   └── index-*.css
└── README.md        # Panduan deployment produksi ini
```

---

## 🌐 Panduan Deployment

### 1. Cloudflare Pages (Rekomendasi Utama)
1. Sambungkan repositori ini (`https://github.com/lyntom/e-tamu.git`) ke proyek Cloudflare Pages.
2. Atur konfigurasi:
   - **Framework Preset:** None / Direct Upload
   - **Build Command:** *(kosongkan)*
   - **Build Output Directory:** `/` (akar repositori)
3. Berkas `_redirects` akan otomatis menangani perutean *Single Page Application* (SPA) untuk rute `/login` dan `/admin`.

### 2. GitHub Pages
1. Aktifkan GitHub Pages pada pengaturan repositori (Settings -> Pages).
2. Pilih sumber *Deploy from a branch* -> branch `master` / root `/`.
3. Aplikasi menggunakan `HashRouter`, sehingga tautan dan navigasi rute `/` (`#/`), `/login` (`#/login`), dan `/admin` (`#/admin`) berjalan stabil tanpa kendala 404 saat *refresh*.

### 3. Server Web Mandiri (Nginx / Apache)
Pastikan server dikonfigurasi untuk mengarahkan seluruh rute yang tidak cocok dengan berkas fisik kembali ke `index.html`.

Contoh konfigurasi Nginx:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 🚀 Rute & Akses Aplikasi

| Rute | Peruntukan | Deskripsi |
| :--- | :--- | :--- |
| `#/` | **Masyarakat Umum / Tamu** | Tampilan Kiosk ramah *touchscreen*, pilihan 4 bidang Disperkim Samarinda, jam WITA *real-time*, tiket antrean otomatis, dan modal QR Code. |
| `#/login` | **Petugas Meja Piket / ASN** | Gerbang masuk terotentikasi dilengkapi tombol *Auto-fill* pengujian. |
| `#/admin` | **Administrator Dinas** | Dashboard rekapitulasi data tamu, grafik bento statistik, filter pencarian, ekspor CSV aman, dan cetak kop surat resmi dinas. |

---

## 🔑 Kredensial Pengujian (Fase 1 MVP)

- **Username:** `admin`
- **Password:** `disperkim2026`
- **Peran:** Petugas Meja Piket / Administrator

---

## 🏛️ Hak Cipta & Standar

© 2026 Pemerintah Kota Samarinda.  
Dinas Perumahan dan Kawasan Permukiman Kota Samarinda.  
*Terintegrasi Standar SPBE • Aman • Tertib • Terdata*
