import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Search, Users, Calendar, Clock, DollarSign } from "lucide-react";
import Header from "../components/Header";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#14B8A6", "#FACC15"];

export default function AttendeeDashboard() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const fetchRegisteredEvents = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) return;

      const res = await axios.get(
        `http://localhost:5000/attendees?email=${userEmail}`
      );


      if (res.data && res.data.data && Array.isArray(res.data.data.registeredEvents)) {
        setRegisteredEvents(res.data.data.registeredEvents);
      } else {
        setRegisteredEvents([]);
      }



    } catch (err) {
      console.error("Error fetching registered events:", err);
      setRegisteredEvents([]);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchRegisteredEvents(); // ✅ fetch user’s registered events
  }, []);


  const fetchDashboardData = async (query = "") => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const token = localStorage.getItem("token");

      if (!userEmail || !token) {
        console.warn("⚠️ Not logged in");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/attendees?search=${query}&email=${userEmail}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Important: Check where the actual data lives
      console.log("📥 Backend full response:", res.data);

      // If backend sends data inside res.data.data, use that
      const fetchedData = res.data.data || res.data;

      setData(fetchedData);
      console.log("✅ Dashboard Data set:", fetchedData);
    } catch (err) {
      console.error("Error fetching dashboard:", err);

      // fallback so dashboard doesn't crash
      setData({
        counts: { totalBookings: 0, registeredEvents: 0 },
        stats: { avgGuests: 0, avgBudget: 0 },
        charts: { eventTrend: [], slotBreakdown: {} },
        recentBookings: [],
        registeredEvents: [],
      });
    }
  };

  // ✅ Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchDashboardData(query);
  };

  // ✅ Load initial data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ If data still loading
  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-lg">
        Loading dashboard...
      </div>
    );
  }

  const {
    counts = { totalBookings: 0, registeredEvents: 0 },
    stats = { avgGuests: 0, avgBudget: 0 },
    charts = { eventTrend: [], slotBreakdown: {}, eventBreakdown: {} },
    recentBookings = [],
    registeredEvents: [], // 👈 renamed safely
  } = data;


  const { eventTrend = [], slotBreakdown = {} } = charts;

  const pieData = Object.entries(slotBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const hasBookings = counts.totalBookings > 0;


  return (
    <div>
      <Header />
      <div className="p-6 min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-800 text-white font-poppins">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg"
        >
          🎉 Event Attendee Dashboard
        </motion.h1>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by name, email, or time slot..."
              value={search}
              onChange={handleSearch}
              className="w-full p-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>




        {/* 📊 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: <Users />, title: "Total Bookings", value: counts.totalBookings },
            { icon: <Calendar />, title: "Registered Events", value: counts.registeredEvents },
            { icon: <Clock />, title: "Avg. Guests", value: stats.avgGuests },
            { icon: <DollarSign />, title: "Avg. Budget (₹)", value: stats.avgBudget },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 p-5 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-4"
            >
              <div className="bg-linear-to-br from-purple-500 to-indigo-600 p-3 rounded-xl">
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-300">{card.title}</p>
                <h3 className="text-2xl font-bold">{card.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🎟️ Registered Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md mt-10 mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">🎟️ Your Registered Events</h2>

          {registeredEvents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-300 border-b border-gray-600">
                    <th className="py-2 px-4">Event Title</th>
                    <th className="py-2 px-4">Date Registered</th>
                    <th className="py-2 px-4">Location</th>
                    <th className="py-2 px-4">Event Timings</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredEvents.map((event, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-700 hover:bg-white/5 transition"
                    >
                      <td className="py-3 px-4 font-semibold">
                        {event.eventTitle}
                      </td>
                      <td className="py-3 px-4">
                        {event.dateRegistered
                          ? new Date(event.dateRegistered).toLocaleDateString()
                          : "TBA"}
                      </td>
                      <td className="py-3 px-4">{event.eventPlace || "TBA"}</td>
                      <td className="py-3 px-4">
                        {event.eventTime||"TBA"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400 italic">
              You haven’t registered for any events yet.
            </p>
          )}
        </motion.div>


        {/* 📈 Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-4">📅 Monthly Bookings Trend</h2>
            {charts.eventTrend?.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={charts.eventTrend}>
                  <XAxis dataKey="month" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Line type="monotone" dataKey="events" stroke="#8B5CF6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 italic">No bookings yet.</p>
            )}
          </motion.div>

          {/* Time Slot Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-4">⏰ Time Slot Distribution</h2>
            {Object.keys(charts.slotBreakdown || {}).length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={Object.entries(charts.slotBreakdown).map(([name, value]) => ({ name, value }))}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {Object.entries(charts.slotBreakdown).map(([_, value], i) => (
                      <Cell key={i} fill={["#60A5FA", "#FBBF24", "#A78BFA"][i % 3]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} bookings`, name]}
                    contentStyle={{
                      backgroundColor: "rgba(30, 30, 60, 0.9)",
                      borderRadius: "10px",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 italic">No data available.</p>
            )}
          </motion.div>

          {/* 🎉 Event Type Breakdown Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-4">🎉 Event Type Distribution</h2>
            {Object.keys(charts.eventBreakdown || {}).length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={Object.entries(charts.eventBreakdown).map(([name, value]) => ({ name, value }))}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {Object.entries(charts.eventBreakdown).map(([_, value], i) => (
                      <Cell
                        key={i}
                        fill={["#34D399", "#F472B6", "#FBBF24", "#60A5FA", "#A78BFA", "#F87171"][i % 6]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} bookings`, name]}
                    contentStyle={{
                      backgroundColor: "rgba(30, 30, 60, 0.9)",
                      borderRadius: "10px",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 italic">No event type data yet.</p>
            )}
          </motion.div>
        </div>


        {/* 📋 Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">🧾 Recent Bookings</h2>
          {recentBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-300 border-b border-gray-600">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Time Slot</th>
                    <th className="py-2 px-4">Guests</th>
                    <th className="py-2 px-4">Budget (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((a, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-700 hover:bg-white/5 transition"
                    >
                      <td className="py-3 px-4 font-semibold">{a.name}</td>
                      <td className="py-3 px-4">{a.email}</td>
                      <td className="py-3 px-4">
                        {new Date(a.eventDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{a.timeSlot}</td>
                      <td className="py-3 px-4">{a.guests}</td>
                      <td className="py-3 px-4">{a.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400 italic">No recent bookings found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
