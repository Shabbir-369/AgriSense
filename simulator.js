// simulator.js
// Run this with: node simulator.js

// const API_URL = "https://agrisense-backend-qtjl.onrender.com/api/sensors/data"; 
const API_URL = "http://localhost:5000/api/sensors/data"; 
const MAC_ADDRESS = "25:3A:42:CE:B7:FF"; // Make sure this matches a sensor in your DB!

console.log("🌱 AgriSense ESP32 Simulator Started...");

const sendData = async () => {
  // The keys here now perfectly match your req.body destructuring
  const payload = {
    esp32_mac_address: MAC_ADDRESS, 
    moisture_level: Math.round(40 + Math.random() * 40),      
    temperature: +(20 + Math.random() * 15).toFixed(1),       
    ph_level: +(5.5 + Math.random() * 2).toFixed(1),          
    nitrogen: Math.round(20 + Math.random() * 40),
    phosphorus: Math.round(15 + Math.random() * 30),
    potassium: Math.round(20 + Math.random() * 30)
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log(`[${new Date().toLocaleTimeString()}] Data sent! DB Response:`, result.message || result);
  } catch (error) {
    console.error("❌ Failed to send data. Is your Express server running?", error.message);
  }
};

// Send data immediately, then every 5 seconds
sendData();
setInterval(sendData, 3000);