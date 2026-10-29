# AGENTS.md — Pedoman Kerja Agen AI (Antigravity Desktop & OpenCode Desktop)

Dokumen ini adalah sumber kebenaran mutlak (*Single Source of Truth*) dan protokol kerja bagi agen AI (**Antigravity Desktop** dan **OpenCode Desktop**) yang mengembangkan **Aplikasi E-Tamu Disperkim Kota Samarinda**.

---

## 1. ATURAN UTAMA & PEMBATASAN FASE (CRITICAL GUARDRAILS)

1. **DILARANG MENULIS KODE SEBELUM DOKUMENTASI DISETUJUI:**
   - Agen dilarang membuat *scaffolding* proyek Vite/React atau menulis kode komponen sebelum dokumen `Agents.md`, `Design.md`, `Schema.md`, `Security.md`, dan `changelog.md` selesai diverifikasi oleh pengguna.
2. **DILARANG MENGGUNAKAN SUPABASE DI FASE 1 (MVP):**
   - **JANGAN** menginstal `@supabase/supabase-js`, membuat proyek Supabase, atau melakukan panggilan jaringan ke *backend* eksternal pada Fase 1 (MVP).
   - Seluruh operasi data wajib menggunakan `localStorage` dengan kunci utama `etamu_disperkim_guests_v1`.
3. **ARSITEKTUR SERVICE LAYER ASINKRON:**
   - Meskipun berbasis `localStorage`, seluruh operasi CRUD **wajib** dibungkus dalam *asynchronous service layer* (`src/services/guestService.ts`) yang mengembalikan `Promise<T>`. Hal ini memastikan komponen UI tidak perlu diubah saat migrasi ke Supabase pada Fase 2.

---

## 2. SPESIFIKASI TECH STACK WAJIB

- **Framework:** React 18+ dengan Vite dan TypeScript (`strict: true`).
- **Styling:** Tailwind CSS (mengikuti token warna Navy Slate `#374774` & Gold `#EAB630` dari `Design.md`).
- **Icons:** `lucide-react` (dipadukan secara semantik menggantikan ikon Material Symbols pada prototipe HTML).
- **Routing:** `react-router-dom` v6 dengan 3 rute utama:
  - `/` — Mode Kiosk & Form Buku Tamu Publik (`code.html`)
  - `/login` — Portal Otentikasi Petugas & Admin (`code_3.html`)
  - `/admin` — Dashboard Rekapitulasi & Manajemen Buku Tamu (`code_2.html`)
- **Deployment Target:** Cloudflare Pages. Wajib menyertakan file `public/_redirects` berisi:
  ```text
  /* /index.html 200
  ```

---

## 3. PROTOKOL KERJA ANTIGRAVITY DESKTOP & OPENCODE DESKTOP

Agar Antigravity Desktop dan OpenCode Desktop bekerja secara deterministik, bebas *hallucination*, dan rapi:

### 3.1. Aturan Eksekusi Tugas (Task Execution)
- **Baca Sebelum Bertindak:** Sebelum memodifikasi file, baca `Schema.md` untuk tipe data dan `Design.md` untuk struktur kelas Tailwind.
- **Modularitas Komponen:** Jangan membuat satu file `.tsx` raksasa (> 300 baris). Pisahkan komponen berdasarkan tanggung jawabnya:
  - `src/types/guest.ts` — Kontrak TypeScript & Metadata Bidang.
  - `src/services/guestService.ts` — Abstraksi CRUD `localStorage` & generator *seed data* Kota Samarinda.
  - `src/services/authService.ts` — Abstraksi sesi login lokal (`sessionStorage` / `localStorage`).
  - `src/components/kiosk/*` — Komponen halaman Kiosk (Header Jam WITA, Helper Chips, Kartu Bidang, Form Tamu, Modal Tiket Sukses 10 detik, Modal QR Code).
  - `src/components/admin/*` — Komponen halaman Admin (Bento Statistik, Grafik Proporsi Bidang, Tabel Tamu, Modal Tambah/Edit Tamu, Tampilan Cetak Kop Surat Resmi `@media print`).
- **Kepatuhan Konteks Lokal (Samarinda & Disperkim):**
  - Zona waktu yang ditampilkan wajib **WITA (UTC+8)**.
  - Gunakan nama kelurahan, kecamatan, RT, dan perusahaan pengembang khas Kota Samarinda pada *seed data* (seperti yang ada pada `code_2.html`).

### 3.2. Aturan Kualitas Kode & Verifikasi
- **Zero TypeScript Error:** Jalankan pemeriksaan tipe (`tsc --noEmit`) setiap selesai menyelesaikan satu modul. Dilarang menggunakan tipe `any`.
- **Sinkronisasi Changelog:** Setiap kali menyelesaikan tahapan fitur, perbarui `changelog.md`.

---

## 4. DOMAIN KNOWLEDGE WAJIB (4 BIDANG DISPERKIM)

Agen harus menyematkan logika pemetaan otomatis (*Quick Helper Chips* & *Radio Cards*) sesuai matriks berikut:

| `divisionId` | Nama Resmi Bidang | Lokasi Ruangan (Panduan Tiket) | Chip Pintasan Otomatis |
| :--- | :--- | :--- | :--- |
| `SEKRETARIAT` | **Sekretariat** | Lantai 1 - Sayap Kiri (Ruang Resepsionis & Tata Usaha Utama) | *"Antar Surat Masuk / Magang / Audiensi"* |
| `PERUMAHAN` | **Bidang Perumahan** | Lantai 2 - Ruang 204 (Ruang Kerja Bidang Perumahan Formal) | *"Penyerahan PSU Developer"* |
| `KAWASAN_PERMUKIMAN` | **Bidang Kawasan Permukiman** | Lantai 2 - Ruang 207 (Ruang Layanan Masyarakat & Validasi RTLH) | *"Bantuan RTLH / Bedah Rumah"* |
| `PSU` | **Bidang Prasarana, Sarana, dan Utilitas Umum (PSU)** | Lantai 1 - Sayap Kanan (Ruang Pengaduan & Teknisi Sarana Utilitas) | *"Perbaikan / Pasang Lampu Jalan Permukiman"* |