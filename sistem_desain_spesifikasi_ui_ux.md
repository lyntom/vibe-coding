# DESIGN.md — Sistem Desain & Spesifikasi Antarmuka (UI/UX)

Dokumen ini mengekstrak sistem desain dari prototipe `code.html` (Kiosk), `code_2.html` (Dashboard Admin), dan `code_3.html` (Portal Login) untuk diimplementasikan secara konsisten menggunakan Tailwind CSS dan React.

---

## 1. IDENTITAS VISUAL & PALET WARNA (CIVIC NAVY & GOLD)

Aplikasi mengusung tema **Pemerintah Kota Samarinda — Modern Civic Authority** yang memadukan biru dongker tegas (*Navy Slate*) dan aksen kuning emas (*Gold Accent*), dengan latar belakang permukaan yang bersih dan kontras tinggi agar nyaman di layar sentuh Kiosk maupun monitor kantor.

### 1.1. Token Warna Utama (Tailwind Config)
| Token | Hex Code | Penggunaan Utama |
| :--- | :--- | :--- |
| `primary` / `navyslate` | `#374774` | Header utama, tombol primer, kartu aktif, *badge* utama, sidebar aktif |
| `primary-dark` / `navyslate-hover` | `#2b395d` | State `:hover` dan `:active` pada tombol primer |
| `primary-deep` | `#20305c` | Elemen kontras di dalam header, *badge* petugas piket |
| `gold-accent` | `#EAB630` | Garis aksen header (`3px`), ikon utama di atas latar biru, *radio indicator* terpilih, grafik utama |
| `gold-surface` | `#FFF8E7` / `#FFF9E6` | Latar *callout* informasi lokasi ruangan, *hint* kredensial login, kartu bidang dominan |
| `secondary` | `#785a00` | Teks aksen emas gelap di atas latar `gold-surface` / `#ffdf9c` |
| `background` / `surface` | `#f9f9ff` | Latar belakang halaman utama |
| `surface-container-lowest` | `#ffffff` | Latar belakang kartu, tabel, input form, dan modal |
| `surface-container-low` | `#f0f3ff` | Latar seksi hero Kiosk, *segmented control*, baris header tabel |
| `surface-container` | `#e7eeff` | Latar *chip* sekunder, kotak metrik statistik |
| `on-surface` | `#111c2c` | Warna teks utama (judul dan isi) |
| `on-surface-variant` | `#45464f` | Warna teks sekunder, deskripsi, dan *placeholder* |
| `outline-variant` | `#c5c6d0` | Garis tepi (*border*) kartu dan input (gunakan opasitas `/30` hingga `/50`) |
| `error` / `error-container` | `#ba1a1a` / `#ffdad6` | Pesan validasi wajib isi dan tombol hapus |

---

## 2. TIPOGRAFI

Menggunakan kombinasi font Google Fonts:
- **Font Utama (UI & Tabel):** `Public Sans` dan `Inter` (`sans-serif`)
- **Font Judul (Display & Headline):** `Plus Jakarta Sans` dan `Public Sans` (`font-bold` / `font-semibold`)

### Skala Ukuran Teks:
- **Headline XL:** `36px` (`leading-[44px]`, `font-bold`) — Judul sambutan Kiosk & angka metrik utama Admin.
- **Headline LG:** `28px` (`leading-[36px]`, `font-semibold`) — Judul halaman Admin & Login.
- **Headline MD:** `24px` (`leading-[32px]`, `font-semibold`) — Jam digital WITA, judul seksi Langkah 1 & 2, tombol submit Kiosk.
- **Title MD:** `18px` (`leading-[24px]`, `font-bold`) — Nama Bidang pada kartu, nama tamu di tabel.
- **Body MD:** `16px` (`leading-[24px]`) — Input form Kiosk agar mudah dibaca di layar sentuh.
- **Body SM / Label MD:** `14px` & `12px` — Teks tabel, *badge* kategori, dan keterangan lokasi ruangan.

