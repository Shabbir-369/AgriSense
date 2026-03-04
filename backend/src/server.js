// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const app = express();
// const db = require("./config/db");

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("AgriSense API Running 🚀");
// });

// const PORT = process.env.PORT || 5000;

// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// app.listen(PORT, async () => {
//   console.log(`Server running on port ${PORT}`);

//   try {
//     await db.query("SELECT 1");
//     console.log("Database Connected ✅");
//   } catch (err) {
//     console.error("Database Error ❌", err);
//   }
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const sensorRoutes = require("./routes/sensorRoutes");

const contactRoutes = require("./routes/contactRoutes");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("AgriSense API Running 🚀");
});

app.use("/api/sensors", sensorRoutes);

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await db.query("SELECT 1");
    console.log("Database Connected ✅");
  } catch (err) {
    console.error("Database Error ❌", err);
  }
});