import express from "express";
import { signupvalidation ,loginvalidation} from "../middlewares/AuthValidation.js";
import { signup } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";

const Authrouter = express.Router();

Authrouter.post("/login", loginvalidation,login);

Authrouter.post("/signup", signupvalidation, signup);

export default Authrouter;
