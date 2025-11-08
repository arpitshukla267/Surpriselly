import React, { useState, useRef } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState(""); // temp JWT from verify-otp

  const otpRefs = useRef([]);

  // Step 1: Request OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Enter your email");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://surpriselly-backend.onrender.com/api/auth/forgot-password-otp",
        { email }
      );
      alert(res.data.message || "OTP sent!");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return alert("Enter full 6-digit OTP");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://surpriselly-backend.onrender.com/api/auth/verify-otp",
        { email, otp: code }
      );

      setResetToken(res.data.token); // save temp JWT
      alert(res.data.message || "OTP verified!");
      setStep(3);
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return alert("Enter both fields");
    if (newPassword !== confirmPassword) return alert("Passwords do not match");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://surpriselly-backend.onrender.com/api/auth/reset-password",
        { newPassword, token: resetToken }
      );
        
      console.log("Reset response:", res);

      alert(res.data.message || "Password reset successful!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
              Forgot Password
            </h2>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
              required
            />
            <button
              onClick={handleEmailSubmit}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
              Enter OTP
            </h2>
            <div className="flex justify-between mb-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    const newOtp = [...otp];
                    newOtp[index] = val;
                    setOtp(newOtp);
                    if (val && index < 5) otpRefs.current[index + 1].focus();
                    if (!val && index > 0) otpRefs.current[index - 1].focus();
                  }}
                  className="w-10 h-10 text-center border rounded"
                />
              ))}
            </div>
            <button
              onClick={handleOtpSubmit}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
              Reset Password
            </h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
              required
            />
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
