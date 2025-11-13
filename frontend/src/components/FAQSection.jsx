import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const faqs = [
  {
    question: "What is Eventify and how does it work?",
    answer:
      "Eventify helps you create, manage, and attend events easily — from small meetups to large conferences. You can handle registrations, ticketing, and scheduling in one platform.",
  },
  {
    question: "Can I create events as an organizer?",
    answer:
      "Yes! Organizers can create and manage events with ease. Each event can include custom details, images, schedules, and registration links.",
  },
  {
    question: "Is Eventify free to use?",
    answer:
      "Eventify offers both free and premium plans. You can host basic events for free, while premium plans unlock advanced analytics and branding options.",
  },
  {
    question: "Can I access Eventify on mobile?",
    answer:
      "Absolutely! Eventify is fully responsive and works smoothly on mobile, tablet, and desktop devices.",
  },
  {
    question: "How can I get support?",
    answer:
      "You can reach our support team via the Contact page or email us at support@eventify.com. We're here to help 24/7!",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
    <Header/>
    <section className="relative min-h-screen bg-linear-to-br from-yellow-100 via-blue-200 to-purple-200 text-gray-900 py-20 px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-12 bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        Frequently Asked Questions
      </motion.h2>

      {/* FAQ Container */}
      <div className="w-full max-w-3xl space-y-5 z-10 ">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleFAQ(index)}
            className={`bg-white border border-gray-200 rounded-2xl shadow-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-cyan-400 ${
              openIndex === index ? "border-blue-400 shadow-cyan-100" : ""
            }`}
          >
            {/* Question */}
            <div className="flex justify-between items-center ">
              <h3
                className={`text-lg font-semibold tracking-wide transition-colors duration-200 ${
                  openIndex === index ? "text-blue-400" : "text-gray-800"
                }`}
              >
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="text-blue-500" />
              ) : (
                <ChevronDown className="text-blue-500" />
              )}
            </div>

            {/* Animated Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-gray-600 text-sm leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Floating Animated Backgrounds */}
      <motion.div
        className="absolute w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl top-20 left-20"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-200/40 rounded-full blur-3xl bottom-10 right-10"
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </section>
      <Footer/>
      </div>
  );
};

export default FAQSection;