---

## 3. SPESIFIKASI TATA LETAK PER HALAMAN

### 3.1. Halaman Publik / Mode Kiosk (`/`) — Referensi `code.html`
1. **Top Header Fixed (`h-20`, `bg-[#374774]`):**
   - Kiri: Logo/Ikon Instansi + Judul `"E-Tamu Disperkim Samarinda"` & sub-judul `"Dinas Perumahan dan Kawasan Permukiman Kota Samarinda"`.
   - Tengah (XL): Pill status `"PELAYANAN PUBLIK AKTIF"` dengan ikon terverifikasi warna `#EAB630`.
   - Kanan: Navigasi cepat ke `"Mode Kiosk"`, `"Portal Petugas"`, dan `"Dashboard Admin"`.
   - Garis Bawah Header: `h-[3px] w-full bg-gradient-to-r from-[#EAB630] via-[#ffd677] to-[#EAB630]`.
2. **Hero & Live Clock Panel:**
   - Kiri: Badge `"Portal Layanan Kiosk 2026"`, judul sambutan, dan deskripsi singkat.
   - Kanan: Widget Jam & Tanggal *real-time* (`tabular-nums`, zona waktu `WITA`) + Tombol `"Scan QR di HP"` dan `"Masuk Petugas"`.
3. **Interactive Helper Chips ("Bingung Menentukan Bidang Tujuan?"):**
   - 4 tombol *pill* (`rounded-full`) dengan ikon `#EAB630`. Saat diklik, otomatis memilih Kartu Bidang yang sesuai pada Langkah 1, menampilkan *toast notification* mengambang di bagian atas (`"Tujuan otomatis dipilih: [Nama Bidang]"`), dan menggulir lembut ke formulir.
