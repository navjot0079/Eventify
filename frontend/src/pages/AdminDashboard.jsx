import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Users,
  ClipboardList,
  DollarSign,
  Clock,
} from "lucide-react";
import Header from "../components/Header";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");

  const fetchAdminData = async (query = "") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⚠️ Not logged in as admin");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/admin-dashboard?search=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("📥 Admin API Raw Response:", res.data);
      setData(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching admin dashboard:", err);
      setData({
        counts: { totalUsers: 0, totalBookings: 0, totalRevenue: 0 },
        stats: { avgGuests: 0, avgBudget: 0 },
        charts: { eventTrend: [], slotBreakdown: {}, categoryBreakdown: {} },
        recentBookings: [],
      });
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);
    fetchAdminData(query);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-lg">
        Loading admin dashboard...
      </div>
    );
  }

  const {
    counts = { totalUsers: 0, totalBookings: 0, totalRevenue: 0 },
    stats = { avgGuests: 0, avgBudget: 0 },
    charts = { eventTrend: [], slotBreakdown: {}, categoryBreakdown: {} },
    recentBookings = [],
  } = data;

  const slotData = Object.entries(charts.slotBreakdown || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const categoryData = Object.entries(charts.categoryBreakdown || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <Header />
      <div className="p-6 min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-800 text-white font-poppins">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg"
        >
          🛠️ Admin Dashboard
        </motion.h1>

        {/* 🔍 Search */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={handleSearch}
              className="w-full p-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* 🧮 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: <Users />, title: "Total Users", value: counts.totalUsers },
            { icon: <ClipboardList />, title: "Total Bookings", value: counts.totalBookings },
            { icon: <DollarSign />, title: "Total Revenue (₹)", value: counts.totalRevenue },
            { icon: <Clock />, title: "Avg. Guests", value: stats.avgGuests },
          ].map((card, i) => (
            <motion.div
              key={i}
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

        {/* 📈 Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
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
                  <Line type="monotone" dataKey="bookings" stroke="#A855F7" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-400 italic">No data yet.</p>
            )}
          </motion.div>

          {/* Pie Chart - Time Slot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-4">⏰ Time Slot Distribution</h2>
            {slotData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={slotData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {slotData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={
                          ["#60A5FA", "#FBBF24", "#34D399", "#A78BFA", "#F87171"][i % 5]
                        }
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
              <p className="text-center text-gray-400 italic">No slot data.</p>
            )}
          </motion.div>

          {/* Pie Chart - Category */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold mb-4">🎭 Event Category Distribution</h2>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={
                          ["#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"][i % 5]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} events`, name]}
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
              <p className="text-center text-gray-400 italic">No category data.</p>
            )}
          </motion.div>
        </div>

        {/* 🧾 Recent Bookings */}
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
                    <th className="py-2 px-4">Event Name</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Time Slot</th>
                    <th className="py-2 px-4">Guests</th>
                    <th className="py-2 px-4">Budget (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-700 hover:bg-white/5 transition"
                    >
                      <td className="py-3 px-4 font-semibold">{b.name}</td>
                      <td className="py-3 px-4">{b.email}</td>
                      <td className="py-3 px-4">{b.eventTitle || b.eventType}</td>
                      <td className="py-3 px-4">{new Date(b.eventDate).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{b.timeSlot}</td>
                      <td className="py-3 px-4">{b.guests}</td>
                      <td className="py-3 px-4">{b.budget}</td>
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
