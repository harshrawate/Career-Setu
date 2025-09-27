import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // this sends/receives cookies
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful");
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Geometric Pattern Background */}
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

      {/* Login Form Container */}
      <div className="relative z-10 max-w-md w-full">
        {/* CS Logo Circle */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-xl">CS</span>
          </div>
        </div>

        {/* ✅ IMPROVED: Much better visibility and contrast */}
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 placeholder-gray-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors font-medium mt-6 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>

          {/* ✅ IMPROVED: Better contrast for links */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
            <a href="/forgot-password" className="text-teal-600 font-medium hover:text-teal-700 transition text-sm">
              Forgot Password?
            </a>
            <a href="/signup" className="text-teal-600 font-medium hover:text-teal-700 transition text-sm">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
