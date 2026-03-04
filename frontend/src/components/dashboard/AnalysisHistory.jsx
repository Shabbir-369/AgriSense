import { useState, useEffect } from "react";

// Mock data — replace with GET /api/analysis/history
const MOCK_HISTORY = [
  { id: 1, type: "soil", image_url: null, ai_prediction: "Nitrogen deficiency detected. Soil pH slightly low at 5.8.", expert_feedback: "Add 20kg/acre of urea. Consider liming the field to raise pH to 6.5.", expert_verified: true, created_at: "2025-12-01 09:14" },
  { id: 2, type: "seed", image_url: null, ai_prediction: "Seeds appear healthy with good germination potential.", expert_feedback: null, expert_verified: false, created_at: "2025-12-03 11:30" },
  { id: 3, type: "soil", image_url: null, ai_prediction: "High moisture content. Risk of root rot if not addressed.", expert_feedback: "Reduce irrigation immediately. Ensure proper field drainage.", expert_verified: true, created_at: "2025-12-07 08:05" },
  { id: 4, type: "soil", image_url: null, ai_prediction: "Soil conditions look optimal. Maintain current practices.", expert_feedback: null, expert_verified: false, created_at: "2025-12-10 14:22" },
];

const AnalysisHistory = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // TODO: fetch("/api/analysis/history", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then(r=>r.json()).then(d=>setRecords(d));
    setTimeout(() => { setRecords(MOCK_HISTORY); setLoading(false); }, 600);
  }, []);

  const filtered = records.filter(r => {
    if (filter === "verified") return r.expert_verified;
    if (filter === "pending")  return !r.expert_verified;
    if (filter === "soil")     return r.type === "soil";
    if (filter === "seed")     return r.type === "seed";
    return true;
  });

  if (loading) return <div className="dash-loading"><span className="auth-spinner" style={{borderColor:"rgba(74,222,128,0.2)",borderTopColor:"#4ade80"}}></span></div>;

  return (
    <div className="history-section">
      {/* Filters */}
      <div className="history-filters">
        {["all","soil","seed","verified","pending"].map(f => (
          <button key={f} className={`history-filter-btn ${filter===f ? "history-filter-active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
        <span className="history-count">{filtered.length} records</span>
      </div>

      {filtered.length === 0 ? (
        <div className="history-empty">
          <span>📋</span>
          <p>No analyses found for this filter.</p>
        </div>
      ) : (
        <div className="history-list">
          {filtered.map(rec => (
            <div key={rec.id} className={`history-item ${expanded===rec.id ? "history-item-open" : ""}`}>
              <div className="history-item-header" onClick={() => setExpanded(expanded===rec.id ? null : rec.id)}>
                <div className="history-item-left">
                  <div className="history-item-type-badge">
                    {rec.type === "soil" ? "🌱 Soil" : "🌾 Seed"}
                  </div>
                  <div>
                    <p className="history-item-preview">{rec.ai_prediction.slice(0,70)}...</p>
                    <span className="history-item-date">{rec.created_at}</span>
                  </div>
                </div>
                <div className="history-item-right">
                  <span className={`history-status-badge ${rec.expert_verified ? "status-verified" : "status-pending"}`}>
                    {rec.expert_verified ? "✓ Expert Verified" : "⏳ Pending Review"}
                  </span>
                  <span className="history-chevron">{expanded===rec.id ? "−" : "+"}</span>
                </div>
              </div>
              {expanded === rec.id && (
                <div className="history-item-body">
                  <div className="history-detail-row">
                    <div className="history-detail-block">
                      <span className="hdb-label">🤖 AI Prediction</span>
                      <p className="hdb-text">{rec.ai_prediction}</p>
                    </div>
                    {rec.expert_feedback && (
                      <div className="history-detail-block history-expert-block">
                        <span className="hdb-label">👨‍🌾 Expert Feedback</span>
                        <p className="hdb-text">{rec.expert_feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisHistory;