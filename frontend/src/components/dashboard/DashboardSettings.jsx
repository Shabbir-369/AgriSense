import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, changePassword, deleteAccount } from "../../services/api";
import { useNavigate } from "react-router-dom";

const DashboardSettings = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // Guard against non‑string values (like DOM elements)
  const [profile, setProfile] = useState({
    full_name: (user && typeof user.full_name === 'string') ? user.full_name : "",
    email: (user && typeof user.email === 'string') ? user.email : "",
  });
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [passErr, setPassErr] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");
    setProfileErr("");

    try {
      await updateProfile({
        full_name: profile.full_name,
        email: profile.email,
      });
      // Update context with new user info
      updateUser({ full_name: profile.full_name, email: profile.email });
      setProfileMsg("Profile updated successfully.");
    } catch (err) {
      setProfileErr(err.response?.data?.message || "Update failed");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    setPassMsg("");
    setPassErr("");

    if (passwords.new_password !== passwords.confirm_password) {
      setPassErr("New passwords do not match.");
      return;
    }
    if (passwords.new_password.length < 8) {
      setPassErr("Password must be at least 8 characters.");
      return;
    }

    setSavingPass(true);
    try {
      await changePassword({
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });
      setPassMsg("Password changed successfully.");
      setPasswords({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setPassErr(err.response?.data?.message || "Password change failed");
    } finally {
      setSavingPass(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone."))
      return;
    try {
      await deleteAccount();
      logout();
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="settings-section">
      {/* Profile Card */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">👤 Profile Information</h3>
          <p className="settings-card-sub">Update your name and email address.</p>
        </div>
        {profileMsg && <div className="settings-success">✅ {profileMsg}</div>}
        {profileErr && <div className="auth-error">⚠️ {profileErr}</div>}
        <form className="settings-form" onSubmit={handleProfileSave}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="auth-submit-btn settings-save-btn" disabled={savingProfile}>
            {savingProfile ? <span className="auth-spinner"></span> : "Save Profile"}
          </button>
        </form>
      </div>

      {/* Password Card */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">🔒 Change Password</h3>
          <p className="settings-card-sub">Use a strong password with at least 8 characters.</p>
        </div>
        {passMsg && <div className="settings-success">✅ {passMsg}</div>}
        {passErr && <div className="auth-error">⚠️ {passErr}</div>}
        <form className="settings-form" onSubmit={handlePasswordSave}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                type={showCurrent ? "text" : "password"}
                className="form-input input-with-icon input-with-toggle"
                placeholder="Enter current password"
                value={passwords.current_password}
                onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })}
                required
              />
              <button type="button" className="pass-toggle" onClick={() => setShowCurrent((p) => !p)}>
                {showCurrent ? "🙈" : "👁"}
              </button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showNew ? "text" : "password"}
                  className="form-input input-with-icon input-with-toggle"
                  placeholder="Min. 8 characters"
                  value={passwords.new_password}
                  onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                  required
                />
                <button type="button" className="pass-toggle" onClick={() => setShowNew((p) => !p)}>
                  {showNew ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type={showConfirm ? "text" : "password"}
                  className={`form-input input-with-icon input-with-toggle ${
                    passwords.confirm_password &&
                    passwords.confirm_password !== passwords.new_password
                      ? "input-error"
                      : passwords.confirm_password &&
                        passwords.confirm_password === passwords.new_password
                      ? "input-success"
                      : ""
                  }`}
                  placeholder="Re-enter new password"
                  value={passwords.confirm_password}
                  onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
                  required
                />
                <button type="button" className="pass-toggle" onClick={() => setShowConfirm((p) => !p)}>
                  {showConfirm ? "🙈" : "👁"}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="auth-submit-btn settings-save-btn" disabled={savingPass}>
            {savingPass ? <span className="auth-spinner"></span> : "Update Password"}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="settings-card settings-danger-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title settings-danger-title">⚠️ Danger Zone</h3>
          <p className="settings-card-sub">These actions are permanent and cannot be undone.</p>
        </div>
        <button className="settings-danger-btn" onClick={handleDeleteAccount}>
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default DashboardSettings;