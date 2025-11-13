import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: "" }, // ✅ made optional
  email: { type: String, required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "HostedEvent" }, // ✅ ObjectId, not Number
  eventTitle: { type: String, required: true },
  eventPlace: { type: String, default: "" },
  ticketCode: { type: String },
  eventDate: { type: String, default: "" },
  eventTime: { type: String, default: "" },
  dateRegistered: { type: Date, default: Date.now },
    phone: {
    type: String,
    required: [true, "Phone number is required"], // ✅ Make sure it's stored
    trim: true,
  },
  company: {
    type: String,
    default: "N/A", // ✅ Default ensures it's always saved even if left empty
    trim: true,
  },
  dateRegistered: {
    type: Date,
    default: Date.now,
  },
});

const EventRegistration = mongoose.model("EventRegistration", RegisterSchema);

export default EventRegistration;
