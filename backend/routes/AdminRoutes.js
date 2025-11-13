import express from "express";
import { getAdminDashboard } from "../controllers/adminDashboard.controller.js";

const router = express.Router();

// ✅ Admin Dashboard Route
router.get("/",  getAdminDashboard);

export default router;
