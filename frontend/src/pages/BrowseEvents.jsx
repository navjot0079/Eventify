import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/allevent");
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ✅ Handle register button click
 const handleRegister = (event) => {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    toast.warn("⚠️ Please log in to register for events.");
    navigate("/login");
    return;
  }

  // Pass full event details to registration form
  navigate("/registerevent", {
    state: {
      id: event._id,
      title: event.eventTitle,
      image: `http://localhost:5000${event.eventImage}`,
      date: new Date(event.eventDate).toLocaleDateString(),
      time: event.timeSlot || "TBA",
      place: event.eventPlace || "TBA",
      description: event.description,
      host: event.hostName,
      budget: event.budget,
      maxGuests: event.maxGuests,
    },
  });
};



  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-lg">
        Loading events...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-300 text-lg">
        No events available at the moment.
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-gray-900 text-white p-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 drop-shadow-lg">
          🌟 Explore Upcoming Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 hover:shadow-purple-400/40 transition transform hover:-translate-y-2"
            >
              {event.eventImage && (
                <img
                  src={`http://localhost:5000${event.eventImage}`}
                  alt={event.eventTitle}
                  className="rounded-xl mb-4 w-full h-48 object-cover"
                />
              )}

              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                {event.eventTitle}
              </h2>
              <p className="text-gray-300 mb-3">{event.description}</p>

              <div className="space-y-1 text-sm text-gray-200">
                <p className="flex items-center gap-2">
                  <Calendar size={16} />{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={16} /> {event.eventPlace}
                </p>

              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/registerevent", {
                  state: {
                    id: event._id,
                    title: event.eventTitle,
                    image: `http://localhost:5000${event.eventImage}`,
                    date: new Date(event.eventDate).toLocaleDateString(),
                    time: event.timeSlot || "TBA",
                    place: event.eventPlace || "TBA"
                  }
                })}
                className="mt-5 w-full py-3 bg-yellow-400 text-blue-900 font-bold rounded-xl shadow-lg hover:bg-yellow-300 transition"
              >
                Register
              </motion.button>

            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </div>
  );
}
