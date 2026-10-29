import React from 'react';
import { DivisionId, DIVISIONS_METADATA } from '../../types/guest';
import {
  FileText,
  Home,
  MapPin,
  Lightbulb,
  Check,
  Building,
  Navigation,
} from 'lucide-react';

interface DivisionCardsProps {
  selectedDivision: DivisionId | '';
  onSelectDivision: (id: DivisionId) => void;
}

export const DivisionCards: React.FC<DivisionCardsProps> = ({
  selectedDivision,
  onSelectDivision,
}) => {
  const getIcon = (id: DivisionId) => {
    switch (id) {
      case 'SEKRETARIAT':
        return <FileText className="w-5 h-5 text-[#374774]" />;
      case 'PERUMAHAN':
        return <Home className="w-5 h-5 text-[#374774]" />;
      case 'KAWASAN_PERMUKIMAN':
        return <MapPin className="w-5 h-5 text-[#374774]" />;
      case 'PSU':
        return <Lightbulb className="w-5 h-5 text-[#374774]" />;
    }
  };

  const divisionKeys: DivisionId[] = [
    'SEKRETARIAT',
    'PERUMAHAN',
    'KAWASAN_PERMUKIMAN',
    'PSU',
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col gap-1 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#374774] text-white text-xs font-extrabold flex items-center justify-center">
            1
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-on-surface font-display">
            Langkah 1: Pilih Bidang Tujuan Kunjungan
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant ml-8">
          Sentuh salah satu kartu bidang di bawah ini untuk mengarahkan tiket antrean dan lokasi ruangan dinas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {divisionKeys.map((id) => {
          const meta = DIVISIONS_METADATA[id];
          const isSelected = selectedDivision === id;

          return (
            <div
              key={id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectDivision(id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectDivision(id);
                }
              }}
              className={`relative flex flex-col justify-between rounded-2xl p-5 cursor-pointer transition-all border text-left bg-surface-container-lowest shadow-xs hover:shadow-md active:scale-[0.98] ${
                isSelected
                  ? 'ring-2 ring-[#374774] bg-surface-container-low border-[#374774]'
                  : 'border-outline-variant/40 hover:border-[#374774]/50'
              }`}
            >
              {/* Garis Aksen Atas */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl transition-colors ${
                  isSelected ? 'bg-[#EAB630]' : 'bg-[#374774]/20'
                }`}
              />

              <div>
                {/* Header Kartu: Badge Lantai & Radio Check */}
                <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-surface-container-high text-[#374774] border border-outline-variant/30">
                    <Building className="w-3 h-3 text-[#374774]" />
                    {meta.floorBadge}
                  </span>

                  {/* Radio Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#EAB630] text-[#111c2c] shadow-xs'
                        : 'border border-outline-variant/60 bg-surface-container-low text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Judul & Ikon */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#374774]/10 flex items-center justify-center shrink-0">
                    {getIcon(id)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-on-surface leading-snug">
                      {meta.name}
                    </h3>
                    <p className="text-xs text-[#785a00] font-semibold">
                      {meta.subtitle}
                    </p>
                  </div>
                </div>

                {/* Deskripsi Layanan */}
                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mt-2">
                  {meta.description}
                </p>
              </div>

              {/* Panduan Lokasi Ruangan (Muncul saat kartu terpilih) */}
              {isSelected && (
                <div className="mt-4 pt-3 border-t border-outline-variant/30">
                  <div className="bg-[#FFF8E7] border border-[#EAB630]/40 rounded-xl p-2.5 text-xs text-[#785a00] flex items-start gap-2">
                    <Navigation className="w-4 h-4 text-[#EAB630] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Petunjuk Ruangan:</span>
                      <span>{meta.roomGuide}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
