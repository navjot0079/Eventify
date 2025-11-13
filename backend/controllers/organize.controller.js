import Event from "../models/HostEventSchema.js";
import EventRegistration from "../models/RegisterSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createEvent = async (req, res) => {
  try {
    console.log("📥 Incoming Event Data:", req.body);
    console.log("👤 Organizer Info from Token:", req.user);

    // attach organizer info
    const organizerEmail = req.user?.email;
    if (!organizerEmail) {
      console.log("🚫 No organizer email found in token!");
      return res.status(400).json({
        success: false,
        message: "Organizer authentication failed — email not found.",
      });
    }

    // build event data
    const newEvent = new Event({
      ...req.body,
      organizerEmail,
    });

    console.log("🧱 About to save event:", newEvent);

    await newEvent.save();

    console.log("✅ Event created successfully!");
    return res.status(201).json({
      success: true,
      message: "Event created successfully!",
      data: newEvent,
    });
  } catch (err) {
    console.error("❌ Error creating event:", err);
    return res.status(500).json({
      success: false,
      message: "Error creating event",
      error: err.message,
    });
  }
};



// 📊 ORGANIZER DASHBOARD
export const getOrganizerDashboard = async (req, res, next) => {
  try {
    console.log("🎯 Organizer Dashboard reached");
    console.log("👤 User Info:", req.user);
    console.log("📧 Query email:", req.query.email);
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Organizer email required"));
    }

    // ✅ 1️⃣ Fetch all events by this organizer
    const events = await Event.find({ organizerEmail: email }).sort({
      eventDate: -1,
    });

    // ✅ 2️⃣ Fetch all registrations linked to these events
    const eventIds = events.map((e) => e._id);
    const registrations = await EventRegistration.find({
      eventId: { $in: eventIds },
    });

    // ✅ 3️⃣ Compute counts
    const totalEvents = events.length;
    const totalRegistrations = registrations.length;
    const upcomingEvents = events.filter(
      (e) => new Date(e.eventDate) > new Date()
    ).length;

    // ✅ 4️⃣ Event Type Breakdown
    const eventTypeBreakdown = {};
    events.forEach((e) => {
      eventTypeBreakdown[e.eventType] =
        (eventTypeBreakdown[e.eventType] || 0) + 1;
    });

    // ✅ 5️⃣ Monthly Event Trend
    const monthlyData = {};
    events.forEach((e) => {
      const month = new Date(e.eventDate).toLocaleString("default", {
        month: "short",
      });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });
    const eventTrend = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count,
    }));

    // ✅ 6️⃣ Dashboard Data
    const dashboardData = {
      counts: { totalEvents, totalRegistrations, upcomingEvents },
      charts: { eventTrend, eventTypeBreakdown },
      events: events.slice(0, 10), // latest 10
    };

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          dashboardData,
          "Organizer dashboard data fetched successfully."
        )
      );
  } catch (error) {
    console.error("❌ Organizer Dashboard Error:", error);
    next(new ApiError(500, "Error fetching organizer dashboard data", error));
  }
};


// 👥 GET REGISTRATIONS FOR A SPECIFIC EVENT TITLE
export const getEventRegistrations = async (req, res, next) => {
  try {
    const { eventTitle } = req.params;

    if (!eventTitle) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Event title is required."));
    }

    const registrations = await EventRegistration.find({
      eventTitle: new RegExp(`^${eventTitle}$`, "i"), // case-insensitive
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          registrations,
          "Event registrations fetched successfully."
        )
      );
  } catch (error) {
    console.error("❌ Error fetching event registrations:", error);
    next(new ApiError(500, "Error fetching registrations", error));
  }
};



// 🗑️ DELETE EVENT
export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "Event not found or already deleted."));
    }

    await EventRegistration.deleteMany({ eventId: id }); // also delete its registrations

    return res
      .status(200)
      .json(new ApiResponse(200, deletedEvent, "Event deleted successfully."));
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    next(new ApiError(500, "Error deleting event", error));
  }
};
