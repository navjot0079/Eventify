import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const sentences = [
    "Organize & Discover Events Effortlessly",
    "Experience Seamless Event Management",
  ];
const navigate = useNavigate();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (index === sentences.length) return;

    const currentSentence = sentences[index];

    // Adjust typing speed for smoothness
    let speed = deleting ? 45 : 85;
    if (!deleting && subIndex < currentSentence.length && Math.random() < 0.1) {
      speed += 100; // small random pause while typing
    }
    setTypingSpeed(speed);

    const timeout = setTimeout(() => {
      if (!deleting && subIndex < currentSentence.length) {
        setText(currentSentence.substring(0, subIndex + 1));
        setSubIndex((prev) => prev + 1);
      } else if (deleting && subIndex > 0) {
        setText(currentSentence.substring(0, subIndex - 1));
        setSubIndex((prev) => prev - 1);
      } else if (!deleting && subIndex === currentSentence.length) {
        setTimeout(() => setDeleting(true), 1500); // pause at full text
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % sentences.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, typingSpeed]);

  return (
    <section className="pt-32 pb-20 bg-linear-to-r from-purple-700 via-indigo-600 to-blue-900  text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')]"></div>
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: -50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
        className="container mx-auto relative z-10"
      >
        {/* Typing Animation */}
        <h2 className="text-5xl md:text-7xl font-extrabold mb-5 drop-shadow-lg leading-tight">
          <span className="text-yellow-300">{text}</span>
          <motion.span
            animate={{ opacity: blink ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="inline-block w-1 ml-1 bg-yellow-300"
          >
            &nbsp;
          </motion.span>
        </h2>

        <p className="text-xl mb-8 font-light max-w-3xl mx-auto">
          Join thousands of event creators and attendees exploring the most exciting events near you.
        </p>

    <motion.button
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 8px 15px rgba(255, 255, 255, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/allevent")} // 👈 Added navigation
      className="bg-yellow-400 text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-yellow-300 transition duration-300 transform hover:-translate-y-1"
    >
      Explore Events
    </motion.button>
      </motion.div>
    </section>
  );
}
