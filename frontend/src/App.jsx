import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TournamentPage from "./pages/TournamentPage";
import HostLogin from "./pages/HostLogin";
import HostRegister from "./pages/HostRegister";
import PlayerAuth from "./pages/PlayerAuth";
import Dashboard from "./pages/Dashboard";
import CreateTournament from "./pages/CreateTournament";
import EditTournament from "./pages/EditTournament";
import TournamentPlayers from "./pages/TournamentPlayers";
import PlayerDashboard from "./pages/PlayerDashboard";

const HostRoute = ({ children }) => {
  const { isHost } = useAuth();
  return isHost ? children : <Navigate to="/host/login" replace />;
};

const PlayerRoute = ({ children }) => {
  const { isPlayer } = useAuth();
  return isPlayer ? children : <Navigate to="/player-auth" replace />;
};

const AUTH_ROUTES = ["/host/login", "/host/register", "/player-auth"];

function Layout() {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <div className="starfield" aria-hidden="true" />}
      {!isAuthPage && <Navbar />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/tournament/:id" element={<TournamentPage />} />

        {/* Auth pages */}
        <Route path="/host/login" element={<HostLogin />} />
        <Route path="/host/register" element={<HostRegister />} />
        <Route path="/player-auth" element={<PlayerAuth />} />

        {/* Host protected */}
        <Route path="/dashboard" element={<HostRoute><Dashboard /></HostRoute>} />
        <Route path="/create-tournament" element={<HostRoute><CreateTournament /></HostRoute>} />
        <Route path="/tournament/:id/edit" element={<HostRoute><EditTournament /></HostRoute>} />
        <Route path="/tournament/:id/players" element={<HostRoute><TournamentPlayers /></HostRoute>} />

        {/* Player protected */}
        <Route path="/player/dashboard" element={<PlayerRoute><PlayerDashboard /></PlayerRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
