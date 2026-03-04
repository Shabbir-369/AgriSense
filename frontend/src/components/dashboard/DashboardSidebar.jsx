import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed
import logo from "../../assets/logo.png";

const navItems = [
  { id: "sensor",   icon: "📡", label: "Live Sensor Feed" },
  { id: "upload",   icon: "📸", label: "Upload & Analyse" },
  { id: "history",  icon: "📋", label: "Analysis History" },
  { id: "inbox",    icon: "💬", label: "Expert Inbox" },
  { id: "sensors",  icon: "🔧", label: "Manage Sensors" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const DashboardSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
   const { logout } = useAuth();   // <-- get logout

  const handleLogout = () => {
    logout();
    window.location.href = "/login";   // or use navigate
  };
  return (
    <aside className={`dash-sidebar ${sidebarOpen ? "dash-sidebar-open" : "dash-sidebar-closed"}`}>
      {/* Logo */}
      <div className="dash-sidebar-logo">
        <Link to="/" className="dash-logo-link">
          <span className="dash-logo-icon">
            <img src={logo} alt="🌱" />
          </span>
          {sidebarOpen && <span className="dash-logo-text">AgriSense</span>}
        </Link>
        <button className="sidebar-collapse-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* Role Badge */}
      {sidebarOpen && (
        <div className="dash-role-badge">
          <span className="dash-role-dot"></span>
          Farmer Account
        </div>
      )}

      {/* Nav Items */}
      <nav className="dash-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`dash-nav-item ${activeTab === item.id ? "dash-nav-active" : ""}`}
            onClick={() => setActiveTab(item.id)}
            title={!sidebarOpen ? item.label : ""}
          >
            <span className="dash-nav-icon">{item.icon}</span>
            {sidebarOpen && <span className="dash-nav-label">{item.label}</span>}
            {activeTab === item.id && sidebarOpen && (
              <span className="dash-nav-active-dot"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom: Logout */}
      <div className="dash-sidebar-footer">
        <button className="dash-logout-btn" onClick={handleLogout}>
      <span>🚪</span>
      {sidebarOpen && <span>Log Out</span>}
    </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;