import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      handleError("All fields are required");
      return;
    }

    try {
      const url = "http://localhost:5000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      const { success, message, jwtToken, token, name, role } = result;
      localStorage.setItem("token", jwtToken || token);


      if (success) {
        handleSuccess(`Welcome back, ${name}!`);

        // Save auth info to localStorage
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);

        // Redirect based on role
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else if (role === "organizer") {
            navigate("/dashboard");
          } else {
            navigate("/attendees");
          }
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message || "Login failed. Please try again.");
      } else {
        handleError(message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-[0_0_25px_5px_rgba(6,182,212,0.4)] shadow-cyan-glow p-8 w-full max-w-md text-white animate-fade-in"
      >
        <h1 className="text-4xl font-extrabold text-center mb-5 bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Login
        </h1>

        <form onSubmit={handlelogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-semibold">
              Email
            </label>
            <input
              value={loginInfo.email}
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 font-semibold">
              Password
            </label>
            <input
              value={loginInfo.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none text-white placeholder-gray-400 transition-all duration-300"
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(6,182,212,0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full pt-3 pb-3 bg-linear-to-r from-blue-500 to-cyan-400 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/60 transition-all duration-300"
          >
            Login
          </motion.button>

          <p className="text-center text-sm text-gray-200 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 underline transition-all duration-300"
            >
              Sign Up
            </Link>
          </p>
        </form>

        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default Login;
