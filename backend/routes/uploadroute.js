import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// 🗂️ Ensure uploads folder exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 🧠 Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// 📸 Upload endpoint
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Send back file path for frontend
    const filePath = `/uploads/${req.file.filename}`;
    return res.status(200).json({
      message: "File uploaded successfully",
      filePath,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
