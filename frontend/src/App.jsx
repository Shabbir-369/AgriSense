import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import "./index.css";

// Placeholder pages — you'll build these in later phases
const Login = () => <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}><h2>Login Page (Coming Soon)</h2></div>;
const Signup = () => <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}><h2>Sign Up Page (Coming Soon)</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;