import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, verifyResetOtp, resetPassword } from "../services/api";
import "../auth.css";
import logo from "../assets/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Countdown for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countdown]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await forgotPassword({ email });
      setSuccess("If your email is registered, you will receive an OTP.");
      setStep(2);
      setCountdown(60); // start 60s cooldown
      setResendDisabled(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await verifyResetOtp({ email, otp });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;
    setResendDisabled(true);
    setError("");
    setSuccess("");
    try {
      await forgotPassword({ email });
      setSuccess("New OTP sent to your email.");
      setCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
      setResendDisabled(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await resetPassword({ email, otp, new_password: newPassword });
      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: "", level: 0 };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { label: "Weak", level: 1, color: "#f87171" };
    if (score === 2) return { label: "Fair", level: 2, color: "#f59e0b" };
    if (score === 3) return { label: "Good", level: 3, color: "#60a5fa" };
    return { label: "Strong", level: 4, color: "#4ade80" };
  };
  const strength = getPasswordStrength(newPassword);

  return (
    <div className="auth-page">
      <div className="auth-form-panel" style={{ margin: "0 auto", maxWidth: "500px" }}>
        <div className="auth-form-inner">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon"><img src={logo} alt="🌱" /></span>
            <span className="auth-logo-text">AgriSense</span>
          </Link>

          <div className="auth-heading-block">
            <h1 className="auth-heading">
              {step === 1 && "Reset Password"}
              {step === 2 && "Enter OTP"}
              {step === 3 && "Set New Password"}
            </h1>
            <p className="auth-subheading">
              {step === 1 && "Enter your email to receive a password reset OTP."}
              {step === 2 && `We've sent an OTP to ${email}. Enter it below.`}
              {step === 3 && "Choose a new password for your account."}
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}
          {success && (
            <div className="auth-error" style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80" }}>
              <span>✅</span> {success}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form className="auth-form" onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="input-wrap">
                  <span className="input-icon">✉</span>
                  <input
                    id="email"
                    type="email"
                    className="form-input input-with-icon"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form className="auth-form" onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="otp">OTP Code</label>
                <div className="input-wrap">
                  <span className="input-icon">🔢</span>
                  <input
                    id="otp"
                    type="text"
                    className="form-input input-with-icon"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                    maxLength={6}
                  />
                </div>
              </div>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : "Verify OTP"}
              </button>

              <div className="auth-divider"><span>or</span></div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="guest-btn"
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                  style={{ flex: 1 }}
                >
                  {resendDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
                </button>
                <button
                  type="button"
                  className="guest-btn"
                  onClick={() => setStep(1)}
                  style={{ flex: 1 }}
                >
                  ← Change Email
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form className="auth-form" onSubmit={handleResetSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="new-password">New Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    id="new-password"
                    type={showPass ? "text" : "password"}
                    className="form-input input-with-icon input-with-toggle"
                    placeholder="Min. 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
                {newPassword && (
                  <div className="strength-meter">
                    <div className="strength-bars">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="strength-bar" style={{ background: n <= strength.level ? strength.color : "var(--border-light)" }} />
                      ))}
                    </div>
                    <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                <div className="input-wrap">
                  <span className="input-icon">🔒</span>
                  <input
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    className={`form-input input-with-icon input-with-toggle ${
                      confirmPassword && confirmPassword !== newPassword ? "input-error" : confirmPassword && confirmPassword === newPassword ? "input-success" : ""
                    }`}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner"></span> : "Reset Password"}
              </button>
            </form>
          )}

          <p className="auth-switch">
            <Link to="/login" className="auth-switch-link">← Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;