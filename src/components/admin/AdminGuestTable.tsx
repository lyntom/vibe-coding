import React from 'react';
import { GuestEntry, DIVISIONS_METADATA } from '../../types/guest';
import { formatDisplayDateTime } from '../../utils/date';
import { Eye, Edit2, Trash2, Inbox, Phone } from 'lucide-react';

interface AdminGuestTableProps {
  entries: GuestEntry[];
  onViewDetail: (guest: GuestEntry) => void;
  onEdit: (guest: GuestEntry) => void;
  onDelete: (id: string) => void;
}

export const AdminGuestTable: React.FC<AdminGuestTableProps> = ({
  entries,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  if (entries.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-12 text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-low text-on-surface-variant flex items-center justify-center mx-auto mb-3">
          <Inbox className="w-8 h-8 opacity-60" />
        </div>
        <h4 className="text-base font-bold text-on-surface font-display">
          Tidak Ada Data Tamu yang Sesuai
        </h4>
        <p className="text-xs text-on-surface-variant max-w-md mx-auto mt-1">
          Cobalah mengubah kata kunci pencarian atau mengatur ulang filter kategori dan periode kunjungan.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/40 text-[#374774] font-bold text-xs uppercase tracking-wider">
              <th className="py-3.5 px-4 text-center w-12">No</th>
              <th className="py-3.5 px-4 min-w-[130px]">Waktu & Tiket</th>
              <th className="py-3.5 px-4 min-w-[180px]">Nama Tamu & Kontak</th>
              <th className="py-3.5 px-4 min-w-[200px]">Kategori & Asal Instansi</th>
              <th className="py-3.5 px-4 min-w-[150px]">Bidang Tujuan</th>
              <th className="py-3.5 px-4 min-w-[220px]">Keperluan Kunjungan</th>
              <th className="py-3.5 px-4 text-center min-w-[120px]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {entries.map((entry, idx) => {
              const { dateStr, timeStr } = formatDisplayDateTime(entry.createdAt);
              const divisionMeta = DIVISIONS_METADATA[entry.divisionId];

              return (
                <tr
                  key={entry.id}
                  className="hover:bg-surface-container-low/50 transition-colors"
                >
                  {/* No */}
                  <td className="py-3.5 px-4 text-center font-mono text-on-surface-variant font-medium">
                    {idx + 1}
                  </td>

                  {/* Waktu & Tiket */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-mono font-bold text-[#374774] text-xs">
                        {entry.ticketNumber}
                      </span>
                      <span className="text-[11px] text-on-surface-variant">{dateStr}</span>
                      <span className="text-[10px] text-on-surface-variant/80 font-mono">
                        {timeStr}
                      </span>
                    </div>
                  </td>

                  {/* Nama Tamu & Kontak */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <strong className="text-on-surface font-semibold text-xs sm:text-sm">
                        {entry.fullName}
                      </strong>
                      <span className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-[#374774]" />
                        <span className="font-mono">{entry.phoneNumber}</span>
                      </span>
                    </div>
                  </td>

                  {/* Kategori & Asal Instansi */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface-container-high text-[#374774]">
                        {entry.category}
                      </span>
                      <span className="text-xs text-on-surface line-clamp-2">
                        {entry.organizationOrAddress}
                      </span>
                    </div>
                  </td>

                  {/* Bidang Tujuan */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col items-start gap-0.5">
                      <span
                        className={`inline-block font-bold text-[11px] px-2.5 py-0.5 rounded-full ${divisionMeta?.badgeClass}`}
                      >
                        {divisionMeta?.shortName || entry.divisionId}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {divisionMeta?.floorBadge}
                      </span>
                    </div>
                  </td>

                  {/* Keperluan Kunjungan */}
                  <td className="py-3.5 px-4">
                    <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {entry.purpose}
                    </p>
                  </td>

                  {/* Tombol Aksi */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1">
                      {/* Lihat Detail */}
                      <button
                        type="button"
                        onClick={() => onViewDetail(entry)}
                        title="Lihat Detail Identitas"
                        className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-[#374774] flex items-center justify-center transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(entry)}
                        title="Edit Data Tamu"
                        className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-surface-container text-amber-700 flex items-center justify-center transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Hapus */}
                      <button
                        type="button"
                        onClick={() => onDelete(entry.id)}
                        title="Hapus Catatan Tamu"
                        className="w-8 h-8 rounded-lg bg-surface-container-low hover:bg-error-container text-error flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
