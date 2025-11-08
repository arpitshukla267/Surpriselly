// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);

      // Call backend
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // If success → store token + redirect
      if (res.data.token) {
        const userData = {
          isLoggedIn: true,
          name: res.data.name,
          avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${res.data.name}`,
          token: res.data.token,
        };
      
        // ✅ Update context
        setUser(userData);
      
        // ✅ Persist to localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", res.data.token);
      
        alert("Login successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
          Login
        </h2>
        <h3 className="text-lg mb-4 text-center text-gray-700">
          Welcome Back
        </h3>

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
          disabled={loading}
          className={`w-full text-white py-2 rounded font-semibold ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center mt-4">
          <span
            onClick={() => navigate("/forgot-password")}
            className="text-purple-700 hover:underline cursor-pointer text-center"
          >
            Forgot Password
          </span>
        </p>
        <p className="mt-2 text-sm text-center">
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
