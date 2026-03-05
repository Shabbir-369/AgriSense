import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { verifyEmail, resendVerification } from "../services/api";
import "../auth.css";
import logo from "../assets/logo.png";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await verifyEmail({ email, otp });
      setSuccess("Email verified successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendDisabled) return;
    setResendDisabled(true);
    setError("");
    setSuccess("");
    try {
      await resendVerification({ email });
      setSuccess("New OTP sent to your email.");
      setCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendDisabled(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form-panel" style={{ margin: "0 auto", maxWidth: "500px" }}>
        <div className="auth-form-inner">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon"><img src={logo} alt="🌱" /></span>
            <span className="auth-logo-text">AgriSense</span>
          </Link>

          <div className="auth-heading-block">
            <h1 className="auth-heading">Verify Your Email</h1>
            <p className="auth-subheading">
              We've sent a 6‑digit OTP to <strong>{email || "your email"}</strong>.
              Enter it below to activate your account.
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

          <form className="auth-form" onSubmit={handleVerify}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉</span>
                <input
                  id="email"
                  type="email"
                  className="form-input input-with-icon"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!!location.state?.email}
                />
              </div>
            </div>

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
              {loading ? <span className="auth-spinner"></span> : "Verify Email"}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <button
            className="guest-btn"
            onClick={handleResend}
            disabled={resendDisabled || countdown > 0}
          >
            {countdown > 0 ? `Resend OTP (${countdown}s)` : "Resend OTP"}
          </button>

          <p className="auth-switch">
            Already verified? <Link to="/login" className="auth-switch-link">Log in</Link>
          </p>
          <p className="auth-switch" style={{ marginTop: "4px" }}>
            <Link to="/signup" className="auth-switch-link">← Back to Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;