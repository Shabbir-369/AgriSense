import { useState, useEffect } from "react";

const MOCK_MESSAGES = [
  { id: 1, expert_name: "Dr. Priya Nair", analysis_type: "soil", message: "Your nitrogen levels look low based on the sensor. I recommend adding 15kg/acre of urea. Also, the soil moisture is slightly high — reduce irrigation for the next 3 days. The pH at 5.8 could be raised by adding agricultural lime.", read: false, created_at: "2025-12-07 10:30" },
  { id: 2, expert_name: "Dr. Rajan Iyer",  analysis_type: "seed", message: "Seeds look healthy overall, good germination rate expected. Ensure storage below 18°C with humidity below 60% to maintain viability. Pre-soak seeds for 8 hours before planting.", read: true, created_at: "2025-12-01 14:15" },
];

const MOCK_NOTICES = [
  { id: 1, title: "Platform Maintenance", message: "Scheduled maintenance on Dec 20, 2025 from 2 AM to 4 AM IST. Sensor data may not update during this window.", created_at: "2025-12-12 09:00" },
];

const ExpertInbox = () => {
  const [tab, setTab]           = useState("messages");
  const [messages, setMessages] = useState([]);
  const [notices, setNotices]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // TODO: fetch from /api/inbox/messages and /api/inbox/notices
    setTimeout(() => { setMessages(MOCK_MESSAGES); setNotices(MOCK_NOTICES); setLoading(false); }, 500);
  }, []);

  const markRead = (id) => {
    setMessages(prev => prev.map(m => m.id===id ? { ...m, read: true } : m));
  };

  const unread = messages.filter(m => !m.read).length;

  if (loading) return <div className="dash-loading"><span className="auth-spinner" style={{borderColor:"rgba(74,222,128,0.2)",borderTopColor:"#4ade80"}}></span></div>;

  return (
    <div className="inbox-section">
      {/* Tabs */}
      <div className="inbox-tabs">
        <button className={`inbox-tab ${tab==="messages" ? "inbox-tab-active" : ""}`} onClick={() => setTab("messages")}>
          💬 Expert Advice
          {unread > 0 && <span className="inbox-unread-badge">{unread}</span>}
        </button>
        <button className={`inbox-tab ${tab==="notices" ? "inbox-tab-active" : ""}`} onClick={() => setTab("notices")}>
          📢 Admin Notices
        </button>
      </div>

      {tab === "messages" && (
        <div className="inbox-layout">
          {/* Message List */}
          <div className="inbox-list">
            {messages.length === 0 ? (
              <div className="inbox-empty"><span>💬</span><p>No expert messages yet. Upload an image to get started.</p></div>
            ) : messages.map(msg => (
              <div
                key={msg.id}
                className={`inbox-msg-item ${!msg.read ? "inbox-msg-unread" : ""} ${selected?.id===msg.id ? "inbox-msg-selected" : ""}`}
                onClick={() => { setSelected(msg); markRead(msg.id); }}
              >
                <div className="imi-top">
                  <div className="imi-avatar">{msg.expert_name.split(" ").map(w=>w[0]).join("")}</div>
                  <div className="imi-info">
                    <span className="imi-name">{msg.expert_name}</span>
                    <span className="imi-date">{msg.created_at}</span>
                  </div>
                  {!msg.read && <span className="imi-dot"></span>}
                </div>
                <p className="imi-preview">{msg.message.slice(0, 80)}...</p>
                <span className="imi-type-tag">{msg.analysis_type === "soil" ? "🌱 Soil" : "🌾 Seed"}</span>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="inbox-detail">
            {selected ? (
              <>
                <div className="inbox-detail-header">
                  <div className="idc-avatar">{selected.expert_name.split(" ").map(w=>w[0]).join("")}</div>
                  <div>
                    <h3 className="idc-name">{selected.expert_name}</h3>
                    <span className="idc-date">{selected.created_at}</span>
                  </div>
                </div>
                <div className="inbox-detail-body">
                  <p className="inbox-detail-msg">{selected.message}</p>
                </div>
              </>
            ) : (
              <div className="inbox-detail-empty">
                <span>👈</span>
                <p>Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "notices" && (
        <div className="notices-list">
          {notices.map(n => (
            <div key={n.id} className="notice-card">
              <div className="notice-card-header">
                <span className="notice-icon">📢</span>
                <span className="notice-title">{n.title}</span>
                <span className="notice-date">{n.created_at}</span>
              </div>
              <p className="notice-body">{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertInbox;