"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { authService } from '../../services/authService';
import Button from '../ui/Button';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'login-otp' | 'admin-login' | 'register' | 'verify-otp' | 'forgot-password' | 'reset-password'
  const [otpPurpose, setOtpPurpose] = useState('register'); // 'register' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestRegister, setSuggestRegister] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [googleClientId, setGoogleClientId] = useState('');

  const otpInputRefs = useRef([]);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuggestRegister(false);
    setSuccessMessage(null);
  }, [initialMode, isOpen]);

  // Load Google Identity Services Script & Client ID
  useEffect(() => {
    if (!isOpen) return;

    authService.getAuthConfig().then((cfg) => {
      if (cfg && cfg.googleClientId) {
        setGoogleClientId(cfg.googleClientId);
      }
    });

    if (typeof window !== 'undefined' && !window.google?.accounts?.oauth2) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (mode === 'verify-otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [mode, countdown]);

  if (!isOpen) return null;

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('');
      const newDigits = [...otpDigits];
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const nextIndex = Math.min(pasted.length, 5);
      if (otpInputRefs.current[nextIndex]) otpInputRefs.current[nextIndex].focus();
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    if (value && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuggestRegister(false);
    setLoading(true);

    try {
      if (mode === 'admin-login') {
        const res = await authService.adminLogin(email, password);
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      } else {
        const res = await authService.login(email, password);
        if (onAuthSuccess) onAuthSuccess(res.user);
        onClose();
      }
    } catch (err) {
      const msg = err.message || 'Invalid email or password.';
      
      // If email is unverified, trigger OTP verification flow
      if (msg.includes('EMAIL_UNVERIFIED')) {
        try {
          await authService.resendOtp(email, 'EMAIL_VERIFICATION');
        } catch {
          // ignore
        }
        setOtpPurpose('register');
        setOtpDigits(['', '', '', '', '', '']);
        setCountdown(60);
        setError(null);
        setSuccessMessage('Your collector account requires email verification. A 6-digit code has been dispatched to your email.');
        setMode('verify-otp');
        return;
      }

      setError(msg);

      if (mode === 'login') {
        try {
          const exists = await authService.checkEmail(email);
          if (!exists) {
            setSuggestRegister(true);
          }
        } catch {
          setSuggestRegister(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestLoginOtpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.requestLoginOtp(email);
      setOtpPurpose('login');
      setOtpDigits(['', '', '', '', '', '']);
      setCountdown(60);
      setSuccessMessage('A single-use sign-in verification code has been dispatched to your email.');
      setMode('verify-otp');
    } catch (err) {
      setError(err.message || 'Failed to dispatch sign-in code.');
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Popup Trigger
  const handleGoogleOAuth = async () => {
    setError(null);
    setOauthLoading(true);

    try {
      if (typeof window !== 'undefined' && window.google?.accounts?.oauth2 && googleClientId) {
        // Official Google Identity Services OAuth Popup
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: googleClientId,
          scope: 'openid email profile',
          callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                // Fetch user profile from Google UserInfo endpoint
                const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const googleProfile = await userRes.json();

                const res = await authService.oauthLogin({
                  email: googleProfile.email,
                  firstName: googleProfile.given_name || googleProfile.name || 'Collector',
                  lastName: googleProfile.family_name || 'Member',
                  provider: 'GOOGLE',
                  providerId: googleProfile.sub,
                  avatarUrl: googleProfile.picture,
                });

                setSuccessMessage('Successfully authenticated with Google!');
                setTimeout(() => {
                  if (onAuthSuccess) onAuthSuccess(res.user);
                  onClose();
                }, 600);
              } catch (authErr) {
                setError(authErr.message || 'Failed to authenticate Google account.');
              } finally {
                setOauthLoading(false);
              }
            } else {
              setOauthLoading(false);
            }
          },
          error_callback: (err) => {
            setOauthLoading(false);
            if (err && err.type !== 'popup_closed') {
              setError('Google Sign-In was cancelled or encountered an issue.');
            }
          },
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
      } else {
        // Fallback if client ID is still being loaded
        const cfg = await authService.getAuthConfig();
        if (cfg && cfg.googleClientId && window.google?.accounts?.oauth2) {
          setGoogleClientId(cfg.googleClientId);
          const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: cfg.googleClientId,
            scope: 'openid email profile',
            callback: async (tokenResponse) => {
              if (tokenResponse && tokenResponse.access_token) {
                const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const googleProfile = await userRes.json();
                const res = await authService.oauthLogin({
                  email: googleProfile.email,
                  firstName: googleProfile.given_name || 'Collector',
                  lastName: googleProfile.family_name || 'Member',
                  provider: 'GOOGLE',
                  providerId: googleProfile.sub,
                  avatarUrl: googleProfile.picture,
                });
                setSuccessMessage('Successfully authenticated with Google!');
                setTimeout(() => {
                  if (onAuthSuccess) onAuthSuccess(res.user);
                  onClose();
                }, 600);
              }
              setOauthLoading(false);
            },
          });
          tokenClient.requestAccessToken({ prompt: 'select_account' });
        } else {
          setError('Google Client ID is not configured in .env yet. Please ensure GOOGLE_CLIENT_ID is set.');
          setOauthLoading(false);
        }
      }
    } catch (err) {
      setError(err.message || 'Google authentication error.');
      setOauthLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!agreedToTerms) {
      setError('Please accept the client terms and conditions to proceed.');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await authService.register({
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      setOtpPurpose('register');
      setOtpDigits(['', '', '', '', '', '']);
      setSuccessMessage('Registration submitted! Verification code dispatched to your email.');
      setCountdown(60);
      setMode('verify-otp');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join('');
    if (otp.length < 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      if (otpPurpose === 'login') {
        const data = await authService.verifyLoginOtp(email, otp);
        setSuccessMessage('Sign-in verified successfully! Welcome back.');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(data.user);
          onClose();
        }, 800);
      } else {
        const data = await authService.verifyEmail(email, otp);
        setSuccessMessage('Email verified successfully! Welcome to REVERIE.');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(data.user || data);
          onClose();
        }, 800);
      }
    } catch (err) {
      setError(err.message || 'Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSuccessMessage('Password reset code dispatched to your email.');
      setMode('reset-password');
    } catch (err) {
      setError(err.message || 'Failed to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const otp = otpDigits.join('');
    if (otp.length < 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await authService.resetPassword(email, otp, password);
      setSuccessMessage('Password reset successfully! Please sign in with your new credentials.');
      setTimeout(() => {
        setMode('login');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="auth-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="auth-modal-header">
          <span className="auth-modal-eyebrow font-ui">
            {mode === 'admin-login' ? 'ATELIER ADMIN PORTAL' : 'REVERIE HAUTE HORLOGERIE'}
          </span>
          <h2 className="auth-modal-title font-display">
            {mode === 'login' && 'Collector Sign In'}
            {mode === 'login-otp' && 'Sign In with Email Code'}
            {mode === 'admin-login' && 'Administrator Access'}
            {mode === 'register' && 'Create Collector Account'}
            {mode === 'verify-otp' && (otpPurpose === 'login' ? 'Enter Sign-In Code' : 'Verify Your Email')}
            {mode === 'forgot-password' && 'Reset Your Password'}
            {mode === 'reset-password' && 'Enter New Password'}
          </h2>
          <p className="auth-modal-subtitle font-ui">
            {mode === 'login' && 'Identify yourself to manage your timepiece acquisitions & certificates.'}
            {mode === 'login-otp' && 'Enter your email to receive a secure single-use 6-digit verification code.'}
            {mode === 'admin-login' && 'Secured access for atelier management and inventory control.'}
            {mode === 'register' && 'Join the private registry for horological provenance and warranty tracking.'}
            {mode === 'verify-otp' && `Enter the 6-digit verification code dispatched to ${email}.`}
            {mode === 'forgot-password' && 'Enter your registered email to receive a secure recovery code.'}
            {mode === 'reset-password' && 'Enter the reset code and your new secure master password.'}
          </p>
        </div>

        {error && (
          <div className="auth-alert auth-alert--error font-ui">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {suggestRegister && mode === 'login' && (
          <div className="auth-not-found-prompt font-ui">
            <div className="auth-not-found-prompt-text">
              No account was found with <strong>{email}</strong>.
            </div>
            <button
              type="button"
              className="auth-not-found-prompt-btn"
              onClick={() => {
                setError(null);
                setSuggestRegister(false);
                setMode('register');
              }}
            >
              Create a new Collector Account with this email →
            </button>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert auth-alert--success font-ui">
            <CheckCircle size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {mode === 'login-otp' && (
          <form onSubmit={handleRequestLoginOtpSubmit} className="auth-form font-ui">
            <div className="form-group">
              <label htmlFor="auth-otp-email">Registered Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="auth-otp-email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-submit-wrap">
              <Button variant="primary" type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Dispatching Code...' : 'Send Single-Use Code'}
              </Button>
            </div>

            <div className="auth-switch-footer font-ui">
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
              >
                ← Return to Password Sign In
              </button>
            </div>
          </form>
        )}

        {(mode === 'login' || mode === 'admin-login') && (
          <form onSubmit={handleLoginSubmit} className="auth-form font-ui">
            {mode === 'login' && (
              <>
                <button
                  type="button"
                  className="auth-oauth-btn font-ui"
                  onClick={handleGoogleOAuth}
                  disabled={oauthLoading}
                >
                  <GoogleIcon />
                  <span>{oauthLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
                </button>

                <div className="auth-divider">
                  <span>or email credentials</span>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="auth-email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSuggestRegister(false);
                  }}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="auth-password">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={() => {
                      setError(null);
                      setSuggestRegister(false);
                      setMode('forgot-password');
                    }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="auth-password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="auth-submit-wrap">
              <Button variant="primary" type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Authenticating...' : mode === 'admin-login' ? 'Authenticate Admin' : 'Sign In'}
              </Button>
            </div>

            {mode === 'login' && (
              <>
                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="auth-link-muted"
                    style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => {
                      setError(null);
                      setSuggestRegister(false);
                      setMode('login-otp');
                    }}
                  >
                    <Mail size={13} /> Sign In with Email Verification Code instead
                  </button>
                </div>

                <div className="auth-switch-footer font-ui">
                  <span>New collector?</span>{' '}
                  <button
                    type="button"
                    className="auth-switch-link"
                    onClick={() => {
                      setError(null);
                      setSuggestRegister(false);
                      setMode('register');
                    }}
                  >
                    Create an Account
                  </button>
                  <div className="auth-admin-switch">
                    <button
                      type="button"
                      className="auth-link-muted"
                      onClick={() => {
                        setError(null);
                        setSuggestRegister(false);
                        setMode('admin-login');
                      }}
                    >
                      <KeyRound size={12} /> Atelier Staff Portal
                    </button>
                  </div>
                </div>
              </>
            )}

            {mode === 'admin-login' && (
              <div className="auth-switch-footer font-ui">
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => {
                    setError(null);
                    setSuggestRegister(false);
                    setMode('login');
                  }}
                >
                  ← Return to Collector Sign In
                </button>
              </div>
            )}
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="auth-form font-ui">
            <button
              type="button"
              className="auth-oauth-btn font-ui"
              onClick={handleGoogleOAuth}
              disabled={oauthLoading}
            >
              <GoogleIcon />
              <span>{oauthLoading ? 'Connecting to Google...' : 'Sign Up with Google (Instant)'}</span>
            </button>

            <div className="auth-divider">
              <span>or enter details</span>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="reg-first-name">First Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="reg-first-name"
                    type="text"
                    required
                    placeholder="Arjun"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="reg-last-name">Last Name</label>
                <input
                  id="reg-last-name"
                  type="text"
                  required
                  placeholder="Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="reg-email"
                  type="email"
                  required
                  placeholder="arjun@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-phone">Contact Phone</label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input
                  id="reg-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Master Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="reg-password"
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-checkbox-row">
              <input
                id="reg-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label htmlFor="reg-terms">
                I agree to the REVERIE Client Terms, Provenance Policy & Privacy Charter.
              </label>
            </div>

            <div className="auth-submit-wrap">
              <Button variant="primary" type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Register Collector Profile'}
              </Button>
            </div>

            <div className="auth-switch-footer font-ui">
              <span>Already registered?</span>{' '}
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => {
                  setError(null);
                  setSuggestRegister(false);
                  setMode('login');
                }}
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {mode === 'verify-otp' && (
          <form onSubmit={handleOtpSubmit} className="auth-form font-ui">
            <div className="otp-container">
              <div className="otp-inputs-row">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="otp-digit-input font-display"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <p className="otp-expiry-note">
                {countdown > 0 ? (
                  <span>Code expires in 00:{countdown < 10 ? `0${countdown}` : countdown}</span>
                ) : (
                  <button
                    type="button"
                    className="auth-link-btn"
                    onClick={async () => {
                      try {
                        setCountdown(60);
                        setError(null);
                        if (otpPurpose === 'login') {
                          await authService.requestLoginOtp(email);
                        } else {
                          await authService.resendOtp(email, 'EMAIL_VERIFICATION');
                        }
                        setSuccessMessage('A fresh verification code was dispatched to your email.');
                      } catch (err) {
                        setError(err.message || 'Failed to resend code.');
                      }
                    }}
                  >
                    Resend Code
                  </button>
                )}
              </p>
            </div>

            <div className="auth-submit-wrap">
              <Button variant="primary" type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Verifying Code...' : otpPurpose === 'login' ? 'Verify & Sign In' : 'Verify & Activate Account'}
              </Button>
            </div>

            <div className="auth-switch-footer font-ui">
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => {
                  setError(null);
                  setMode(otpPurpose === 'login' ? 'login' : 'register');
                }}
              >
                ← {otpPurpose === 'login' ? 'Return to Sign In' : 'Back to Registration'}
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot-password' && (
          <form onSubmit={handleForgotPasswordSubmit} className="auth-form font-ui">
            <div className="form-group">
              <label htmlFor="forgot-email">Registered Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input
                  id="forgot-email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-submit-wrap">
              <Button variant="primary" type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Sending Code...' : 'Send Recovery Code'}
              </Button>
            </div>

            <div className="auth-switch-footer font-ui">
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => {
                  setError(null);
                  setMode('login');
                }}
              >
                ← Return to Sign In
              </button>
            </div>
          </form>
        )}

        {mode === 'reset-password' && (
          <form onSubmit={handleResetPasswordSubmit} className="auth-form font-ui">
            <div className="form-group">
              <label>6-Digit Reset Code</label>
              <div className="otp-inputs-row" style={{ margin: '8px 0 16px' }}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpInputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="otp-digit-input font-display"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reset-new-pw">New Master Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="reset-new-pw"
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reset-confirm-pw">Confirm New Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="reset-confirm-pw"
                  type="password"
                  required
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-submit-wrap">
              <Button variant="primary" type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Resetting Password...' : 'Save New Password & Sign In'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
