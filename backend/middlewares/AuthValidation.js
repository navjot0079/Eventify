import joi from "joi";

export const signupvalidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid("admin", "organizer", "attendee").optional(), // ✅ added
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error });
  }
  next();
};

export const loginvalidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error });
  }
  next();
};
