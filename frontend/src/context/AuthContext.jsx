import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // unified user (host or player)

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      // Migrate legacy host key
      const legacy = localStorage.getItem("host");
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const migrated = { ...parsed, role: parsed.role || "host" };
        localStorage.setItem("user", JSON.stringify(migrated));
        localStorage.setItem("token", migrated.token);
        setUser(migrated);
      }
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // legacy cleanup
    localStorage.removeItem("host");
    setUser(null);
  };

  // Convenience getters
  const host = user?.role === "host" ? user : null;
  const player = user?.role === "player" ? user : null;
  const isHost = user?.role === "host";
  const isPlayer = user?.role === "player";

  return (
    <AuthContext.Provider value={{ user, host, player, isHost, isPlayer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
