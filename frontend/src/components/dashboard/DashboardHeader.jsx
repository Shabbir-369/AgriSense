const tabTitles = {
  sensor:   { title: "Live Sensor Feed",    sub: "Real-time readings from your ESP32 sensor" },
  upload:   { title: "Upload & Analyse",    sub: "Upload a soil or seed image for AI analysis" },
  history:  { title: "Analysis History",    sub: "All your past analyses and expert reviews" },
  inbox:    { title: "Expert Inbox",        sub: "Advice and messages from your agronomist" },
  sensors:  { title: "Manage Sensors",      sub: "Register and configure your ESP32 devices" },
  settings: { title: "Account Settings",   sub: "Update your profile and preferences" },
};

import { useAuth } from "../../context/AuthContext";
const DashboardHeader = ({ activeTab, sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();   // <-- get user from context
  const info = tabTitles[activeTab] || tabTitles.sensor;

  // Fallback if user is not loaded yet
  const displayName = user?.full_name || "Farmer";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="dash-header">
      {/* Mobile hamburger — only visible on small screens via CSS */}
      <button
        className="dash-header-menu-btn"
        onClick={() => setSidebarOpen((p) => !p)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      <div className="dash-header-title-block">
        <div className="dash-header-title">{info.title}</div>
        <div className="dash-header-sub">{info.sub}</div>
      </div>

      <div className="dash-header-right">
        <div className="dash-user-chip">
          <div className="dash-user-avatar">{initials}</div>
          <span className="dash-user-name">{displayName}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;