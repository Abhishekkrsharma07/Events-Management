const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // default role
    });

    await user.save();

    res.json({ msg: "User registered successfully" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("USER NOT FOUND");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("USER FOUND:", user.email);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;