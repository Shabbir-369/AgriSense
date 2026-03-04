import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

import DashboardSidebar  from "../components/dashboard/DashboardSidebar";
import DashboardHeader   from "../components/dashboard/DashboardHeader";
import SensorFeed        from "../components/dashboard/SensorFeed";
import UploadAnalysis    from "../components/dashboard/UploadAnalysis";
import AnalysisHistory   from "../components/dashboard/AnalysisHistory";
import ExpertInbox       from "../components/dashboard/ExpertInbox";
import SensorManager     from "../components/dashboard/SensorManager";
import DashboardSettings from "../components/dashboard/DashboardSettings";
import "../dashboard.css";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isFarmer } = useAuth();

  const [activeTab, setActiveTab]   = useState("sensor");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ── Auth + Role guard ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!isFarmer) {
      // Logged in but wrong role — send them somewhere safe
      navigate("/");
    }
  }, [isAuthenticated, isFarmer, navigate]);

  // Don't render anything until we know the user is valid
  if (!isAuthenticated || !isFarmer) return null;

  // ── Tab renderer ───────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case "sensor":   return <SensorFeed onManageSensors={() => setActiveTab("sensors")} />;
      case "upload":   return <UploadAnalysis />;
      case "history":  return <AnalysisHistory />;
      case "inbox":    return <ExpertInbox />;
      case "sensors":  return <SensorManager />;
      case "settings": return <DashboardSettings />;
      default:         return <SensorFeed />;
    }
  }
  const goToManageSensors = () => setActiveTab("sensors");

  return (
    <div className={`dash-layout ${sidebarOpen ? "" : "dash-sidebar-collapsed"}`}>
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="dash-main">
        <DashboardHeader
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="dash-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;