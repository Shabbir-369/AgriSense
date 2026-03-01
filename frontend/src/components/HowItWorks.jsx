const steps = [
  {
    step: "01",
    icon: "📸",
    title: "Snap & Sync",
    description:
      "Upload a photo of your soil or seed, and sync your ESP32 IoT sensor to your AgriSense account. Your live field data is captured instantly.",
    color: "#4ade80",
  },
  {
    step: "02",
    icon: "🧠",
    title: "AI Analyzes",
    description:
      "Our AI engine processes your image alongside real-time sensor readings — moisture, pH, nitrogen, and more — to generate an instant prediction report.",
    color: "#60a5fa",
  },
  {
    step: "03",
    icon: "✅",
    title: "Expert Reviews",
    description:
      "A certified agriculture expert reviews the AI's findings, adds personalized advice, and sends it directly to your dashboard — verified and ready to act on.",
    color: "#f59e0b",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">The Process</span>
          <h2 className="section-title">How AgriSense Works</h2>
          <p className="section-subtitle">
            Three simple steps from your field to actionable expert advice.
          </p>
        </div>

        {/* Steps */}
        <div className="steps-container">
          {steps.map((item, index) => (
            <div className="step-wrapper" key={index}>
              {/* Step Card */}
              <div className="step-card" style={{ "--step-color": item.color }}>
                <div className="step-number-badge">{item.step}</div>
                <div className="step-icon-circle">
                  <span className="step-icon">{item.icon}</span>
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.description}</p>
              </div>

              {/* Arrow connector (not after last item) */}
              {index < steps.length - 1 && (
                <div className="step-connector">
                  <span className="connector-arrow">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;