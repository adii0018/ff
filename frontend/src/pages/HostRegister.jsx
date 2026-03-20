import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerHost } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function HostRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) return setError("All fields required");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);
    try {
      const res = await registerHost(form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-neon to-primary" />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Become a Host</h1>
            <p className="text-gray-400 mb-6">Create an account to host tournaments</p>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg p-3 mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Full Name", key: "name", type: "text", placeholder: "John Doe" },
                { label: "Email", key: "email", type: "email", placeholder: "host@example.com" },
                { label: "Password", key: "password", type: "password", placeholder: "Min 6 characters" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-400 mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-dark border border-border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account?{" "}
              <Link to="/host/login" className="text-neon hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
