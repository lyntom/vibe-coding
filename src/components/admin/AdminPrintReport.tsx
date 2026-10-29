import React from 'react';
import { GuestEntry, DIVISIONS_METADATA } from '../../types/guest';
import { formatDisplayDateTime, formatWitaDate } from '../../utils/date';
import { X, Printer } from 'lucide-react';

interface AdminPrintReportProps {
  isOpen: boolean;
  entries: GuestEntry[];
  onClose: () => void;
}

export const AdminPrintReport: React.FC<AdminPrintReportProps> = ({
  isOpen,
  entries,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const todayFormatted = formatWitaDate();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Container Preview Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-300 overflow-hidden my-6">
        {/* Header Action Bar (Tidak Dicetak di Kertas) */}
        <div className="px-6 py-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#374774]" />
            <span className="font-bold text-sm text-slate-800">
              Pratinjau Kop Surat Resmi Disperkim Kota Samarinda
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#374774] hover:bg-[#2b395d] text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <Printer className="w-4 h-4 text-[#EAB630]" />
              <span>Cetak Sekarang (Print / PDF)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lembar Dokumen Fisik Resmi (Kop Surat Disperkim Samarinda) */}
        <div
          id="printable-area"
          className="p-8 sm:p-12 text-black bg-white max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible print:p-0"
        >
          {/* KOP SURAT DINAS */}
          <div className="border-b-[3px] border-black pb-3 mb-1 text-center">
            <h3 className="font-serif text-base sm:text-lg font-bold tracking-widest uppercase">
              PEMERINTAH KOTA SAMARINDA
            </h3>
            <h2 className="font-serif text-lg sm:text-2xl font-black tracking-wide uppercase mt-0.5">
              DINAS PERUMAHAN DAN KAWASAN PERMUKIMAN
            </h2>
            <p className="text-xs sm:text-sm mt-1 text-slate-700">
              Jl. H. Achmad Amins, Gn. Lingai, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75243
            </p>
            <p className="text-xs text-slate-600">
              Telp/WA: 085111302536 • Laman: samarindakota.go.id • Pos-el: disperkim@samarindakota.go.id
            </p>
          </div>
          {/* Garis Tipis Tambahan Kop Surat */}
          <div className="border-b border-black mb-6" />

          {/* JUDUL LAPORAN */}
          <div className="text-center mb-6">
            <h4 className="text-base sm:text-lg font-bold underline uppercase tracking-wide">
              REKAPITULASI BUKU TAMU DIGITAL PELAYANAN PUBLIK
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Dicetak pada: {todayFormatted} • Jumlah Total Tamu: {entries.length} Orang
            </p>
          </div>

          {/* TABEL DATA RESMI */}
          <table className="w-full text-left border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-black text-center font-bold">
                <th className="border border-black p-2 w-10">No</th>
                <th className="border border-black p-2 w-28">Tgl / Jam</th>
                <th className="border border-black p-2 min-w-[150px]">Nama Tamu & Asal Instansi</th>
                <th className="border border-black p-2 min-w-[120px]">Bidang Tujuan</th>
                <th className="border border-black p-2 min-w-[180px]">Keperluan Kunjungan</th>
                <th className="border border-black p-2 text-center w-24">Paraf Tamu</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => {
                const { dateStr, timeStr } = formatDisplayDateTime(entry.createdAt);
                const divisionMeta = DIVISIONS_METADATA[entry.divisionId];

                return (
                  <tr key={entry.id} className="border-b border-black">
                    <td className="border border-black p-2 text-center font-mono">{idx + 1}</td>
                    <td className="border border-black p-2 whitespace-nowrap">
                      <div className="font-medium">{dateStr}</div>
                      <div className="text-[11px] text-slate-600 font-mono">{timeStr}</div>
                    </td>
                    <td className="border border-black p-2">
                      <div className="font-bold">{entry.fullName}</div>
                      <div className="text-slate-700 text-[11px]">
                        [{entry.category}] {entry.organizationOrAddress}
                      </div>
                      <div className="text-slate-500 text-[10px] font-mono">{entry.phoneNumber}</div>
                    </td>
                    <td className="border border-black p-2 font-medium">
                      {divisionMeta?.name || entry.divisionId}
                    </td>
                    <td className="border border-black p-2 leading-relaxed">
                      {entry.purpose}
                    </td>
                    <td className="border border-black p-2 text-center text-slate-500 italic text-[11px]">
                      [Terverifikasi]
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* LEMBAR PENGESAHAN / TANDA TANGAN */}
          <div className="flex justify-end mt-12 pr-6 break-inside-avoid">
            <div className="flex flex-col items-center text-center text-xs">
              <span>Samarinda, {todayFormatted}</span>
              <span className="mt-1 mb-16">Petugas Meja Piket / Penerima Tamu,</span>
              <span className="font-bold underline text-sm">MUHAMMAD IHSAN, S.Sos</span>
              <span className="text-slate-700">NIP. 19850412 201001 1 008</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
