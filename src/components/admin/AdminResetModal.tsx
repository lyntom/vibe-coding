import React from 'react';
import { RotateCcw, X } from 'lucide-react';

interface AdminResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
}

export const AdminResetModal: React.FC<AdminResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 overflow-hidden my-auto p-6 sm:p-7 text-center">
        {/* Tombol Tutup X */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon Ilustrasi Reset */}
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200/80 shadow-xs">
          <RotateCcw className={`w-7 h-7 ${isLoading ? 'animate-spin' : ''}`} />
        </div>

        {/* Judul & Keterangan */}
        <h3 className="text-lg sm:text-xl font-extrabold text-on-surface font-display mb-2">
          Reset ke Data Sampel?
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
          Tindakan ini akan mengembalikan seluruh data buku tamu ke{' '}
          <strong className="text-on-surface font-semibold">
            18 data sampel realistis Disperkim Kota Samarinda
          </strong>
          . Data tamu baru yang belum diekspor ke CSV akan terganti. Apakah Anda yakin ingin melanjutkan?
        </p>

        {/* Tombol Aksi */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 px-4 rounded-xl border border-outline-variant/60 font-semibold text-xs sm:text-sm text-on-surface hover:bg-surface-container transition-colors cursor-pointer disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#374774] hover:bg-[#20305c] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <RotateCcw className="w-4 h-4 text-[#EAB630]" />
                <span>Ya, Reset Data</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
