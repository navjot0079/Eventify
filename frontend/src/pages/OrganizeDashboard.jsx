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
import {
    Calendar,
    Users,
    ClipboardList,
    Plus,
    Trash2,
    Eye,
} from "lucide-react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const COLORS = ["#8B5CF6", "#6366F1", "#EC4899", "#14B8A6", "#FACC15"];

export default function OrganizerDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrganizerDashboard = async () => {
        try {
            const email = localStorage.getItem("userEmail");
            const token = localStorage.getItem("token");

            console.log("🎟️ Token before request:", token);

            if (!email || !token) {
                console.warn("⚠️ Missing email or token");
                return;
            }

            const res = await axios.get(
                `http://localhost:5000/organizer/dashboard?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(res.data.data || res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching organizer dashboard:", err);
            setData({
                counts: { totalEvents: 0, totalRegistrations: 0, upcomingEvents: 0 },
                charts: { eventTrend: [], eventTypeBreakdown: {} },
                events: [],
            });
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchOrganizerDashboard();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen flex justify-center items-center text-white text-lg">
                Loading dashboard...
            </div>
        );

    const {
        counts = { totalEvents: 0, totalRegistrations: 0, upcomingEvents: 0 },
        charts = { eventTrend: [], eventTypeBreakdown: {} },
        events = [],
    } = data;

    const pieData = Object.entries(charts.eventTypeBreakdown || {}).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    // 🗑️ Delete Event
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this event?");
        if (!confirm) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/organizer/event/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Event deleted successfully!");
            fetchOrganizerDashboard();
        } catch (err) {
            console.error("Error deleting event:", err);
            alert("Failed to delete event.");
        }
    };

    return (
        <div>
            <Header />
            <div className="p-6 min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-800 text-white font-poppins relative">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg"
                >
                    🧑‍💼 Organizer Dashboard
                </motion.h1>

                {/* 🔢 Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        {
                            icon: <ClipboardList />,
                            title: "Total Events",
                            value: counts.totalEvents,
                        },
                        {
                            icon: <Users />,
                            title: "Total Registrations",
                            value: counts.totalRegistrations,
                        },
                        {
                            icon: <Calendar />,
                            title: "Upcoming Events",
                            value: counts.upcomingEvents,
                        },
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

                {/* 📈 Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Line Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
                    >
                        <h2 className="text-xl font-semibold mb-4">📅 Event Trend</h2>
                        {charts.eventTrend?.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={charts.eventTrend}>
                                    <XAxis dataKey="month" stroke="#fff" />
                                    <YAxis stroke="#fff" />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#A855F7"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-400 italic">
                                No event trend data available.
                            </p>
                        )}
                    </motion.div>

                    {/* Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md"
                    >
                        <h2 className="text-xl font-semibold mb-4">🎭 Event Type Breakdown</h2>
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
                            <p className="text-center text-gray-400 italic">
                                No event type data available.
                            </p>
                        )}
                    </motion.div>
                </div>

                {/* 🗂️ Events Table */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md mb-8"
                >
                    <h2 className="text-xl font-semibold mb-4">📋 Your Events</h2>
                    {events.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-300 border-b border-gray-600">
                                        <th className="py-2 px-4">Title</th>
                                        <th className="py-2 px-4">Type</th>
                                        <th className="py-2 px-4">Date</th>
                                        <th className="py-2 px-4">Location</th>
                                        <th className="py-2 px-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event, i) => (
                                        <tr
                                            key={i}
                                            className="border-b border-gray-700 hover:bg-white/5 transition"
                                        >
                                            <td className="py-3 px-4 font-semibold">
                                                {event.eventTitle}
                                            </td>
                                            <td className="py-3 px-4">{event.eventType}</td>
                                            <td className="py-3 px-4">
                                                {new Date(event.eventDate).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-4">{event.eventPlace}</td>
                                            <td className="py-3 px-4 text-center flex gap-3 justify-center">
                                                <button
                                                    onClick={() =>
                                                        navigate(`/organizer/event/${encodeURIComponent(event.eventTitle)}`)
                                                    }

                                                    className="text-cyan-400 hover:text-cyan-300"
                                                    title="View Registrations"
                                                >
                                                    <Eye />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event._id)}
                                                    className="text-red-400 hover:text-red-300"
                                                    title="Delete Event"
                                                >
                                                    <Trash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 italic">
                            No events created yet.
                        </p>
                    )}
                </motion.div>

                {/* ➕ Floating Create Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/create-event")}
                    className="fixed bottom-8 right-8 bg-linear-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-purple-400/50 transition"
                >
                    <Plus size={28} />
                </motion.button>
            </div>
        </div>
    );
}
