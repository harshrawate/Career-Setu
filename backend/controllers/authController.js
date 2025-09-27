import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/jwtHelper.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const otpStore = new Map(); // TEMP in-memory OTP store

// STEP 1: Send OTP
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // Store only basic user data
  otpStore.set(email, {
    name,
    email,
    password, // plain password
    otp,
    createdAt: Date.now(),
  });

  await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);
  res.status(200).json({ message: "OTP sent to your email." });
};

// STEP 2: Verify OTP and Register User
export const verifyOtpAndRegister = async (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore.get(email);
  if (!record) {
    return res
      .status(400)
      .json({ message: "No OTP found. Please request again." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Check if OTP expired (10 mins)
  const now = Date.now();
  const otpAge = now - record.createdAt;
  if (otpAge > 10 * 60 * 1000) {
    otpStore.delete(email);
    return res.status(410).json({ message: "OTP expired. Please try again." });
  }

  const user = await User.create({
    name: record.name,
    email: record.email,
    password: record.password,
  });

  const token = generateToken(user._id);
  otpStore.delete(email);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // use true for production
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message: "Registration successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// STEP 3: Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // use true for production
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// Get user profile
export const getMyProfile = (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // use true for production
    sameSite: "Lax",
  });

  res.status(200).json({ message: "Logout successful" });
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash the token to store in DB
  const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Save token & expiry on user
  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save();

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const message = `
    <h3>Samgri - Password Reset</h3>
    <p>You requested to reset your password.</p>
    <p><a href="${resetUrl}" target="_blank">Click here to reset password</a></p>
    <p>If you did not request this, please ignore this email.</p>
  `;

  try {
    await sendEmail(user.email, "Password Reset Request", message);
    res.status(200).json({ message: "Reset link sent to your email." });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.status(500).json({ message: "Email could not be sent." });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: "Password has been reset successfully" });
};
