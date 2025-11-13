import mongoose from "mongoose";

const bookingDetailsSchema = new mongoose.Schema({
  eventType: {
     type: String,
    enum: [
      "Wedding",
      "Engagement",
      "Birthday Party",
      "Get Together",
      "Cocktail Party",
      "Corporate Event",
    ],
    required: true,
    default: "Custom Event",
  },
  eventDate: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    enum: ["Day (10 AM - 4 PM)", "Evening (6 PM - 11:30 PM)"],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("BookingDetails", bookingDetailsSchema);
