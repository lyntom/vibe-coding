import { GuestEntry, GuestInputPayload } from '../types/guest';

const GUESTS_STORAGE_KEY = 'etamu_disperkim_guests_v1';

// In-memory fallback jika localStorage tidak tersedia / diblokir / penuh
let inMemoryFallback: GuestEntry[] | null = null;

/**
 * 18 Data Sampel Realistis Kota Samarinda (Sesuai Konteks Disperkim)
 */
export const SAMPLE_SAMARINDA_GUESTS: GuestEntry[] = [
  {
    id: 'guest_samarinda_01',
    ticketNumber: 'TAMU-2026-101',
    createdAt: '2026-10-29T09:15:00.000+08:00',
    fullName: 'Ir. H. Hendra Saputra',
    category: 'PENGEMBANG',
    organizationOrAddress: 'PT. Mahakam Borneo Properti',
    phoneNumber: '+628115501234',
    divisionId: 'PSU',
    purpose: 'Penyerahan BAST Prasarana dan Utilitas Perumahan Pesona Mahakam III ke Pemkot',
  },
  {
    id: 'guest_samarinda_02',
    ticketNumber: 'TAMU-2026-102',
    createdAt: '2026-10-29T09:40:00.000+08:00',
    fullName: 'Siti Masitah',
    category: 'UMUM',
    organizationOrAddress: 'RT 14 Kelurahan Karang Asam Ilir, Sungai Kunjang',
    phoneNumber: '+6285249008871',
    divisionId: 'PERUMAHAN',
    purpose: 'Konsultasi program Bantuan Stimulan Rumah Swadaya (BSPS / Bedah Rumah RTLH)',
  },
  {
    id: 'guest_samarinda_03',
    ticketNumber: 'TAMU-2026-103',
    createdAt: '2026-10-29T10:10:00.000+08:00',
    fullName: 'Fajar Ramadan',
    category: 'LAINNYA',
    organizationOrAddress: 'Fakultas Teknik Universitas Mulawarman',
    phoneNumber: '+6282153449012',
    divisionId: 'SEKRETARIAT',
    purpose: 'Pengantaran berkas surat permohonan magang & riset evaluasi kawasan kumuh perkotaan',
  },
  {
    id: 'guest_samarinda_04',
    ticketNumber: 'TAMU-2026-104',
    createdAt: '2026-10-29T10:35:00.000+08:00',
    fullName: 'Agus Setiawan',
    category: 'UMUM',
    organizationOrAddress: 'Ketua RT 08 Kelurahan Selili, Samarinda Ilir',
    phoneNumber: '+6281347891122',
    divisionId: 'PSU',
    purpose: 'Pengajuan permohonan perbaikan 4 titik LPJU (Lampu Penerangan Jalan Umum) gang lingkungan',
  },
  {
    id: 'guest_samarinda_05',
    ticketNumber: 'TAMU-2026-105',
    createdAt: '2026-10-29T11:05:00.000+08:00',
    fullName: 'Dewi Anggraini, S.STP',
    category: 'INSTANSI',
    organizationOrAddress: 'Bapperida Kota Samarinda',
    phoneNumber: '+6281254332190',
    divisionId: 'SEKRETARIAT',
    purpose: 'Koordinasi sinkronisasi data indikator capaian Renja bidang perumahan dan permukiman TA 2026',
  },
  {
    id: 'guest_samarinda_06',
    ticketNumber: 'TAMU-2026-106',
    createdAt: '2026-10-28T08:50:00.000+08:00',
    fullName: 'Bambang Irawan',
    category: 'PENGEMBANG',
    organizationOrAddress: 'PT. Sinar Lembuswana Mandiri',
    phoneNumber: '+628115890045',
    divisionId: 'PERUMAHAN',
    purpose: 'Konsultasi kelengkapan dokumen pengesahan site plan perumahan klaster baru Samarinda Utara',
  },
  {
    id: 'guest_samarinda_07',
    ticketNumber: 'TAMU-2026-107',
    createdAt: '2026-10-28T09:30:00.000+08:00',
    fullName: 'Nurul Hidayah',
    category: 'UMUM',
    organizationOrAddress: 'RT 22 Kelurahan Bukuan, Kecamatan Palaran',
    phoneNumber: '+6285388712390',
    divisionId: 'KAWASAN_PERMUKIMAN',
    purpose: 'Verifikasi kelayakan usulan penerima bantuan rehabilitasi atap dan sanitasi warga prasejahtera',
  },
  {
    id: 'guest_samarinda_08',
    ticketNumber: 'TAMU-2026-108',
    createdAt: '2026-10-28T10:15:00.000+08:00',
    fullName: 'Rahmat Hidayat, S.T.',
    category: 'INSTANSI',
    organizationOrAddress: 'Dinas PUPR-Pera Provinsi Kalimantan Timur',
    phoneNumber: '+6282250119844',
    divisionId: 'SEKRETARIAT',
    purpose: 'Rapat koordinasi teknis integrasi program DAK pengentasan permukiman kumuh terpadu',
  },
  {
    id: 'guest_samarinda_09',
    ticketNumber: 'TAMU-2026-109',
    createdAt: '2026-10-28T11:20:00.000+08:00',
    fullName: 'Ahmad Fauzi',
    category: 'PENGEMBANG',
    organizationOrAddress: 'DPD Real Estate Indonesia (REI) Kalimantan Timur',
    phoneNumber: '+6281255401123',
    divisionId: 'PERUMAHAN',
    purpose: 'Audiensi regulasi percepatan perizinan dan standar kelayakan perumahan MBR Kota Samarinda',
  },
  {
    id: 'guest_samarinda_10',
    ticketNumber: 'TAMU-2026-110',
    createdAt: '2026-10-27T09:00:00.000+08:00',
    fullName: 'H. Ridwan Mansyur',
    category: 'UMUM',
    organizationOrAddress: 'RT 05 Kelurahan Teluk Lerong Ulu, Sungai Kunjang',
    phoneNumber: '+6281350992311',
    divisionId: 'KAWASAN_PERMUKIMAN',
    purpose: 'Konsultasi penataan kawasan tepian Sungai Karang Mumus dan saluran drainase lingkungan',
  },
  {
    id: 'guest_samarinda_11',
    ticketNumber: 'TAMU-2026-111',
    createdAt: '2026-10-27T10:40:00.000+08:00',
    fullName: 'Dr. Ir. Wahyudi, M.T.',
    category: 'LAINNYA',
    organizationOrAddress: 'Politeknik Negeri Samarinda (POLNES)',
    phoneNumber: '+628115409871',
    divisionId: 'SEKRETARIAT',
    purpose: 'Penyampaian draf kerjasama riset pemodelan drainase ramah lingkungan kawasan permukiman',
  },
  {
    id: 'guest_samarinda_12',
    ticketNumber: 'TAMU-2026-112',
    createdAt: '2026-10-27T13:25:00.000+08:00',
    fullName: 'Supriyadi',
    category: 'UMUM',
    organizationOrAddress: 'RT 12 Kelurahan Baqa, Samarinda Seberang',
    phoneNumber: '+6285250443211',
    divisionId: 'PSU',
    purpose: 'Laporan kerusakan tiang LPJU roboh akibat terpaan angin kencang di Jl. Bung Tomo',
  },
  {
    id: 'guest_samarinda_13',
    ticketNumber: 'TAMU-2026-113',
    createdAt: '2026-10-26T08:45:00.000+08:00',
    fullName: 'Ratna Sari Dewi, S.Si',
    category: 'INSTANSI',
    organizationOrAddress: 'Dinas Lingkungan Hidup Kota Samarinda',
    phoneNumber: '+6281346001299',
    divisionId: 'KAWASAN_PERMUKIMAN',
    purpose: 'Konsolidasi rencana aksi pemantauan sanitasi komunal dan tempat pembuangan sampah terpadu',
  },
  {
    id: 'guest_samarinda_14',
    ticketNumber: 'TAMU-2026-114',
    createdAt: '2026-10-26T10:10:00.000+08:00',
    fullName: 'Hendro Wijaya',
    category: 'PENGEMBANG',
    organizationOrAddress: 'PT. Bumi Mahakam Graha',
    phoneNumber: '+62811559812',
    divisionId: 'PERUMAHAN',
    purpose: 'Verifikasi lapangan pemenuhan kewajiban 2% penyediaan lahan pemakaman perumahan',
  },
  {
    id: 'guest_samarinda_15',
    ticketNumber: 'TAMU-2026-115',
    createdAt: '2026-10-26T11:30:00.000+08:00',
    fullName: 'Hj. Maryam',
    category: 'UMUM',
    organizationOrAddress: 'RT 30 Kelurahan Temindung Permai, Sungai Pinang',
    phoneNumber: '+6285348991200',
    divisionId: 'KAWASAN_PERMUKIMAN',
    purpose: 'Penyerahan kelengkapan berkas fisik usulan bantuan perbaikan rumah layak huni',
  },
  {
    id: 'guest_samarinda_16',
    ticketNumber: 'TAMU-2026-116',
    createdAt: '2026-10-25T09:15:00.000+08:00',
    fullName: 'Doni Prasetyo, S.H.',
    category: 'INSTANSI',
    organizationOrAddress: 'Bagian Hukum Setda Kota Samarinda',
    phoneNumber: '+6281251993450',
    divisionId: 'SEKRETARIAT',
    purpose: 'Harmonisasi draf Peraturan Walikota tentang tata cara penyerahan PSU pengembang perumahan',
  },
  {
    id: 'guest_samarinda_17',
    ticketNumber: 'TAMU-2026-117',
    createdAt: '2026-10-25T10:50:00.000+08:00',
    fullName: 'Tri Wahyuni',
    category: 'UMUM',
    organizationOrAddress: 'RT 17 Kelurahan Lempake, Samarinda Utara',
    phoneNumber: '+6282149887711',
    divisionId: 'PSU',
    purpose: 'Permohonan bantuan penerangan lampu jalan lorong akses menuju PAUD lingkungan',
  },
  {
    id: 'guest_samarinda_18',
    ticketNumber: 'TAMU-2026-118',
    createdAt: '2026-10-25T14:10:00.000+08:00',
    fullName: 'Kurniawan Efendi',
    category: 'PENGEMBANG',
    organizationOrAddress: 'PT. Mitra Mahakam Lestari',
    phoneNumber: '+628115509988',
    divisionId: 'PERUMAHAN',
    purpose: 'Konsultasi persyaratan teknis pelepasan hak fasilitas sosial perumahan Grand Mahakam',
  },
];

