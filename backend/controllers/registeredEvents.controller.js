import EventRegistration from "../models/RegisterSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const registerForEvent = async (req, res, next) => {
  try {
    console.log("📩 Incoming registration body:", req.body);

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
    } = req.body;

    // ✅ Combine country code with phone
    const fullPhone = countryCode ? `${countryCode}${phone}` : phone;

    // ✅ Validation (optional)
    if (!firstName || !lastName || !email || !fullPhone || !eventTitle) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "All required fields must be provided."));
    }

    // ✅ Create and store registration in MongoDB
    const newRegistration = await EventRegistration.create({
      firstName,
      lastName,
      email,
      phone: fullPhone, // ✅ Properly save phone
      company,
      daysAttending,
      eventId,
      eventTitle,
      eventDate,
      eventTime,
      eventPlace,
      eventImage,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newRegistration,
          "Registration successful!"
        )
      );
  } catch (error) {
    console.error("❌ Registration error:", error);
    next(new ApiError(500, "Error during registration", error));
  }
};
