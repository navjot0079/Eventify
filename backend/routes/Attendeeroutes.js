import express from "express";
import { getAttendeeDashboard } from "../controllers/attendee.controller.js";

const router = express.Router();

router.get("/", getAttendeeDashboard);

export default router;
