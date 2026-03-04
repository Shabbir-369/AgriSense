import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("agrisense_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Store only plain fields
  useEffect(() => {
    try {
      if (token && user) {
        const safeUser = {
          id: user.id,
          role: user.role,
          full_name: user.full_name,
          email: user.email,
        };
        localStorage.setItem("token", token);
        localStorage.setItem("agrisense_user", JSON.stringify(safeUser));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("agrisense_user");
      }
    } catch (error) {
      console.error("Failed to store auth data:", error);
    }
  }, [token, user]);

  const login = (newToken, userData) => {
    console.log("login userData:", userData); // debug
    // Ensure all fields are strings
    const safeUser = {
      id: userData.id,
      role: String(userData.role),
      full_name: String(userData.full_name),
      email: String(userData.email),
    };
    setToken(newToken);
    setUser(safeUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const updateUser = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  const isAuthenticated = Boolean(token);
  const isFarmer = user?.role === "farmer";
  const isAdmin = user?.role === "admin";
  const isExpert = user?.role === "expert";

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        updateUser,
        isAuthenticated,
        isFarmer,
        isAdmin,
        isExpert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export default AuthContext;