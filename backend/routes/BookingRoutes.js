import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// 📩 POST — Create a new booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking successful!", booking });
  } catch (error) {
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
});

// 📋 GET — Fetch all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
});

// 🗑️ DELETE — Remove a booking (admin use)
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
});

export default router;
