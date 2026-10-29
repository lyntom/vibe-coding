import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, AuthSession } from '../../services/authService';
import { Building2, User, LogOut, ExternalLink } from 'lucide-react';

interface AdminHeaderProps {
  currentSession: AuthSession | null;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ currentSession }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari Dashboard Petugas?')) {
      await authService.logout();
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#374774] shadow-[0_2px_12px_rgba(32,48,92,0.18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Logo & Judul Admin */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="h-11 w-11 shrink-0 p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#EAB630]">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg text-white font-bold tracking-tight truncate font-display">
                Dashboard Rekapitulasi E-Tamu
              </span>
              <span className="text-xs text-[#dbe1ff] leading-none truncate hidden sm:inline">
                Disperkim Kota Samarinda • Panel Petugas Piket
              </span>
            </div>
          </div>

          {/* User Session & Actions */}
          <div className="flex items-center gap-3">
            {/* Tautan Langsung ke Mode Kiosk */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#dbe1ff] hover:text-white hover:bg-white/10 border border-white/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#EAB630]" />
              <span>Buka Mode Kiosk</span>
            </Link>

            {/* Badge Petugas */}
            <div className="flex items-center gap-2.5 bg-[#20305c] px-3.5 py-1.5 rounded-xl border border-[#EAB630]/40">
              <div className="w-7 h-7 rounded-full bg-[#374774] flex items-center justify-center text-[#EAB630]">
                <User className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white tracking-wide">
                  {currentSession?.username.toUpperCase() || 'PETUGAS PIKET'}
                </span>
                <span className="text-[10px] text-[#ffdf9c] font-medium leading-none">
                  {currentSession?.role || 'Administrator Petugas'}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              title="Keluar Sesi"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-red-600/80 text-white transition-all active:scale-95 border border-white/20"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Garis Aksen Emas */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#EAB630] via-[#ffd677] to-[#EAB630]" />
    </header>
  );
};
