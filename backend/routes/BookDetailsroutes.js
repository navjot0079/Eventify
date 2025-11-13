import express from "express";
import mongoose from "mongoose";
import BookingDetails from "../models/BookingDetails.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
const router = express.Router();

// Create new booking
router.post("/", async (req, res) => {
  try {
    const booking = new BookingDetails(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking stored successfully!", booking });
  } catch (err) {
    res.status(400).json({ message: "Error storing booking", error: err.message });
  }
});

// Fetch all bookings (for admin view)
router.get("/", async (req, res) => {
  const bookings = await BookingDetails.find().sort({ createdAt: -1 });
  res.json(bookings);
});


router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // ✅ 1. Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "Invalid booking ID."));
    }

    // ✅ 2. Check if booking exists
    const booking = await BookingDetails.findById(id);
    if (!booking) {
      return res
        .status(404)
        .json(new ApiResponse(404, {}, "Booking not found."));
    }

    // ✅ 3. Apply updates (merge changes)
    Object.keys(updates).forEach((key) => {
      booking[key] = updates[key];
    });

    // ✅ 4. Save the updated booking
    const updatedBooking = await booking.save();

    // ✅ 5. Return success response
    return res.status(200).json(
      new ApiResponse(
        200,
        updatedBooking,
        "Booking details updated successfully."
      )
    );
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    next(new ApiError(500, "Error updating booking details", error));
  }
});

export default router;
