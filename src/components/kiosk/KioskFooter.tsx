import React from 'react';
import { Building2, Phone, Mail } from 'lucide-react';

export const KioskFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-8 md:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
          {/* Kolom 1: Alamat & Peta */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#374774]" />
              <span className="font-bold text-on-surface text-sm sm:text-base font-display">
                Disperkim Kota Samarinda
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Jl. H. Achmad Amins, Gn. Lingai, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75243
            </p>

            {/* Peta Lokasi Google Maps */}
            <div className="mt-1 w-full rounded-2xl overflow-hidden border border-outline-variant/40 shadow-xs bg-surface-container-low">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3049.4119542311023!2d117.17517887351725!3d-0.45845443527859275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df5d61cc0dd9b0f%3A0x21968ed6cd7bacca!2sdinas%20perumahan%20dan%20permukiman%20kota%20samarinda!5e1!3m2!1sid!2sid!4v1793245357017!5m2!1sid!2sid"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Peta Lokasi Kantor Dinas Perumahan dan Kawasan Permukiman Kota Samarinda"
                className="w-full h-48 sm:h-56 block"
              />
            </div>
          </div>

          {/* Kolom 2: Kontak */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#374774] uppercase tracking-wider">
              Kontak Layanan Publik
            </span>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Phone className="w-4 h-4 text-[#374774] shrink-0" />
              <a href="tel:085111302536" className="hover:underline">
                Kontak / Call Center: 085111302536
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <Mail className="w-4 h-4 text-[#374774] shrink-0" />
              <a href="mailto:dinaspkp2019@gmail.com" className="hover:underline">
                dinaspkp2019@gmail.com
              </a>
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
