const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, role, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await db.query(
  "INSERT INTO contact_messages (id, name, email, subject, contact_role, message) VALUES (?, ?, ?, ?, ?, ?)",
  [uuidv4(), name, email, subject || null, role || null, message]
);

    res.status(201).json({ message: "Message sent successfully 📩" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getAllMessages = async (req, res) => {
  try {
    const [messages] = await db.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );

    res.status(200).json(messages);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE contact_messages SET status = 'read' WHERE id = ?",
      [id]
    );

    res.status(200).json({ message: "Marked as read ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM contact_messages WHERE id = ?",
      [id]
    );

    res.status(200).json({ message: "Message deleted 🗑️" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};