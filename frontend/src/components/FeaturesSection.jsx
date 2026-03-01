const features = [
  {
    icon: "📡",
    title: "Real-time Monitoring",
    description:
      "Connect your ESP32 IoT sensors directly to your account. Monitor soil moisture, temperature, pH, nitrogen, phosphorus, and potassium levels live from your field.",
    accent: "#4ade80",
    tag: "IoT Connected",
  },
  {
    icon: "🤖",
    title: "AI-Powered Analysis",
    description:
      "Upload soil or seed images for instant AI-driven insights. Our system analyzes your image alongside live sensor data to deliver accurate, context-aware predictions.",
    accent: "#60a5fa",
    tag: "Smart Analysis",
  },
  {
    icon: "👨‍🌾",
    title: "Expert Guidance",
    description:
      "Every analysis gets reviewed by certified agriculture experts. Receive personalized, expert-verified advice sent directly to your farmer dashboard.",
    accent: "#f59e0b",
    tag: "Human Verified",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Why AgriSense?</span>
          <h2 className="section-title">Everything You Need to Farm Smarter</h2>
          <p className="section-subtitle">
            From live sensor data to expert-reviewed insights — all in one powerful dashboard.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index} style={{ "--accent": feature.accent }}>
              <div className="feature-card-top">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <span className="feature-tag">{feature.tag}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
              <div className="feature-accent-bar"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;