const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const formatUser = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  uid: user.uid,
  ign: user.ign,
  contact: user.contact,
  token,
});

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role = "host", uid, ign, contact } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password, role, uid, ign, contact });
    res.status(201).json(formatUser(user, generateToken(user._id)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    res.json(formatUser(user, generateToken(user._id)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  res.json(formatUser(req.user, null));
};

module.exports = { register, login, getMe };
