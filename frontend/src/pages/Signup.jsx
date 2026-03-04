import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../auth.css";
import logo from "../assets/logo.png";
// import axios from "axios";
// import { API_ENDPOINTS } from "../config/api";
import { registerUser } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "farmer",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
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

  const strength = getPasswordStrength(form.password);

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (form.password !== form.confirm_password) {
//     setError("Passwords do not match.");
//     return;
//   }

//   if (form.password.length < 8) {
//     setError("Password must be at least 8 characters.");
//     return;
//   }

//   try {
//     setLoading(true);
//     setError("");

//     const res = await axios.post(
//       `${API_ENDPOINTS.REGISTER}`,
//       {
//         full_name: form.full_name,
//         email: form.email,
//         password: form.password,
//         role: form.role,
//       }
//     );

//     alert("Registration successful ✅");
//     navigate("/login");

//   } catch (error) {
//     setError(error.response?.data?.message || "Registration failed");
//   } finally {
//     setLoading(false);
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirm_password) {
    setError("Passwords do not match.");
    return;
  }

  if (form.password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    await registerUser({
      full_name: form.full_name,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    alert("Registration successful ✅");
    navigate("/login");

  } catch (error) {
    setError(error.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};



  const roles = [
    { value: "farmer", icon: "🌾", label: "Farmer", desc: "Monitor soil & get expert advice" },
    { value: "expert", icon: "🔬", label: "Expert", desc: "Review analyses & guide farmers" },
  ];

  return (
    <div className="auth-page auth-page-signup">
      {/* ── Left Panel: Visual ── */}
      <div className="auth-visual-panel auth-visual-panel-left">
        <div className="auth-visual-glow auth-visual-glow-1"></div>
        <div className="auth-visual-glow auth-visual-glow-2"></div>

        <div className="auth-visual-content">
          <Link to="/" className="auth-logo auth-logo-visual">
            <span className="auth-logo-icon">
              <img src={logo} alt="🌱" />
            </span>
            <span className="auth-logo-text">AgriSense</span>
          </Link>

          <h2 className="auth-visual-heading auth-visual-heading-lg">
            Join 500+<br />farmers already<br />farming smarter.
          </h2>

          <p className="auth-visual-sub">
            Create your free account and connect your ESP32 sensor in under 5 minutes.
          </p>

          {/* Feature checklist */}
          <div className="signup-checklist">
            {[
              { icon: "📡", text: "Connect unlimited ESP32 sensors" },
              { icon: "🤖", text: "AI soil & seed image analysis" },
              { icon: "👨‍🌾", text: "Expert-reviewed insights" },
              { icon: "📊", text: "Full historical data dashboard" },
              { icon: "🔔", text: "Real-time alerts & notifications" },
            ].map((item, i) => (
              <div className="checklist-item" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="checklist-icon">{item.icon}</span>
                <span className="checklist-text">{item.text}</span>
                <span className="checklist-check">✓</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          {/* Mobile logo (hidden on desktop) */}
          <Link to="/" className="auth-logo auth-logo-mobile">
            <span className="auth-logo-icon">
              <img src={logo} alt="🌱" />
            </span>
            <span className="auth-logo-text">AgriSense</span>
          </Link>

          <div className="auth-heading-block">
            <h1 className="auth-heading">Create your account</h1>
            <p className="auth-subheading">
              Free forever for farmers. Get started in minutes.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Role Selector */}
            <div className="form-group">
              <label className="form-label">I am joining as...</label>
              <div className="role-selector">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    className={`role-option ${form.role === r.value ? "role-option-active" : ""}`}
                    onClick={() => setForm({ ...form, role: r.value })}
                  >
                    <span className="role-option-icon">{r.icon}</span>
                    <span className="role-option-label">{r.label}</span>
                    <span className="role-option-desc">{r.desc}</span>
                    {form.role === r.value && <span className="role-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="full_name">Full Name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  id="full_name" name="full_name" type="text"
                  className="form-input input-with-icon"
                  placeholder="Arjun Mehta"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  id="password" name="password"
                  type={showPass ? "text" : "password"}
                  className="form-input input-with-icon input-with-toggle"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
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
              {/* Password strength meter */}
              {form.password && (
                <div className="strength-meter">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="strength-bar"
                        style={{
                          background: n <= strength.level ? strength.color : "var(--border-light)",
                        }}
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  id="confirm_password" name="confirm_password"
                  type={showConfirm ? "text" : "password"}
                  className={`form-input input-with-icon input-with-toggle ${
                    form.confirm_password && form.confirm_password !== form.password
                      ? "input-error"
                      : form.confirm_password && form.confirm_password === form.password
                      ? "input-success"
                      : ""
                  }`}
                  placeholder="Re-enter your password"
                  value={form.confirm_password}
                  onChange={handleChange}
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
              {form.confirm_password && form.confirm_password !== form.password && (
                <span className="field-error-msg">Passwords do not match</span>
              )}
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="auth-spinner"></span>
              ) : (
                <>Create Account <span className="btn-arrow">→</span></>
              )}
            </button>

            <p className="auth-terms">
              By signing up, you agree to our{" "}
              <Link to="/terms-of-service" className="auth-switch-link">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="auth-switch-link">Privacy Policy</Link>.
            </p>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;