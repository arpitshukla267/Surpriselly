import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    avatar: "",
    token: "",
  });

  // ✅ 1️⃣ Load saved user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid stored user JSON:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ✅ 2️⃣ Save any changes to localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // ✅ 3️⃣ Provide state globally
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
