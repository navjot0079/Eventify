import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const events = [
  {
    name: "Wedding",
    img: "https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg",
    desc: "Plan your dream wedding with elegant themes, catering, and floral decor.",
  },
  {
    name: "Birthday Party",
    img: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
    desc: "Celebrate your special day with custom cakes, decorations, and entertainment.",
  },
  {
    name: "Corporate Event",
    img: "https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg",
    desc: "Professional setups for seminars, conferences, and business gatherings.",
  },
  {
    name: "Get Together",
    img: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    desc: "Casual yet elegant setups for reconnecting with friends and family.",
  },
  {
    name: "Cocktail Party",
    img: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg",
    desc: "Enjoy a stylish evening with drinks, music, and elegant lighting.",
  },
  {
    name: "Engagement",
    img: "https://images.pexels.com/photos/265920/pexels-photo-265920.jpeg",
    desc: "A romantic setup for your engagement, with decorations and catering.",
  },
];

export default function BookEvents() {
  return (
    <div>
    <Header/>
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-8 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wider drop-shadow-lg"
      >
        🎊 Book Your Event
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/20 group"
          >
            <img
              src={event.img}
              alt={event.name}
              className="w-full h-56 object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
            />
            <div className="p-5">
              <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
              <p className="text-gray-300 text-sm mb-4">{event.desc}</p>

              <a href="/details"  rel="noopener noreferrer" className="block w-full">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full bg-linear-to-r from-blue-500 to-purple-600 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-purple-600 hover:to-blue-500 transition"
                >
                  Book Now
                </motion.button>
              </a>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
}
