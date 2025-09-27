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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-500">Samgri</h1>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Reset Password
        </h2>

        <p className="text-sm text-center text-gray-600 mb-6">
          Create a new password for your account
        </p>

        {message && (
          <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                !passwordMatch && formData.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              minLength={8}
            />
            {!passwordMatch && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-gray-600">
          <a
            href="/login"
            className="text-orange-500 font-medium hover:text-orange-600 transition"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
