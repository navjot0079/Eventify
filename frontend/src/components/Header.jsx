import { useEffect, useState } from "react";
import { handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    setLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-linear-to-r from-purple-900 via-indigo-800 to-blue-900 drop-shadow-gray-900 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* 🌈 Animated Brand Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate("/home")}
          className="text-3xl font-extrabold text-white tracking-wider drop-shadow-lg cursor-pointer flex space-x-px"
        >
          {"Eventify".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: 0 }}
              whileHover={{
                y: -10,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                  delay: index * 0.05,
                },
              }}
              className="inline-block text-amber-50 bg-clip-text drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* 🧭 Navigation */}
        <nav className="space-x-6 hidden md:flex items-center">
          {/* Common Links */}
          <a
            href="/home"
            className="text-white hover:text-yellow-300 transition duration-300 font-medium"
          >
            Home
          </a>

          {/* 👤 Attendee Navigation */}
          {role === "attendee" && (
            <>
              <a
                href="/bookevent"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Book Event
              </a>
              <a
                href="/attendees"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Dashboard
              </a>
            </>
          )}

          {/* 🧑‍💼 Organizer Navigation */}
          {role === "organizer" && (
            <>
              <a
                href="/create-event"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Host Event
              </a>
              <a
                href="/dashboard"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Dashboard
              </a>
            </>
          )}

          {/* 🛠️ Admin Navigation */}
          {role === "admin" && (
            <>
              <a
                href="/admin-dashboard"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Admin Dashboard
              </a>
              <a
                href="/testimonials"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Testimonial
              </a>
            </>
          )}

          {/* Common Links (for all roles except admin) */}
          {role !== "admin" && (
            <>
              <a
                href="/testimonials"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Testimonial
              </a>
              <a
                href="/faq"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                FAQ
              </a>
              <a
                href="/contact"
                className="text-white hover:text-yellow-300 transition duration-300 font-medium"
              >
                Contact
              </a>
            </>
          )}

          {/* 🔐 Auth Buttons */}
          {loggedIn ? (
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 10px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 transition cursor-pointer"
            >
              Log out
            </motion.button>
          ) : (
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 10px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-yellow-300 transition cursor-pointer"
            >
              Sign In
            </motion.button>
          )}
        </nav>

        {/* 📱 Mobile Menu Button */}
        <button className="md:hidden p-2 rounded bg-white text-indigo-700 font-bold shadow-md">
          ☰
        </button>
      </div>
    </header>
  );
}
