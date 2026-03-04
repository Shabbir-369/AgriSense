import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Determine dashboard link based on role
  const getDashboardLink = () => {
    if (!user) return "/";
    if (user.role === "farmer") return "/farmer-dashboard";
    if (user.role === "expert") return "/expert-dashboard";
    if (user.role === "admin") return "/admin-dashboard";
    return "/";
  };

  // Get initials from full_name
  const getInitials = () => {
    if (!user?.full_name) return "U";
    return user.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">
            <img src={logo} alt="🌱" />
          </span>
          <span className="logo-text">AgriSense</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link ${isActive(link.to) ? "nav-link-active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Auth or User Info */}
        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="nav-user-menu">
              <Link to={getDashboardLink()} className="nav-user-chip">
                <div className="nav-user-avatar">{getInitials()}</div>
                <span className="nav-user-name">{user?.full_name?.split(" ")[0]}</span>
              </Link>
              <button className="nav-logout-icon" onClick={handleLogout} title="Logout">
                🚪
              </button>
            </div>
          ) : (
            <>
              <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
              <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mobile-link ${isActive(link.to) ? "mobile-link-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {isActive(link.to) && <span className="mobile-active-badge">Current</span>}
            </Link>
          ))}
          <div className="mobile-auth">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="mobile-link" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  className="btn-login"
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn-login" onClick={() => { navigate("/login"); setMenuOpen(false); }}>Login</button>
                <button className="btn-signup" onClick={() => { navigate("/signup"); setMenuOpen(false); }}>Sign Up</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;