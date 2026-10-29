import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export const KioskFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-10 md:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 items-start">
          {/* Kolom Kiri: Informasi Kantor, Kontak, & Jam Layanan (6 Kolom) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Header Instansi */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                <img
                  src="./logo.png"
                  alt="Logo Disperkim Kota Samarinda"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-on-surface text-base sm:text-lg font-display leading-tight">
                  Dinas Perumahan dan Kawasan Permukiman
                </h3>
                <span className="text-xs text-[#785a00] font-semibold tracking-wide">
                  Pemerintah Kota Samarinda
                </span>
              </div>
            </div>

            {/* Alamat Kantor */}
            <div className="flex items-start gap-2.5 text-xs text-on-surface-variant">
              <MapPin className="w-4 h-4 text-[#374774] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Jl. H. Achmad Amins, Gn. Lingai, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75243
              </p>
            </div>

            {/* Kotak Kontak & Jam Pelayanan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Kontak Resmi */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 space-y-2">
                <span className="text-[11px] font-bold text-[#374774] uppercase tracking-wider block">
                  Kontak Layanan
                </span>
                <div className="flex items-center gap-2 text-xs text-on-surface">
                  <Phone className="w-3.5 h-3.5 text-[#EAB630] shrink-0" />
                  <a href="tel:085111302536" className="hover:underline font-medium truncate">
                    085111302536
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface">
                  <Mail className="w-3.5 h-3.5 text-[#EAB630] shrink-0" />
                  <a href="mailto:dinaspkp2019@gmail.com" className="hover:underline font-medium truncate">
                    dinaspkp2019@gmail.com
                  </a>
                </div>
              </div>

              {/* Jam Layanan */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30 space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-[#374774] uppercase tracking-wider block">
                  Jam Layanan (WITA)
                </span>
                <div className="text-[11px] text-on-surface flex justify-between">
                  <span>Senin – Kamis:</span>
                  <span className="font-semibold text-[#374774]">08.00 – 16.00</span>
                </div>
                <div className="text-[11px] text-on-surface flex justify-between">
                  <span>Jumat:</span>
                  <span className="font-semibold text-[#374774]">08.00 – 15.00</span>
                </div>
                <div className="text-[10px] text-on-surface-variant pt-0.5">
                  Istirahat / Sholat: 11.30 – 13.00
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Peta Lokasi Google Maps (6 Kolom) */}
          <div className="lg:col-span-6 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#374774] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#EAB630]" />
                <span>Peta Lokasi Kantor Dinas</span>
              </span>
              <a
                href="https://maps.google.com/?q=Dinas+Perumahan+dan+Kawasan+Permukiman+Kota+Samarinda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#374774] hover:text-[#20305c] hover:underline"
              >
                <span>Buka Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Peta Iframe */}
            <div className="w-full h-[220px] sm:h-[240px] rounded-2xl overflow-hidden border border-outline-variant/40 shadow-xs bg-surface-container-low">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.4119542311023!2d117.17517887351725!3d-0.45845443527859275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df5d61cc0dd9b0f%3A0x21968ed6cd7bacca!2sdinas%20perumahan%20dan%20permukiman%20kota%20samarinda!5e1!3m2!1sid!2sid!4v1793245357017!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Peta Lokasi Kantor Dinas Perumahan dan Kawasan Permukiman Kota Samarinda"
                className="w-full h-full block"
              />
            </div>
          </div>
        </div>

        {/* Baris Hak Cipta */}
        <div className="pt-6 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
          <p>© 2026 Pemerintah Kota Samarinda. E-Tamu Dinas Perumahan dan Kawasan Permukiman.</p>
          <p className="uppercase tracking-wider text-[#785a00] font-bold text-[11px]">
            Aman • Tertib • Terdata
          </p>
        </div>
      </div>
    </footer>
  );
};
