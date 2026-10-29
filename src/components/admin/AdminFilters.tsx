import React from 'react';
import { DivisionId, GuestCategory, GuestFilterParams } from '../../types/guest';
import { Search, Sparkles, X } from 'lucide-react';

interface AdminFiltersProps {
  filters: GuestFilterParams;
  onChangeFilters: (newFilters: GuestFilterParams) => void;
  onResetFilters: () => void;
}

export const AdminFilters: React.FC<AdminFiltersProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
}) => {
  const handleFastFilter = (type: 'all' | 'perumahan' | 'developer' | 'today') => {
    switch (type) {
      case 'all':
        onResetFilters();
        break;
      case 'perumahan':
        onChangeFilters({
          ...filters,
          divisionId: 'PERUMAHAN',
        });
        break;
      case 'developer':
        onChangeFilters({
          ...filters,
          category: 'PENGEMBANG',
        });
        break;
      case 'today':
        onChangeFilters({
          ...filters,
          periodPreset: 'TODAY',
        });
        break;
    }
  };

  const isFiltered =
    filters.searchQuery.trim() !== '' ||
    filters.divisionId !== 'ALL' ||
    filters.category !== 'ALL' ||
    filters.periodPreset !== 'ALL';

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-xs mb-6 space-y-3">
      {/* Baris Filter & Pencarian */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        {/* Input Pencarian (5 Kolom) */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) =>
              onChangeFilters({
                ...filters,
                searchQuery: e.target.value,
              })
            }
            placeholder="Cari nama tamu, instansi, keperluan, nomor tiket..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all"
          />
        </div>

        {/* Dropdown Bidang (3 Kolom) */}
        <div className="lg:col-span-3">
          <select
            value={filters.divisionId}
            onChange={(e) =>
              onChangeFilters({
                ...filters,
                divisionId: e.target.value as DivisionId | 'ALL',
              })
            }
            className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all"
          >
            <option value="ALL">Semua Bidang Tujuan</option>
            <option value="SEKRETARIAT">Sekretariat</option>
            <option value="PERUMAHAN">Bidang Perumahan</option>
            <option value="KAWASAN_PERMUKIMAN">Bidang Kawasan Permukiman</option>
            <option value="PSU">Bidang PSU</option>
          </select>
        </div>

        {/* Dropdown Kategori (2 Kolom) */}
        <div className="lg:col-span-2">
          <select
            value={filters.category}
            onChange={(e) =>
              onChangeFilters({
                ...filters,
                category: e.target.value as GuestCategory | 'ALL',
              })
            }
            className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all"
          >
            <option value="ALL">Semua Kategori</option>
            <option value="UMUM">Masyarakat Umum</option>
            <option value="INSTANSI">Instansi / OPD</option>
            <option value="PENGEMBANG">Pengembang / PT</option>
            <option value="LAINNYA">Akademisi / Lain</option>
          </select>
        </div>

        {/* Dropdown Periode (2 Kolom) */}
        <div className="lg:col-span-2">
          <select
            value={filters.periodPreset}
            onChange={(e) =>
              onChangeFilters({
                ...filters,
                periodPreset: e.target.value as GuestFilterParams['periodPreset'],
              })
            }
            className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all"
          >
            <option value="ALL">Semua Arsip</option>
            <option value="TODAY">Hari Ini</option>
            <option value="THIS_WEEK">7 Hari Terakhir</option>
            <option value="THIS_MONTH">Bulan Berjalan</option>
          </select>
        </div>
      </div>

      {/* Filter Kilat (Quick Chips) */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-outline-variant/20">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-on-surface-variant mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#EAB630]" />
            Filter Cepat:
          </span>
          <button
            type="button"
            onClick={() => handleFastFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              !isFiltered
                ? 'bg-[#374774] text-white shadow-2xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            Semua
          </button>
          <button
            type="button"
            onClick={() => handleFastFilter('perumahan')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filters.divisionId === 'PERUMAHAN'
                ? 'bg-[#374774] text-white shadow-2xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            Bidang Perumahan
          </button>
          <button
            type="button"
            onClick={() => handleFastFilter('developer')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filters.category === 'PENGEMBANG'
                ? 'bg-[#374774] text-white shadow-2xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            Pengembang / PT
          </button>
          <button
            type="button"
            onClick={() => handleFastFilter('today')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filters.periodPreset === 'TODAY'
                ? 'bg-[#374774] text-white shadow-2xs'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            }`}
          >
            Hari Ini
          </button>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs text-error hover:underline font-semibold"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>
    </div>
  );
};
