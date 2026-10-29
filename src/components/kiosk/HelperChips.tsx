import React from 'react';
import { DivisionId, DIVISIONS_METADATA } from '../../types/guest';
import { HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface HelperChipsProps {
  onSelectDivision: (divisionId: DivisionId) => void;
  toastMessage: string | null;
}

export const HelperChips: React.FC<HelperChipsProps> = ({
  onSelectDivision,
  toastMessage,
}) => {
  const chips: { divisionId: DivisionId; label: string }[] = [
    {
      divisionId: 'SEKRETARIAT',
      label: DIVISIONS_METADATA.SEKRETARIAT.quickChipLabel,
    },
    {
      divisionId: 'PERUMAHAN',
      label: DIVISIONS_METADATA.PERUMAHAN.quickChipLabel,
    },
    {
      divisionId: 'KAWASAN_PERMUKIMAN',
      label: DIVISIONS_METADATA.KAWASAN_PERMUKIMAN.quickChipLabel,
    },
    {
      divisionId: 'PSU',
      label: DIVISIONS_METADATA.PSU.quickChipLabel,
    },
  ];

  return (
    <div className="w-full relative">
      {/* Toast Notification Mengambang */}
      {toastMessage && (
        <div className="fixed inset-x-0 top-32 sm:top-24 z-50 flex items-center justify-center pointer-events-none px-4 animate-in fade-in duration-200">
          <div className="bg-[#374774] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold border-2 border-[#EAB630] animate-bounce pointer-events-auto max-w-md mx-auto text-center">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAB630] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Helper Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="bg-surface-container-low/70 border border-outline-variant/30 rounded-2xl p-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-[#EAB630]/20 flex items-center justify-center text-[#785a00]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface">
              Bingung Tujuan Layanan?
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-1">
            {chips.map((chip) => (
              <button
                key={chip.divisionId}
                type="button"
                onClick={() => onSelectDivision(chip.divisionId)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface-container-lowest hover:bg-[#374774] text-[#374774] hover:text-white border border-[#374774]/20 hover:border-[#EAB630] transition-all shadow-xs active:scale-95 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#EAB630] group-hover:rotate-12 transition-transform" />
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
