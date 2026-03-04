const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);



// Only Admin
router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin 👑" });
  }
);

// Only Farmer
router.get(
  "/farmer-dashboard",
  authMiddleware,
  roleMiddleware(["farmer"]),
  (req, res) => {
    res.json({ message: "Welcome Farmer 🌾" });
  }
);

// Expert + Admin
router.get(
  "/expert-panel",
  authMiddleware,
  roleMiddleware(["expert", "admin"]),
  (req, res) => {
    res.json({ message: "Welcome Expert 🔬" });
  }
);
module.exports = router;