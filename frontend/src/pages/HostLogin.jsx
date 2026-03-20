import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginHost } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function HostLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("All fields required");

    setLoading(true);
    try {
      const res = await loginHost(form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary to-neon" />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Host Login</h1>
            <p className="text-gray-400 mb-6">Sign in to manage your tournaments</p>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg p-3 mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="host@example.com"
                  className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/host/register" className="text-neon hover:underline">
                Register as Host
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
