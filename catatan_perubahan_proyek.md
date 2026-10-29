# CHANGELOG.md — Riwayat Perubahan Proyek

Seluruh perubahan penting pada dokumentasi dan kode **E-Tamu Disperkim Kota Samarinda** dicatat dalam dokumen ini mengikuti format [Keep a Changelog](https://keepachangelog.com/id/1.1.0/).

---

## [0.2.0] - 2026-10-29 — Implementasi Fase 1 (MVP) Berhasil Selesai
### Added
- **Inisialisasi Tech Stack:** React 18, Vite 6, TypeScript (`strict: true`), Tailwind CSS, Lucide React, dan React Router DOM v6.
- **Tipe Data & Domain Contract (`src/types/guest.ts`):** Definisi `DivisionId`, `GuestCategory`, `GuestEntry`, `GuestFilterParams`, serta metadata 4 bidang Disperkim Kota Samarinda (`SEKRETARIAT`, `PERUMAHAN`, `KAWASAN_PERMUKIMAN`, `PSU`).
- **Asynchronous Service Layer (`src/services/guestService.ts`):** Operasi CRUD berbasis `localStorage` (`etamu_disperkim_guests_v1`) dibungkus dalam `Promise<T>` lengkap dengan *in-memory fallback* dan 18 *seed data* realistis Kota Samarinda.
- **Ekspor CSV Aman:** Fungsi `exportGuestsToCSV` dengan awalan UTF-8 BOM (`\uFEFF`) dan pencegahan *CSV Formula Injection* (`'`, `"..."`).
- **Autentikasi Petugas (`src/services/authService.ts`):** Layanan login mock (`admin` / `disperkim2026`), persistensi sesi (`etamu_disperkim_auth_session_v1`), dan komponen proteksi rute `ProtectedRoute`.
- **Halaman Mode Kiosk (`/`):**
  - Header paten Disperkim dengan aksen emas Samarinda dan indikator layanan aktif.
  - Hero panel dengan jam digital *real-time* WITA (UTC+8).
  - *Helper Chips* ("Bingung Menentukan Bidang Tujuan?") dengan *floating toast notification*.
  - Langkah 1: Grid 4 kartu bidang interaktif dengan panduan lokasi ruangan dinas.
  - Langkah 2: Formulir identitas tamu ramah layar sentuh, *segmented control* kategori, input alamat dinamis, dan sidebar maklumat pelayanan.
  - Modal tiket antrean sukses dengan *countdown timer* 10 detik (*auto-reset* privasi UU PDP).
  - Modal QR Code mandiri untuk pengisian lewat smartphone.
- **Halaman Portal Login Petugas (`/login`):**
  - Desain kartu terpusat dengan garis aksen ganda.
  - Tombol pintas *Auto-fill* kredensial pengujian (`admin` / `disperkim2026`).
  - Fitur intip kata sandi (*toggle visibility*).
  - Opsi *Remember Me* dan navigasi kembali ke Kiosk.
- **Halaman Dashboard Rekapitulasi Admin (`/admin`):**
  - Bento 4 kartu metrik statistik dinamis (Total Terfilter, Hari Ini, Bulan Berjalan, Bidang Terpopuler).
  - Panel grafik proporsi dan distribusi kunjungan per bidang.
  - Toolbar aksi cepat (+ Input Tamu Manual, Unduh CSV, Cetak Rekap PDF, Reset Sampel Data).
  - Filter multi-kriteria (Pencarian teks bebas, Bidang, Kategori, Periode) + *Quick filter pills*.
  - Tabel rekapitulasi responsif dengan aksi Lihat Detail, Edit, dan Hapus.
  - Modal input tamu manual dan modal edit tamu.
  - Modal rincian lengkap identitas tamu.
  - Modal pratinjau & cetak kop surat resmi Disperkim Kota Samarinda (@media print).
- **Deployment Config:** Berkas `public/_redirects` (`/* /index.html 200`) untuk *single page app* di Cloudflare Pages.

---

## [0.1.0] - 2026-10-29 — Dokumentasi Arsitektur & Spesifikasi Awal
### Added
- **`Agents.md`**: Menyusun aturan kerja untuk **Antigravity Desktop** dan **OpenCode Desktop**, termasuk larangan penggunaan Supabase pada Fase 1 (MVP) dan kewajiban abstraksi *asynchronous service layer*.
- **`Design.md`**: Mengekstrak sistem desain dari `code.html`, `code_2.html`, dan `code_3.html` (Palet warna *Civic Navy Slate* `#374774` & *Gold Accent* `#EAB630`, tipografi `Public Sans` / `Plus Jakarta Sans`, tata letak Kiosk, Login, Admin, dan `@media print`).
- **`Schema.md`**: Mendefinisikan kontrak TypeScript (`DivisionId`, `GuestCategory`, `GuestEntry`), metadata 4 bidang Disperkim Kota Samarinda beserta lokasi ruangan, dan spesifikasi *service layer*.
- **`Security.md`**: Menetapkan aturan proteksi rute `/admin`, sanitasi input formulir, pencegahan *CSV Injection*, dan privasi Mode Kiosk (*auto-reset* 10 detik).
- **`changelog.md`**: Membuat catatan riwayat perubahan proyek.
