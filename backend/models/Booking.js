import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  eventType: {
    type: String,
    enum: [
      "Wedding",
      "Birthday Party",
      "Corporate Event",
      "Get Together",
      "Cocktail Party",
      "Engagement",
    ],
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", bookingSchema);
