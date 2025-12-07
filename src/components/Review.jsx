import React, { useState, useEffect } from "react";

const Review = () => {
  // --- LOGIC SECTION (Same as before) ---
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // For button animation
  const [formData, setFormData] = useState({
    username: "",
    rating: 5,
    comment: "",
  });

  // Load Data
  useEffect(() => {
    const savedData = localStorage.getItem("review-db-v2");
    if (savedData) setReviews(JSON.parse(savedData));
  }, []);

  // Save Data
  useEffect(() => {
    localStorage.setItem("review-db-v2", JSON.stringify(reviews));
  }, [reviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.comment.trim()) return;

    setIsSubmitting(true);

    // Simulate a tiny network delay for realism
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        ...formData,
        rating: Number(formData.rating),
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        color: getRandomColor(), // Assign a random avatar color
      };

      setReviews([newReview, ...reviews]);
      setFormData({ username: "", rating: 5, comment: "" });
      setIsSubmitting(false);
    }, 600);
  };

  // Helper: Random Gradients for Avatars
  const getRandomColor = () => {
    const colors = [
      "from-red-400 to-orange-400",
      "from-teal-400 to-emerald-400",
      "from-blue-400 to-indigo-400",
      "from-purple-400 to-pink-400",
      "from-fuchsia-400 to-rose-400",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // --- UI SECTION ---
  return (
    <div className="w-full max-w-6xl h-[85vh] bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/50 ring-1 ring-slate-900/5 font-sans relative">
      {/* Decorative Background Blob (Optional Visual Flair) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500"></div>

      {/* --- LEFT SIDE: FORM --- */}
      <div className="w-full md:w-[40%] bg-slate-50/50 p-8 md:p-12 flex flex-col justify-center relative border-r border-slate-100">
        <div className="mb-8">
          <div className="inline-block p-3 rounded-2xl bg-indigo-100 text-indigo-600 mb-4 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Your Feedback Matters
          </h1>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            We love hearing from our community. Share your experience and help
            others make better choices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. Alex Johnson"
              className="w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-200 rounded-xl text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:shadow-lg transition-all duration-200 ease-out"
              required
            />
          </div>

          {/* Rating Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
              Rating
            </label>
            <div className="relative group">
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-200 rounded-xl text-slate-700 appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:shadow-lg transition-all duration-200"
              >
                <option value="5">⭐⭐⭐⭐⭐ &nbsp; </option>
                <option value="4">⭐⭐⭐⭐ &nbsp; </option>
                <option value="3">⭐⭐⭐ &nbsp; </option>
                <option value="2">⭐⭐ &nbsp; </option>
                <option value="1">⭐ &nbsp; </option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-500 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
              Review
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your experience..."
              className="w-full px-5 py-3.5 bg-white border-0 ring-1 ring-slate-200 rounded-xl text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:shadow-lg transition-all duration-200 ease-out resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-indigo-200 transition-all duration-300 transform 
              ${
                isSubmitting
                  ? "bg-indigo-400 cursor-wait"
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 hover:-translate-y-1 active:scale-95"
              }
            `}
          >
            {isSubmitting ? "Posting..." : "Post Review"}
          </button>
        </form>
      </div>

      {/* --- RIGHT SIDE: REVIEWS --- */}
      <div className="w-full md:w-[60%] bg-white flex flex-col relative">
        {/* Header with Stats */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white/90 backdrop-blur sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Recent Reviews</h2>
            <p className="text-slate-400 text-xs mt-0.5">Community Feedback</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-slate-800">
              {reviews.length > 0
                ? (
                    reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
                  ).toFixed(1)
                : "0.0"}
            </span>
            <div className="flex flex-col">
              <div className="flex text-yellow-400 text-xs">★★★★★</div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide text-right">
                {reviews.length} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-50/30">
          {reviews.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                alt="No Reviews"
                className="w-24 h-24 mb-4 grayscale"
              />
              <p className="text-slate-500 font-medium">No reviews yet.</p>
              <p className="text-sm text-slate-400">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="group animate-slideIn bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  {/* Decorative Quote Mark */}
                  <div className="absolute top-4 right-6 text-9xl text-slate-50 font-serif opacity-50 select-none pointer-events-none">
                    ”
                  </div>

                  <div className="relative z-10 flex gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                        review.color || "from-indigo-400 to-purple-400"
                      } flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0`}
                    >
                      {review.username.charAt(0).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-800">
                            {review.username}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {review.timestamp}
                          </p>
                        </div>
                        <div className="bg-indigo-50 px-2.5 py-1 rounded-lg flex gap-1 text-yellow-400 text-xs shadow-sm">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-slate-200"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* --- CUSTOM STYLES (Animations & Scrollbar) --- */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}
      </style>
    </div>
  );
};

export default Review;
