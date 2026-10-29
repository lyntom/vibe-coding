import React from 'react';
import { Building2, Phone, Mail, ShieldCheck } from 'lucide-react';

export const KioskFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-8 md:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Kolom 1: Alamat */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#374774]" />
              <span className="font-bold text-on-surface text-sm sm:text-base font-display">
                Disperkim Kota Samarinda
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Jl. Dahlia No. 02, Bugis, Kec. Samarinda Kota, Kota Samarinda, Kalimantan Timur 75121
            </p>
          </div>

          {/* Kolom 2: Kontak */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#374774] uppercase tracking-wider">
              Kontak Layanan Publik
            </span>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Phone className="w-4 h-4 text-[#374774] shrink-0" />
              <span>Call Center: (0541) 741-526</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Mail className="w-4 h-4 text-[#374774] shrink-0" />
              <span>disperkim@samarindakota.go.id</span>
            </div>
          </div>

          {/* Kolom 3: Standar Pelayanan SPBE */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#374774] uppercase tracking-wider">
              Standar Pelayanan
            </span>
            <div className="flex items-center gap-2.5 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
              <ShieldCheck className="w-6 h-6 text-[#EAB630] shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Terintegrasi SPBE Nasional</span>
                <span className="text-[11px] text-on-surface-variant">Pemerintah Kota Samarinda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Baris Hak Cipta */}
        <div className="pt-6 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
          <p>© 2026 Pemerintah Kota Samarinda. E-Tamu Dinas Perumahan dan Kawasan Permukiman.</p>
          <p className="uppercase tracking-wider text-[#785a00] font-bold text-[11px]">
            Aman • Tertib • Terdata
          </p>
        </div>
      </div>
    </footer>
  );
};
