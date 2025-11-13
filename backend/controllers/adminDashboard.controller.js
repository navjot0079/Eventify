import BookingDetails from "../models/BookingDetails.js";
import UserModel from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getAdminDashboard = async (req, res, next) => {
  try {
    const { search = "" } = req.query;

    // ✅ 1. Setup filter for global search
    const filter = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
            { eventTitle: new RegExp(search, "i") },
            { eventType: new RegExp(search, "i") },
            { timeSlot: new RegExp(search, "i") },
          ],
        }
      : {};

    // ✅ 2. Fetch all bookings
    const bookings = await BookingDetails.find(filter).sort({ eventDate: -1 });

    // ✅ 3. Compute total users
    const totalUsers = await UserModel.countDocuments();

    // ✅ 4. Handle empty data
    if (!bookings || bookings.length === 0) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            counts: {
              totalUsers,
              totalBookings: 0,
              totalRevenue: 0,
            },
            stats: { avgGuests: 0, avgBudget: 0 },
            charts: { eventTrend: [], slotBreakdown: {}, categoryBreakdown: {} },
            recentBookings: [],
          },
          "No bookings found."
        )
      );
    }

    // ✅ 5. Calculate basic metrics
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.budget || 0), 0);

    const avgGuests = Math.round(
      bookings.reduce((sum, b) => sum + (b.guests || 0), 0) / totalBookings
    );
    const avgBudget = Math.round(totalRevenue / totalBookings);

    // ✅ 6. Monthly event trend
    const monthlyData = {};
    bookings.forEach((b) => {
      if (!b.eventDate) return;
      const month = new Date(b.eventDate).toLocaleString("default", {
        month: "short",
      });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });
    const eventTrend = Object.entries(monthlyData).map(([month, bookings]) => ({
      month,
      bookings,
    }));

    // ✅ 7. Time slot breakdown
    const slotBreakdown = {};
    bookings.forEach((b) => {
      const slot = b.timeSlot || "Unknown";
      slotBreakdown[slot] = (slotBreakdown[slot] || 0) + 1;
    });

    // ✅ 8. Category breakdown
    const categoryBreakdown = {};
    bookings.forEach((b) => {
      // prefer eventTitle (custom event name from booking form)
      const cat = b.eventTitle || b.eventType || "Other";
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + 1;
    });

    // ✅ 9. Format recent bookings
    const recentBookings = bookings.slice(0, 10).map((b) => ({
      _id: b._id,
      name: b.name,
      email: b.email,
      eventTitle: b.eventTitle || b.eventType || "Untitled Event",
      eventDate: b.eventDate,
      timeSlot: b.timeSlot,
      guests: b.guests,
      budget: b.budget,
      createdAt: b.createdAt,
    }));

    // ✅ 10. Construct dashboard response
    const dashboardData = {
      counts: { totalUsers, totalBookings, totalRevenue },
      stats: { avgGuests, avgBudget },
      charts: { eventTrend, slotBreakdown, categoryBreakdown },
      recentBookings,
    };

    // ✅ 11. Send success response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          dashboardData,
          "Admin dashboard data fetched successfully."
        )
      );
  } catch (error) {
    console.error("❌ Admin Dashboard Error:", error);
    next(new ApiError(500, "Error fetching admin dashboard data", error));
  }
};
