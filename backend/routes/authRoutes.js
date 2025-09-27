import express from "express";
import {
  sendOtp,
  verifyOtpAndRegister,
  loginUser,getMyProfile,logoutUser,forgotPassword, resetPassword
} from "../controllers/authController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

// @route   POST /api/auth/send-otp
router.post("/send-otp", sendOtp);

// @route   POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtpAndRegister);

// @route   POST /api/auth/login
router.post("/login", loginUser);

router.get("/me", isAuthenticated, getMyProfile);

router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);





export default router;
