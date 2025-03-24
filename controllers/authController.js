const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "your_jwt_secret"; // Change this in production

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};

// @desc   User login (Just store user details without checking existence)
// @route  POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { name, email, userType } = req.body;

    if (!name || !email || !userType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["customer", "staff"].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type." });
    }

    // Directly insert user into DB without checking existence
    const user = new User({ name, email, userType });
    await user.save();

    res.json({
      message: "User logged in successfully!",
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Logout user
// @route  POST /api/auth/logout
exports.logoutUser = async (req, res) => {
  res.json({ message: "Logout successful!" });
};
