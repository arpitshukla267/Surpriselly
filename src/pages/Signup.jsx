// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Simulate user creation
    console.log("Signup data:", { name, email, password });
    alert("Signup successful!");

    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Create Account
        </h2>

        {/* Full Name */}
        <label className="block mb-1 font-medium text-sm">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
          placeholder="Full Name"
          required
        />

        {/* Email */}
        <label className="block mb-1 font-medium text-sm">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
          placeholder="Email"
          required
        />

        {/* Password */}
        <label className="block mb-1 font-medium text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-purple-500"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-700 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
