import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faLocation } from "@fortawesome/free-solid-svg-icons";


const upcomingEvents = [
  {
    id: 1,
    title: "Global Tech Summit",
    date: "Dec 15, 2025",
    time: "10:00 AM",
    place: "New Delhi, India",
    image: "https://images.unsplash.com/photo-1561489411-c0ce86e994bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2xvYmFsJTIwdGVjaCUyMHN1bW1pdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    link: "#",
  },
  {
    id: 2,
    title: "Future of Design Workshop",
    date: "Jan 10, 2026",
    time: "09:30 AM",
    place: "Bangalore, India",
    image: "https://images.unsplash.com/photo-1747639814786-4854c087318c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RnV0dXJlJTIwb2YlMjBEZXNpZ24lMjBXb3Jrc2hvcCUyMGV2ZW50fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    link: "#",
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    date: "Feb 20, 2026",
    time: "02:00 PM",
    place: "Mumbai, India",
    image: "https://plus.unsplash.com/premium_photo-1681494662119-cd59993a64b7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fERpZ2l0YWwlMjBNYXJrZXRpbmclMjBNYXN0ZXJjbGFzc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    link: "#",
  },
];

export default function RegEvents() {
  return (
    <section id="upcoming" className="py-20 bg-gray-100">
      <div className="container mx-auto">
        <h3 className="text-4xl font-bold text-center tracking-widest  mb-16 text-blue-700">More Exciting Events</h3>
        <div className="grid md:grid-cols-3 gap-5 pl-3 pr-3">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, rotateY: 10 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-white rounded-2xl shadow-3xl overflow-hidden border border-gray-200 transform transition duration-500 cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 text-blue-700">{event.title}</h4>
                <p className="text-sm text-gray-500 font-medium mb-4">
                  <span className="text-lg text-red-500 mr-2"><FontAwesomeIcon icon={faCalendarDays} size="lg" style={{ color: "#FFD43B" }} />
                  </span> {event.date} at {event.time}
                  <br></br>
                  <FontAwesomeIcon className="mr-4 ml-0.5" icon={faLocation} size="lg" style={{color: "#FFD43B",}} />{event.place}
                </p>

                <Link
                  to="/registerevent"
                  state={event}  // Pass event details
                  className="block text-center bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition shadow-md"
                >
                  Register Now
                </Link>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}