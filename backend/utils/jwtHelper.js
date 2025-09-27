import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

 // Debugging line to check if JWT_SECRET is set
const JWT_SECRET = process.env.JWT_SECRET; // use env in production
const JWT_EXPIRES_IN = "7d"; // or customize

// Generate token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// (Optional) Verify token — useful for middleware
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
