import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { handleError, handleSuccess } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee", // 👈 default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = signupInfo;

    if (!name || !email || !password) {
      handleError("All fields are required");
      return;
    }

    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }), // 👈 include role
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || "Signup failed. Please try again.");
      } else {
        handleError(message || "Signup failed. Please try again.");
      }
    } catch (error) {
      handleError("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden relative">
      {/* Background animated lights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: 1.2 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-10 left-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, scale: 1.1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10"
      />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        className="relative z-10 w-[400px] backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.3)]"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              value={signupInfo.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              value={signupInfo.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              value={signupInfo.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>

          {/* 🧩 Role Dropdown */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold mb-2">
              Select Role
            </label>
            <select
              name="role"
              value={signupInfo.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all duration-300"
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            id="btn"
            type="submit"
            className="w-full pt-3 pb-3 bg-linear-to-r from-blue-500 to-cyan-400 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Sign Up
          </motion.button>

          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 underline transition-all duration-300"
            >
              Login
            </Link>
          </p>
        </form>

        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default Signup;
