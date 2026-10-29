import React from 'react';
import { X, Smartphone, Globe } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://etamu-disperkim.samarindakota.go.id';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 p-6 sm:p-8 text-center">
        {/* Tombol Tutup */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#374774]/10 text-[#374774] flex items-center justify-center mx-auto mb-3">
          <Smartphone className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-extrabold text-on-surface font-display">
          Scan QR untuk Isi di Ponsel
        </h3>
        <p className="text-xs text-on-surface-variant mt-1 mb-5">
          Arahkan kamera smartphone Anda ke QR code berikut untuk membuka form buku tamu digital langsung di ponsel Anda.
        </p>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl shadow-inner border border-outline-variant/50 inline-block mx-auto mb-4">
          <svg
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <rect width="200" height="200" fill="white" />
            
            {/* Top-Left Position Detection Marker */}
            <rect x="20" y="20" width="50" height="50" rx="6" fill="#374774" />
            <rect x="28" y="28" width="34" height="34" rx="3" fill="white" />
            <rect x="36" y="36" width="18" height="18" rx="2" fill="#EAB630" />

            {/* Top-Right Position Detection Marker */}
            <rect x="130" y="20" width="50" height="50" rx="6" fill="#374774" />
            <rect x="138" y="28" width="34" height="34" rx="3" fill="white" />
            <rect x="146" y="36" width="18" height="18" rx="2" fill="#EAB630" />

            {/* Bottom-Left Position Detection Marker */}
            <rect x="20" y="130" width="50" height="50" rx="6" fill="#374774" />
            <rect x="28" y="138" width="34" height="34" rx="3" fill="white" />
            <rect x="36" y="146" width="18" height="18" rx="2" fill="#EAB630" />

            {/* Simulated Data Matrix Dots */}
            <rect x="80" y="25" width="12" height="12" rx="2" fill="#374774" />
            <rect x="100" y="25" width="12" height="12" rx="2" fill="#374774" />
            <rect x="80" y="45" width="12" height="12" rx="2" fill="#374774" />
            <rect x="100" y="45" width="12" height="12" rx="2" fill="#EAB630" />

            <rect x="25" y="80" width="12" height="12" rx="2" fill="#374774" />
            <rect x="45" y="80" width="12" height="12" rx="2" fill="#EAB630" />
            <rect x="25" y="100" width="12" height="12" rx="2" fill="#374774" />
            <rect x="45" y="100" width="12" height="12" rx="2" fill="#374774" />

            <rect x="80" y="80" width="12" height="12" rx="2" fill="#374774" />
            <rect x="100" y="80" width="12" height="12" rx="2" fill="#374774" />
            <rect x="120" y="80" width="12" height="12" rx="2" fill="#EAB630" />
            <rect x="140" y="80" width="12" height="12" rx="2" fill="#374774" />
            <rect x="160" y="80" width="12" height="12" rx="2" fill="#374774" />

            <rect x="80" y="100" width="12" height="12" rx="2" fill="#EAB630" />
            <rect x="100" y="100" width="12" height="12" rx="2" fill="#374774" />
            <rect x="120" y="100" width="12" height="12" rx="2" fill="#374774" />
            <rect x="140" y="100" width="12" height="12" rx="2" fill="#374774" />
            <rect x="160" y="100" width="12" height="12" rx="2" fill="#EAB630" />

            <rect x="80" y="125" width="12" height="12" rx="2" fill="#374774" />
            <rect x="100" y="125" width="12" height="12" rx="2" fill="#374774" />
            <rect x="130" y="125" width="12" height="12" rx="2" fill="#374774" />
            <rect x="150" y="125" width="12" height="12" rx="2" fill="#374774" />

            <rect x="80" y="145" width="12" height="12" rx="2" fill="#374774" />
            <rect x="100" y="145" width="12" height="12" rx="2" fill="#EAB630" />
            <rect x="130" y="145" width="12" height="12" rx="2" fill="#374774" />
            <rect x="150" y="145" width="12" height="12" rx="2" fill="#374774" />

            <rect x="80" y="165" width="12" height="12" rx="2" fill="#374774" />
            <rect x="100" y="165" width="12" height="12" rx="2" fill="#374774" />
            <rect x="130" y="165" width="12" height="12" rx="2" fill="#EAB630" />
            <rect x="150" y="165" width="12" height="12" rx="2" fill="#374774" />
          </svg>
        </div>

        {/* URL Link */}
        <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center justify-center gap-2 text-xs text-on-surface-variant font-mono">
          <Globe className="w-3.5 h-3.5 text-[#374774]" />
          <span className="truncate">{currentUrl}</span>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-[#374774] font-bold text-xs sm:text-sm transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
