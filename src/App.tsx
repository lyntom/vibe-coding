import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { KioskPage } from './pages/KioskPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Rute 1: Mode Kiosk & Form Tamu Publik */}
      <Route path="/" element={<KioskPage />} />

      {/* Rute 2: Portal Otentikasi Petugas */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rute 3: Dashboard Rekapitulasi & Manajemen Admin (Diproteksi) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback rute tidak dikenal diarahkan kembali ke Kiosk */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
