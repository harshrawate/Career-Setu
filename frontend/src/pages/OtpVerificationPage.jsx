import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (inputRefs[0].current) inputRefs[0].current.focus();
  }, []);

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 3) inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d{1,4}$/.test(pasted)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasted.length; i++) newOtp[i] = pasted[i];
      setOtp(newOtp);
      if (pasted.length < 4) inputRefs[pasted.length].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...location.state, // name, email, password
          otp: code,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      alert("Something went wrong");
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

      {/* OTP Verification Form Container */}
      <div className="relative z-10 max-w-md w-full">
        {/* CS Logo Circle - Same as LoginPage */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white font-bold text-xl">CS</span>
          </div>
        </div>

        {/* OTP Verification Form - Same styling as LoginPage */}
        <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Verify Your Email
          </h2>
          
          <p className="text-sm text-center text-gray-600 mb-6">
            We've sent a 4-digit verification code to your email address. Enter the code below to verify your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={inputRefs[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  className="w-14 h-14 text-center text-xl font-semibold bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-gray-800 shadow-sm"
                />
              ))}
            </div>
            
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors font-medium mt-4 shadow-lg hover:shadow-xl"
            >
              Verify & Continue
            </button>
          </form>

          {/* Bottom section - Same styling as LoginPage */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-center text-gray-600 mb-4">
              Didn't receive the code? 
              <button className="text-teal-600 font-medium hover:text-teal-700 transition ml-2">
                Resend OTP
              </button>
            </p>
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

export default OtpVerificationPage;
