import React from 'react';
import { GuestEntry, DIVISIONS_METADATA, DivisionId } from '../../types/guest';
import { PieChart, Clock, ShieldCheck } from 'lucide-react';

interface AdminDivisionDistributionProps {
  filteredEntries: GuestEntry[];
}

export const AdminDivisionDistribution: React.FC<AdminDivisionDistributionProps> = ({
  filteredEntries,
}) => {
  const total = filteredEntries.length;

  const getDivisionCount = (id: DivisionId) => {
    return filteredEntries.filter((e) => e.divisionId === id).length;
  };

  const divisions: { id: DivisionId; barColor: string }[] = [
    { id: 'PERUMAHAN', barColor: 'bg-[#374774]' },
    { id: 'KAWASAN_PERMUKIMAN', barColor: 'bg-[#4d5d8b]' },
    { id: 'SEKRETARIAT', barColor: 'bg-[#20305c]' },
    { id: 'PSU', barColor: 'bg-[#EAB630]' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      {/* Panel Distribusi Kunjungan (8 Kolom) */}
      <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-5 sm:p-6 border border-outline-variant/40 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#374774]" />
            <h3 className="text-sm sm:text-base font-bold text-on-surface font-display">
              Distribusi Kunjungan Berdasarkan Bidang (Data Terfilter)
            </h3>
          </div>
          <span className="text-xs font-mono text-on-surface-variant font-medium">
            Total: {total} Tamu
          </span>
        </div>

        <div className="space-y-3.5">
          {divisions.map(({ id, barColor }) => {
            const meta = DIVISIONS_METADATA[id];
            const count = getDivisionCount(id);
            const percent = total > 0 ? Math.round((count / total) * 100) : 0;

            return (
              <div key={id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">{meta.name}</span>
                    <span className="text-[11px] text-on-surface-variant">({meta.floorBadge})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-on-surface">{count} Tamu</span>
                    <span className="text-on-surface-variant font-medium w-9 text-right font-mono">
                      {percent}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-surface-container-low rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Piket & SOP Pelayanan (4 Kolom) */}
      <div className="lg:col-span-4 bg-surface-container-low rounded-2xl p-5 border border-outline-variant/40 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#374774] mb-3">
            <ShieldCheck className="w-5 h-5 text-[#EAB630]" />
            <h4 className="text-xs font-bold uppercase tracking-wider font-display">
              Standar Operasional Meja Piket
            </h4>
          </div>

          <div className="space-y-2.5 text-xs text-on-surface">
            <p className="leading-relaxed">
              Petugas piket wajib memverifikasi kelengkapan identitas tamu serta dokumen permohonan sebelum tamu diarahkan ke lantai/ruangan bidang tujuan.
            </p>
            <div className="p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 text-[11px] text-[#785a00] font-medium space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-on-surface">
                <Clock className="w-3.5 h-3.5 text-[#EAB630]" />
                <span>Jadwal Pelayanan Aktif (WITA)</span>
              </div>
              <div>Senin – Kamis: 08.00 – 15.30</div>
              <div>Jumat: 08.00 – 11.30</div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-outline-variant/30 text-[11px] text-on-surface-variant">
          <span>Pengesahan Laporan: </span>
          <strong className="text-on-surface">MUHAMMAD IHSAN, S.Sos</strong> (NIP. 19850412 201001 1 008)
        </div>
      </div>
    </div>
  );
};
