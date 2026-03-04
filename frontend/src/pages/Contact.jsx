import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../contact.css";
// import { sendContactMessage } from "../services/api";
// import axios from "axios";
// import { API_ENDPOINTS } from "../config/api";
import { sendContactMessage } from "../services/api";

const contactInfo = [
  {
    icon: "📧",
    label: "Email Us",
    value: "support@agrisense.in",
    sub: "We reply within 24 hours",
    accent: "#4ade80",
  },
  {
    icon: "📞",
    label: "Call Us",
    value: "+91 xxxxx xxxxx",
    sub: "Mon – Sat, 9 AM to 6 PM IST",
    accent: "#60a5fa",
  },
  {
    icon: "📍",
    label: "Our Office",
    value: "Indore, Madhya Pradesh, India",
    sub: "Available for field visits by appointment",
    accent: "#f59e0b",
  },
];

const faqs = [
  {
    q: "How do I connect my ESP32 sensor to AgriSense?",
    a: "Once you create a Farmer account, go to your Dashboard and click 'Register Sensor'. Enter your ESP32's MAC address and follow the firmware setup guide we provide. Your live data will appear within minutes.",
  },
  {
    q: "Can I use AgriSense without an IoT sensor?",
    a: "Yes! Guest users and logged-in farmers can upload soil or seed images to receive an AI-powered analysis without any sensor. The sensor integration is optional but gives you richer, real-time insights.",
  },
  {
    q: "How long does it take to get expert feedback?",
    a: "Our certified agronomists typically review and respond to analyses within 12–24 hours on working days. You'll get a notification in your dashboard inbox as soon as it's ready.",
  },
  {
    q: "Is my farm data safe and private?",
    a: "Absolutely. Your sensor readings and crop images are stored securely and are never shared or sold. Only you and the assigned expert reviewing your case can access your data.",
  },
  {
    q: "How do I become an Agriculture Expert on the platform?",
    a: "We onboard verified agronomists and agricultural scientists. Reach out to us via the form on this page with your credentials and we'll get back to you within 3 working days.",
  },
];

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     await axios.post(`${API_ENDPOINTS.CONTACT}`, {
//   name: form.name,
//   email: form.email,
//   role: form.role,
//   subject: "Website Inquiry",
//   message: form.message
// });

//     setSubmitted(true);
//     // setForm({ name: "", email: "", role: "", message: "" });

//   } catch (error) {
//   console.error(error);
//   alert("Failed to send message");
// }
// };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await sendContactMessage({
      ...form,
      subject: "Website Inquiry"
    });

    setSubmitted(true);

  } catch (error) {
    console.error("Contact form error:", error);
    alert("Failed to send message");
  }
};



  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>

        {/* ── Hero ── */}
        <section className="contact-hero">
          <div className="contact-hero-glow"></div>
          <div className="contact-hero-container">
            <span className="section-tag">Get In Touch</span>
            <h1 className="contact-hero-heading">
              We'd Love to <span className="contact-hero-highlight">Hear From You</span>
            </h1>
            <p className="contact-hero-sub">
              Whether you're a farmer with a question, an expert wanting to join our
              network, or just curious about AgriSense — drop us a message and we'll
              get back to you promptly.
            </p>
          </div>
        </section>

        {/* ── Info Cards ── */}
        <section className="contact-info-strip">
          <div className="section-container">
            <div className="contact-info-grid">
              {contactInfo.map((item, i) => (
                <div className="contact-info-card" key={i} style={{ "--ci-accent": item.accent }}>
                  <div className="ci-icon-wrap">{item.icon}</div>
                  <div>
                    <span className="ci-label">{item.label}</span>
                    <p className="ci-value">{item.value}</p>
                    <p className="ci-sub">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form + Side ── */}
        <section className="contact-main">
          <div className="section-container">
            <div className="contact-main-grid">

              {/* Left: Form */}
              <div className="contact-form-wrap">
                <h2 className="contact-form-title">Send Us a Message</h2>
                <p className="contact-form-sub">
                  Fill out the form below and our team will respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="contact-success">
                    <span className="success-icon">✅</span>
                    <h3 className="success-heading">Message Sent!</h3>
                    <p className="success-body">
                      Thanks for reaching out, <strong>{form.name}</strong>. We'll get
                      back to you at <strong>{form.email}</strong> shortly.
                    </p>
                    <button
                      className="btn-primary"
                      style={{ marginTop: "24px" }}
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", role: "", message: "" }); }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input
                          id="name" name="name" type="text"
                          className="form-input"
                          placeholder="Arjun Mehta"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input
                          id="email" name="email" type="email"
                          className="form-input"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="role">I am a...</label>
                      <select
                        id="role" name="role"
                        className="form-input form-select"
                        value={form.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select your role</option>
                        <option value="farmer">Farmer</option>
                        <option value="expert">Agriculture Expert</option>
                        <option value="researcher">Researcher</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Message</label>
                      <textarea
                        id="message" name="message"
                        className="form-input form-textarea"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn-primary contact-submit-btn">
                      Send Message <span className="btn-arrow">→</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Right: Side Info */}
              <div className="contact-side">
                <div className="contact-side-card">
                  <h3 className="contact-side-title">Quick Links</h3>
                  <div className="contact-side-links">
                    <button className="side-link-item" onClick={() => navigate("/signup")}>
                      <span className="sli-icon">🌱</span>
                      <div className="sli-text">
                        <span className="sli-title">Create Farmer Account</span>
                        <span className="sli-sub">Start monitoring your soil today</span>
                      </div>
                      <span className="sli-arrow">→</span>
                    </button>
                    <button className="side-link-item" onClick={() => navigate("/about")}>
                      <span className="sli-icon">👥</span>
                      <div className="sli-text">
                        <span className="sli-title">About AgriSense</span>
                        <span className="sli-sub">Learn our mission and story</span>
                      </div>
                      <span className="sli-arrow">→</span>
                    </button>
                    <button className="side-link-item" onClick={() => navigate("/login")}>
                      <span className="sli-icon">📊</span>
                      <div className="sli-text">
                        <span className="sli-title">Go to Dashboard</span>
                        <span className="sli-sub">Log in and view your data</span>
                      </div>
                      <span className="sli-arrow">→</span>
                    </button>
                  </div>
                </div>

                <div className="contact-side-card contact-hours-card">
                  <h3 className="contact-side-title">Support Hours</h3>
                  <div className="hours-list">
                    <div className="hours-row">
                      <span className="hours-day">Monday – Friday</span>
                      <span className="hours-time">9:00 AM – 6:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Saturday</span>
                      <span className="hours-time">10:00 AM – 2:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Sunday</span>
                      <span className="hours-time hours-closed">Closed</span>
                    </div>
                  </div>
                  <div className="hours-note">
                    <span className="hours-note-dot"></span>
                    All times are in IST (UTC +5:30)
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="contact-faq">
          <div className="section-container">
            <div className="section-header">
              <span className="section-tag">FAQ</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Can't find your answer here? Use the form above and we'll help you directly.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((item, i) => (
                <div
                  className={`faq-item ${openFaq === i ? "faq-item-open" : ""}`}
                  key={i}
                  onClick={() => toggleFaq(i)}
                >
                  <div className="faq-question">
                    <span>{item.q}</span>
                    <span className="faq-chevron">{openFaq === i ? "−" : "+"}</span>
                  </div>
                  {openFaq === i && (
                    <div className="faq-answer">{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;