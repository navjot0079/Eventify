import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RegisterEvents from "./pages/RegisterEvents";
import Contact from "./pages/Contact";
import FAQSection from "./components/FAQSection";
import Testimonials from "./components/Testimonial";
import BookEvents from "./pages/BookEvents";
import BookForm from "./components/BookForm";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizeDashboard";
import CreateEvent from "./components/CreateEvent.jsx";
import ViewRegistrations from "./pages/ViewRegistration.jsx";
import BrowseEvents from "./pages/BrowseEvents.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registerevent" element={ <RegisterEvents/>}/>
        <Route path="/contact" element={ <Contact/>}/>
        <Route path="/faq" element={ <FAQSection/>}/>
        <Route path="/testimonials" element={ <Testimonials/>}/>
        <Route path="/details" element={ <BookForm/>} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/bookevent" element={ <BookEvents/>} />
        <Route path="/allevent" element={ <BrowseEvents/>} />
        <Route path="/attendees" element={ <AttendeeDashboard/>} />
        <Route path="/admin-dashboard" element={ <AdminDashboard/>} />
        <Route path="/dashboard" element={ <OrganizerDashboard/>} />
        <Route path="/organizer/event/:eventTitle" element={<ViewRegistrations />} />

      </Routes>
    </div>
  );
}

export default App;
