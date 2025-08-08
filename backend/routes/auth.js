import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// signup
router.post("/signup", async (req, res) => {
  try {
    const { email, phone, fullName, username, password, otp } = req.body;
    if (otp !== "000000") {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const existing = await User.findOne({ $or: [ { email }, { username } ] });
    if (existing) return res.status(400).json({ message: "Email or username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, phone, fullName, username, password: hashed });
    await user.save();

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { username: identifier }
      ]
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
