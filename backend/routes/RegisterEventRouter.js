import express from "express";
import EventRegistration from "../models/RegisterSchema.js";
import HostedEvent from "../models/HostEventSchema.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const RegisterEventRouter = express.Router();

const generateTicketCode = () =>
  "EVT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

// 📝 Register for an event
RegisterEventRouter.post("/", async (req, res) => {
  console.log("📩 Incoming registration body:", req.body);

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      company,
      daysAttending,
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventPlace,
      eventImage,
      eventDescription,
      hostName,
      budget,
      maxGuests,
    } = req.body;

    // ✅ Combine country code + phone
    const fullPhone =
      countryCode && phone ? `${countryCode}${phone}` : phone;

    // ✅ Validate required fields
    if (!firstName || !email || !eventId || !eventTitle || !fullPhone) {
      return res.status(400).json({
        message: "Missing required fields (name, email, phone, event info).",
      });
    }

    // ✅ Prevent duplicate registration
    const existing = await EventRegistration.findOne({ email, eventId });
    if (existing) {
      return res.status(409).json({
        message: `⚠️ You are already registered for "${existing.eventTitle}".`,
      });
    }

    // ✅ Fetch event details (fallback)
    const event = (await HostedEvent.findById(eventId)) || {};

    // ✅ Create new registration entry
    const ticketCode = generateTicketCode();
    const registration = new EventRegistration({
      firstName,
      lastName: lastName || "Guest",
      email,
      phone: fullPhone, // ✅ Save properly
      company: company || "N/A",
      daysAttending: daysAttending?.length ? daysAttending : [],
      eventId,
      eventTitle: event.eventTitle || eventTitle,
      eventPlace: event.eventPlace || eventPlace || "TBA",
      eventDate: event.eventDate || eventDate || "TBA",
      eventTime: event.timeSlot || eventTime || "TBA",
      eventImage: event.eventImage || eventImage,
      eventDescription: event.description || eventDescription,
      hostName: event.hostName || hostName,
      budget: event.budget || budget,
      maxGuests: event.maxGuests || maxGuests,
      ticketCode,
    });

    await registration.save();

    // ✅ Send Email Confirmation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Eventify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎟️ Your Ticket - ${eventTitle}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;padding:20px;background:#f9f9f9;">
          <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:12px;">
            <h2 style="color:#3B1E7A;text-align:center;">🎉 Registration Confirmed!</h2>
            <p>Dear <b>${firstName}</b>,</p>
            <p>Thank you for registering for <b>${eventTitle}</b>.</p>
            <ul>
              <li><b>Date:</b> ${eventDate}</li>
              <li><b>Time:</b> ${eventTime}</li>
              <li><b>Place:</b> ${eventPlace}</li>
              <li><b>Company:</b> ${company || "N/A"}</li>
              <li><b>Phone:</b> ${fullPhone || "N/A"}</li>
              <li><b>Days Attending:</b> ${daysAttending?.join(", ") || "—"}</li>
            </ul>
            <div style="padding:10px;background:#FFD43B;border-radius:10px;text-align:center;">
              <h3 style="color:#111;">🎫 Your Ticket Code:</h3>
              <h2 style="letter-spacing:2px;">${ticketCode}</h2>
            </div>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("📧 Email send failed:", emailErr);
    }

    // ✅ Respond Success
    res.status(201).json({
      message: "🎉 Registration successful! Ticket sent via email.",
      registration,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default RegisterEventRouter;
