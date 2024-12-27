const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-secure-secret";

router.post("/", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = { sub: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "5s" });

    res.status(200).json({
      message: "Login successful",
      Uid: user._id,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
