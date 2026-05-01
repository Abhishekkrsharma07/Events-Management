import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    
    <form
      className="bg-white p-10 rounded-2xl shadow-2xl w-96"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create Account ✨
      </h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition">
        Register
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-purple-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </form>
  </div>
);
};

export default Register;