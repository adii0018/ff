import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerHost = (data) => API.post("/auth/register", data);
export const loginHost = (data) => API.post("/auth/login", data);

// Tournaments
export const getTournaments = () => API.get("/tournaments");
export const getTournamentById = (id) => API.get(`/tournaments/${id}`);
export const getMyTournaments = () => API.get("/tournaments/host/mine");
export const createTournament = (formData) =>
  API.post("/tournaments/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Registrations
export const registerPlayer = (formData) =>
  API.post("/registrations", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getRegistrations = (tournamentId) =>
  API.get(`/registrations/${tournamentId}`);
export const approveRegistration = (id) => API.patch(`/registrations/approve/${id}`);
export const rejectRegistration = (id) => API.patch(`/registrations/reject/${id}`);
