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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Samgri Logo */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-orange-500">Samgri</h1>
        </div>
        
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
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
                className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            ))}
          </div>
          
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors font-medium mt-4"
          >
            Verify & Continue
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-4">
            Didn't receive the code? 
            <button className="text-orange-500 font-medium hover:text-orange-600 transition ml-2">
              Resend OTP
            </button>
          </p>
          <p className="text-center text-gray-600">
            <a href="/login" className="text-orange-500 font-medium hover:text-orange-600 transition">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;