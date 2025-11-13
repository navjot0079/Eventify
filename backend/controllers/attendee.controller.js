import BookingDetails from "../models/BookingDetails.js";
import EventRegistration from "../models/RegisterSchema.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getAttendeeDashboard = async (req, res, next) => {
  try {
    const { search = "", email } = req.query;

    // ✅ 1. Validate
    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "User email is required to fetch personalized data."));
    }

    // ✅ 2. Filter setup for bookings
    const bookingFilter = {
      email,
      ...(search && {
        $or: [
          { name: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
          { timeSlot: new RegExp(search, "i") },
          { eventType: new RegExp(search, "i") },
        ],
      }),
    };

    // ✅ 3. Fetch user bookings
    const bookings = await BookingDetails.find(bookingFilter).sort({ eventDate: -1 });

    // ✅ 4. Fetch user registered events
    const registrationFilter = {
      email,
      ...(search && {
        $or: [
          { eventTitle: new RegExp(search, "i") },
          { eventPlace: new RegExp(search, "i") },
        ],
      }),
    };

    const registeredEvents = await EventRegistration.find(registrationFilter).sort({
      dateRegistered: -1,
    });

    // ✅ 5. Handle if user has no data
    if (!bookings.length && !registeredEvents.length) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            counts: { totalBookings: 0, registeredEvents: 0 },
            stats: { avgGuests: 0, avgBudget: 0 },
            charts: { eventTrend: [], slotBreakdown: {}, eventBreakdown: {} },
            recentBookings: [],
            registeredEvents: [],
          },
          "No records found for this user."
        )
      );
    }

    // ✅ 6. Calculate booking stats
    const totalBookings = bookings.length;
    const totalRegisteredEvents = registeredEvents.length;

    const avgGuests =
      totalBookings > 0
        ? Math.round(bookings.reduce((sum, b) => sum + (b.guests || 0), 0) / totalBookings)
        : 0;

    const avgBudget =
      totalBookings > 0
        ? Math.round(
            bookings.reduce((sum, b) => sum + (b.budget || 0), 0) / totalBookings
          )
        : 0;

    // ✅ 7. Monthly trend (bookings)
    const monthlyData = {};
    bookings.forEach((b) => {
      if (!b.eventDate) return;
      const month = new Date(b.eventDate).toLocaleString("default", { month: "short" });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });
    const eventTrend = Object.entries(monthlyData).map(([month, events]) => ({
      month,
      events,
    }));

    // ✅ 8. Time slot breakdown
    const slotBreakdown = {};
    bookings.forEach((b) => {
      const slot = b.timeSlot || "Unknown";
      slotBreakdown[slot] = (slotBreakdown[slot] || 0) + 1;
    });

    // ✅ 9. Event type breakdown
    const eventBreakdown = {};
    bookings.forEach((b) => {
      const type = b.eventType || "Custom Event";
      eventBreakdown[type] = (eventBreakdown[type] || 0) + 1;
    });

    // ✅ 10. Final response data
    const dashboardData = {
      counts: { totalBookings, registeredEvents: totalRegisteredEvents },
      stats: { avgGuests, avgBudget },
      charts: { eventTrend, slotBreakdown, eventBreakdown },
      recentBookings: bookings.slice(0, 10),
      registeredEvents: registeredEvents.slice(0, 10),
    };

    return res
      .status(200)
      .json(
        new ApiResponse(200, dashboardData, "User dashboard data fetched successfully.")
      );
  } catch (error) {
    console.error("❌ Dashboard error:", error);
    next(new ApiError(500, "Error fetching user dashboard data", error));
  }
};
