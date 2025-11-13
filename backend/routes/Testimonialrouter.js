import express from "express";
import multer from "multer";
import { TestimonialModel } from "../models/Testimonial.js";

const router = express.Router();

// Multer config — store uploaded images locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/testimonials/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST - Add new testimonial
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, role, text, rating } = req.body;
    const image = req.file ? `/uploads/testimonials/${req.file.filename}` : "";

    if (!name || !role || !text || !rating || !image) {
      return res.status(400).json({ message: "All fields required", success: false });
    }

    const testimonial = new TestimonialModel({ name, role, text, rating, image });
    await testimonial.save();

    res.status(201).json({ message: "Testimonial added successfully", success: true });
  } catch (error) {
    console.error("Error saving testimonial:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

// GET - Fetch all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().sort({ _id: -1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

export default router;
