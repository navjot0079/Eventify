import mongoose from "mongoose";

// Define Event Schema
const eventSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: [true, "Event name is required"],
    trim: true,
  },
  date: {
    type: String,
    required: [true, "Event date is required"],
  },
  location: {
    type: String,
    required: [true, "Event location is required"],
  },
  description: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Export Event Model
const Event = mongoose.model("Event", eventSchema);
export default Event;
