"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { authService } from '../../services/authService';
import Button from '../ui/Button';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [countdown, setCountdown] = useState(60);

  const otpInputRefs = useRef([]);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
    setSuccessMessage(null);
  }, [initialMode, isOpen]);

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
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!agreedToTerms) {
      setError('Please accept the client terms and conditions to proceed.');
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
      setSuccessMessage('Registration initiated. Verification code sent.');
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
      await authService.verifyEmail(email, otp);
      setSuccessMessage('Email verified successfully! Logging you in...');
      setTimeout(async () => {
        try {
          const res = await authService.login(email, password);
          if (onAuthSuccess) onAuthSuccess(res.user);
        } catch {
          // Ignored
        }
        onClose();
      }, 1000);
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
      setSuccessMessage('Password reset code sent to your email.');
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
      setSuccessMessage('Password reset successfully! Please sign in.');
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
            {mode === 'admin-login' && 'Administrator Access'}
            {mode === 'register' && 'Create Collector Account'}
            {mode === 'verify-otp' && 'Verify Your Email'}
            {mode === 'forgot-password' && 'Reset Your Password'}
            {mode === 'reset-password' && 'Enter New Password'}
          </h2>
          <p className="auth-modal-subtitle font-ui">
            {mode === 'login' && 'Identify yourself to manage your timepiece acquisitions & certificates.'}
            {mode === 'admin-login' && 'Secured access for atelier management and inventory control.'}
            {mode === 'register' && 'Join the private registry for horological provenance and warranty tracking.'}
            {mode === 'verify-otp' && `Enter the 6-digit verification code sent to ${email}.`}
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

        {successMessage && (
          <div className="auth-alert auth-alert--success font-ui">
            <CheckCircle size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {(mode === 'login' || mode === 'admin-login') && (
          <form onSubmit={handleLoginSubmit} className="auth-form font-ui">
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
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="auth-switch-footer font-ui">
                <span>New collector?</span>{' '}
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => {
                    setError(null);
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
                      setMode('admin-login');
                    }}
                  >
                    <KeyRound size={12} /> Atelier Staff Portal
                  </button>
                </div>
              </div>
            )}

            {mode === 'admin-login' && (
              <div className="auth-switch-footer font-ui">
                <button
                  type="button"
                  className="auth-switch-link"
                  onClick={() => {
                    setError(null);
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
                    onClick={() => {
                      setCountdown(60);
                      authService.register({ firstName, lastName, email, password, phone });
                    }}
                  >
                    Resend Code
                  </button>
                )}
              </p>
            </div>

            <div className="auth-submit-wrap">
              <Button variant="primary" type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Verifying Code...' : 'Verify & Activate Account'}
              </Button>
            </div>

            <div className="auth-switch-footer font-ui">
              <button
                type="button"
                className="auth-switch-link"
                onClick={() => {
                  setError(null);
                  setMode('register');
                }}
              >
                ← Back to Registration
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
