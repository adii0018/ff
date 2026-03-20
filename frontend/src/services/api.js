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
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Legacy aliases
export const registerHost = (data) => API.post("/auth/register", { ...data, role: "host" });
export const loginHost = (data) => API.post("/auth/login", data);
export const registerPlayerAccount = (data) => API.post("/auth/register", { ...data, role: "player" });
export const loginPlayerAccount = (data) => API.post("/auth/login", data);

// Tournaments
export const getTournaments = (params) => API.get("/tournaments", { params });
export const getTournamentById = (id) => API.get(`/tournaments/${id}`);
export const getMyTournaments = () => API.get("/tournaments/host/mine");
export const createTournament = (formData) =>
  API.post("/tournaments/create", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateTournament = (id, data) => API.put(`/tournaments/${id}`, data);
export const deleteTournament = (id) => API.delete(`/tournaments/${id}`);

// Registrations
export const registerPlayer = (formData) =>
  API.post("/registrations", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const getRegistrations = (tournamentId) => API.get(`/registrations/${tournamentId}`);
export const getMyRegistrations = () => API.get("/registrations/player/mine");
export const approveRegistration = (id) => API.patch(`/registrations/approve/${id}`);
export const rejectRegistration = (id) => API.patch(`/registrations/reject/${id}`);
