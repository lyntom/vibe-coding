/**
 * Helper validasi input data tamu sesuai SECURITY.md
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function normalizePhoneNumber(raw: string): string {
  // Buang spasi dan tanda hubung
  let clean = raw.trim().replace(/[\s-]/g, '');
  if (clean.startsWith('0')) {
    clean = '+62' + clean.slice(1);
  } else if (!clean.startsWith('+')) {
    clean = '+62' + clean;
  }
  return clean;
}

export function validateGuestForm(data: {
  fullName: string;
  organizationOrAddress: string;
  phoneNumber: string;
  divisionId?: string;
  purpose: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const name = data.fullName.trim();
  if (!name) {
    errors.fullName = 'Nama lengkap wajib diisi.';
  } else if (name.length < 2) {
    errors.fullName = 'Nama lengkap minimal 2 karakter.';
  } else if (name.length > 100) {
    errors.fullName = 'Nama lengkap maksimal 100 karakter.';
  }

  const org = data.organizationOrAddress.trim();
  if (!org) {
    errors.organizationOrAddress = 'Instansi atau alamat domisili wajib diisi.';
  } else if (org.length < 3) {
    errors.organizationOrAddress = 'Instansi / alamat minimal 3 karakter.';
  } else if (org.length > 150) {
    errors.organizationOrAddress = 'Instansi / alamat maksimal 150 karakter.';
  }

  const phoneRaw = data.phoneNumber.trim();
  const phoneDigitsOnly = phoneRaw.replace(/\D/g, '');
  if (!phoneRaw) {
    errors.phoneNumber = 'Nomor WhatsApp / HP wajib diisi.';
  } else if (!/^[+0-9\s-]+$/.test(phoneRaw) || phoneDigitsOnly.length < 9 || phoneDigitsOnly.length > 15) {
    errors.phoneNumber = 'Format nomor HP tidak valid (9–15 digit angka).';
  }

  if (data.divisionId !== undefined && !data.divisionId) {
    errors.divisionId = 'Silakan pilih salah satu Bidang Tujuan di Disperkim.';
  }

  const purpose = data.purpose.trim();
  if (!purpose) {
    errors.purpose = 'Maksud kunjungan wajib diisi.';
  } else if (purpose.length < 5) {
    errors.purpose = 'Maksud kunjungan minimal 5 karakter.';
  } else if (purpose.length > 500) {
    errors.purpose = 'Maksud kunjungan maksimal 500 karakter.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
