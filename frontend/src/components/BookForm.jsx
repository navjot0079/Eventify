import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BookForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    timeSlot: "",
    budget: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/details", formData);
      setSuccess(true);
      setFormData({
        eventType: "",
        eventDate: "",
        timeSlot: "",
        budget: "",
        guests: "",
        name: "",
        phone: "",
        email: "",
      });
      setTimeout(() => navigate("/home"), 2000);
    } catch (err) {
      alert("Error submitting booking: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-800 via-purple-800 to-blue-800 text-white p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-lg">
          📅 Book Your Event
        </h2>

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-500 text-white text-center py-2 rounded-lg mb-4"
          >
            Booking submitted successfully!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Event Type Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Type
            </label>
            <select
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.eventType}
              onChange={(e) =>
                setFormData({ ...formData, eventType: e.target.value })
              }
            >
              <option value="">-- Select Event Type --</option>
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Get Together">Get Together</option>
              <option value="Cocktail Party">Cocktail Party</option>
              <option value="Corporate Event">Corporate Event</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Date</label>
            <input
              type="date"
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.eventDate}
              onChange={(e) =>
                setFormData({ ...formData, eventDate: e.target.value })
              }
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Timing
            </label>
            <select
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.timeSlot}
              onChange={(e) =>
                setFormData({ ...formData, timeSlot: e.target.value })
              }
            >
              <option value="">-- Select --</option>
              <option value="Day (10 AM - 4 PM)">Day (10 AM - 4 PM)</option>
              <option value="Evening (6 PM - 11:30 PM)">
                Evening (6 PM - 11:30 PM)
              </option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-1">Budget (₹)</label>
            <input
              type="number"
              placeholder="Enter your total budget"
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Guests
            </label>
            <input
              type="number"
              placeholder="e.g. 200"
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.guests}
              onChange={(e) =>
                setFormData({ ...formData, guests: e.target.value })
              }
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Your phone number"
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full p-2 rounded-lg bg-white text-black"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-yellow-400 text-blue-800 py-3 rounded-full font-bold shadow-xl hover:bg-yellow-300 transition"
          >
            Submit Booking
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
