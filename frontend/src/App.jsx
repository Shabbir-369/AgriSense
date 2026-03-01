import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";

// Placeholder pages — you'll build these in later phases
const Login = () => <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}><h2>Login Page (Coming Soon)</h2></div>;
const Signup = () => <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}><h2>Sign Up Page (Coming Soon)</h2></div>;
const About = () => <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}><h2>About Us (Coming Soon)</h2></div>;
const Contact = () => <div style={{ padding: "100px", textAlign: "center", color: "#fff" }}><h2>Contact Us (Coming Soon)</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;