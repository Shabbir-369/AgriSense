import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: "📥",
    content: [
      {
        subtitle: "Account Information",
        text: "When you register on AgriSense, we collect your full name, email address, and a securely hashed password. We also store your assigned role (farmer, expert, or admin) to route you to the correct dashboard and enforce access controls.",
      },
      {
        subtitle: "Sensor & IoT Data",
        text: "If you register an ESP32 sensor device, we store its MAC address, optional GPS coordinates (latitude and longitude), and all time-series readings it transmits — including soil moisture, temperature, pH level, nitrogen, phosphorus, and potassium values. This data is timestamped and linked to your account.",
      },
      {
        subtitle: "Uploaded Images",
        text: "When you submit a soil or seed analysis, we store the image you upload (via local file storage or Cloudinary). Images are linked to your farmer account and the sensor reading active at upload time.",
      },
      {
        subtitle: "Guest Uploads",
        text: "If you use the guest analysis feature without logging in, your uploaded image and the resulting AI prediction are stored anonymously (with farmer_id = NULL). This data is retained for AI training purposes but is never linked to any identity.",
      },
      {
        subtitle: "Contact Form Data",
        text: "If you submit a message via our Contact page, we collect your name, email address, your stated role (farmer, researcher, etc.), and your message content.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: "⚙️",
    content: [
      {
        subtitle: "Platform Functionality",
        text: "Your account data is used to authenticate you, route you to the correct dashboard, and display personalised sensor readings and analysis history.",
      },
      {
        subtitle: "AI Analysis Pipeline",
        text: "Uploaded images and associated sensor readings are processed by our mock AI system (and in the future, a real machine learning model) to generate soil and seed health predictions. Expert-reviewed analyses are flagged with is_verified_for_training = TRUE and may be used to train future AI models.",
      },
      {
        subtitle: "Expert Review",
        text: "Your analysis submissions — including your uploaded image, the AI prediction, and your sensor readings at submission time — are made visible to certified agronomists (experts) in their review queue. Experts use this data solely to provide you with verified agricultural advice.",
      },
      {
        subtitle: "Admin Operations",
        text: "Platform administrators may view all user accounts, sensor data, and analyses for operational purposes such as moderation, support, and system health monitoring.",
      },
      {
        subtitle: "Communications",
        text: "We may use your email address to send platform notices, expert feedback notifications, and admin broadcast messages. We do not send unsolicited marketing emails.",
      },
    ],
  },
  {
    id: "data-storage",
    title: "Data Storage & Security",
    icon: "🔒",
    content: [
      {
        subtitle: "Password Security",
        text: "Passwords are never stored in plain text. We use bcrypt with a salt factor of 10, meaning your password is irreversibly hashed before being stored in our database. Even our team cannot read your password.",
      },
      {
        subtitle: "Authentication Tokens",
        text: "Upon login, we issue a signed JSON Web Token (JWT) containing your user ID, email, and role. This token is stored in your browser's localStorage and sent with each API request. Tokens carry an expiry window; after expiry, you will be redirected to the login page.",
      },
      {
        subtitle: "Database",
        text: "All structured data is stored in a MySQL relational database. Sensor readings, analyses, user records, and notices are stored in separate tables with referential integrity enforced by foreign keys.",
      },
      {
        subtitle: "Image Storage",
        text: "Images are currently stored via Multer on the local server filesystem. A future migration to Cloudinary is planned for improved redundancy and delivery. Image URLs are stored in the analyses table.",
      },
      {
        subtitle: "Access Control",
        text: "Every protected API endpoint validates your JWT via authMiddleware. Role-specific endpoints (farmer, expert, admin) additionally verify your role via roleMiddleware. No cross-role data access is permitted.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    icon: "🤝",
    content: [
      {
        subtitle: "We Do Not Sell Your Data",
        text: "AgriSense does not sell, rent, or trade your personal information to any third party for commercial purposes.",
      },
      {
        subtitle: "Experts",
        text: "Certified agronomists registered on the platform will see your uploaded images, AI predictions, and sensor readings in order to provide expert-verified feedback. They do not have access to your personal account details, password, or contact information.",
      },
      {
        subtitle: "Cloudinary (Planned)",
        text: "A future integration with Cloudinary for image hosting means uploaded images may be transmitted to and stored on Cloudinary's infrastructure. Cloudinary's own privacy policy will apply to images stored there.",
      },
      {
        subtitle: "Legal Obligations",
        text: "We may disclose your data if required by applicable law, court order, or government authority. We will notify you of such requests where legally permitted.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Data Control",
    icon: "🛡️",
    content: [
      {
        subtitle: "Update Your Profile",
        text: "You can update your full name and email address at any time from the Settings section of your dashboard (PATCH /api/user/profile).",
      },
      {
        subtitle: "Change Your Password",
        text: "You can change your password from the Settings section. Your new password is immediately re-hashed with bcrypt upon submission.",
      },
      {
        subtitle: "Delete Your Account",
        text: "You can permanently delete your account via the Danger Zone in your dashboard Settings. This triggers a DELETE /api/user/account request which removes your user record and all linked data via database CASCADE rules. This action is irreversible.",
      },
      {
        subtitle: "Data Portability",
        text: "To request a copy of your stored data, please contact us at support@agrisense.io. We will provide your account information and analysis history in a portable format within 30 days.",
      },
      {
        subtitle: "Guest Data",
        text: "Guest uploads are stored anonymously and cannot be attributed to or deleted by any individual. If you uploaded as a guest and later create an account, your guest uploads are not retroactively linked to your account.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Local Storage",
    icon: "🍪",
    content: [
      {
        subtitle: "LocalStorage",
        text: "AgriSense uses your browser's localStorage to store your JWT authentication token under the key 'token'. This token is used to maintain your logged-in session across page refreshes. Logging out clears this token from localStorage.",
      },
      {
        subtitle: "No Tracking Cookies",
        text: "We do not currently use any third-party advertising, tracking, or analytics cookies. We do not use cookies to build advertising profiles or share browsing data with advertisers.",
      },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: "👧",
    content: [
      {
        subtitle: "Age Restriction",
        text: "AgriSense is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has registered on our platform, please contact us at support@agrisense.io and we will promptly delete the account.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    icon: "📋",
    content: [
      {
        subtitle: "Policy Updates",
        text: "We may update this Privacy Policy as the platform evolves — for example, when real AI model integration, Cloudinary image hosting, or email notification services are introduced. When we make material changes, we will update the 'Last Updated' date at the top of this page. Continued use of AgriSense after changes are posted constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sectionEls = sections.map((s) => document.getElementById(s.id));
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar />
      <div className="pp-root">
        {/* Hero */}
        <div className="pp-hero">
          <div className="pp-hero-glow" />
          <div className="pp-hero-inner">
            <span className="pp-badge">Legal</span>
            <h1 className="pp-hero-title">Privacy Policy</h1>
            <p className="pp-hero-sub">
              AgriSense is built on the trust of farmers. This policy explains
              exactly what data we collect, how it powers your soil analytics,
              and the controls you have over it.
            </p>
            <div className="pp-meta-row">
              <span className="pp-meta-item">
                <span className="pp-meta-dot" />
                Last updated: January 2025
              </span>
              <span className="pp-meta-item">
                <span className="pp-meta-dot" />
                Version 1.0
              </span>
              <span className="pp-meta-item">
                <span className="pp-meta-dot" />
                Applies to AgriSense Web Platform
              </span>
            </div>
          </div>
        </div>

        <div className="pp-layout">
          {/* Sticky Sidebar TOC */}
          <aside className="pp-sidebar">
            <p className="pp-toc-label">On this page</p>
            <nav className="pp-toc">
              {sections.map((s) => (
                <button
                  key={s.id}
                  className={`pp-toc-item ${activeSection === s.id ? "pp-toc-item--active" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  <span className="pp-toc-icon">{s.icon}</span>
                  {s.title}
                </button>
              ))}
            </nav>
            <div className="pp-sidebar-contact">
              <p className="pp-sidebar-contact-label">Questions?</p>
              <a href="mailto:support@agrisense.io" className="pp-sidebar-email">
                support@agrisense.io
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="pp-main">
            <div className="pp-intro-card">
              <span className="pp-intro-icon">🌱</span>
              <p className="pp-intro-text">
                AgriSense ("we", "us", "our") operates the AgriSense web
                platform — a smart soil and seed analytics service that combines
                IoT sensor hardware, AI-powered image analysis, and certified
                agronomist review. By creating an account or using any part of
                the platform, you agree to the collection and use of information
                as described in this Privacy Policy.
              </p>
            </div>

            {sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="pp-section"
                style={{ "--section-delay": `${idx * 0.05}s` }}
              >
                <div className="pp-section-header">
                  <span className="pp-section-icon">{section.icon}</span>
                  <h2 className="pp-section-title">{section.title}</h2>
                </div>
                <div className="pp-section-body">
                  {section.content.map((item, i) => (
                    <div key={i} className="pp-item">
                      <h3 className="pp-item-subtitle">{item.subtitle}</h3>
                      <p className="pp-item-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Contact Footer */}
            <div className="pp-contact-block">
              <div className="pp-contact-glow" />
              <h3 className="pp-contact-title">Contact Us About Privacy</h3>
              <p className="pp-contact-text">
                If you have any questions, requests, or concerns about this
                Privacy Policy or how AgriSense handles your data, please reach
                out to our team.
              </p>
              <a href="mailto:support@agrisense.io" className="pp-contact-btn">
                support@agrisense.io
              </a>
            </div>
          </main>
        </div>
      </div>
      <Footer />

      <style>{`
        .pp-root {
          background: var(--bg-base);
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
        }

        /* Hero */
        .pp-hero {
          position: relative;
          padding: 100px 40px 60px;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .pp-hero-glow {
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(74,222,128,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .pp-hero-inner { position: relative; max-width: 760px; margin: 0 auto; }
        .pp-badge {
          display: inline-block;
          padding: 4px 14px;
          background: rgba(74,222,128,0.1);
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--green-primary);
          margin-bottom: 20px;
        }
        .pp-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 16px;
          line-height: 1.1;
        }
        .pp-hero-sub {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 28px;
        }
        .pp-meta-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .pp-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }
        .pp-meta-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--green-muted);
        }

        /* Layout */
        .pp-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 40px;
          gap: 60px;
          align-items: start;
        }

        /* Sidebar */
        .pp-sidebar {
          position: sticky;
          top: 100px;
        }
        .pp-toc-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 12px;
        }
        .pp-toc {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pp-toc-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: none;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: var(--text-muted);
          text-align: left;
          transition: all 0.2s ease;
          border-left: 2px solid transparent;
        }
        .pp-toc-item:hover {
          color: var(--text-secondary);
          background: var(--bg-card);
        }
        .pp-toc-item--active {
          color: var(--green-primary) !important;
          background: rgba(74,222,128,0.06) !important;
          border-left-color: var(--green-primary) !important;
        }
        .pp-toc-icon { font-size: 0.85rem; }
        .pp-sidebar-contact {
          margin-top: 32px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .pp-sidebar-contact-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 8px;
        }
        .pp-sidebar-email {
          font-size: 0.82rem;
          color: var(--green-primary);
          text-decoration: none;
          word-break: break-all;
        }
        .pp-sidebar-email:hover { text-decoration: underline; }

        /* Main */
        .pp-main { min-width: 0; }

        .pp-intro-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          margin-bottom: 48px;
        }
        .pp-intro-icon { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }
        .pp-intro-text {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        /* Sections */
        .pp-section {
          margin-bottom: 52px;
          animation: ppFadeUp 0.4s ease both;
          animation-delay: var(--section-delay, 0s);
        }
        @keyframes ppFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pp-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .pp-section-icon { font-size: 1.2rem; }
        .pp-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .pp-section-body { display: flex; flex-direction: column; gap: 20px; }
        .pp-item {
          padding: 18px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: border-color 0.2s ease;
        }
        .pp-item:hover { border-color: var(--border-light); }
        .pp-item-subtitle {
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--green-primary);
          margin: 0 0 8px;
          letter-spacing: 0.02em;
        }
        .pp-item-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        /* Contact block */
        .pp-contact-block {
          position: relative;
          margin-top: 64px;
          padding: 48px 40px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          text-align: center;
          overflow: hidden;
        }
        .pp-contact-glow {
          position: absolute;
          top: -40px; left: 50%;
          transform: translateX(-50%);
          width: 400px; height: 200px;
          background: radial-gradient(ellipse, rgba(74,222,128,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .pp-contact-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 12px;
          position: relative;
        }
        .pp-contact-text {
          font-size: 0.92rem;
          color: var(--text-secondary);
          max-width: 480px;
          margin: 0 auto 28px;
          line-height: 1.7;
          position: relative;
        }
        .pp-contact-btn {
          display: inline-block;
          padding: 12px 32px;
          background: var(--green-primary);
          color: #0a0f0a;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          text-decoration: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          position: relative;
        }
        .pp-contact-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Responsive */
        @media (max-width: 860px) {
          .pp-layout {
            grid-template-columns: 1fr;
            padding: 40px 20px;
            gap: 40px;
          }
          .pp-sidebar { position: static; }
          .pp-toc { flex-direction: row; flex-wrap: wrap; gap: 6px; }
          .pp-toc-item { border-left: none; border-bottom: 2px solid transparent; font-size: 0.75rem; padding: 6px 10px; }
          .pp-toc-item--active { border-bottom-color: var(--green-primary) !important; border-left-color: transparent !important; }
          .pp-hero { padding: 80px 20px 48px; }
          .pp-contact-block { padding: 36px 24px; }
        }
      `}</style>
    </>
  );
}