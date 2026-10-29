import React, { useState, useEffect, useMemo } from 'react';
import {
  GuestEntry,
  GuestFilterParams,
  GuestInputPayload,
} from '../types/guest';
import { guestService } from '../services/guestService';
import { authService, AuthSession } from '../services/authService';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminToolbar } from '../components/admin/AdminToolbar';
import { AdminBentoStats } from '../components/admin/AdminBentoStats';
import { AdminDivisionDistribution } from '../components/admin/AdminDivisionDistribution';
import { AdminFilters } from '../components/admin/AdminFilters';
import { AdminGuestTable } from '../components/admin/AdminGuestTable';
import { AdminGuestModal } from '../components/admin/AdminGuestModal';
import { AdminDetailModal } from '../components/admin/AdminDetailModal';
import { AdminPrintReport } from '../components/admin/AdminPrintReport';

export const AdminPage: React.FC = () => {
  const [allEntries, setAllEntries] = useState<GuestEntry[]>([]);
  const [currentSession, setCurrentSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<GuestFilterParams>({
    searchQuery: '',
    divisionId: 'ALL',
    category: 'ALL',
    periodPreset: 'ALL',
  });

  // Modals state
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestToEdit, setGuestToEdit] = useState<GuestEntry | null>(null);
  const [guestToView, setGuestToView] = useState<GuestEntry | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const fetchGuests = async () => {
    setIsLoading(true);
    try {
      const data = await guestService.getAllGuests();
      setAllEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentSession(authService.getCurrentSession());
    fetchGuests();
  }, []);

  // Filter Logic
  const filteredEntries = useMemo(() => {
    return allEntries.filter((item) => {
      // 1. Text Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchText =
          item.fullName.toLowerCase().includes(query) ||
          item.organizationOrAddress.toLowerCase().includes(query) ||
          item.purpose.toLowerCase().includes(query) ||
          item.ticketNumber.toLowerCase().includes(query) ||
          item.phoneNumber.includes(query);
        if (!matchText) return false;
      }

      // 2. Division filter
      if (filters.divisionId !== 'ALL') {
        if (item.divisionId !== filters.divisionId) return false;
      }

      // 3. Category filter
      if (filters.category !== 'ALL') {
        if (item.category !== filters.category) return false;
      }

      // 4. Period preset filter
      if (filters.periodPreset !== 'ALL') {
        const itemDate = new Date(item.createdAt);
        const now = new Date();

        if (filters.periodPreset === 'TODAY') {
          const itemDateStr = item.createdAt.split('T')[0];
          const nowDateStr = now.toISOString().split('T')[0];
          if (itemDateStr !== nowDateStr) return false;
        } else if (filters.periodPreset === 'THIS_WEEK') {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          if (itemDate < oneWeekAgo) return false;
        } else if (filters.periodPreset === 'THIS_MONTH') {
          const itemMonth = item.createdAt.substring(0, 7);
          const currentMonth = now.toISOString().substring(0, 7);
          if (itemMonth !== currentMonth) return false;
        }
      }

      return true;
    });
  }, [allEntries, filters]);

  // Actions
  const handleOpenNewGuestModal = () => {
    setGuestToEdit(null);
    setIsGuestModalOpen(true);
  };

  const handleOpenEditGuestModal = (guest: GuestEntry) => {
    setGuestToEdit(guest);
    setIsGuestModalOpen(true);
  };

  const handleSaveGuest = async (payload: GuestInputPayload, id?: string) => {
    if (id) {
      await guestService.updateGuest(id, payload);
    } else {
      await guestService.createGuest(payload);
    }
    await fetchGuests();
  };

  const handleDeleteGuest = async (id: string) => {
    const target = allEntries.find((g) => g.id === id);
    const confirmMessage = target
      ? `Apakah Anda yakin ingin menghapus data buku tamu atas nama "${target.fullName}" (${target.ticketNumber})?`
      : 'Apakah Anda yakin ingin menghapus data buku tamu ini?';

    if (window.confirm(confirmMessage)) {
      await guestService.deleteGuest(id);
      await fetchGuests();
    }
  };

  const handleDownloadCSV = () => {
    if (filteredEntries.length === 0) {
      alert('Tidak ada data tamu yang dapat diekspor pada filter saat ini.');
      return;
    }

    const csvContent = guestService.exportGuestsToCSV(filteredEntries);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `rekap_buku_tamu_disperkim_samarinda_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleResetSeedData = async () => {
    if (
      window.confirm(
        'Perhatian: Tindakan ini akan mengembalikan seluruh data buku tamu ke 18 data sampel realistis Disperkim Kota Samarinda. Lanjutkan?'
      )
    ) {
      setIsResetting(true);
      try {
        const fresh = await guestService.resetToSampleData();
        setAllEntries(fresh);
        alert('Berhasil mereset data! 18 data sampel realistis Samarinda telah dimuat.');
      } catch (err) {
        console.error(err);
        alert('Gagal mereset data sampel.');
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <AdminHeader currentSession={currentSession} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdminToolbar
          onOpenNewGuestModal={handleOpenNewGuestModal}
          onDownloadCSV={handleDownloadCSV}
          onOpenPrintModal={() => setIsPrintModalOpen(true)}
          onResetSeedData={handleResetSeedData}
          isResetting={isResetting}
        />

        <AdminBentoStats
          filteredEntries={filteredEntries}
          allEntries={allEntries}
        />

        <AdminDivisionDistribution filteredEntries={filteredEntries} />

        <AdminFilters
          filters={filters}
          onChangeFilters={setFilters}
          onResetFilters={() =>
            setFilters({
              searchQuery: '',
              divisionId: 'ALL',
              category: 'ALL',
              periodPreset: 'ALL',
            })
          }
        />

        {isLoading ? (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-12 text-center">
            <div className="w-8 h-8 border-3 border-[#374774] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-on-surface-variant font-medium">Memuat data buku tamu...</p>
          </div>
        ) : (
          <AdminGuestTable
            entries={filteredEntries}
            onViewDetail={(guest) => setGuestToView(guest)}
            onEdit={handleOpenEditGuestModal}
            onDelete={handleDeleteGuest}
          />
        )}
      </main>

      {/* Modal Input / Edit Tamu */}
      <AdminGuestModal
        isOpen={isGuestModalOpen}
        guestToEdit={guestToEdit}
        onClose={() => setIsGuestModalOpen(false)}
        onSave={handleSaveGuest}
      />

      {/* Modal Detail Tamu */}
      <AdminDetailModal
        guest={guestToView}
        onClose={() => setGuestToView(null)}
      />

      {/* Modal & Cetak Kop Surat Resmi */}
      <AdminPrintReport
        isOpen={isPrintModalOpen}
        entries={filteredEntries}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  );
};
