import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../about.css";

/* ── Data ── */
const stats = [
  { value: "500+", label: "Farmers Onboarded" },
  { value: "12K+", label: "Analyses Completed" },
  { value: "98%",  label: "Expert Accuracy" },
  { value: "3",    label: "Countries Reached" },
];

const values = [
  {
    icon: "🌱",
    title: "Farmer First",
    desc: "Every decision we make starts with one question: does this genuinely help a farmer in the field? We build tools that are practical, not just impressive.",
  },
  {
    icon: "🔬",
    title: "Science-Backed",
    desc: "Our platform combines IoT sensor data with expert agronomist review. No guesswork — every insight is grounded in measurable soil science.",
  },
  {
    icon: "🤝",
    title: "Expert Partnership",
    desc: "AI assists, but humans verify. Every analysis is reviewed by certified agriculture professionals before reaching the farmer.",
  },
  {
    icon: "📡",
    title: "Always Connected",
    desc: "Live ESP32 sensor data means you never have stale readings. Real-time monitoring keeps you ahead of crop stress before it becomes crop loss.",
  },
  {
    icon: "🔒",
    title: "Data Ownership",
    desc: "Your farm data belongs to you. We never sell your sensor readings or crop images. You control what you share and with whom.",
  },
  {
    icon: "♻️",
    title: "Sustainable Future",
    desc: "Smarter inputs mean less waste. By pinpointing exactly what your soil needs, we help reduce over-fertilization and environmental runoff.",
  },
];

const team = [
  {
    name: "Arjun Mehta",
    role: "Founder & Full-Stack Lead",
    bio: "Built AgriSense to bridge the technology gap in rural agriculture. Passionate about IoT and making AI accessible to every farmer.",
    emoji: "👨‍💻",
    accent: "#4ade80",
  },
  {
    name: "Dr. Priya Nair",
    role: "Head of Agronomy",
    bio: "15+ years in soil science. Oversees the expert review pipeline and ensures every piece of advice is agronomically sound.",
    emoji: "👩‍🔬",
    accent: "#60a5fa",
  },
  {
    name: "Riya Sharma",
    role: "UI/UX & Frontend",
    bio: "Designs experiences that feel natural to farmers. Believes great software should feel as comfortable as a familiar tool.",
    emoji: "🎨",
    accent: "#f59e0b",
  },
  {
    name: "Vikram Patel",
    role: "IoT & Hardware Engineer",
    bio: "Programs the ESP32 firmware and maintains the sensor pipeline. If it connects to a field, Vikram built it.",
    emoji: "⚙️",
    accent: "#a78bfa",
  },
];

const timeline = [
  {
    year: "2022",
    title: "The Idea",
    desc: "A conversation with a struggling farmer in Maharashtra sparked the question: why can't soil testing be instant and affordable?",
  },
  {
    year: "2023",
    title: "First Prototype",
    desc: "Built the first ESP32 sensor kit and a basic Node.js dashboard. Tested with 12 pilot farmers across two districts.",
  },
  {
    year: "2024",
    title: "Expert Network Launched",
    desc: "Onboarded 20 certified agronomists. The expert-review pipeline went live, giving farmer analyses human-verified accuracy.",
  },
  {
    year: "2025",
    title: "AI Integration Begins",
    desc: "With thousands of expert-labeled analyses collected, machine learning model training begins. AgriSense scales to 500+ farmers.",
  },
];


