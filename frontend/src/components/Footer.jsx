import { motion } from "framer-motion"

export default function Footer(){
    return(
        <footer
        id="contact"
        className="bg-linear-to-r from-purple-800 to-indigo-900 text-white py-12 relative overflow-hidden"
      >
        {/* Animated background shapes for dynamic feel */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, #4F46E5 25%, transparent 25%), linear-gradient(45deg, #4F46E5 25%, transparent 25%), linear-gradient(225deg, #4F46E5 25%, transparent 25%), linear-gradient(315deg, #4F46E5 25%, #4F46E5 25%)', backgroundSize: '100px 100px' }}></div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto text-center relative z-10"
        >
          <h4 className="text-3xl font-extrabold mb-4 text-yellow-300">Ready to Get Started?</h4>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Contact us today to learn how Eventify can transform your event planning experience.
          </p>
          <button className="bg-yellow-400 text-purple-800 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-300 transition duration-300 transform hover:-translate-y-1">
            Contact Us
          </button>
          <div className="mt-8 border-t border-purple-500 pt-6">
            <div className="flex justify-center gap-8 text-lg font-medium">
              <a href="#" className="hover:text-yellow-300 transition">Facebook</a>
              <a href="#" className="hover:text-yellow-300 transition">Instagram</a>
              <a href="#" className="hover:text-yellow-300 transition">Twitter</a>
            </div>
            <p className="text-sm text-gray-400 mt-4">© 2025 Eventify. All Rights Reserved.</p>
          </div>
        </motion.div>
      </footer>
    )
}