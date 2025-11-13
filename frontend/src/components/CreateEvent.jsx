import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";
import "react-toastify/dist/ReactToastify.css";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    eventTitle: "",
    hostName: "",
    description: "",
    eventType: "",
    eventDate: "",
    timeSlot: "",
    eventPlace: "",
    budget: "",
    maxGuests: "",
    eventImage: "",
  });

  const [loading, setLoading] = useState(false);
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const form = new FormData();
  form.append("image", file);

  try {
    const res = await axios.post("http://localhost:5000/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // ✅ use setEventData, not setFormData
    setEventData({ ...eventData, eventImage: res.data.filePath });
    console.log("✅ Image uploaded successfully:", res.data.filePath);
  } catch (err) {
    console.error("❌ Image upload failed:", err);
    alert("Image upload failed. Try again.");
  }
};


  // ✅ handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      handleError("You must be logged in as an organizer to create an event.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/organizer/create-event",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success || res.status === 201) {
        handleSuccess("Event created successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        handleError(res.data.message || "Failed to create event.");
      }
    } catch (err) {
      console.error("Error creating event:", err);
      handleError("Something went wrong while creating the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-purple-900 to-gray-800 text-white font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 p-8 rounded-2xl mt-8 mb-4 shadow-xl backdrop-blur-md w-full max-w-lg border border-white/20"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
          🛠️ Create a New Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
            <input
              name="eventTitle"
              type="text"
              placeholder="Enter event title"
              value={eventData.eventTitle}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* HostName */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Host</label>
            <input
              name="hostName"
              type="text"
              placeholder="Enter Host Name"
              value={eventData.hostName}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Brief event description..."
              value={eventData.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select
              name="eventType"
              value={eventData.eventType}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Select Type --</option>
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Get Together">Get Together</option>
              <option value="Cocktail Party">Cocktail Party</option>
              <option value="Corporate Event">Corporate Event</option>
            </select>
          </div>

          {/* Event Image */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Upload Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 rounded-lg bg-white text-black"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input
              name="eventDate"
              type="date"
              value={eventData.eventDate}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-medium mb-1">Time Slot</label>
            <select
              name="timeSlot"
              value={eventData.timeSlot}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- Select Time Slot --</option>
              <option value="Day (10 AM - 4 PM)">Day (10 AM - 4 PM)</option>
              <option value="Evening (6 PM - 11:30 PM)">Evening (6 PM - 11:30 PM)</option>
            </select>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium mb-1">Venue</label>
            <input
              name="eventPlace"
              type="text"
              placeholder="Enter event location"
              value={eventData.eventPlace}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-1">Estimated Budget (₹)</label>
            <input
              name="budget"
              type="number"
              placeholder="Enter event budget"
              value={eventData.budget}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Max Guests */}
          <div>
            <label className="block text-sm font-medium mb-1">Max Guests</label>
            <input
              name="maxGuests"
              type="number"
              placeholder="Enter guest limit"
              value={eventData.maxGuests}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold shadow-lg transition ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-linear-to-r from-purple-500 to-indigo-600 hover:shadow-purple-500/50"
              }`}
          >
            {loading ? "Creating Event..." : "Create Event"}
          </motion.button>
        </form>

        <ToastContainer />
      </motion.div>
    </div>
  );
}
