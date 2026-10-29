import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import {
  Building2,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  LogIn,
  ArrowRight,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const handleAutoFill = () => {
    setUsername('admin');
    setPassword('disperkim2026');
    setAlert({
      type: 'success',
      message: 'Kredensial pengujian berhasil diisi otomatis!',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setAlert({
        type: 'error',
        message: 'Silakan isi Username dan Kata Sandi dinas Anda.',
      });
      return;
    }

    setIsLoading(true);
    setAlert(null);

    const result = await authService.login(username, password, rememberMe);

    if (result.success) {
      setAlert({
        type: 'success',
        message: 'Otentikasi Berhasil! Mengalihkan ke Dashboard Admin...',
      });
      setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 700);
    } else {
      setIsLoading(false);
      setAlert({
        type: 'error',
        message: result.message || 'Kredensial tidak valid.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* Card Utama */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant/40 overflow-hidden relative">
          {/* Garis Aksen Ganda Atas */}
          <div className="flex h-1.5 w-full">
            <div className="flex-1 bg-[#374774]" />
            <div className="w-24 bg-[#EAB630]" />
          </div>

          <div className="p-8 sm:p-10">
            {/* Header Instansi */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#374774] text-[#EAB630] flex items-center justify-center mb-3 shadow-md">
                <Building2 className="w-9 h-9" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface font-display">
                Portal Masuk Petugas Piket
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Dinas Perumahan dan Kawasan Permukiman Kota Samarinda
              </p>
            </div>

            {/* Kotak Kredensial Pengujian MVP */}
            <div className="mb-6 bg-[#FFF9E6] border border-[#EAB630]/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#785a00]">
              <div className="flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-[#EAB630] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Kredensial Pengujian MVP:</span>
                  <span>
                    User: <strong className="font-mono text-on-surface">admin</strong> • Pass:{' '}
                    <strong className="font-mono text-on-surface">disperkim2026</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAutoFill}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EAB630] hover:bg-[#d9a423] text-[#111c2c] font-bold text-xs shadow-xs transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-fill</span>
              </button>
            </div>

            {/* Alert Message Banner */}
            {alert && (
              <div
                className={`mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 border ${
                  alert.type === 'error'
                    ? 'bg-error-container text-on-error-container border-error/30'
                    : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                }`}
              >
                {alert.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-error shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>{alert.message}</span>
              </div>
            )}

            {/* Form Login */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs sm:text-sm font-bold text-on-surface mb-2"
                >
                  Username / NIP Petugas
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username atau NIP"
                    required
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-bold text-on-surface mb-2"
                >
                  Kata Sandi Dinas
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi"
                    required
                    className="w-full pl-11 pr-11 py-3 text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-outline-variant/60 text-[#374774] focus:ring-[#374774] w-4 h-4"
                  />
                  <span>Ingat sesi di perangkat ini</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setAlert({
                      type: 'success',
                      message:
                        'Hubungi Subbag Umum & Kepegawaian Disperkim Samarinda untuk pemulihan akses akun ASN.',
                    })
                  }
                  className="text-[#374774] hover:underline font-semibold"
                >
                  Bantuan Akses?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full h-14 bg-gradient-to-r from-[#20305c] via-[#374774] to-[#20305c] hover:from-[#2b395d] hover:to-[#2b395d] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#374774]/25 hover:shadow-xl hover:shadow-[#374774]/35 border border-[#EAB630]/40 hover:border-[#EAB630] flex items-center justify-between px-5 transition-all duration-300 disabled:opacity-75 disabled:cursor-wait"
              >
                {isLoading ? (
                  <div className="w-full flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-[#EAB630] border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-semibold tracking-wide text-[#ffdf9c]">
                      Memverifikasi Akses ASN...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#EAB630] group-hover:scale-110 transition-transform">
                        <LogIn className="w-4 h-4" />
                      </div>
                      <span className="tracking-wide font-display text-white group-hover:text-[#ffdf9c] transition-colors">
                        Masuk ke Dashboard Petugas
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#EAB630] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Kembali ke Form Buku Tamu */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#374774] hover:text-[#2b395d] bg-surface-container-lowest px-4 py-2.5 rounded-xl border border-outline-variant/40 shadow-xs hover:shadow transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#EAB630]" />
            <span>Kembali ke Form Buku Tamu</span>
          </Link>

          <div className="text-xs text-on-surface-variant space-y-0.5">
            <p className="font-semibold">Pemerintah Kota Samarinda</p>
            <p className="text-[11px] opacity-75">
              Buku Tamu Digital © 2026 Bidang Perumahan • Bidang Kawasan Permukiman • Bidang PSU • Sekretariat
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
