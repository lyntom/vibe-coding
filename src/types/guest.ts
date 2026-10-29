/**
 * Kode unik 4 Bidang/Unit Kerja di Disperkim Kota Samarinda
 */
export type DivisionId =
  | 'SEKRETARIAT'
  | 'PERUMAHAN'
  | 'KAWASAN_PERMUKIMAN'
  | 'PSU';

/**
 * Klasifikasi kategori pengunjung
 */
export type GuestCategory =
  | 'UMUM'
  | 'INSTANSI'
  | 'PENGEMBANG'
  | 'LAINNYA';

/**
 * Entitas utama catatan kunjungan tamu
 */
export interface GuestEntry {
  id: string;                   // UUID atau ID unik (misal: "guest_1748049300_01")
  ticketNumber: string;         // Format: "TAMU-2026-XXX"
  createdAt: string;            // ISO 8601 datetime (misal: "2026-10-29T09:15:00.000Z")
  fullName: string;             // Nama lengkap tamu sesuai KTP/ID
  category: GuestCategory;      // Kategori tamu ('UMUM' | 'INSTANSI' | 'PENGEMBANG' | 'LAINNYA')
  organizationOrAddress: string;// Nama Instansi/PT atau Alamat Domisili (RT/Kelurahan di Samarinda)
  phoneNumber: string;          // Nomor HP / WhatsApp aktif
  divisionId: DivisionId;       // Bidang tujuan di Disperkim
  purpose: string;              // Detail maksud kunjungan & dokumen yang dibawa
}

/**
 * Payload untuk membuat atau memperbarui data tamu
 */
export type GuestInputPayload = Omit<GuestEntry, 'id' | 'ticketNumber' | 'createdAt'> & {
  createdAt?: string;
};

/**
 * Parameter filter pada Dashboard Admin
 */
export interface GuestFilterParams {
  searchQuery: string;
  divisionId: DivisionId | 'ALL';
  category: GuestCategory | 'ALL';
  periodPreset: 'TODAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'CUSTOM' | 'ALL';
  selectedMonth?: string;       // Format "YYYY-MM"
  startDate?: string;           // Format "YYYY-MM-DD"
  endDate?: string;             // Format "YYYY-MM-DD"
}

export interface DivisionMetadata {
  id: DivisionId;
  name: string;
  shortName: string;
  subtitle: string;
  floorBadge: string;
  roomGuide: string;
  description: string;
  quickChipLabel: string;
  badgeClass: string;
}

export const DIVISIONS_METADATA: Record<DivisionId, DivisionMetadata> = {
  SEKRETARIAT: {
    id: 'SEKRETARIAT',
    name: 'Sekretariat',
    shortName: 'Sekretariat',
    subtitle: 'Perencanaan, Keuangan, Umum & Kepegawaian',
    floorBadge: 'Lantai 1',
    roomGuide: 'Lantai 1 (Ruang Tata Usaha & Keuangan)',
    description:
      'Pelayanan persuratan dinas, tata kelola kepegawaian, verifikasi SPJ keuangan, penyusunan rencana program & anggaran dinas, audiensi pimpinan, serta izin magang/PKL.',
    quickChipLabel: 'Surat Masuk / Kepegawaian / Keuangan / Magang',
    badgeClass: 'bg-surface-container-high text-[#374774] border border-outline-variant/30',
  },
  PERUMAHAN: {
    id: 'PERUMAHAN',
    name: 'Bidang Perumahan',
    shortName: 'Bidang Perumahan',
    subtitle: 'Pembinaan & Penyediaan Perumahan',
    floorBadge: 'Lantai 2',
    roomGuide: 'Lantai 2 (Sayap Kanan)',
    description:
      'Fasilitasi penyediaan hunian bagi Masyarakat Berpenghasilan Rendah (MBR), program Bantuan Stimulan Perumahan Swadaya (BSPS / Bedah Rumah RTLH), serta pembinaan dan perizinan pembangunan perumahan komersial.',
    quickChipLabel: 'Bantuan Rumah RTLH / Bedah Rumah / Rumah MBR',
    badgeClass: 'bg-[#374774] text-white',
  },
  KAWASAN_PERMUKIMAN: {
    id: 'KAWASAN_PERMUKIMAN',
    name: 'Bidang Kawasan Permukiman',
    shortName: 'Bid. Kawasan Permukiman',
    subtitle: 'Penataan & Pencegahan Permukiman Kumuh',
    floorBadge: 'Lantai 2',
    roomGuide: 'Lantai 2 (Ruang Tengah)',
    description:
      'Pencegahan dan peningkatan kualitas kawasan permukiman kumuh kota, penataan kawasan permukiman bantaran sungai (Karang Mumus & Mahakam), penetapan SK lokasi kumuh, serta jalan dan drainase lingkungan permukiman.',
    quickChipLabel: 'Penataan Kawasan Kumuh / Lingkungan Permukiman',
    badgeClass: 'bg-[#4d5d8b] text-white',
  },
  PSU: {
    id: 'PSU',
    name: 'Bidang Prasarana, Sarana, dan Utilitas Umum (PSU)',
    shortName: 'Bidang PSU',
    subtitle: 'Verifikasi & Serah Terima PSU Pengembang',
    floorBadge: 'Lantai 2',
    roomGuide: 'Lantai 2 (Sayap Kiri)',
    description:
      'Verifikasi teknis & administrasi serah terima Prasarana, Sarana, dan Utilitas Umum (PSU / Fasum-Fasos) perumahan developer ke Pemkot Samarinda (jalan, drainase, RTH, fasos, dan makam), serta penerbitan BAST.',
    quickChipLabel: 'Serah Terima Fasum-Fasos (PSU) Pengembang',
    badgeClass: 'bg-amber-100 text-amber-900 border border-[#EAB630]/40',
  },
};

export interface CategoryMetadata {
  id: GuestCategory;
  label: string;
  fieldLabel: string;
  placeholder: string;
}

export const CATEGORIES_METADATA: Record<GuestCategory, CategoryMetadata> = {
  UMUM: {
    id: 'UMUM',
    label: 'Masyarakat Umum',
    fieldLabel: 'Alamat / RT / Kelurahan di Samarinda',
    placeholder: 'Contoh: RT 14 Kelurahan Sungai Pinang Dalam',
  },
  INSTANSI: {
    id: 'INSTANSI',
    label: 'Instansi / OPD',
    fieldLabel: 'Nama Instansi / OPD / Dinas',
    placeholder: 'Contoh: Bapperida Kota Samarinda',
  },
  PENGEMBANG: {
    id: 'PENGEMBANG',
    label: 'Pengembang / PT',
    fieldLabel: 'Nama Pengembang / PT / Asosiasi (REI/APERSI)',
    placeholder: 'Contoh: PT. Mahakam Borneo Properti',
  },
  LAINNYA: {
    id: 'LAINNYA',
    label: 'Akademisi / Lain',
    fieldLabel: 'Nama Institusi / Kampus / Lembaga',
    placeholder: 'Contoh: Fakultas Teknik Universitas Mulawarman',
  },
};
