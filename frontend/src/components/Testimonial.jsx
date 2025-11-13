import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";

library.add(fas);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    text: "",
    rating: 0,
    image: null,
  });

  // Fetch testimonials from backend
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/testimonials");
      const data = await res.json();
      if (data.success) setTestimonials(data.testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewReview((prev) => ({ ...prev, image: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, role, text, rating, image } = newReview;
    if (!name || !role || !text || rating === 0 || !image) {
      toast.error("Please fill all fields and upload an image!", { position: "top-center" });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("text", text);
    formData.append("rating", rating);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/testimonials/add", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Review submitted successfully!", { position: "top-center" });
        setNewReview({ name: "", role: "", text: "", rating: 0, image: null });
        fetchTestimonials();
      } else {
        toast.warn(`Failed to submit review: ${data.message}`, { position: "top-center" });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Server error. Please check backend logs!", { position: "top-center" });
    }
  };

  const renderStars = (rating) => (
    <div className="flex mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={["fas", "star"]}
          style={{
            color: i < rating ? "#FFD43B" : "#E5E7EB",
            marginRight: "4px",
          }}
        />
      ))}
    </div>
  );

  return (
    <div>
        <Header/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-6 py-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Hear from our <span className="text-blue-600">trusted clients</span>
        </h2>

        {/* ===== Testimonial Slider / Empty State ===== */}
        {testimonials.length > 0 ? (
          <div className="relative flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-3xl p-8 w-full max-w-4xl">
            {/* Left Side - Image + Info */}
            <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
              <img
                src={`http://localhost:5000${testimonials[current].image}`}
                alt={testimonials[current].name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-cyan-400"
              />
              <h3 className="text-xl font-semibold">{testimonials[current].name}</h3>
              <p className="text-gray-500">{testimonials[current].role}</p>
              {renderStars(testimonials[current].rating)}
            </div>

            {/* Right Side - Review Text */}
            <div className="md:w-2/3 mt-6 md:mt-0 md:ml-10 text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.6 }}
                  className="text-gray-700 text-lg italic leading-relaxed"
                >
                  "{testimonials[current].text}"
                </motion.p>
              </AnimatePresence>

              <div className="flex justify-center md:justify-start items-center gap-4 mt-6 text-cyan-600 font-semibold">
                <button
                  onClick={() =>
                    setCurrent(
                      (prev) => (prev - 1 + testimonials.length) % testimonials.length
                    )
                  }
                  className="hover:text-cyan-800 transition-all"
                >
                  ←
                </button>
                <span>
                  {current + 1} / {testimonials.length}
                </span>
                <button
                  onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                  className="hover:text-cyan-800 transition-all"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              No testimonials yet
            </h3>
            <p className="text-gray-500">Be the first to share your experience!</p>
          </div>
        )}

        {/* ===== Add Review Form (Always Visible) ===== */}
        <div className="mt-12 bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Share your experience ⭐
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleChange}
                placeholder="Your name"
                className="p-3 rounded-xl border border-gray-300 focus:border-cyan-500 outline-none w-full"
              />
              <input
                type="text"
                name="role"
                value={newReview.role}
                onChange={handleChange}
                placeholder="Your role (Customer, Organizer, etc)"
                className="p-3 rounded-xl border border-gray-300 focus:border-cyan-500 outline-none w-full"
              />
            </div>

            <textarea
              name="text"
              value={newReview.text}
              onChange={handleChange}
              placeholder="Write your testimonial..."
              rows="4"
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-cyan-500 outline-none"
            />

            {/* Image Upload Section */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-cyan-400 rounded-2xl p-6 bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-cyan-300">
              {newReview.image ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={URL.createObjectURL(newReview.image)}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 shadow-md"
                  />
                  <p className="text-gray-200 text-sm">Image ready for upload</p>
                  <button
                    type="button"
                    onClick={() => setNewReview((prev) => ({ ...prev, image: null }))}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer flex flex-col items-center text-center text-cyan-300 hover:text-cyan-200 transition-all"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-cyan-500/20 rounded-full mb-3 border border-cyan-300">
                    <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} size="2x" />
                  </div>
                  <span className="text-sm font-semibold">
                    Click to Upload Image
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    PNG, JPG, JPEG up to 2MB
                  </span>
                  <input
                    id="imageUpload"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>


            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={["fas", "star"]}
                  size="lg"
                  className={`cursor-pointer ${i < newReview.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  onClick={() =>
                    setNewReview((prev) => ({ ...prev, rating: i + 1 }))
                  }
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/40 transition-all"
            >
              Submit Review
            </motion.button>
          </form>
        </div>
      </div>
      <Footer/>
      
      </div>
  );
};

export default Testimonials;
