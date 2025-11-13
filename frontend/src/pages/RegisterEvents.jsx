import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterEvent() {
  const location = useLocation();
  const event = location.state || {
    id: 0,
    title: "Upcoming Event",
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&q=80&w=1200",
    date: "TBA",
    time: "TBA",
    place: "TBA",
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    company: "",
    daysAttending: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newDays = checked
        ? [...formData.daysAttending, value]
        : formData.daysAttending.filter((day) => day !== value);
      setFormData({ ...formData, daysAttending: newDays });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/register", {
      ...formData,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventPlace: event.place,
      eventImage: event.image,
      eventDescription: event.description,
      hostName: event.host,
      budget: event.budget,
      maxGuests: event.maxGuests,
    });

    toast.success("🎟️ Registration successful! Ticket sent to your email.", {
      position: "top-center",
      autoClose: 1000,
      theme: "colored",
    });
    setTimeout(() => navigate("/home"), 100);
  } catch (error) {
     if (error.response?.status === 409) {
    // Already registered
    toast.warn(error.response.data.message || "You already registered!", {
      position: "top-center",
      autoClose: 2500,
      theme: "colored",
    });
  } else {
    // General error
    console.error("Registration Error:", error);
    toast.error("❌ Registration failed. Please try again.", {
      position: "top-center",
      autoClose: 100,
      theme: "colored",
    });
  }
  }
};


  return (
    <div>
      <Header />
      <section className="relative py-20 overflow-hidden bg-linear-to-br from-blue-700 via-indigo-800 to-purple-900 text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')]"></div>

        <div className="container mx-auto grid md:grid-cols-2 gap-12 px-6 relative z-10">
          {/* Left: Event Info & Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center items-center text-center"
          >
            <motion.img
              src={event.image}
              alt={event.title}
              className="rounded-3xl shadow-2xl h-[400px] w-full object-cover mb-6 border-4 border-yellow-400"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            />
            <h1 className="text-4xl font-extrabold text-yellow-400 mb-3 drop-shadow-lg">
              {event.title}
            </h1>
            <p className="text-lg text-gray-200 mb-2">
              📅 {event.date} | 🕒 {event.time}
            </p>
            <p className="text-lg text-gray-200 mb-2">
              📍 {event.place}
            </p>
            <p className="text-base text-gray-300 max-w-md">
              Get ready for an immersive experience filled with innovation, creativity, and inspiration.
              Reserve your spot today!
            </p>
          </motion.div>

          {/* Right: Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20"
          >
            <h2 className="text-3xl font-extrabold text-yellow-400 mb-8 text-center">
              Event Registration Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="font-semibold text-white">* 1. Name:</label>
                <div className="flex gap-4 mt-2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    className="w-1/2 border border-white/30 rounded-lg px-3 py-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="w-1/2 border border-white/30 rounded-lg px-3 py-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-semibold text-white">* 2. Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  className="w-full border border-white/30 rounded-lg px-3 py-2 mt-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-semibold text-white">3. Phone (optional):</label>
                <div className="flex gap-3 mt-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="border border-white/30 rounded-lg px-3 py-2 bg-transparent text-white focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                  </select>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    className="flex-1 border border-white/30 rounded-lg px-3 py-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="font-semibold text-white">4. Company/Organization:</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  className="w-full border border-white/30 rounded-lg px-3 py-2 mt-2 bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
                  onChange={handleChange}
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="font-semibold text-white">
                  5. What days do you plan on attending?
                </label>
                <div className="flex flex-col mt-2 space-y-2 text-gray-200">
                  {["Date 1", "Date 2", "Date 3"].map((day, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="days"
                        value={day}
                        onChange={handleChange}
                        className="accent-yellow-400"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              {/* Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300"
              >
                Register
              </motion.button>

              {/* Toast Container */}
              <ToastContainer />
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
