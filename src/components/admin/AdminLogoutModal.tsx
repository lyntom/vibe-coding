import React from 'react';
import { LogOut, X } from 'lucide-react';

interface AdminLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
}

export const AdminLogoutModal: React.FC<AdminLogoutModalProps> = ({
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

        {/* Icon Ilustrasi */}
        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200/80 shadow-xs">
          <LogOut className="w-7 h-7 ml-0.5" />
        </div>

        {/* Judul & Keterangan */}
        <h3 className="text-lg sm:text-xl font-extrabold text-on-surface font-display mb-2">
          Konfirmasi Keluar Sesi
        </h3>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
          Apakah Anda yakin ingin keluar dari <strong className="text-on-surface">Dashboard Petugas</strong>? Sesi kerja Anda akan diakhiri dan Anda perlu masuk kembali untuk mengakses data rekapitulasi tamu.
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
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Ya, Keluar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
