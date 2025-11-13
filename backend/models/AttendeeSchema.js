import mongoose from "mongoose";
const attendeeSchema = new mongoose.Schema({
  name: String,
  eventName: String,
  date: String,
  time: String,
  status: String,
  category: String,
});
export default mongoose.model("Attendee", attendeeSchema);
