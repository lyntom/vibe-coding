import React from 'react';
import { GuestEntry, DIVISIONS_METADATA, DivisionId } from '../../types/guest';
import { Users, Calendar, TrendingUp, Award } from 'lucide-react';

interface AdminBentoStatsProps {
  filteredEntries: GuestEntry[];
  allEntries: GuestEntry[];
}

export const AdminBentoStats: React.FC<AdminBentoStatsProps> = ({
  filteredEntries,
  allEntries,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const currentMonthStr = todayStr.substring(0, 7); // YYYY-MM

  const todayCount = allEntries.filter((g) => g.createdAt.startsWith(todayStr)).length;
  const monthCount = allEntries.filter((g) => g.createdAt.startsWith(currentMonthStr)).length;

  // Hitung bidang terpopuler
  const divisionCounts: Record<DivisionId, number> = {
    SEKRETARIAT: 0,
    PERUMAHAN: 0,
    KAWASAN_PERMUKIMAN: 0,
    PSU: 0,
  };

  allEntries.forEach((g) => {
    if (divisionCounts[g.divisionId] !== undefined) {
      divisionCounts[g.divisionId]++;
    }
  });

  let topDivision: DivisionId = 'PERUMAHAN';
  let maxCount = -1;
  (Object.keys(divisionCounts) as DivisionId[]).forEach((d) => {
    if (divisionCounts[d] > maxCount) {
      maxCount = divisionCounts[d];
      topDivision = d;
    }
  });

  const topDivisionMeta = DIVISIONS_METADATA[topDivision];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Kartu 1: Total Tamu Terfilter */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-on-surface-variant mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Tamu Terfilter</span>
          <div className="w-8 h-8 rounded-lg bg-[#374774]/10 flex items-center justify-center text-[#374774]">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-[#374774] font-mono">
            {filteredEntries.length}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            dari {allEntries.length} total arsip
          </span>
        </div>
      </div>

      {/* Kartu 2: Kunjungan Hari Ini */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-on-surface-variant mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Kunjungan Hari Ini</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-emerald-700 font-mono">
            {todayCount}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">tamu tercatat</span>
        </div>
      </div>

      {/* Kartu 3: Kunjungan Bulan Berjalan */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-on-surface-variant mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Bulan Berjalan</span>
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-[#785a00]">
            <TrendingUp className="w-4 h-4 text-[#EAB630]" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-on-surface font-mono">
            {monthCount}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">tamu kumulatif</span>
        </div>
      </div>

      {/* Kartu 4: Bidang Terbanyak Dikunjungi */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/40 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-on-surface-variant mb-2">
          <span className="text-xs font-bold uppercase tracking-wider">Bidang Terpopuler</span>
          <div className="w-8 h-8 rounded-lg bg-[#EAB630]/20 flex items-center justify-center text-[#785a00]">
            <Award className="w-4 h-4 text-[#EAB630]" />
          </div>
        </div>
        <div>
          <span className="text-sm font-bold text-[#374774] block truncate">
            {topDivisionMeta?.shortName || 'Bidang Perumahan'}
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            {maxCount} kunjungan ({allEntries.length > 0 ? Math.round((maxCount / allEntries.length) * 100) : 0}%)
          </span>
        </div>
      </div>
    </div>
  );
};
