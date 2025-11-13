import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Contact() {
  return (
    <div>
        <Header/>
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center bg-fixed bg-center "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1759495440883-7558783ca686?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-600/90 via-indigo-700/90 to-blue-900/90"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 container mx-auto px-6 md:px-16 py-20 text-center"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg"
        >
          Get in <span className="text-yellow-400">Touch</span>
        </motion.h2>

        <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Have questions, event ideas, or partnership opportunities? We’d love
          to hear from you. Fill out the form below and our team will get back
          to you shortly.
        </p>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl text-left"
        >
          {/* Name */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="Event collaboration, partnership, inquiry..."
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,212,59,0.6)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10 text-gray-300 text-sm"
        >
          📍 Eventify HQ — Melbourne, Australia | ✉️ support@eventify.com
        </motion.p>
      </motion.div>
    </section>
    <Footer/>
    </div>
  );
}
