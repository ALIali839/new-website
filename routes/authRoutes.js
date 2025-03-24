const express = require("express");
const { loginUser, logoutUser } = require("../controllers/authController"); // Ensure this path is correct

const router = express.Router();

// Route for login
router.post("/login", loginUser);

// Route for logout
router.post("/logout", logoutUser);

module.exports = router;
