import React from 'react';
import { UserPlus, Download, Printer, RotateCcw } from 'lucide-react';

interface AdminToolbarProps {
  onOpenNewGuestModal: () => void;
  onDownloadCSV: () => void;
  onOpenPrintModal: () => void;
  onResetSeedData: () => void;
  isResetting: boolean;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({
  onOpenNewGuestModal,
  onDownloadCSV,
  onOpenPrintModal,
  onResetSeedData,
  isResetting,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface font-display">
          Rekapitulasi Kunjungan Tamu
        </h2>
        <p className="text-xs text-on-surface-variant">
          Pusat pemantauan, validasi buku tamu harian, dan pencetakan laporan dinas.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Tombol Input Tamu Manual */}
        <button
          type="button"
          onClick={onOpenNewGuestModal}
          className="inline-flex items-center gap-2 bg-[#374774] hover:bg-[#2b395d] active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all"
        >
          <UserPlus className="w-4 h-4 text-[#EAB630]" />
          <span>+ Input Tamu Manual</span>
        </button>

        {/* Tombol Unduh CSV */}
        <button
          type="button"
          onClick={onDownloadCSV}
          className="inline-flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container text-[#374774] border border-outline-variant/60 active:scale-95 text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl shadow-2xs transition-all"
        >
          <Download className="w-4 h-4 text-[#EAB630]" />
          <span>Unduh CSV</span>
        </button>

        {/* Tombol Cetak Rekap PDF */}
        <button
          type="button"
          onClick={onOpenPrintModal}
          className="inline-flex items-center gap-2 bg-surface-container-lowest hover:bg-surface-container text-[#374774] border border-outline-variant/60 active:scale-95 text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl shadow-2xs transition-all"
        >
          <Printer className="w-4 h-4 text-[#EAB630]" />
          <span>Cetak Rekap</span>
        </button>

        {/* Tombol Reset Sampel Data */}
        <button
          type="button"
          onClick={onResetSeedData}
          disabled={isResetting}
          title="Kembalikan data ke 18 sampel realistis Kota Samarinda"
          className="inline-flex items-center gap-1.5 bg-surface-container-low hover:bg-surface-container text-on-surface-variant border border-outline-variant/40 active:scale-95 text-xs font-semibold px-3 py-2.5 rounded-xl transition-all disabled:opacity-60"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-[#374774] ${isResetting ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline">Reset Sampel</span>
        </button>
      </div>
    </div>
  );
};