/* ── Page Component ── */
const About = () => {
  const navigate = useNavigate();

  return (
    <div className="app-wrapper">
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="about-hero">
          <div className="about-hero-bg-line"></div>
          <div className="about-hero-bg-line about-hero-bg-line-2"></div>
          <div className="about-hero-container">
            <span className="section-tag">Our Story</span>
            <h1 className="about-hero-heading">
              Built for the Field,<br />
              <span className="about-hero-highlight">Not the Boardroom</span>
            </h1>
            <p className="about-hero-sub">
              AgriSense was born from a simple frustration: farmers had no affordable,
              real-time way to understand what their soil was telling them. We set out
              to change that — with IoT sensors, AI analysis, and real agricultural experts
              working together in one seamless platform.
            </p>
            <div className="about-hero-cta">
              <button className="btn-primary" onClick={() => navigate("/signup")}>
                Join AgriSense <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary" onClick={() => navigate("/contact")}>
                Talk to Us
              </button>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="about-stats-strip">
          <div className="about-stats-container">
            {stats.map((s, i) => (
              <div className="about-stat" key={i}>
                <span className="about-stat-value">{s.value}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="about-mission">
          <div className="section-container">
            <div className="mission-grid">
              <div className="mission-text">
                <span className="section-tag">Our Mission</span>
                <h2 className="section-title" style={{ textAlign: "left", marginBottom: "20px" }}>
                  Putting Data-Driven Agriculture Within Reach of Every Farmer
                </h2>
                <p className="mission-para">
                  Too often, precision agriculture is a luxury only large industrial farms can afford.
                  Expensive lab tests, delayed results, and inaccessible expert advice leave small and
                  medium farmers making decisions in the dark.
                </p>
                <p className="mission-para">
                  AgriSense flips that equation. With a low-cost ESP32 sensor kit, an intuitive
                  mobile-ready dashboard, and a network of vetted agronomists, any farmer can get
                  lab-grade soil intelligence from their phone — in minutes, not weeks.
                </p>
                <div className="mission-pills">
                  <span className="mission-pill">🌾 Soil Analysis</span>
                  <span className="mission-pill">🌱 Seed Analysis</span>
                  <span className="mission-pill">📡 Live IoT Feed</span>
                  <span className="mission-pill">👨‍🌾 Expert Review</span>
                </div>
              </div>
              <div className="mission-visual">
                <div className="mission-card">
                  <div className="mission-card-label">Platform Mission</div>
                  <div className="mission-quote">
                    "Make precision soil analytics as accessible as checking the weather."
                  </div>
                  <div className="mission-card-divider"></div>
                  <div className="mission-metrics">
                    <div className="mm-item">
                      <span className="mm-dot mm-dot-green"></span>
                      <span>Affordable hardware</span>
                    </div>
                    <div className="mm-item">
                      <span className="mm-dot mm-dot-blue"></span>
                      <span>Real-time monitoring</span>
                    </div>
                    <div className="mm-item">
                      <span className="mm-dot mm-dot-amber"></span>
                      <span>Expert verification</span>
                    </div>
                    <div className="mm-item">
                      <span className="mm-dot mm-dot-purple"></span>
                      <span>AI-powered future</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="about-timeline">
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">Our Journey</span>
              <h2 className="section-title">How We Got Here</h2>
              <p className="section-subtitle">From a field conversation to a growing platform.</p>
            </div>
            <div className="timeline-track">
              {timeline.map((item, i) => (
                <div className="timeline-item" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-dot-col">
                    <div className="timeline-dot"></div>
                    {i < timeline.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div className="timeline-body">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="about-values">
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">What We Stand For</span>
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle">The principles that guide every feature we build.</p>
            </div>
            <div className="values-grid">
              {values.map((v, i) => (
                <div className="value-card" key={i}>
                  <span className="value-icon">{v.icon}</span>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="about-team">
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">The People</span>
              <h2 className="section-title">Meet the Team</h2>
              <p className="section-subtitle">A small team with deep roots in agriculture and technology.</p>
            </div>
            <div className="team-grid">
              {team.map((member, i) => (
                <div className="team-card" key={i} style={{ "--member-accent": member.accent }}>
                  <div className="team-avatar">{member.emoji}</div>
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-accent-line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="about-cta-banner">
          <div className="section-container">
            <div className="cta-banner-inner">
              <div className="cta-banner-glow"></div>
              <span className="section-tag">Ready to Start?</span>
              <h2 className="cta-banner-heading">
                Your soil has answers.<br />AgriSense helps you read them.
              </h2>
              <p className="cta-banner-sub">
                Join hundreds of farmers already using live sensor data and expert guidance
                to grow smarter every season.
              </p>
              <div className="cta-banner-btns">
                <button className="btn-primary" onClick={() => navigate("/signup")}>
                  Create Free Account <span className="btn-arrow">→</span>
                </button>
                <button className="btn-secondary" onClick={() => navigate("/contact")}>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;