import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";

function decodeTokenPayload(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalizedPayload = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    return JSON.parse(window.atob(normalizedPayload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const login = useCallback((nextToken) => {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken("");
  }, []);

  const value = useMemo(() => {
    const user = decodeTokenPayload(token);
    const role = user?.role || "";

    return {
      token,
      user,
      role,
      isAuthenticated: Boolean(token),
      isAdmin: role === "admin",
      login,
      logout,
    };
  }, [login, logout, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
