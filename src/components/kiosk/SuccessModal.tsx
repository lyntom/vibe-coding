import React, { useEffect, useState } from 'react';
import { GuestEntry, DIVISIONS_METADATA } from '../../types/guest';
import { formatDisplayDateTime } from '../../utils/date';
import { CheckCircle2, Ticket, MapPin, ArrowRight, X } from 'lucide-react';

interface SuccessModalProps {
  guest: GuestEntry | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ guest, onClose }) => {
  const [countdown, setCountdown] = useState<number>(10);

  useEffect(() => {
    if (!guest) return;

    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [guest, onClose]);

  if (!guest) return null;

  const divisionMeta = DIVISIONS_METADATA[guest.divisionId];
  const { timeStr, dateStr } = formatDisplayDateTime(guest.createdAt);
  const progressPercent = (countdown / 10) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Progress Bar Countdown (Privasi UU PDP) */}
        <div className="w-full bg-surface-container-low h-1.5">
          <div
            className="h-full bg-[#EAB630] transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Tombol Tutup Silang di Kanan Atas */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Berhasil */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface font-display">
              Buku Tamu Berhasil Dicatat!
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
              Data Anda telah tersimpan resmi di sistem pelayanan Disperkim Samarinda.
            </p>
          </div>

          {/* Tiket Antrean / Kunjungan */}
          <div className="bg-surface-container-low/70 border border-outline-variant/40 rounded-2xl p-5 mb-5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#374774]">
                <Ticket className="w-4 h-4 text-[#EAB630]" />
                <span>NOMOR KUNJUNGAN / TIKET</span>
              </div>
              <span className="text-xs font-mono text-on-surface-variant font-medium">
                {dateStr} • {timeStr}
              </span>
            </div>

            {/* Nomor Tiket Besar */}
            <div className="py-4 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#374774] font-mono tracking-wider">
                {guest.ticketNumber}
              </span>
            </div>

            {/* Informasi Pengunjung & Tujuan */}
            <div className="space-y-2.5 pt-2 border-t border-outline-variant/30 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Nama Tamu:</span>
                <span className="font-bold text-on-surface text-right">{guest.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Asal / Instansi:</span>
                <span className="font-semibold text-on-surface text-right max-w-[60%] truncate">
                  {guest.organizationOrAddress}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Bidang Tujuan:</span>
                <span
                  className={`font-bold text-xs px-2.5 py-0.5 rounded-full ${divisionMeta.badgeClass}`}
                >
                  {divisionMeta.name}
                </span>
              </div>
            </div>

            {/* Petunjuk Lokasi Ruangan */}
            <div className="mt-4 bg-[#FFF8E7] border border-[#EAB630]/50 rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#785a00]">
              <MapPin className="w-4 h-4 text-[#EAB630] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Silakan Menuju ke Ruangan:</span>
                <span className="font-medium">{divisionMeta.roomGuide}</span>
              </div>
            </div>
          </div>

          {/* Tombol Aksi & Countdown Indicator */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 bg-[#374774] hover:bg-[#2b395d] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>Isi Tamu Berikutnya</span>
              <ArrowRight className="w-4 h-4 text-[#EAB630]" />
            </button>

            <div className="text-center">
              <span className="text-xs text-on-surface-variant">
                Layar otomatis tereset dalam{' '}
                <span className="font-mono font-bold text-[#374774]">{countdown} detik</span> demi
                perlindungan privasi data Anda.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
