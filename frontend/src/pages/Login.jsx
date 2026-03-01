import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // TODO: POST /api/auth/login
    // const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    // const data = await res.json();
    // if (!res.ok) { setError(data.message); setLoading(false); return; }
    // localStorage.setItem("token", data.token);
    // navigate based on role: data.role
    setTimeout(() => {
      setLoading(false);
      // Placeholder — replace with real role-based redirect
      setError("Backend not connected yet. Add your API route to complete login.");
    }, 1000);
  };

  return (
    <div className="auth-page">
      {/* ── Left Panel: Form ── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          {/* Logo */}
          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon">
              <img src="./src/assets/logo.png" alt="🌱" />
            </span>
            <span className="auth-logo-text">AgriSense</span>
          </Link>

          <div className="auth-heading-block">
            <h1 className="auth-heading">Welcome back</h1>
            <p className="auth-subheading">
              Log in to access your dashboard, sensor data, and expert advice.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉</span>
                <input
                  id="email" name="email" type="email"
                  className="form-input input-with-icon"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label className="form-label" htmlFor="password">Password</label>
                <button type="button" className="forgot-link">Forgot password?</button>
              </div>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  id="password" name="password"
                  type={showPass ? "text" : "password"}
                  className="form-input input-with-icon input-with-toggle"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
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
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="auth-spinner"></span>
              ) : (
                <>Log In <span className="btn-arrow">→</span></>
              )}
            </button>
          </form>

          <div className="auth-divider"><span>or continue as</span></div>

          <button className="guest-btn" onClick={() => navigate("/")}>
            👤 Guest — Upload an image without an account
          </button>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-switch-link">Sign up free</Link>
          </p>
        </div>
      </div>

      {/* ── Right Panel: Visual ── */}
      <div className="auth-visual-panel">
        <div className="auth-visual-glow auth-visual-glow-1"></div>
        <div className="auth-visual-glow auth-visual-glow-2"></div>

        <div className="auth-visual-content">
          <div className="auth-visual-badge">
            <span className="badge-dot"></span> Live Platform
          </div>

          <h2 className="auth-visual-heading">
            Your fields are<br />talking. Are you<br />listening?
          </h2>

          <p className="auth-visual-sub">
            Real-time soil readings. AI analysis. Expert guidance — all in one dashboard.
          </p>

          {/* Mock Dashboard Preview */}
          <div className="auth-preview-card">
            <div className="apc-header">
              <span className="apc-dot apc-dot-green"></span>
              <span className="apc-title">Field Sensor #A3 — Live</span>
            </div>
            <div className="apc-metrics">
              <div className="apc-metric">
                <span className="apc-metric-label">Moisture</span>
                <span className="apc-metric-value">72%</span>
                <div className="apc-bar"><div className="apc-fill" style={{ width: "72%", background: "#60a5fa" }}></div></div>
              </div>
              <div className="apc-metric">
                <span className="apc-metric-label">pH Level</span>
                <span className="apc-metric-value">6.5</span>
                <div className="apc-bar"><div className="apc-fill" style={{ width: "65%", background: "#4ade80" }}></div></div>
              </div>
              <div className="apc-metric">
                <span className="apc-metric-label">Nitrogen</span>
                <span className="apc-metric-value">38 mg/kg</span>
                <div className="apc-bar"><div className="apc-fill" style={{ width: "40%", background: "#f59e0b" }}></div></div>
              </div>
            </div>
            <div className="apc-footer">
              <span className="apc-ai-tag">🤖 AI: Soil conditions optimal</span>
            </div>
          </div>

          {/* Role pills */}
          <div className="auth-role-pills">
            <span className="role-pill role-pill-active">🌾 Farmer</span>
            <span className="role-pill">🔬 Expert</span>
            <span className="role-pill">⚙️ Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;