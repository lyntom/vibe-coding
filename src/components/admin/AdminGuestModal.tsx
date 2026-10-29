import React, { useState, useEffect } from 'react';
import {
  GuestEntry,
  GuestInputPayload,
  DivisionId,
  GuestCategory,
  CATEGORIES_METADATA,
} from '../../types/guest';
import { validateGuestForm, normalizePhoneNumber } from '../../utils/validation';
import { X, UserPlus, Edit2, AlertCircle, Save } from 'lucide-react';

interface AdminGuestModalProps {
  isOpen: boolean;
  guestToEdit: GuestEntry | null;
  onClose: () => void;
  onSave: (payload: GuestInputPayload, id?: string) => Promise<void>;
}

export const AdminGuestModal: React.FC<AdminGuestModalProps> = ({
  isOpen,
  guestToEdit,
  onClose,
  onSave,
}) => {
  const [fullName, setFullName] = useState('');
  const [category, setCategory] = useState<GuestCategory>('UMUM');
  const [organizationOrAddress, setOrganizationOrAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [divisionId, setDivisionId] = useState<DivisionId>('PERUMAHAN');
  const [purpose, setPurpose] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (guestToEdit) {
      setFullName(guestToEdit.fullName);
      setCategory(guestToEdit.category);
      setOrganizationOrAddress(guestToEdit.organizationOrAddress);
      setPhoneNumber(guestToEdit.phoneNumber);
      setDivisionId(guestToEdit.divisionId);
      setPurpose(guestToEdit.purpose);
    } else {
      setFullName('');
      setCategory('UMUM');
      setOrganizationOrAddress('');
      setPhoneNumber('');
      setDivisionId('PERUMAHAN');
      setPurpose('');
    }
    setErrors({});
  }, [guestToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateGuestForm({
      fullName,
      organizationOrAddress,
      phoneNumber,
      divisionId,
      purpose,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const normalizedPhone = normalizePhoneNumber(phoneNumber);
      await onSave(
        {
          fullName: fullName.trim(),
          category,
          organizationOrAddress: organizationOrAddress.trim(),
          phoneNumber: normalizedPhone,
          divisionId,
          purpose: purpose.trim(),
        },
        guestToEdit?.id
      );
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Terjadi kesalahan sistem saat menyimpan data.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = Boolean(guestToEdit);
  const activeCategoryMeta = CATEGORIES_METADATA[category];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/40 overflow-hidden">
        {/* Header Modal */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#374774] text-[#EAB630] flex items-center justify-center">
              {isEditing ? <Edit2 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface font-display">
                {isEditing ? 'Perbarui Data Tamu' : 'Input Tamu Manual'}
              </h3>
              <p className="text-xs text-on-surface-variant">
                {isEditing
                  ? `Mengubah data untuk nomor tiket ${guestToEdit?.ticketNumber}`
                  : 'Catat tamu secara manual oleh Petugas Piket'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.form && (
            <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-error shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Nama Lengkap Tamu <span className="text-error">*</span>
            </label>
            <input
              type="text"
              maxLength={100}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Contoh: Ir. H. Hendra Saputra"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774]"
            />
            {errors.fullName && <p className="text-xs text-error mt-1">{errors.fullName}</p>}
          </div>

          {/* Kategori & Bidang Tujuan (Grid 2 Kolom) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Kategori Tamu <span className="text-error">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GuestCategory)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774]"
              >
                <option value="UMUM">Masyarakat Umum</option>
                <option value="INSTANSI">Instansi / OPD</option>
                <option value="PENGEMBANG">Pengembang / PT</option>
                <option value="LAINNYA">Akademisi / Lain</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Bidang Tujuan <span className="text-error">*</span>
              </label>
              <select
                value={divisionId}
                onChange={(e) => setDivisionId(e.target.value as DivisionId)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774]"
              >
                <option value="SEKRETARIAT">Sekretariat</option>
                <option value="PERUMAHAN">Bidang Perumahan</option>
                <option value="KAWASAN_PERMUKIMAN">Bidang Kawasan Permukiman</option>
                <option value="PSU">Bidang PSU</option>
              </select>
            </div>
          </div>

          {/* Asal Instansi / Domisili */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              {activeCategoryMeta.fieldLabel} <span className="text-error">*</span>
            </label>
            <input
              type="text"
              maxLength={150}
              value={organizationOrAddress}
              onChange={(e) => setOrganizationOrAddress(e.target.value)}
              placeholder={activeCategoryMeta.placeholder}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774]"
            />
            {errors.organizationOrAddress && (
              <p className="text-xs text-error mt-1">{errors.organizationOrAddress}</p>
            )}
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Nomor WhatsApp / HP Aktif <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              maxLength={20}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Contoh: 08123456789 atau +628123456789"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774]"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-error mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Maksud Kunjungan */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Maksud / Keperluan Kunjungan <span className="text-error">*</span>
            </label>
            <textarea
              rows={3}
              maxLength={500}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Jelaskan keperluan dan berkas yang diserahkan..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant/60 bg-surface-container-low/40 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#374774] resize-none"
            />
            {errors.purpose && <p className="text-xs text-error mt-1">{errors.purpose}</p>}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-outline-variant/30 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-outline-variant/60 text-xs sm:text-sm font-semibold hover:bg-surface-container text-on-surface"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#374774] hover:bg-[#2b395d] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 disabled:opacity-75"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#EAB630]" />
                  <span>{isEditing ? 'Simpan Perubahan' : 'Catat Tamu'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
