import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TournamentPage from "./pages/TournamentPage";
import HostLogin from "./pages/HostLogin";
import HostRegister from "./pages/HostRegister";
import Dashboard from "./pages/Dashboard";
import CreateTournament from "./pages/CreateTournament";
import TournamentPlayers from "./pages/TournamentPlayers";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { host } = useAuth();
  return host ? children : <Navigate to="/host/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament/:id" element={<TournamentPage />} />
          <Route path="/host/login" element={<HostLogin />} />
          <Route path="/host/register" element={<HostRegister />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-tournament"
            element={
              <ProtectedRoute>
                <CreateTournament />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tournament/:id/players"
            element={
              <ProtectedRoute>
                <TournamentPlayers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
