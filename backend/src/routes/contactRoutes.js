const express = require("express");
const router = express.Router();
const { submitContactForm, getAllMessages, markAsRead, deleteMessage } = require("../controllers/contactController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Public route
router.post("/", submitContactForm);

// Admin routes
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllMessages
);

router.patch(
  "/admin/:id/read",
  authMiddleware,
  roleMiddleware(["admin"]),
  markAsRead
);

router.delete(
  "/admin/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteMessage
);

module.exports = router;