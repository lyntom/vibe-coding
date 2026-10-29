import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Smartphone, Globe, Copy, Check } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrSvg, setQrSvg] = useState<string>('');

  const targetUrl = 'https://lyntom.github.io/e-tamu';

  useEffect(() => {
    // Generate QR Code SVG lokal secara instan tanpa latensi jaringan internet
    QRCode.toString(
      targetUrl,
      {
        type: 'svg',
        margin: 1,
        color: {
          dark: '#374774',
          light: '#FFFFFF',
        },
      },
      (err, string) => {
        if (!err && string) {
          setQrSvg(string);
        }
      }
    );
  }, [targetUrl]);

  if (!isOpen) return null;

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
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant flex items-center justify-center transition-colors cursor-pointer"
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

        {/* QR Code Container (Render Instan Offline) */}
        <div className="bg-white p-4 rounded-2xl shadow-inner border border-outline-variant/50 inline-block mx-auto mb-4">
          {qrSvg ? (
            <div
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          ) : (
            <img
              src="./qr-code.png"
              alt="QR Code E-Tamu Disperkim Samarinda"
              className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-lg"
            />
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
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-[#374774] font-bold text-[11px] border border-outline-variant/40 shadow-xs transition-all active:scale-95 cursor-pointer"
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
            className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-[#374774] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
