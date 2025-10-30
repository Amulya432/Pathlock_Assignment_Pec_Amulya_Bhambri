// src/auth/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

type User = { email?: string } | null;

interface AuthContextType {
  token: string | null;
  user: User;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // attach axios header when token changes
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // optionally decode token to set user (if JWT contains email). For brevity: skip decode
      setUser({}); // placeholder user object
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = (t: string) => setToken(t);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
