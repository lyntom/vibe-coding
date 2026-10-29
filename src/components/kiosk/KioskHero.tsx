import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, QrCode, LogIn } from 'lucide-react';
import { formatWitaTime, formatWitaDate } from '../../utils/date';

interface KioskHeroProps {
  onOpenQrModal: () => void;
}

export const KioskHero: React.FC<KioskHeroProps> = ({ onOpenQrModal }) => {
  const [currentTime, setCurrentTime] = useState<string>(formatWitaTime());
  const [currentDate, setCurrentDate] = useState<string>(formatWitaDate());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(formatWitaTime(now));
      setCurrentDate(formatWitaDate(now));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-surface-container-low py-6 md:py-8 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#374774] text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-[#EAB630]/40">
              Portal Layanan 2026
            </span>
            <span className="text-on-surface-variant text-xs font-semibold">
              Versi Digital v2.4 (WITA)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-on-surface font-extrabold tracking-tight font-display">
            Selamat Datang di Disperkim Kota Samarinda
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Silakan isi buku tamu digital untuk kemudahan layanan, kepastian tujuan dinas, dan transparansi antrean pelayanan publik warga Kota Tepian.
          </p>
        </div>

        {/* Action Panel & Real-time Clock Widget */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
          {/* Live Clock Widget */}
          <div className="bg-surface-container-lowest px-4 py-3 rounded-xl shadow-sm flex items-center gap-3 w-full sm:w-auto border border-outline-variant/30">
            <div className="w-10 h-10 rounded-xl bg-[#374774]/10 flex items-center justify-center text-[#374774]">
              <Clock className="w-5 h-5 text-[#374774]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl text-[#374774] font-extrabold tracking-tight tabular-nums font-mono">
                {currentTime}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                {currentDate}
              </span>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenQrModal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-surface-container-highest hover:bg-surface-container-high text-[#374774] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm border border-[#374774]/20 active:scale-95"
            >
              <QrCode className="w-4 h-4 text-[#EAB630]" />
              <span>Scan QR di HP</span>
            </button>
            <Link
              to="/login"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#374774] hover:bg-[#2b395d] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <LogIn className="w-4 h-4 text-[#EAB630]" />
              <span>Masuk Petugas</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
