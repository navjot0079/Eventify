import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Upcoming from "../components/Upcoming";
import RegEvents from "../components/RegEvents";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Testimonials from "../components/Testimonial";


export default function Home() {

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* ================= HEADER ================= */}
      <Header/>
      {/* --- */}

      {/* ================= HERO SECTION ================= */}
      <Hero/>
      {/* --- */}

      {/* ================= FEATURE SECTION ================= */}
      <Services/>
      {/* --- */}

      {/* ================= UPCOMING EVENT SECTION (Countdown) ================= */}
      <Upcoming/>
      {/* --- */}

      {/* ================= UPCOMING EVENTS & REGISTRATION ================= */}
      <RegEvents/>
      {/* --- */}

      {/* ================= TESTIMONIAL SECTION ================= */}
      
      {/* --- */}

      {/* ================= FOOTER ================= */}
      <Footer/>
      {/* --- */}

      <ToastContainer />
    </div>
  );
}