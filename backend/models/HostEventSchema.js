import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  hostName:{ type:String,required:true},
  eventType: {
    type: String,
    enum: [
      "Wedding",
      "Engagement",
      "Birthday Party",
      "Get Together",
      "Cocktail Party",
      "Corporate Event",
      "Custom Event",
    ],
    default: "Custom Event",
  },
  eventDate: { type: Date, required: true },
  eventPlace: { type: String, required: true },
  timeSlot: {
    type: String,
    enum: ["Day (10 AM - 4 PM)", "Evening (6 PM - 11:30 PM)"],
    required: true,
  },
  maxAttendees: { type: Number, default: 10 },
    eventImage: { type: String, required:true },
  description: { type: String },
  organizerEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("HostedEvent", eventSchema);
export default Event;
