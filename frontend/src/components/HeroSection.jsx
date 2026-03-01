import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Decorative background blobs */}
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>
      <div className="hero-blob hero-blob-3"></div>

      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Smart Agriculture Platform
        </div>

        {/* Heading */}
        <h1 className="hero-heading">
          Empowering Farmers with
          <span className="hero-heading-highlight"> Smart Soil</span>
          <br />& Seed Analytics
        </h1>

        {/* Subtext */}
        <p className="hero-subtext">
          Connect IoT sensors, upload crop images, and receive instant AI-powered
          analysis. Real-time insights from field to expert — all in one platform.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => navigate("/signup")}>
            Get Started Free
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-secondary" onClick={() => navigate("/login")}>
            View Dashboard
          </button>
        </div>

        {/* Stats Row */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Farmers</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">12K+</span>
            <span className="stat-label">Analyses Done</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      {/* Hero Image / Visual */}
      <div className="hero-visual">
        <div className="sensor-card">
          <div className="sensor-card-header">
            <span className="sensor-status-dot"></span>
            <span className="sensor-card-title">Live Sensor Feed</span>
          </div>
          <div className="sensor-metrics">
            <div className="metric">
              <span className="metric-icon">💧</span>
              <div>
                <span className="metric-value">68%</span>
                <span className="metric-label">Moisture</span>
              </div>
              <div className="metric-bar"><div className="metric-fill" style={{ width: "68%" }}></div></div>
            </div>
            <div className="metric">
              <span className="metric-icon">🌡️</span>
              <div>
                <span className="metric-value">24°C</span>
                <span className="metric-label">Temperature</span>
              </div>
              <div className="metric-bar"><div className="metric-fill" style={{ width: "55%" }}></div></div>
            </div>
            <div className="metric">
              <span className="metric-icon">⚗️</span>
              <div>
                <span className="metric-value">6.8 pH</span>
                <span className="metric-label">pH Level</span>
              </div>
              <div className="metric-bar"><div className="metric-fill metric-fill-green" style={{ width: "70%" }}></div></div>
            </div>
          </div>
          <div className="sensor-card-footer">
            <span className="ai-badge">🤖 AI Analysis: Soil Healthy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;