/**
 * Helper internal untuk membaca raw list dari storage/in-memory
 */
function readStorage(): GuestEntry[] {
  try {
    const raw = localStorage.getItem(GUESTS_STORAGE_KEY);
    if (!raw) {
      // Inisialisasi awal dengan data sampel jika belum pernah ada
      const initial = [...SAMPLE_SAMARINDA_GUESTS];
      localStorage.setItem(GUESTS_STORAGE_KEY, JSON.stringify(initial));
      inMemoryFallback = initial;
      return initial;
    }
    const parsed = JSON.parse(raw) as GuestEntry[];
    inMemoryFallback = parsed;
    return parsed;
  } catch (err) {
    console.warn('Storage read fallback to in-memory:', err);
    if (!inMemoryFallback) {
      inMemoryFallback = [...SAMPLE_SAMARINDA_GUESTS];
    }
    return inMemoryFallback;
  }
}

/**
 * Helper internal untuk menulis list ke storage/in-memory
 */
function writeStorage(entries: GuestEntry[]): void {
  inMemoryFallback = entries;
  try {
    localStorage.setItem(GUESTS_STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.warn('Storage write failed, preserved in memory only:', err);
  }
}

export const guestService = {
  /**
   * Mengambil semua daftar tamu
   */
  async getAllGuests(): Promise<GuestEntry[]> {
    await new Promise((resolve) => setTimeout(resolve, 80)); // Asinkron
    return readStorage();
  },

  /**
   * Menambahkan entri tamu baru (dipanggil Kiosk atau Admin)
   */
  async createGuest(payload: GuestInputPayload): Promise<GuestEntry> {
    await new Promise((resolve) => setTimeout(resolve, 120));

    const currentEntries = readStorage();

    // Hitung nomor antrean berbasis total entri
    const nextQueueNum = currentEntries.length + 101;
    const ticketNumber = `TAMU-2026-${String(nextQueueNum).padStart(3, '0')}`;

    const newGuest: GuestEntry = {
      id: `guest_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ticketNumber,
      createdAt: payload.createdAt || new Date().toISOString(),
      fullName: payload.fullName.trim(),
      category: payload.category,
      organizationOrAddress: payload.organizationOrAddress.trim(),
      phoneNumber: payload.phoneNumber.trim(),
      divisionId: payload.divisionId,
      purpose: payload.purpose.trim(),
    };

    const updated = [newGuest, ...currentEntries];
    writeStorage(updated);
    return newGuest;
  },

  /**
   * Memperbarui entri tamu berdasarkan ID
   */
  async updateGuest(
    id: string,
    payload: Partial<GuestInputPayload>
  ): Promise<GuestEntry> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const currentEntries = readStorage();
    const index = currentEntries.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error(`Data tamu dengan ID ${id} tidak ditemukan.`);
    }

    const target = currentEntries[index];
    const updatedEntry: GuestEntry = {
      ...target,
      fullName: payload.fullName !== undefined ? payload.fullName.trim() : target.fullName,
      category: payload.category !== undefined ? payload.category : target.category,
      organizationOrAddress:
        payload.organizationOrAddress !== undefined
          ? payload.organizationOrAddress.trim()
          : target.organizationOrAddress,
      phoneNumber: payload.phoneNumber !== undefined ? payload.phoneNumber.trim() : target.phoneNumber,
      divisionId: payload.divisionId !== undefined ? payload.divisionId : target.divisionId,
      purpose: payload.purpose !== undefined ? payload.purpose.trim() : target.purpose,
      createdAt: payload.createdAt !== undefined ? payload.createdAt : target.createdAt,
    };

    currentEntries[index] = updatedEntry;
    writeStorage(currentEntries);
    return updatedEntry;
  },

  /**
   * Menghapus entri tamu berdasarkan ID
   */
  async deleteGuest(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 80));

    const currentEntries = readStorage();
    const filtered = currentEntries.filter((item) => item.id !== id);
    writeStorage(filtered);
  },

  /**
   * Reset data ke 18 sampel realistis Samarinda
   */
  async resetToSampleData(): Promise<GuestEntry[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const fresh = [...SAMPLE_SAMARINDA_GUESTS];
    writeStorage(fresh);
    return fresh;
  },

  /**
   * Ekspor data tamu ke format CSV dengan UTF-8 BOM dan pencegahan CSV Injection
   */
  exportGuestsToCSV(entries: GuestEntry[]): string {
    const BOM = '\uFEFF';
    const headers = [
      'No',
      'Nomor Tiket',
      'Tanggal',
      'Waktu (WITA)',
      'Nama Lengkap',
      'Kategori',
      'Asal Instansi / Domisili',
      'No. WhatsApp / HP',
      'Bidang Tujuan',
      'Maksud Kunjungan',
    ];

    const sanitizeCell = (text: string): string => {
      if (!text) return '""';
      let clean = String(text).trim();
      // Sanitasi CSV Formula Injection: awalan =, +, -, @, \t, \r diberi kutip satu di depannya
      if (/^[=+\-@\t\r]/.test(clean)) {
        clean = `'${clean}`;
      }
      return `"${clean.replace(/"/g, '""')}"`;
    };

    const rows = entries.map((entry, idx) => {
      const dateObj = new Date(entry.createdAt);
      const dateFormatted = !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : '-';
      const timeFormatted = !isNaN(dateObj.getTime())
        ? `${dateObj.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })} WITA`
        : '-';

      return [
        sanitizeCell(String(idx + 1)),
        sanitizeCell(entry.ticketNumber),
        sanitizeCell(dateFormatted),
        sanitizeCell(timeFormatted),
        sanitizeCell(entry.fullName),
        sanitizeCell(entry.category),
        sanitizeCell(entry.organizationOrAddress),
        sanitizeCell(entry.phoneNumber),
        sanitizeCell(entry.divisionId),
        sanitizeCell(entry.purpose),
      ].join(',');
    });

    return BOM + [headers.map(sanitizeCell).join(','), ...rows].join('\r\n');
  },
};
