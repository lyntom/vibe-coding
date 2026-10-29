import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Shield, User, Building2 } from 'lucide-react';

export const KioskHeader: React.FC = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#374774] shadow-[0_2px_12px_rgba(32,48,92,0.18)]">
      <div className="min-h-20 w-full px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
        {/* Logo & Judul Instansi */}
        <Link to="/" className="flex items-center gap-3 shrink-0 min-w-0 group">
          <div className="h-10 w-10 shrink-0 p-1.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#EAB630] group-hover:bg-white/20 transition-all">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[17px] md:text-lg text-white font-bold tracking-tight truncate font-display">
              E-Tamu Disperkim Samarinda
            </span>
            <span className="text-[11px] md:text-xs text-[#dbe1ff] leading-none hidden sm:inline truncate">
              Dinas Perumahan dan Kawasan Permukiman Kota Samarinda
            </span>
          </div>
        </Link>

        {/* Status Publik Aktif (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 bg-[#20305c]/80 px-4 py-1.5 rounded-full border border-[#EAB630]/40 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-[#EAB630]" />
          <span className="text-xs text-[#ffdf9c] tracking-wider whitespace-nowrap font-bold">
            PELAYANAN PUBLIK AKTIF
          </span>
        </div>

        {/* Navigasi Rute */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          <nav className="flex items-center gap-1.5 shrink-0">
            <Link
              to="/"
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                location.pathname === '/'
                  ? 'bg-[#20305c] text-white shadow-sm border border-[#EAB630]/50'
                  : 'text-[#dbe1ff] hover:text-white hover:bg-white/10'
              }`}
            >
              Mode Kiosk / Form Tamu
            </Link>
            <Link
              to="/login"
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                location.pathname === '/login'
                  ? 'bg-[#20305c] text-white shadow-sm border border-[#EAB630]/50'
                  : 'text-[#dbe1ff] hover:text-white hover:bg-white/10'
              }`}
            >
              Portal Petugas
            </Link>
            <Link
              to="/admin"
              className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                location.pathname === '/admin'
                  ? 'bg-[#20305c] text-white shadow-sm border border-[#EAB630]/50'
                  : 'text-[#dbe1ff] hover:text-white hover:bg-white/10'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#EAB630]" />
              Dashboard Admin
            </Link>
          </nav>
          <div className="w-8 h-8 rounded-full bg-[#20305c] border border-white/20 flex items-center justify-center shrink-0 text-[#EAB630]">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Garis Aksen Emas Khas Samarinda */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#EAB630] via-[#ffd677] to-[#EAB630]"></div>
    </header>
  );
};
