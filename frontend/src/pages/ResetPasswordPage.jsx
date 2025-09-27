import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePasswords = () => {
    const match = formData.newPassword === formData.confirmPassword;
    setPasswordMatch(match);
    return match;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validatePasswords()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: formData.newPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Reset failed");

      setMessage("Password reset successful! You can now login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Geometric Pattern Background - Same as LoginPage */}
      <div className="absolute inset-0 bg-white">
        {/* Teal/Cyan geometric shapes matching the image */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Top left light cyan rectangle */}
          <div className="absolute top-0 left-0 w-96 h-48 bg-cyan-200"></div>
          
          {/* Top right teal rectangle */}
          <div className="absolute top-0 right-0 w-96 h-48 bg-teal-500"></div>
          
          {/* Middle left teal rectangle */}
          <div className="absolute top-48 left-0 w-80 h-40 bg-teal-600"></div>
          
          {/* Middle right light cyan rectangle */}
          <div className="absolute top-48 right-0 w-80 h-40 bg-cyan-300"></div>
          
          {/* Bottom left cyan rectangle */}
          <div className="absolute bottom-0 left-0 w-96 h-48 bg-cyan-300"></div>
          
          {/* Bottom right teal rectangle */}
          <div className="absolute bottom-0 right-0 w-96 h-48 bg-teal-600"></div>
          
          {/* Additional middle shapes for complexity */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-400"></div>
          <div className="absolute top-3/4 right-1/4 w-40 h-24 bg-cyan-400"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-48 bg-gray-100"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-24 bg-gray-200"></div>
        </div>
      </div>

      {/* Reset Password Form Container */}
      <div className="relative z-10 max-w-md w-full">
        {/* CS Logo Circle - Same as LoginPage */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-xl">CS</span>
          </div>
        </div>

        {/* Reset Password Form - Same styling as LoginPage */}
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Reset Password
          </h2>

          <p className="text-sm text-center text-gray-600 mb-6">
            Create a new password for your account
          </p>

          {message && (
            <p className="text-green-600 text-sm mb-4 text-center p-3 bg-green-50 rounded-lg border border-green-200">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm mb-4 text-center p-3 bg-red-50 rounded-lg border border-red-200">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800"
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-gray-800 ${
                  !passwordMatch && formData.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-teal-500"
                }`}
                minLength={8}
              />
              {!passwordMatch && formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 transition-colors font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>

          {/* Bottom link - Same styling as LoginPage */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center text-gray-600">
            <a
              href="/login"
              className="text-teal-600 font-medium hover:text-teal-700 transition"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
