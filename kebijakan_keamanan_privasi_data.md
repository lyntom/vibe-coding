# SECURITY.md — Kebijakan Keamanan, Validasi Input, & Privasi Data

Dokumen ini menetapkan standar keamanan aplikasi, sanitasi data, perlindungan sesi admin, dan privasi data pengunjung pada **E-Tamu Disperkim Kota Samarinda**.

---

## 1. KEAMANAN AUTENTIKASI & SESI (FASE 1 MVP)

1. **Proteksi Rute Admin (`/admin`):**
   - Rute `/admin` wajib dibungkus dengan komponen `ProtectedRoute`.
   - Jika pengguna belum memiliki token sesi aktif di `etamu_disperkim_auth_session_v1`, pengguna wajib dialihkan (`<Navigate to="/login" replace />`) ke halaman login.
2. **Kredensial Pengujian MVP:**
   - Sesuai `prd.md` dan `code_3.html`, autentikasi pada Fase 1 adalah *mock authentication* sisi klien untuk keperluan uji coba antarmuka:
     - **Username:** `admin`
     - **Password:** `disperkim2026`
   - Sediakan fungsi `logout()` yang menghapus token sesi secara bersih dan mengarahkan kembali ke `/login`.
3. **Kesiapan Fase 2 (Supabase Auth):**
   - Logika pengecekan sesi wajib diisolasi di dalam `src/services/authService.ts` agar saat beralih ke Supabase Auth (JWT + Row Level Security) di Fase 2, komponen halaman tidak perlu ditulis ulang.

---

## 2. VALIDASI INPUT & PENCEGAHAN INJEKSI

1. **Sanitasi Input Formulir Kiosk & Admin:**
   - Semua input teks (`fullName`, `organizationOrAddress`, `purpose`) wajib di-`trim()` dan dibatasi panjang karakternya:
     - `fullName`: Wajib diisi, minimal 2 karakter, maksimal 100 karakter.
     - `organizationOrAddress`: Wajib diisi, minimal 3 karakter, maksimal 150 karakter.
     - `phoneNumber`: Wajib diisi, hanya menerima angka, spasi, tanda hubung (`-`), atau tanda `+` dengan panjang 9–15 digit. Normalisasikan format penyimpanan agar konsisten (misal awalan `08...` atau `+628...`).
     - `purpose`: Wajib diisi, minimal 5 karakter, maksimal 500 karakter.
2. **Pencegahan XSS (Cross-Site Scripting):**
   - **DILARANG** menggunakan `dangerouslySetInnerHTML` saat merender data tamu di tabel maupun di tampilan cetak laporan. Biarkan React melakukan *auto-escaping* terhadap seluruh input pengguna.
3. **Pencegahan CSV Injection (Formula Injection):**
   - Saat mengekspor data ke file CSV (`exportGuestsToCSV`), setiap sel teks yang diawali dengan karakter `=`, `+`, `-`, atau `@` wajib diberi tanda kutip tunggal di depannya (`'`) dan dibungkus tanda kutip ganda (`"..."`) agar tidak dieksekusi sebagai rumus berbahaya oleh Microsoft Excel.

---

## 3. KEAMANAN MODE KIOSK & PRIVASI DATA TAMU (UU PDP)

1. **Auto-Reset Layar Kiosk (10 Detik):**
   - Untuk mencegah tamu berikutnya melihat data pribadi (Nomor HP & Nama) tamu sebelumnya di layar Kiosk publik, modal konfirmasi sukses **wajib** memiliki *countdown timer* 10 detik yang secara otomatis menutup modal dan mengosongkan seluruh kolom formulir.
2. **Minimasi Eksposur Data di Halaman Publik (`/`):**
   - Halaman Kiosk (`/`) hanya boleh melakukan operasi tulis (*insert*) ke buku tamu dan melihat jumlah total agregat. Daftar nama lengkap, nomor WhatsApp, dan rincian keperluan tamu **hanya** boleh ditampilkan di dalam halaman `/admin` yang telah terotentikasi.
3. **Penanganan Error Penyimpanan Lokal (`QuotaExceededError` / Private Browsing):**
   - Operasi baca/tulis `localStorage` pada `guestService.ts` wajib dibungkus dalam blok `try...catch` dengan *in-memory fallback* agar aplikasi Kiosk tidak mengalami *crash* (layar putih) apabila peramban memblokir penyimpanan atau penyimpanan penuh.