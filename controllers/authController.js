
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    console.log("📩 REQUEST BODY:", req.body);

    const { name, email, password, school, level } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const emailTrimmed = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: emailTrimmed });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: emailTrimmed,
      password: hashedPassword,
      school,
      level,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user });

  } catch (err) {
    console.log("🔥 FULL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailTrimmed = email.trim().toLowerCase();

    const user = await User.findOne({ email: emailTrimmed });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log("🔥 LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
export const googleAuth = async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        password: "google-auth", // placeholder
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Google auth failed" });
  }
};