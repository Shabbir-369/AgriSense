import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: "✅",
    content: [
      {
        subtitle: "Agreement to Terms",
        text: 'By accessing or using the AgriSense platform — including the web application, APIs, and any associated IoT integrations — you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the platform.',
      },
      {
        subtitle: "Modifications",
        text: "AgriSense reserves the right to modify these Terms at any time. We will indicate updates by revising the date at the top of this page. Your continued use of the platform after any modification constitutes your acceptance of the new Terms.",
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 13 years of age to use AgriSense. By using the platform, you represent that you meet this age requirement. If you are using AgriSense on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.",
      },
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Registration",
    icon: "👤",
    content: [
      {
        subtitle: "Account Creation",
        text: "To access the full features of AgriSense, you must register for an account by providing your full name, a valid email address, a secure password, and selecting your role (Farmer or Expert). You agree to provide accurate and current information during registration.",
      },
      {
        subtitle: "Account Security",
        text: "You are responsible for maintaining the confidentiality of your login credentials. You agree to notify us immediately at support@agrisense.io if you suspect any unauthorised access to your account. AgriSense is not liable for any loss or damage arising from unauthorised use of your account.",
      },
      {
        subtitle: "One Account Per User",
        text: "Each user may maintain only one account. Creating multiple accounts for the same individual is prohibited. AgriSense reserves the right to merge, suspend, or delete duplicate accounts.",
      },
      {
        subtitle: "Role Assignment",
        text: "Your role (Farmer, Expert, or Admin) determines your access level and dashboard features. Role upgrades or changes are managed by platform administrators. You may not misrepresent your role during registration.",
      },
    ],
  },
  {
    id: "platform-use",
    title: "Permitted Use of the Platform",
    icon: "🌱",
    content: [
      {
        subtitle: "Farmer Use",
        text: "As a registered farmer, you may connect ESP32 IoT sensors, upload soil and seed images for AI and expert analysis, view your sensor readings and analysis history, receive expert agronomist feedback via the Expert Inbox, and manage your account settings.",
      },
      {
        subtitle: "Expert Use",
        text: "As a registered expert, you may access the expert review queue to view farmer-submitted analyses, provide agricultural advice and feedback on submitted analyses, and mark analyses as verified for training purposes.",
      },
      {
        subtitle: "Guest Use",
        text: "Unregistered users may upload a single soil or seed image to receive a mock AI analysis result. Guest submissions are stored anonymously and are not linked to any user account. Guest users do not have access to sensor integration, analysis history, or expert feedback.",
      },
      {
        subtitle: "Prohibited Use",
        text: "You may not use AgriSense to: submit false, misleading, or malicious content; attempt to reverse-engineer, scrape, or exploit the platform's APIs; impersonate another user or agricultural expert; upload images containing personal identifiable information, illegal content, or content unrelated to soil or seed analysis; or attempt to interfere with the platform's security, performance, or integrity.",
      },
    ],
  },
  {
    id: "iot-hardware",
    title: "IoT Hardware & Sensor Data",
    icon: "📡",
    content: [
      {
        subtitle: "Sensor Registration",
        text: "Farmers may register ESP32 microcontroller devices by providing the device's MAC address and optional GPS coordinates. The registered MAC address must match the actual hardware device transmitting data.",
      },
      {
        subtitle: "Data Transmission",
        text: "Once registered, your ESP32 device will transmit soil readings (moisture, temperature, pH, nitrogen, phosphorus, potassium) to the AgriSense backend via HTTP POST. You are responsible for the physical security and correct configuration of your hardware device.",
      },
      {
        subtitle: "Accuracy Disclaimer",
        text: "Sensor readings depend on the quality, calibration, and placement of your physical hardware. AgriSense does not guarantee the accuracy of sensor data received from user-operated devices. Agricultural decisions should not be made solely on the basis of sensor readings without expert consultation.",
      },
      {
        subtitle: "Hardware Responsibility",
        text: "AgriSense is not responsible for any damage, crop loss, or financial harm resulting from incorrect sensor readings, hardware malfunction, or reliance on platform data without independent verification.",
      },
    ],
  },
  {
    id: "ai-analysis",
    title: "AI Analysis & Expert Review",
    icon: "🤖",
    content: [
      {
        subtitle: "Mock AI System",
        text: "AgriSense currently operates with a mock AI analysis system that generates placeholder predictions. These predictions are for demonstration purposes only and do not represent real scientific analysis. The platform is designed so that a real ML model will replace this system in a future release — no real agricultural decisions should be made on mock AI output alone.",
      },
      {
        subtitle: "Expert-in-the-Loop",
        text: "Every analysis submission enters an expert review queue. Certified agronomists will review your uploaded image, the AI prediction, and your sensor readings, and provide verified agricultural advice. The is_verified_for_training flag is set to TRUE only after expert review.",
      },
      {
        subtitle: "No Medical or Legal Advice",
        text: "Nothing provided by AgriSense — whether AI-generated, expert-authored, or system-generated — constitutes certified agronomic, legal, financial, or medical advice. All guidance is informational and supplementary. Farmers bear full responsibility for agricultural decisions made using the platform.",
      },
      {
        subtitle: "Expert Independence",
        text: "Agronomist experts on AgriSense are independent reviewers. AgriSense does not guarantee the availability, timeliness, or accuracy of expert feedback. Response times may vary based on queue volume and expert availability.",
      },
      {
        subtitle: "Training Data Usage",
        text: "Expert-verified analyses (those where is_verified_for_training = TRUE) may be used by AgriSense to train future AI models. By submitting an analysis, you grant AgriSense a non-exclusive, royalty-free licence to use the analysis data (image, sensor readings, and expert feedback) for AI model training and platform improvement.",
      },
    ],
  },
  {
    id: "content",
    title: "User Content & Uploads",
    icon: "📸",
    content: [
      {
        subtitle: "Ownership",
        text: "You retain ownership of all images and content you upload to AgriSense. By uploading content, you grant AgriSense a non-exclusive, worldwide, royalty-free licence to store, process, and display your content as necessary to operate the platform and deliver the analysis service.",
      },
      {
        subtitle: "Content Standards",
        text: "You agree to upload only images of soil or seeds relevant to agricultural analysis. You must not upload images containing human faces, personal data, offensive content, copyrighted material you do not own, or any content that violates applicable law.",
      },
      {
        subtitle: "Removal",
        text: "AgriSense reserves the right to remove any uploaded content that violates these Terms without prior notice. You may remove your own account and associated data via the Delete Account feature in Settings.",
      },
    ],
  },
  {
    id: "termination",
    title: "Termination & Suspension",
    icon: "🔴",
    content: [
      {
        subtitle: "Your Right to Terminate",
        text: "You may delete your account at any time via the Danger Zone in your dashboard Settings. Account deletion is permanent and irreversible. All linked sensor data, analyses, and profile information will be removed via database CASCADE rules.",
      },
      {
        subtitle: "AgriSense's Right to Suspend",
        text: "Platform administrators may suspend or delete any user account for violation of these Terms, fraudulent activity, abuse of the platform, or for any reason at their discretion with or without prior notice. Suspended users may contact support@agrisense.io to appeal.",
      },
      {
        subtitle: "Effect of Termination",
        text: "Upon termination, your right to access the platform ceases immediately. Anonymous guest upload data and AI-training-verified analysis rows may be retained for platform improvement purposes as permitted by our Privacy Policy.",
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: "⚖️",
    content: [
      {
        subtitle: "Platform Provided As-Is",
        text: 'AgriSense is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of harmful components.',
      },
      {
        subtitle: "No Liability for Agricultural Loss",
        text: "AgriSense is not liable for any crop failure, financial loss, property damage, or agricultural harm arising from reliance on platform data, AI predictions, sensor readings, or expert feedback. All platform output is supplementary and informational.",
      },
      {
        subtitle: "Limitation of Damages",
        text: "To the maximum extent permitted by applicable law, AgriSense's total liability to you for any claim arising out of or relating to these Terms or the platform shall not exceed the amount you paid to AgriSense in the twelve months preceding the claim, or INR 500, whichever is greater.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law & Contact",
    icon: "🏛️",
    content: [
      {
        subtitle: "Governing Law",
        text: "These Terms are governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of AgriSense shall be subject to the exclusive jurisdiction of the courts in Indore, Madhya Pradesh, India.",
      },
      {
        subtitle: "Contact",
        text: "For any questions about these Terms of Service, please contact us at support@agrisense.io. We aim to respond to all enquiries within 5 business days.",
      },
    ],
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
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
      <div className="tos-root">
        {/* Hero */}
        <div className="tos-hero">
          <div className="tos-hero-glow" />
          <div className="tos-hero-grid" />
          <div className="tos-hero-inner">
            <span className="tos-badge">Legal</span>
            <h1 className="tos-hero-title">Terms of Service</h1>
            <p className="tos-hero-sub">
              These terms govern your use of AgriSense — the smart soil and seed
              analytics platform connecting farmers, IoT sensors, AI analysis,
              and certified agronomists.
            </p>
            <div className="tos-meta-row">
              <span className="tos-meta-chip">📅 Effective: January 2025</span>
              <span className="tos-meta-chip">📄 Version 1.0</span>
              <span className="tos-meta-chip">🌍 India Jurisdiction</span>
            </div>
          </div>
        </div>

        {/* Quick Summary Banner */}
        <div className="tos-summary-bar">
          <div className="tos-summary-inner">
            <span className="tos-summary-label">Plain English Summary</span>
            <div className="tos-summary-items">
              <span className="tos-summary-item">
                <span className="tos-check">✓</span> Use the platform honestly and for real agricultural purposes
              </span>
              <span className="tos-summary-item">
                <span className="tos-check">✓</span> AI predictions are mock — do not rely on them alone
              </span>
              <span className="tos-summary-item">
                <span className="tos-check">✓</span> You own your uploads; we use them to improve the AI
              </span>
              <span className="tos-summary-item">
                <span className="tos-check">✓</span> You can delete your account and data at any time
              </span>
            </div>
          </div>
        </div>

        <div className="tos-layout">
          {/* Sidebar */}
          <aside className="tos-sidebar">
            <p className="tos-toc-label">Sections</p>
            <nav className="tos-toc">
              {sections.map((s) => (
                <button
                  key={s.id}
                  className={`tos-toc-item ${activeSection === s.id ? "tos-toc-item--active" : ""}`}
                  onClick={() => scrollTo(s.id)}
                >
                  <span className="tos-toc-icon">{s.icon}</span>
                  <span className="tos-toc-text">{s.title}</span>
                </button>
              ))}
            </nav>
            <div className="tos-sidebar-note">
              <p className="tos-sidebar-note-title">Need Help?</p>
              <p className="tos-sidebar-note-text">
                For questions about these terms, reach out to us.
              </p>
              <a href="mailto:support@agrisense.io" className="tos-sidebar-link">
                support@agrisense.io
              </a>
            </div>
          </aside>

          {/* Main */}
          <main className="tos-main">
            <div className="tos-intro-block">
              <p className="tos-intro-text">
                Welcome to <strong>AgriSense</strong>. Please read these Terms of
                Service carefully before using the platform. AgriSense is a
                full-stack web application that empowers farmers with real-time,
                data-driven soil and seed analytics — combining IoT hardware
                (ESP32 sensors), AI-powered image analysis, and a human
                expert-review pipeline. By creating an account, registering a
                sensor, or submitting an analysis, you agree to these Terms in
                full.
              </p>
            </div>

            {sections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="tos-section"
                style={{ "--section-delay": `${idx * 0.04}s` }}
              >
                <div className="tos-section-header">
                  <div className="tos-section-number">{String(idx + 1).padStart(2, "0")}</div>
                  <div className="tos-section-title-wrap">
                    <span className="tos-section-icon">{section.icon}</span>
                    <h2 className="tos-section-title">{section.title}</h2>
                  </div>
                </div>

                <div className="tos-section-body">
                  {section.content.map((item, i) => (
                    <div key={i} className="tos-item">
                      <div className="tos-item-label">{item.subtitle}</div>
                      <p className="tos-item-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Agreement Footer */}
            <div className="tos-agree-block">
              <div className="tos-agree-glow" />
              <div className="tos-agree-icon">📜</div>
              <h3 className="tos-agree-title">By Using AgriSense, You Agree</h3>
              <p className="tos-agree-text">
                These Terms were last updated in January 2025 and apply to all
                users of the AgriSense platform. If you have questions or
                concerns, contact us before continuing to use the platform.
              </p>
              <div className="tos-agree-actions">
                <a href="mailto:support@agrisense.io" className="tos-agree-btn tos-agree-btn--primary">
                  Contact Us
                </a>
                <a href="/privacy-policy" className="tos-agree-btn tos-agree-btn--ghost">
                  Privacy Policy →
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />

      <style>{`
        .tos-root {
          background: var(--bg-base);
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
        }

        /* Hero */
        .tos-hero {
          position: relative;
          padding: 100px 40px 64px;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .tos-hero-glow {
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 350px;
          background: radial-gradient(ellipse, rgba(74,222,128,0.1) 0%, transparent 68%);
          pointer-events: none;
        }
        .tos-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 100%);
        }
        .tos-hero-inner { position: relative; max-width: 760px; margin: 0 auto; }
        .tos-badge {
          display: inline-block;
          padding: 4px 14px;
          background: rgba(96,165,250,0.1);
          border: 1px solid rgba(96,165,250,0.25);
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--blue-accent);
          margin-bottom: 20px;
        }
        .tos-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 16px;
          line-height: 1.1;
        }
        .tos-hero-sub {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 28px;
        }
        .tos-meta-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        .tos-meta-chip {
          padding: 5px 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Summary Bar */
        .tos-summary-bar {
          background: rgba(74,222,128,0.04);
          border-bottom: 1px solid var(--border);
          padding: 16px 40px;
        }
        .tos-summary-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .tos-summary-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--green-primary);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tos-summary-items {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .tos-summary-item {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tos-check {
          color: var(--green-primary);
          font-weight: 700;
        }

        /* Layout */
        .tos-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 40px;
          gap: 60px;
          align-items: start;
        }

        /* Sidebar */
        .tos-sidebar { position: sticky; top: 100px; }
        .tos-toc-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 10px;
        }
        .tos-toc { display: flex; flex-direction: column; gap: 2px; }
        .tos-toc-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 7px 10px;
          background: none;
          border: none;
          border-left: 2px solid transparent;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: left;
          transition: all 0.2s ease;
          line-height: 1.3;
        }
        .tos-toc-item:hover { color: var(--text-secondary); background: var(--bg-card); }
        .tos-toc-item--active {
          color: var(--green-primary) !important;
          background: rgba(74,222,128,0.06) !important;
          border-left-color: var(--green-primary) !important;
        }
        .tos-toc-icon { font-size: 0.8rem; flex-shrink: 0; }
        .tos-toc-text { flex: 1; }
        .tos-sidebar-note {
          margin-top: 28px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }
        .tos-sidebar-note-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 6px;
        }
        .tos-sidebar-note-text {
          font-size: 0.77rem;
          color: var(--text-muted);
          margin: 0 0 10px;
          line-height: 1.5;
        }
        .tos-sidebar-link {
          font-size: 0.8rem;
          color: var(--green-primary);
          text-decoration: none;
          word-break: break-all;
        }
        .tos-sidebar-link:hover { text-decoration: underline; }

        /* Main */
        .tos-main { min-width: 0; }
        .tos-intro-block {
          padding: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-left: 3px solid var(--green-primary);
          border-radius: var(--radius-md);
          margin-bottom: 52px;
        }
        .tos-intro-text {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 0;
        }
        .tos-intro-text strong { color: var(--green-primary); font-weight: 600; }

        /* Sections */
        .tos-section {
          margin-bottom: 56px;
          animation: tosFadeUp 0.4s ease both;
          animation-delay: var(--section-delay, 0s);
        }
        @keyframes tosFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tos-section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .tos-section-number {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--green-muted);
          letter-spacing: 0.05em;
          min-width: 28px;
        }
        .tos-section-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .tos-section-icon { font-size: 1.1rem; }
        .tos-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .tos-section-body { display: flex; flex-direction: column; gap: 16px; }
        .tos-item {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 16px;
          padding: 16px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          align-items: start;
          transition: border-color 0.2s ease;
        }
        .tos-item:hover { border-color: var(--border-light); }
        .tos-item-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--green-dim);
          padding-top: 2px;
          line-height: 1.4;
        }
        .tos-item-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin: 0;
        }

        /* Agreement Block */
        .tos-agree-block {
          position: relative;
          margin-top: 64px;
          padding: 52px 40px;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          text-align: center;
          overflow: hidden;
        }
        .tos-agree-glow {
          position: absolute;
          top: -40px; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 240px;
          background: radial-gradient(ellipse, rgba(74,222,128,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .tos-agree-icon {
          font-size: 2rem;
          margin-bottom: 16px;
          position: relative;
        }
        .tos-agree-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 12px;
          position: relative;
        }
        .tos-agree-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto 32px;
          line-height: 1.7;
          position: relative;
        }
        .tos-agree-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          position: relative;
        }
        .tos-agree-btn {
          padding: 11px 28px;
          border-radius: var(--radius-md);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .tos-agree-btn--primary {
          background: var(--green-primary);
          color: #0a0f0a;
        }
        .tos-agree-btn--primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .tos-agree-btn--ghost {
          background: none;
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
        }
        .tos-agree-btn--ghost:hover { color: var(--text-primary); border-color: var(--green-muted); }

        /* Responsive */
        @media (max-width: 860px) {
          .tos-layout {
            grid-template-columns: 1fr;
            padding: 40px 20px;
            gap: 40px;
          }
          .tos-sidebar { position: static; }
          .tos-toc { flex-direction: row; flex-wrap: wrap; gap: 4px; }
          .tos-toc-item {
            border-left: none;
            border-bottom: 2px solid transparent;
            font-size: 0.72rem;
            padding: 5px 8px;
          }
          .tos-toc-item--active {
            border-bottom-color: var(--green-primary) !important;
            border-left-color: transparent !important;
          }
          .tos-item {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .tos-hero { padding: 80px 20px 48px; }
          .tos-summary-bar { padding: 16px 20px; }
          .tos-summary-inner { gap: 12px; }
          .tos-agree-block { padding: 36px 24px; }
        }
      `}</style>
    </>
  );
}