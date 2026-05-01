import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("FORM DATA:", form); // 🔍 debug

      const res = await API.post("/auth/login", form);

      login(res.data);
      setError("");

      // 🔥 Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      setError(err.response?.data?.msg || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold shadow-md transition duration-200">
          Login
        </button>

        <p className="text-gray-300 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span className="text-green-400 cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;