4. **Langkah 1 — Grid 4 Kartu Bidang (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`):**
   - Setiap kartu memiliki garis aksen atas (`h-1.5`), badge lokasi lantai/ruangan, indikator *radio check* bulat, ikon bidang, judul, sub-judul, deskripsi 3 baris, dan kotak `division-tip` berlatar `#fff8e7` yang muncul saat kartu aktif terpilih.
   - **State Terpilih:** `ring-2 ring-[#374774] bg-surface-container-low`, garis atas berubah menjadi `bg-[#EAB630]`, dan bulatan *check* menjadi `bg-[#EAB630] text-[#111c2c]`.
5. **Langkah 2 — Formulir Buku Tamu (8 Kolom) & Sidebar Informasi (4 Kolom):**
   - **Formulir (Kiri):**
     - Input Nama Lengkap (`h-12`, ikon `User`).
     - *Segmented Control* Kategori Tamu (4 tombol: `Masyarakat Umum`, `Instansi / OPD`, `Pengembang / PT`, `Akademisi / Lain`).
     - Input Dinamis Instansi/Alamat: Label & *placeholder* berubah otomatis mengikuti Kategori Tamu yang dipilih.
     - Input Nomor HP/WhatsApp dengan awalan tetap `+62`.
     - Textarea Detail Maksud Kunjungan (`rows={3}`).
     - Tombol Submit ramah layar sentuh (`h-14 bg-[#374774] hover:bg-[#2b395d] text-white rounded-xl`).
   - **Sidebar (Kanan):**
     - Kartu **Maklumat Pelayanan** & Jam Layanan Front Office (Senin–Kamis 08.00–15.30 WITA, Jumat 08.00–11.30 WITA).
     - Kartu **Statistik Hari Ini** (Tamu Hadir, Rata-rata Respon, dan mini *sparkline* SVG).
     - Kartu **Kiosk Touchscreen Siaga** (`bg-[#374774] text-white`).
6. **Modal Konfirmasi Sukses & Tiket Tamu:**
   - Menampilkan Nomor Tiket (`TAMU-2026-XXX`), Waktu Masuk WITA, Nama Pengunjung, Kategori/Instansi, Badge Bidang Tujuan, serta **Petunjuk Ruangan** (misal: *"Lantai 2 - Ruang 204"*).
   - Dilengkapi *progress bar* dan *countdown timer* **10 detik** untuk mereset form otomatis, serta tombol `"Isi Tamu Berikutnya"`.
7. **Modal QR Code Mandiri:**
   - Menampilkan QR Code SVG/Canvas yang mengarah ke `window.location.origin` agar tamu dapat memindai dari HP.

---

### 3.2. Halaman Login Petugas (`/login`) — Referensi `code_3.html`
- **Layout:** Kartu terpusat (`max-w-xl mx-auto`) di atas latar belakang bersih dengan aksen garis atas ganda (`flex-1 bg-[#374774]` dan `w-20 bg-[#EAB630]`).
- **Komponen:**
  - Emblem Disperkim & badge `"Sistem Akses Internal Terotentikasi"`.
  - Kotak **Kredensial Pengujian MVP** (`bg-[#FFF9E6] border-[#EAB630]/40`) yang menampilkan `admin` / `disperkim2026` beserta tombol interaktif **"Auto-fill"** (`#btnAutoFill`).
  - Input Username/NIP dan Kata Sandi (dengan tombol *toggle visibility* mata).
  - Tombol kembali ke Mode Kiosk (`/`).

---

### 3.3. Halaman Dashboard Admin (`/admin`) — Referensi `code_2.html`
1. **Sidebar Kiri Tetap (`w-64`, `bg-surface-container-lowest`):**
   - Navigasi tampilan: Dashboard & Rekap Buku Tamu, serta tautan langsung kembali ke Mode Kiosk (`/`).
2. **Top Header Admin (`h-20`, `bg-[#374774]`, garis bawah `3px bg-[#EAB630]`):**
   - Menampilkan identitas dinas, *badge* `"PETUGAS PIKET"`, dan tombol Logout.
3. **Toolbar Aksi Cepat:**
   - Tombol `+ Input Tamu Manual`, `Unduh CSV`, `Cetak Rekap PDF`, dan `Reset / Muat Sampel Data (Seed)`.
4. **Bento 4 Kartu Statistik:**
   - Total Tamu Terfilter, Kunjungan Hari Ini, Bulan Berjalan, dan Bidang Terbanyak Dikunjungi.
5. **Panel Distribusi Berdasarkan Bidang (2 Kolom) & Info Jam Piket (1 Kolom):**
   - Menampilkan 4 kartu *progress bar* jumlah dan persentase kunjungan untuk `Bidang Perumahan`, `Bidang Kawasan Permukiman`, `Sekretariat`, dan `Bidang PSU` yang dihitung secara *real-time* dari data terfilter.
6. **Baris Filter & Pencarian + Filter Kilat (*Quick Pills*):**
   - Input pencarian teks bebas, dropdown Bidang Tujuan, dropdown Kategori Tamu, filter Periode (Hari Ini, Bulan Ini, Rentang Tanggal/Bulan-Tahun, Semua Arsip), serta chip Filter Kilat.
7. **Tabel Daftar Kunjungan Tamu:**
   - Kolom: `No`, `Waktu Kunjungan`, `Nama Tamu & Kontak`, `Kategori & Instansi/Domisili`, `Bidang Tujuan` (dengan warna *badge* berbeda), `Keperluan Kunjungan`, dan `Aksi` (Lihat Detail, Edit, Hapus).
8. **Tampilan Cetak Resmi (`@media print` & Modal Pratinjau Kop Surat):**
   - Menampilkan Kop Surat resmi **PEMERINTAH KOTA SAMARINDA — DINAS PERUMAHAN DAN KAWASAN PERMUKIMAN**, judul laporan, periode filter aktif, ringkasan jumlah tamu per bidang, tabel rincian kunjungan berbingkai hitam tegas (`border-black`), dan blok tanda tangan Petugas Piket / Mengetahui di kanan bawah.