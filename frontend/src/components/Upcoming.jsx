import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Sample event for countdown
const eventDate = new Date("2025-12-10T10:00:00");

export default function Upcoming(){
     const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
      useEffect(() => {
        const timer = setInterval(() => {
          const diff = eventDate - new Date();
          if (diff <= 0) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return clearInterval(timer);
          }
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          });
        }, 1000);
        return () => clearInterval(timer);
      }, []);

    return(<section className="relative py-20 bg-cover  bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://img.freepik.com/free-vector/black-banner-with-yellow-geometric-shapes_1017-32327.jpg?semt=ais_hybrid&w=740&q=80')",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0  bg-opacity-60"></div>

  <div className="container mx-auto text-center relative z-10">
    <h3 className="text-4xl font-extrabold mb-12 text-white drop-shadow-lg">
      Upcoming Hackathons in 2026
    </h3>

    <div className="flex justify-center gap-8 text-2xl font-extrabold text-yellow-300">
      {["Days", "Hours", "Min", "Sec"].map((label, index) => {
        const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
        return (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: index * 0.1,
            }}
            className="bg-white/10 rounded-2xl px-8 py-6 mt-2 shadow-xl border-b-4 border-yellow-400 transform hover:shadow-2xl hover:scale-[1.02] transition duration-300">

            <p className="text-4xl mb-1 text-white">
              {String(values[index]).padStart(2, "0")}
            </p>
            <p className="text-sm font-medium text-gray-200">{label}</p>
          </motion.div>
        );
      })}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="mt-12 p-8 bg-white/10 backdrop-blur-md max-w-md mx-auto rounded-xl shadow-2xl border border-white/20"
    >
      <p className="text-2xl font-semibold text-white mb-4 drop-shadow-md">
        India's Biggest AI Hackathon 
      </p>
      <motion.button
        whileHover={{ scale: 1.05, rotate: -1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-lg"
      >
        Secure Your Spot
      </motion.button>
    </motion.div>
  </div>
</section>

    )
}