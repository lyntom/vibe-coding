import React, { useState } from 'react';
import {
  DivisionId,
  GuestCategory,
  GuestInputPayload,
  CATEGORIES_METADATA,
} from '../../types/guest';
import { validateGuestForm, normalizePhoneNumber } from '../../utils/validation';
import {
  User,
  Phone,
  Building,
  FileEdit,
  Send,
  AlertCircle,
  Clock,
  CheckCircle,
  Users,
  ShieldCheck,
} from 'lucide-react';

interface GuestFormProps {
  selectedDivision: DivisionId | '';
  todayGuestCount: number;
  onSubmit: (payload: GuestInputPayload) => Promise<void>;
}

export const GuestForm: React.FC<GuestFormProps> = ({
  selectedDivision,
  todayGuestCount,
  onSubmit,
}) => {
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState<GuestCategory>('UMUM');
  const [organizationOrAddress, setOrganizationOrAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [purpose, setPurpose] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCategoryMeta = CATEGORIES_METADATA[category];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateGuestForm({
      fullName,
      organizationOrAddress,
      phoneNumber,
      divisionId: selectedDivision,
      purpose,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Gulir ke awal formulir jika error
      const formEl = document.getElementById('kiosk-form-section');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const normalizedPhone = normalizePhoneNumber(phoneNumber);
      await onSubmit({
        fullName: fullName.trim(),
        category,
        organizationOrAddress: organizationOrAddress.trim(),
        phoneNumber: normalizedPhone,
        divisionId: selectedDivision as DivisionId,
        purpose: purpose.trim(),
      });

      // Reset form
      setFullName('');
      setOrganizationOrAddress('');
      setPhoneNumber('');
      setPurpose('');
      setCategory('UMUM');
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Terjadi kesalahan sistem saat menyimpan data kunjungan.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kiosk-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col gap-1 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#374774] text-white text-xs font-extrabold flex items-center justify-center">
            2
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-on-surface font-display">
            Langkah 2: Lengkapi Formulir Buku Tamu
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-on-surface-variant ml-8">
          Masukkan identitas lengkap Anda untuk dicatat dalam arsip buku tamu digital Disperkim Kota Samarinda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulir Utama (8 Kolom) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-6 md:p-8 shadow-sm">
          {/* Banner Error Global */}
          {errors.divisionId && (
            <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container border border-error/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-error" />
              <div>
                <p className="text-xs sm:text-sm font-bold">Penting:</p>
                <p className="text-xs sm:text-sm">{errors.divisionId}</p>
              </div>
            </div>
          )}

          {errors.form && (
            <div className="mb-6 p-4 rounded-xl bg-error-container text-on-error-container border border-error/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-error" />
              <p className="text-xs sm:text-sm">{errors.form}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Input Nama Lengkap */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs sm:text-sm font-bold text-on-surface mb-2"
              >
                Nama Lengkap Tamu <span className="text-error">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  maxLength={100}
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="Contoh: Ir. H. Hendra Saputra"
                  className={`w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl border bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all ${
                    errors.fullName ? 'border-error ring-1 ring-error' : 'border-outline-variant/60'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-error mt-1.5 font-medium">{errors.fullName}</p>
              )}
            </div>

            {/* Segmented Control Kategori Tamu */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-on-surface mb-2">
                Kategori Tamu <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/40">
                {(['UMUM', 'INSTANSI', 'PENGEMBANG', 'LAINNYA'] as GuestCategory[]).map((catKey) => {
                  const meta = CATEGORIES_METADATA[catKey];
                  const isActive = category === catKey;

                  return (
                    <button
                      key={catKey}
                      type="button"
                      onClick={() => setCategory(catKey)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-center truncate ${
                        isActive
                          ? 'bg-[#374774] text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
                      }`}
                    >
                      {meta.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Dinamis: Asal Instansi / Domisili */}
            <div>
              <label
                htmlFor="organizationOrAddress"
                className="block text-xs sm:text-sm font-bold text-on-surface mb-2"
              >
                {activeCategoryMeta.fieldLabel} <span className="text-error">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <Building className="w-5 h-5" />
                </div>
                <input
                  id="organizationOrAddress"
                  type="text"
                  maxLength={150}
                  value={organizationOrAddress}
                  onChange={(e) => {
                    setOrganizationOrAddress(e.target.value);
                    if (errors.organizationOrAddress)
                      setErrors((prev) => ({ ...prev, organizationOrAddress: '' }));
                  }}
                  placeholder={activeCategoryMeta.placeholder}
                  className={`w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl border bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all ${
                    errors.organizationOrAddress
                      ? 'border-error ring-1 ring-error'
                      : 'border-outline-variant/60'
                  }`}
                />
              </div>
              {errors.organizationOrAddress && (
                <p className="text-xs text-error mt-1.5 font-medium">
                  {errors.organizationOrAddress}
                </p>
              )}
            </div>

            {/* Input Nomor HP / WhatsApp */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-xs sm:text-sm font-bold text-on-surface mb-2"
              >
                Nomor WhatsApp / HP Aktif <span className="text-error">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  id="phoneNumber"
                  type="tel"
                  maxLength={20}
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                  }}
                  placeholder="Contoh: 08123456789 atau +628123456789"
                  className={`w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl border bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all ${
                    errors.phoneNumber ? 'border-error ring-1 ring-error' : 'border-outline-variant/60'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-error mt-1.5 font-medium">{errors.phoneNumber}</p>
              )}
              <p className="text-[11px] text-on-surface-variant mt-1">
                Digunakan untuk konfirmasi disposisi berkas dan panggilan antrean pelayanan.
              </p>
            </div>

            {/* Textarea Maksud Kunjungan */}
            <div>
              <label
                htmlFor="purpose"
                className="block text-xs sm:text-sm font-bold text-on-surface mb-2"
              >
                Maksud & Tujuan Kunjungan <span className="text-error">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3.5 pointer-events-none text-on-surface-variant">
                  <FileEdit className="w-5 h-5" />
                </div>
                <textarea
                  id="purpose"
                  rows={3}
                  maxLength={500}
                  value={purpose}
                  onChange={(e) => {
                    setPurpose(e.target.value);
                    if (errors.purpose) setErrors((prev) => ({ ...prev, purpose: '' }));
                  }}
                  placeholder="Contoh: Koordinasi penyerahan berkas BAST fasilitas umum perumahan dan audiensi site plan"
                  className={`w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl border bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] transition-all resize-none ${
                    errors.purpose ? 'border-error ring-1 ring-error' : 'border-outline-variant/60'
                  }`}
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                {errors.purpose ? (
                  <p className="text-xs text-error font-medium">{errors.purpose}</p>
                ) : (
                  <span />
                )}
                <span className="text-[11px] text-on-surface-variant">
                  {purpose.length}/500 karakter
                </span>
              </div>
            </div>

            {/* Tombol Submit Besar (Touchscreen-Friendly) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-[#374774] hover:bg-[#2b395d] active:scale-[0.99] text-white font-bold text-base sm:text-lg rounded-xl shadow-md flex items-center justify-center gap-3 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 text-[#EAB630]" />
                    <span>Simpan & Ambil Nomor Antrean</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Informasi (4 Kolom) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Maklumat Pelayanan */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-[#374774]">
              <Clock className="w-5 h-5 text-[#EAB630]" />
              <h3 className="text-sm font-bold font-display uppercase tracking-wider">
                Jam Layanan Front Office
              </h3>
            </div>
            <div className="space-y-2 text-xs text-on-surface">
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="font-semibold">Senin – Kamis</span>
                <span className="font-mono text-[#374774] font-bold">08.00 – 15.30 WITA</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/20">
                <span className="font-semibold">Jumat</span>
                <span className="font-mono text-[#374774] font-bold">08.00 – 11.30 WITA</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Istirahat / Sholat</span>
                <span className="text-on-surface-variant font-medium">12.00 – 13.00 WITA</span>
              </div>
            </div>
          </div>

          {/* Kartu Statistik Hari Ini */}
          <div className="bg-surface-container-low rounded-2xl border border-outline-variant/40 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Kunjungan Hari Ini
              </span>
              <Users className="w-4 h-4 text-[#374774]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#374774] font-mono">
                {todayGuestCount}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">Tamu Terdaftar</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Sistem antrean sinkron secara real-time.</span>
            </p>
          </div>

          {/* Kartu Touchscreen Standby */}
          <div className="bg-[#374774] text-white rounded-2xl p-5 shadow-sm border border-[#EAB630]/30 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#EAB630] shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-sm mb-1 text-white">Privasi Data Tamu Terjaga</h4>
              <p className="text-[#dbe1ff] leading-relaxed">
                Sesuai UU Perlindungan Data Pribadi (UU PDP), layar konfirmasi tiket akan otomatis tereset dalam 10 detik agar identitas Anda tidak terbaca pengunjung berikutnya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
