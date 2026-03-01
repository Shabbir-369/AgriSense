import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          {/* <span className="logo-icon">🌱</span> */}
          <span className="logo-icon"><img src="./src/assets/logo.png" alt="🌱" /></span>
          <span className="logo-text">AgriSense</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
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
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact Us</Link>
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