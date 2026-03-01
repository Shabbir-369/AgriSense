import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home",       to: "/" },
    { label: "About Us",   to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          {/* <span className="logo-icon">🌱</span> */}
          <span className="logo-icon"><img src={logo} alt="🌱" /></span>
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
                {/* {isActive(link.to) && <span className="nav-link-dot"></span>} */}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="nav-auth">
          <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
          <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
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
            <button className="btn-login" onClick={() => { navigate("/login"); setMenuOpen(false); }}>Login</button>
            <button className="btn-signup" onClick={() => { navigate("/signup"); setMenuOpen(false); }}>Sign Up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




