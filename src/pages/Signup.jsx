// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext"; // ✅ Import AuthContext

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useAuth(); // ✅ Access global user state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.data.token) {
        const userData = {
          isLoggedIn: true,
          name: res.data.name,
          avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${res.data.name}`,
          token: res.data.token,
        };

        // ✅ Update context and persist data
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", res.data.token);

        alert("Signup successful!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle logout
  const handleLogout = () => {
    setUser({ isLoggedIn: false });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logged out successfully!");
  };

  // ✅ If logged in → show profile and logout
  if (user?.isLoggedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-purple-50">
        <div className="bg-white p-8 rounded shadow-md text-center w-full max-w-sm">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-16 h-16 mx-auto mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold mb-2 text-purple-700">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600 mb-6">
            You’re already logged in.
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // ✅ Default signup form
  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">
          Create Account
        </h2>

        <label className="block mb-1 font-medium text-sm">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
          placeholder="Full Name"
          required
        />

        <label className="block mb-1 font-medium text-sm">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-purple-500"
          placeholder="Email"
          required
        />

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
          disabled={loading}
          className={`w-full text-white font-semibold py-2 rounded ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
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
