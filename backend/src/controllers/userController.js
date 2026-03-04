const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Update profile (full_name, email)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, email } = req.body;

    if (!full_name && !email) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // If email is being updated, check it's not already taken
    if (email) {
      const [existing] = await db.query(
        "SELECT id FROM users WHERE email = ? AND id != ?",
        [email, userId]
      );
      if (existing.length > 0) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const fields = [];
    const values = [];
    if (full_name) {
      fields.push("full_name = ?");
      values.push(full_name);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }
    values.push(userId);

    await db.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({ message: "Both passwords required" });
    }

    const [users] = await db.query(
      "SELECT password_hash FROM users WHERE id = ?",
      [userId]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(current_password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(new_password, salt);

    await db.query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [hashed, userId]
    );

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete user (cascade should remove related data)
    await db.query("DELETE FROM users WHERE id = ?", [userId]);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};