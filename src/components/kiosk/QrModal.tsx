import React, { useState } from 'react';
import { X, Smartphone, Globe, Copy, Check } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrImgError, setQrImgError] = useState(false);

  if (!isOpen) return null;

  const targetUrl = 'https://lyntom.github.io/e-tamu';
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    targetUrl
  )}&color=37-71-116`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback manual copy
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 py-8 sm:py-12 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 p-6 sm:p-8 text-center my-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] overflow-y-auto">
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
          Arahkan kamera smartphone Anda ke QR code di bawah ini untuk membuka buku tamu digital langsung di perangkat Anda.
        </p>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl shadow-inner border border-outline-variant/50 inline-block mx-auto mb-4">
          {!qrImgError ? (
            <img
              src={qrApiUrl}
              alt="QR Code E-Tamu Disperkim Samarinda"
              onError={() => setQrImgError(true)}
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-lg"
            />
          ) : (
            <svg
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="200" fill="white" />
              {/* Position Detection Markers */}
              <rect x="20" y="20" width="50" height="50" rx="6" fill="#374774" />
              <rect x="28" y="28" width="34" height="34" rx="3" fill="white" />
              <rect x="36" y="36" width="18" height="18" rx="2" fill="#EAB630" />

              <rect x="130" y="20" width="50" height="50" rx="6" fill="#374774" />
              <rect x="138" y="28" width="34" height="34" rx="3" fill="white" />
              <rect x="146" y="36" width="18" height="18" rx="2" fill="#EAB630" />

              <rect x="20" y="130" width="50" height="50" rx="6" fill="#374774" />
              <rect x="28" y="138" width="34" height="34" rx="3" fill="white" />
              <rect x="36" y="146" width="18" height="18" rx="2" fill="#EAB630" />

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

              <rect x="80" y="125" width="12" height="12" rx="2" fill="#374774" />
              <rect x="100" y="125" width="12" height="12" rx="2" fill="#374774" />
              <rect x="130" y="125" width="12" height="12" rx="2" fill="#374774" />
              <rect x="150" y="125" width="12" height="12" rx="2" fill="#374774" />
            </svg>
          )}
        </div>

        {/* URL Link Box dengan Tombol Salin */}
        <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between gap-2 text-xs border border-outline-variant/30">
          <div className="flex items-center gap-2 min-w-0 text-left">
            <Globe className="w-4 h-4 text-[#374774] shrink-0" />
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-mono font-bold text-[#374774] hover:underline"
            >
              {targetUrl}
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-[#374774] font-bold text-[11px] border border-outline-variant/40 shadow-xs transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>
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
