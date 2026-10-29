import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Pengecualian tertangkap ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f9f9ff] flex flex-col items-center justify-center p-6 text-center text-[#111c2c]">
          <div className="max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-[#374774]/10 text-[#374774] flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-lg font-mono">!</span>
            </div>
            <h2 className="text-xl font-bold text-[#374774] mb-2 font-display">
              E-Tamu Disperkim Kota Samarinda
            </h2>
            <p className="text-xs text-slate-600 mb-6">
              Aplikasi mendeteksi interupsi ekstensi peramban. Silakan klik tombol di bawah untuk memuat ulang sistem.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-3 bg-[#374774] hover:bg-[#2b395d] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
