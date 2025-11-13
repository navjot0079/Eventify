import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './routes/AuthRouter.js';
import eventRoutes from './routes/EventRouter.js';
import RegisterEventRouter from './routes/RegisterEventRouter.js';
import testimonialRoutes from './routes/Testimonialrouter.js';
import BookingEvent from './routes/BookingRoutes.js'
import bookingDetailsRoutes from "./routes/BookDetailsroutes.js";
import AttendeeRoute from './routes/Attendeeroutes.js';
import AdminRoute from './routes/AdminRoutes.js'
import organizerRoutes from "./routes/organizeroutes.js";
import AllEvents from "./routes/event.router.js";
import uploadRoutes from "./routes/uploadroute.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MERN backend!' });
});

app.use('/auth',AuthRouter);
app.use("/events", eventRoutes);
app.use("/register", RegisterEventRouter);
app.use("/uploads", express.static("uploads")); 
app.use("/testimonials", testimonialRoutes);
app.use("/bookevent",BookingEvent);
app.use("/details", bookingDetailsRoutes);
app.use("/attendees",AttendeeRoute);
app.use("/organizer", organizerRoutes);
app.use("/admin-dashboard",AdminRoute);
app.use("/allevent", AllEvents);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));