// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
    // simulate login success
    alert("Login successful");
    navigate("/"); // or dashboard/home
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Login</h2>
        <h3 className="text-2xl font-bold mb-4 text-center font-stretch-ultra-condensed text-black-700">Welcome Back</h3>
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          required
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
        />
        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-700 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
