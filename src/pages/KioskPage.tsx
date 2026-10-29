import React, { useState, useEffect } from 'react';
import { DivisionId, GuestEntry, GuestInputPayload, DIVISIONS_METADATA } from '../types/guest';
import { guestService } from '../services/guestService';
import { KioskHeader } from '../components/kiosk/KioskHeader';
import { KioskHero } from '../components/kiosk/KioskHero';
import { HelperChips } from '../components/kiosk/HelperChips';
import { DivisionCards } from '../components/kiosk/DivisionCards';
import { GuestForm } from '../components/kiosk/GuestForm';
import { SuccessModal } from '../components/kiosk/SuccessModal';
import { QrModal } from '../components/kiosk/QrModal';
import { KioskFooter } from '../components/kiosk/KioskFooter';

export const KioskPage: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState<DivisionId | ''>('PERUMAHAN');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [successGuest, setSuccessGuest] = useState<GuestEntry | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [todayGuestCount, setTodayGuestCount] = useState<number>(0);

  // Load total today guest count
  const refreshStats = async () => {
    try {
      const all = await guestService.getAllGuests();
      const today = new Date().toISOString().split('T')[0];
      const todayCount = all.filter((g) => g.createdAt.startsWith(today)).length;
      setTodayGuestCount(todayCount || all.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleSelectDivision = (id: DivisionId) => {
    setSelectedDivision(id);
    const meta = DIVISIONS_METADATA[id];
    setToastMessage(`Tujuan otomatis dipilih: ${meta.name}`);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);

    // Scroll to form smoothly
    const formSection = document.getElementById('kiosk-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (payload: GuestInputPayload) => {
    const created = await guestService.createGuest(payload);
    setSuccessGuest(created);
    refreshStats();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <KioskHeader />

      <main className="flex-1 pt-20">
        <KioskHero onOpenQrModal={() => setIsQrModalOpen(true)} />

        <HelperChips
          onSelectDivision={handleSelectDivision}
          toastMessage={toastMessage}
        />

        <DivisionCards
          selectedDivision={selectedDivision}
          onSelectDivision={handleSelectDivision}
        />

        <GuestForm
          selectedDivision={selectedDivision}
          todayGuestCount={todayGuestCount}
          onSubmit={handleFormSubmit}
        />
      </main>

      <KioskFooter />

      {/* Modal Tiket Sukses (10 Detik Countdown UU PDP) */}
      <SuccessModal
        guest={successGuest}
        onClose={() => setSuccessGuest(null)}
      />

      {/* Modal QR Code Mandiri */}
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />
    </div>
  );
};
