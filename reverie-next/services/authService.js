/**
 * REVERIE Luxury Horology — Authentication Service (Next.js)
 * Communicates with Spring Boot API endpoints under /api/auth
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL 
  || ((typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
    ? 'http://localhost:8080/api'
    : '/api');

const TOKEN_KEY = 'reverie_access_token';
const REFRESH_KEY = 'reverie_refresh_token';
const USER_KEY = 'reverie_auth_user';

export const authService = {
  setAuthSession(data) {
    if (!data || typeof window === 'undefined') return;
    const user = data.user;
    const isVerified = user && (user.isVerified === true || user.verified === true || user.role === 'SUPER_ADMIN' || user.role === 'ADMIN');
    if (!isVerified || (user && user.email === 'client@reverie.app')) {
      this.clearAuthSession();
      return;
    }
    if (data.accessToken) localStorage.setItem(TOKEN_KEY, data.accessToken);
    if (data.refreshToken) localStorage.setItem(REFRESH_KEY, data.refreshToken);
    if (data.user) localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    window.dispatchEvent(new Event('reverie_auth_change'));
  },

  clearAuthSession() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event('reverie_auth_change'));
  },

  getAccessToken() {
    if (typeof window === 'undefined') return null;
    const user = this.getCurrentUser();
    if (!user) return null;
    return localStorage.getItem(TOKEN_KEY) || null;
  },

  getRefreshToken() {
    if (typeof window === 'undefined') return null;
    const user = this.getCurrentUser();
    if (!user) return null;
    return localStorage.getItem(REFRESH_KEY) || null;
  },

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    try {
      const userStr = localStorage.getItem(USER_KEY);
      const token = localStorage.getItem(TOKEN_KEY);
      if (!userStr || !token) {
        if (userStr || token) {
          this.clearAuthSession();
        }
        return null;
      }
      const user = JSON.parse(userStr);
      const isVerified = user && (user.isVerified === true || user.verified === true || user.role === 'SUPER_ADMIN' || user.role === 'ADMIN');
      if (!isVerified || user.email === 'client@reverie.app') {
        this.clearAuthSession();
        return null;
      }
      return user;
    } catch {
      this.clearAuthSession();
      return null;
    }
  },

  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    const user = this.getCurrentUser();
    return !!(user && localStorage.getItem(TOKEN_KEY));
  },

  // Check if an email account exists in backend
  async checkEmail(email) {
    try {
      const res = await fetch(`${API_BASE}/auth/check-email?email=${encodeURIComponent(email.trim())}`);
      const json = await res.json();
      return json.data === true;
    } catch {
      return false;
    }
  },

  // Get public Auth configuration (Google Client ID)
  async getAuthConfig() {
    try {
      const res = await fetch(`${API_BASE}/auth/config`);
      const json = await res.json();
      return json.data || {};
    } catch {
      return {};
    }
  },

  // Standard Customer Login
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Invalid email or password.');
      err.status = res.status;
      err.code = json.code || 'AUTH_FAILED';
      throw err;
    }

    this.setAuthSession(json.data);
    return json.data;
  },

  // Atelier Executive Admin Login
  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Invalid administrator credentials.');
      err.status = res.status;
      err.code = json.code || 'AUTH_FAILED';
      throw err;
    }

    this.setAuthSession(json.data);
    return json.data;
  },

  // OAuth / Social Sign-In (Google etc.) — Auto registers if account not found
  async oauthLogin({ email, firstName, lastName, provider = 'GOOGLE', providerId, avatarUrl }) {
    const res = await fetch(`${API_BASE}/auth/oauth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        firstName: firstName || 'Collector',
        lastName: lastName || 'Member',
        provider,
        providerId: providerId || `oauth_${Date.now()}`,
        avatarUrl: avatarUrl || null,
      }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'OAuth authentication failed.');
      err.status = res.status;
      throw err;
    }

    this.setAuthSession(json.data);
    return json.data;
  },

  // Admin Portal Login
  async adminLogin(email, password) {
    const res = await fetch(`${API_BASE}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Unauthorized admin credentials.');
      err.status = res.status;
      throw err;
    }

    this.setAuthSession(json.data);
    return json.data;
  },

  // Customer Registration (Triggers real Gmail SMTP OTP)
  async register({ firstName, lastName, email, password, phone }) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: (lastName || '').trim(),
        email: email.trim(),
        password,
        phone: (phone || '').trim(),
      }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Registration failed.');
      err.status = res.status;
      throw err;
    }

    return json;
  },

  // Verify 6-digit OTP for account activation
  async verifyEmail(email, otp) {
    const res = await fetch(`${API_BASE}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Invalid or expired verification code.');
      err.status = res.status;
      throw err;
    }

    if (json.data && json.data.accessToken) {
      this.setAuthSession(json.data);
    }

    return json.data || json;
  },

  // Request 6-digit Email Login OTP
  async requestLoginOtp(email) {
    const res = await fetch(`${API_BASE}/auth/otp/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), type: 'EMAIL_LOGIN' }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Failed to dispatch sign-in code.');
      err.status = res.status;
      throw err;
    }

    return json;
  },

  // Verify 6-digit Email Login OTP
  async verifyLoginOtp(email, otp) {
    const res = await fetch(`${API_BASE}/auth/otp/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Invalid or expired sign-in code.');
      err.status = res.status;
      throw err;
    }

    if (json.data && json.data.accessToken) {
      this.setAuthSession(json.data);
    }

    return json.data;
  },

  // Request 6-digit Checkout Authorization OTP
  async requestCheckoutOtp(email) {
    try {
      const res = await fetch(`${API_BASE}/auth/otp/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), type: 'CHECKOUT_VERIFICATION' }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        const err = new Error(json.message || 'Failed to dispatch checkout verification code.');
        err.status = res.status;
        throw err;
      }

      return json;
    } catch (err) {
      if (err.name === 'TypeError' || err.message?.includes('fetch') || err.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to backend server. Please verify your Spring Boot backend is running.');
      }
      throw err;
    }
  },

  // Verify 6-digit Checkout Authorization OTP
  async verifyCheckoutOtp(email, otp) {
    try {
      const res = await fetch(`${API_BASE}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        const err = new Error(json.message || 'Invalid or expired acquisition authorization code.');
        err.status = res.status;
        throw err;
      }

      if (json.data && json.data.accessToken) {
        this.setAuthSession(json.data);
      }

      return json.data;
    } catch (err) {
      if (err.name === 'TypeError' || err.message?.includes('fetch') || err.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to backend server. Please verify your Spring Boot backend is running.');
      }
      throw err;
    }
  },

  // Resend 6-digit OTP
  async resendOtp(email, type = 'EMAIL_VERIFICATION') {
    const res = await fetch(`${API_BASE}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), type }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Failed to resend verification code.');
      err.status = res.status;
      throw err;
    }

    return json;
  },

  // Request password reset OTP
  async forgotPassword(email) {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim() }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Failed to send reset code.');
      err.status = res.status;
      throw err;
    }

    return json;
  },

  // Set new password with OTP
  async resetPassword(email, otp, newPassword) {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), token: otp.trim(), otp: otp.trim(), newPassword }),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      const err = new Error(json.message || 'Failed to reset password.');
      err.status = res.status;
      throw err;
    }

    return json;
  },

  // Logout
  async logout() {
    const token = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    try {
      if (token) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch {
      // Ignored
    } finally {
      this.clearAuthSession();
    }
  },
};
