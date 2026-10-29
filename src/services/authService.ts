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

export const authService = {
  /**
   * Cek apakah ada sesi aktif di sessionStorage atau localStorage
   */
  isAuthenticated(): boolean {
    try {
      const sessionStr =
        sessionStorage.getItem(AUTH_STORAGE_KEY) ||
        localStorage.getItem(AUTH_STORAGE_KEY);
      if (!sessionStr) return false;
      const session = JSON.parse(sessionStr) as AuthSession;
      return Boolean(session?.token);
    } catch {
      return false;
    }
  },

  /**
   * Dapatkan detail sesi petugas yang sedang aktif
   */
  getCurrentSession(): AuthSession | null {
    try {
      const sessionStr =
        sessionStorage.getItem(AUTH_STORAGE_KEY) ||
        localStorage.getItem(AUTH_STORAGE_KEY);
      if (!sessionStr) return null;
      return JSON.parse(sessionStr) as AuthSession;
    } catch {
      return null;
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
    // Simulasi jeda asinkron jaringan
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

      try {
        const serialized = JSON.stringify(sessionData);
        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, serialized);
        } else {
          sessionStorage.setItem(AUTH_STORAGE_KEY, serialized);
        }
      } catch (err) {
        console.error('Gagal menyimpan sesi:', err);
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
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.error('Gagal menghapus sesi:', err);
    }
  },
};
