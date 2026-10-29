import React from 'react';
import { GuestEntry, DIVISIONS_METADATA } from '../../types/guest';
import { formatDisplayDateTime } from '../../utils/date';
import { X, Ticket, Building, Phone, User, FileText, MapPin } from 'lucide-react';

interface AdminDetailModalProps {
  guest: GuestEntry | null;
  onClose: () => void;
}

export const AdminDetailModal: React.FC<AdminDetailModalProps> = ({ guest, onClose }) => {
  if (!guest) return null;

  const divisionMeta = DIVISIONS_METADATA[guest.divisionId];
  const { dateStr, timeStr } = formatDisplayDateTime(guest.createdAt);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 overflow-hidden my-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] flex flex-col">
        {/* Header Modal */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#374774]" />
            <h3 className="text-base font-bold text-on-surface font-display">
              Rincian Catatan Buku Tamu
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm overflow-y-auto flex-1">
          {/* Nomor Tiket Card */}
          <div className="bg-[#374774] text-white p-4 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#ffdf9c] uppercase font-bold tracking-wider block">
                Nomor Tiket Antrean
              </span>
              <span className="text-2xl font-extrabold font-mono text-white">
                {guest.ticketNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[#dbe1ff] block">Waktu Registrasi:</span>
              <span className="font-mono font-semibold">{dateStr}</span>
              <span className="block text-[11px] text-[#ffdf9c]">{timeStr}</span>
            </div>
          </div>

          {/* Rincian Identitas */}
          <div className="bg-surface-container-low/50 rounded-2xl p-4 border border-outline-variant/30 space-y-3">
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-[#374774] shrink-0 mt-0.5" />
              <div>
                <span className="text-on-surface-variant text-[11px] block">Nama Lengkap Tamu:</span>
                <span className="font-bold text-on-surface text-sm sm:text-base">{guest.fullName}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building className="w-4 h-4 text-[#374774] shrink-0 mt-0.5" />
              <div>
                <span className="text-on-surface-variant text-[11px] block">Kategori & Asal Instansi:</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface-container-high text-[#374774]">
                    {guest.category}
                  </span>
                  <span className="font-medium text-on-surface">{guest.organizationOrAddress}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#374774] shrink-0 mt-0.5" />
              <div>
                <span className="text-on-surface-variant text-[11px] block">Nomor WhatsApp / HP:</span>
                <a
                  href={`tel:${guest.phoneNumber}`}
                  className="font-mono font-semibold text-[#374774] hover:underline"
                >
                  {guest.phoneNumber}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#374774] shrink-0 mt-0.5" />
              <div>
                <span className="text-on-surface-variant text-[11px] block">Bidang & Lokasi Ruangan:</span>
                <span className={`inline-block font-bold text-xs px-2.5 py-0.5 rounded-full mt-0.5 ${divisionMeta?.badgeClass}`}>
                  {divisionMeta?.name}
                </span>
                <p className="text-xs text-[#785a00] font-medium mt-1">
                  {divisionMeta?.roomGuide}
                </p>
              </div>
            </div>
          </div>

          {/* Maksud Kunjungan */}
          <div className="bg-surface-container-low/50 rounded-2xl p-4 border border-outline-variant/30">
            <div className="flex items-center gap-2 mb-1.5 text-[#374774]">
              <FileText className="w-4 h-4" />
              <span className="font-bold text-xs">Maksud & Keperluan Kunjungan:</span>
            </div>
            <p className="text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
              {guest.purpose}
            </p>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="px-6 py-4 bg-surface-container-low/70 border-t border-outline-variant/20 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-[#374774] font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
