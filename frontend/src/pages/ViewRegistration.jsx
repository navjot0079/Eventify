import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft, Users } from "lucide-react";
import Header from "../components/Header";

export default function ViewRegistrations() {
  const { eventTitle } = useParams(); // ✅ now using eventTitle from URL
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch registrations for selected event
  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await axios.get(
        `http://localhost:5000/organizer/event/${encodeURIComponent(
          eventTitle
        )}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("📥 Event registrations:", res.data);

      // your controller returns direct array of registrations
      const registrationsData = Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setRegistrations(registrationsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setRegistrations([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [eventTitle]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-lg">
        Loading registrations...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-800 text-white font-poppins">
      <Header />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft size={20} /> Back
          </motion.button>

          <div className="text-right">
            <h1 className="text-3xl font-bold text-purple-300">
              {decodeURIComponent(eventTitle)}
            </h1>
          </div>
        </div>

        {/* 👥 Registrations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-5">
            <Users className="text-purple-400" />
            <h2 className="text-xl font-semibold">Event Registrations</h2>
          </div>

          {registrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-300 border-b border-gray-600">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Phone</th>
                    <th className="py-2 px-4">Company</th>
                    <th className="py-2 px-4">Date Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-700 hover:bg-white/5 transition"
                    >
                      <td className="py-3 px-4 font-semibold">
                        {r.firstName} {r.lastName}
                      </td>
                      <td className="py-3 px-4">{r.email}</td>
                      <td className="py-3 px-4">{r.phone || "—"}</td>
                      <td className="py-3 px-4">{r.company || "—"}</td>
                      <td className="py-3 px-4">
                        {r.dateRegistered
                          ? new Date(r.dateRegistered).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400 italic mt-6">
              No registrations yet for this event.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
