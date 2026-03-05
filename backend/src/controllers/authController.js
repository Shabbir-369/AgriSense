const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { sendOTP } = require('../utils/email');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ------------------- REGISTER -------------------
exports.registerUser = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = uuidv4();

    await db.query(
      'INSERT INTO users (id, full_name, email, password_hash, role, email_verified) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, full_name, email, hashedPassword, role, false]
    );

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      'INSERT INTO user_otps (id, user_id, otp, purpose, expires_at) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), userId, otp, 'email_verification', expiresAt]
    );

    await sendOTP(email, otp, 'email_verification');

    res.status(201).json({
      message: 'Registration successful. Please check your email for verification OTP.',
      userId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- VERIFY EMAIL -------------------
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP required' });
    }

    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = users[0].id;

    const [otpRecords] = await db.query(
      `SELECT * FROM user_otps
       WHERE user_id = ? AND purpose = 'email_verification' AND otp = ? AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId, otp]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await db.query('UPDATE users SET email_verified = true WHERE id = ?', [userId]);
    await db.query('DELETE FROM user_otps WHERE id = ?', [otpRecords[0].id]);

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- RESEND VERIFICATION OTP -------------------
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    const [users] = await db.query('SELECT id, email_verified FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = users[0];

    if (user.email_verified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    await db.query("DELETE FROM user_otps WHERE user_id = ? AND purpose = 'email_verification'", [user.id]);

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      'INSERT INTO user_otps (id, user_id, otp, purpose, expires_at) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), user.id, otp, 'email_verification', expiresAt]
    );

    await sendOTP(email, otp, 'email_verification');

    res.json({ message: 'New OTP sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- LOGIN (with verification check) -------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    if (!user.email_verified) {
      return res.status(403).json({
        message: 'Please verify your email before logging in.',
        needsVerification: true,
        email: user.email,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful ✅',
      token,
      role: user.role,
      full_name: user.full_name,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- FORGOT PASSWORD (request OTP) -------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      // Don't reveal that email doesn't exist
      return res.json({ message: 'If that email exists, an OTP has been sent.' });
    }
    const userId = users[0].id;

    await db.query("DELETE FROM user_otps WHERE user_id = ? AND purpose = 'password_reset'", [userId]);

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.query(
      'INSERT INTO user_otps (id, user_id, otp, purpose, expires_at) VALUES (?, ?, ?, ?, ?)',
      [uuidv4(), userId, otp, 'password_reset', expiresAt]
    );

    await sendOTP(email, otp, 'password_reset');

    res.json({ message: 'If that email exists, an OTP has been sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- RESET PASSWORD -------------------
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, new_password } = req.body;
    if (!email || !otp || !new_password) {
      return res.status(400).json({ message: 'Email, OTP and new password required' });
    }

    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = users[0].id;

    const [otpRecords] = await db.query(
      `SELECT * FROM user_otps
       WHERE user_id = ? AND purpose = 'password_reset' AND otp = ? AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId, otp]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, userId]);
    await db.query('DELETE FROM user_otps WHERE id = ?', [otpRecords[0].id]);

    res.json({ message: 'Password reset successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------- GET ME -------------------
exports.getMe = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT id, full_name, email, role, created_at FROM users WHERE id = ?",
      [req.user.id]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// ------------------- VERIFY RESET OTP -------------------
exports.verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP required' });
    }

    const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = users[0].id;

    const [otpRecords] = await db.query(
      `SELECT * FROM user_otps
       WHERE user_id = ? AND purpose = 'password_reset' AND otp = ? AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [userId, otp]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};