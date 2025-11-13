import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Corporate Events",
      desc: "Partner with Eventify to make your next corporate event unforgettable with seamless organization and creativity.",
      img: "https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800",
    },
    {
      title: "Weddings",
      desc: "From dreamy décor to perfect coordination, Eventify ensures your special day is magical and stress-free.",
      img: "https://plus.unsplash.com/premium_photo-1664530452596-e1c17e342876?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Destination Events",
      desc: "Plan exotic destination celebrations with hassle-free arrangements, travel, and entertainment.",
      img: "https://images.unsplash.com/photo-1761121575313-04109e79d9b2?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800",
    },
    {
      title: "Stage Shows",
      desc: "From music concerts to fashion shows, we manage every detail with precision and flair.",
      img: "https://images.unsplash.com/photo-1761229661625-1ea4ca931b35?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Birthday Parties",
      desc: "Make your birthday celebrations vibrant and memorable with our personalized event themes.",
      img: "https://plus.unsplash.com/premium_photo-1681841166870-3b96b3904b6a?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800",
    },
    {
      title: "Concerts",
      desc: "Bring your music vision to life with stunning stage setups, lighting, and flawless concert management.",
      img: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800",
    },
  ];

  return (
    <section className="bg-gray-80 py-20 px-6 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-center mb-16">

        <p className="text-blue-600 font-bold  tracking-widest uppercase text-3xl">
          Our Services
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-6">
          Services by <span className="text-blue-600">Eventify</span> Event Management
        </h2>
        <p className="text-lg max-w-4xl mx-auto text-gray-700 leading-relaxed">
          Eventify is your trusted partner for managing every kind of event — from weddings to conferences and stage shows. 
          We provide comprehensive event solutions including venue booking, planning, décor, and entertainment management.
        </p>
        <img
          src="https://static.vecteezy.com/system/resources/previews/016/349/074/non_2x/abstract-luxury-text-divider-free-png.png"
          alt="divider"
          className="mx-auto mt-8 w-36 md:w-84 h-auto opacity-80"
        />
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group bg-white"
            whileHover={{ scale: 1.02 }}
          >
            {/* Image */}
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 
                            bg-black/20 group-hover:bg-black/60 transition-all duration-500">
              <h3
                className="text-2xl font-bold mb-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 
                           transition-all duration-500"
              >
                {service.title}
              </h3>
              <p
                className="text-sm md:text-base max-w-xs opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 
                           transition-all duration-700 delay-100"
              >
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
