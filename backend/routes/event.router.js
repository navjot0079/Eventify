import express from "express";
import HostedEvent from "../models/HostEventSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await HostedEvent.find().sort({ eventDate: 1 });
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
});


// 🟡 PUT: Update event by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // ✅ Update event details in MongoDB
    const updatedEvent = await HostedEvent.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      data: updatedEvent,
    });
  } catch (err) {
    console.error("❌ Error updating event:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update event",
    });
  }
});

export default router;
