import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [host, setHost] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("host");
    if (stored) setHost(JSON.parse(stored));
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("host", JSON.stringify(data));
    setHost(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("host");
    setHost(null);
  };

  return (
    <AuthContext.Provider value={{ host, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
