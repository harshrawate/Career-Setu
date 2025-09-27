import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setMessage("Reset link sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

      {/* Forgot Password Form Container */}
      <div className="relative z-10 max-w-md w-full">
        {/* CS Logo Circle - Same as LoginPage */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-xl">CS</span>
          </div>
        </div>

        {/* Forgot Password Form - Same styling as LoginPage */}
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Forgot Password
          </h2>

          <p className="text-sm text-center text-gray-600 mb-6">
            Enter your registered email address and we'll send you a link to reset your password.
          </p>

          {message && (
            <div className="text-green-600 text-sm text-center mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              {message}
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm text-center mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full text-white font-medium mt-6 transition-colors shadow-lg hover:shadow-xl ${
                loading
                  ? "bg-teal-300 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Bottom link - Same styling as LoginPage */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-gray-600">
              <a href="/login" className="text-teal-600 font-medium hover:text-teal-700 transition">
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
