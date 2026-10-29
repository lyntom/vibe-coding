/**
 * Service Layer Autentikasi Petugas & Administrator Disperkim Samarinda (Fase 1 MVP)
 * Kunci Sesi: 'etamu_disperkim_auth_session_v1'
 */

export interface AuthSession {
  token: string;
  username: string;
  role: string;
  loginAt: string;
}

const AUTH_STORAGE_KEY = 'etamu_disperkim_auth_session_v1';

// In-memory session fallback jika browser memblokir storage / mode incognito
let inMemoryAuthSession: AuthSession | null = null;

function safeGetStorage(type: 'session' | 'local'): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    const s = type === 'session' ? window.sessionStorage : window.localStorage;
    return s || null;
  } catch {
    return null;
  }
}

export const authService = {
  /**
   * Cek apakah ada sesi aktif di sessionStorage atau localStorage
   */
  isAuthenticated(): boolean {
    try {
      if (inMemoryAuthSession?.token) return true;

      const sessionStorageRef = safeGetStorage('session');
      const localStorageRef = safeGetStorage('local');

      const sessionStr =
        sessionStorageRef?.getItem(AUTH_STORAGE_KEY) ||
        localStorageRef?.getItem(AUTH_STORAGE_KEY);

      if (!sessionStr) return false;
      const session = JSON.parse(sessionStr) as AuthSession;
      return Boolean(session?.token);
    } catch {
      return Boolean(inMemoryAuthSession?.token);
    }
  },

  /**
   * Dapatkan detail sesi petugas yang sedang aktif
   */
  getCurrentSession(): AuthSession | null {
    try {
      if (inMemoryAuthSession) return inMemoryAuthSession;

      const sessionStorageRef = safeGetStorage('session');
      const localStorageRef = safeGetStorage('local');

      const sessionStr =
        sessionStorageRef?.getItem(AUTH_STORAGE_KEY) ||
        localStorageRef?.getItem(AUTH_STORAGE_KEY);

      if (!sessionStr) return null;
      return JSON.parse(sessionStr) as AuthSession;
    } catch {
      return inMemoryAuthSession;
    }
  },

  /**
   * Login petugas (Mock MVP Authentication)
   * Username: admin
   * Password: disperkim2026
   */
  async login(
    username: string,
    pass: string,
    rememberMe = false
  ): Promise<{ success: boolean; message?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanUser = username.trim();
    const cleanPass = pass.trim();

    if (cleanUser === 'admin' && cleanPass === 'disperkim2026') {
      const sessionData: AuthSession = {
        token: `auth_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        username: 'admin',
        role: 'Petugas Meja Piket / Penerima Tamu',
        loginAt: new Date().toISOString(),
      };

      inMemoryAuthSession = sessionData;

      try {
        const serialized = JSON.stringify(sessionData);
        if (rememberMe) {
          const lStore = safeGetStorage('local');
          lStore?.setItem(AUTH_STORAGE_KEY, serialized);
        } else {
          const sStore = safeGetStorage('session');
          sStore?.setItem(AUTH_STORAGE_KEY, serialized);
        }
      } catch (err) {
        console.warn('Gagal menyimpan sesi:', err);
      }

      return { success: true };
    }

    return {
      success: false,
      message: 'Kredensial tidak valid. Gunakan kredensial pengujian: admin / disperkim2026',
    };
  },

  /**
   * Logout dan bersihkan token sesi
   */
  async logout(): Promise<void> {
    inMemoryAuthSession = null;
    try {
      const sStore = safeGetStorage('session');
      const lStore = safeGetStorage('local');
      sStore?.removeItem(AUTH_STORAGE_KEY);
      lStore?.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.warn('Gagal menghapus sesi:', err);
    }
  },
};
