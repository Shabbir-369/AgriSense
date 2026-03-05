import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home            from "./pages/Home";
import About           from "./pages/About";
import Contact         from "./pages/Contact";
import Login           from "./pages/Login";
import Signup          from "./pages/Signup";
import FarmerDashboard from "./pages/FarmerDashboard";
import ScrollToTop     from "./components/ScrollToTop";
import PrivacyPolicy   from "./pages/PrivacyPolicy";
import TermsOfService  from "./pages/TermsofService.jsx";
import "./index.css";

import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/about"             element={<About />} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/login"             element={<Login />} />
        <Route path="/signup"            element={<Signup />} />
        <Route path="/farmer-dashboard"  element={<FarmerDashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;