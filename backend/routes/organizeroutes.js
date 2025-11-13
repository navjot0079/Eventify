import express from "express";
import {
  createEvent,
  getOrganizerDashboard,
  getEventRegistrations,
  deleteEvent,
} from "../controllers/organize.controller.js";
import { ensureAuthenticated, authorizeRoles } from "../middlewares/Auth.js";

const router = express.Router();

// 🧾 Create Event
router.post(
  "/create-event",
  ensureAuthenticated,
  authorizeRoles("organizer", "admin"),
  createEvent
);

// 📊 Organizer Dashboard
router.get(
  "/dashboard",
  ensureAuthenticated,
  authorizeRoles("organizer", "admin"),
  getOrganizerDashboard
);

// 👥 Get Event Registrations
router.get(
  "/event/:eventTitle",
  getEventRegistrations
);


// 🗑️ Delete Event
router.delete(
  "/event/:id",
  ensureAuthenticated,
  authorizeRoles("organizer", "admin"),
  deleteEvent
);

export default router;
