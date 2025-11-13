// routes/eventRoutes.js
import express from "express";
import { ensureAuthenticated, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// 👑 Only admin can access
router.delete("/admin/event/:id", ensureAuthenticated, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Event deleted by admin" });
});

// 🧑‍💼 Organizer can create/edit their events
router.post("/organizer/event", ensureAuthenticated, authorizeRoles("organizer", "admin"), (req, res) => {
  res.json({ message: "Event created by organizer" });
});

// 👥 Attendees can view events
router.get("/events", ensureAuthenticated, authorizeRoles("attendee", "organizer", "admin"), (req, res) => {
  res.json({ message: "Events viewed by user" });
});

export default router;
