import React, { useState, useEffect } from "react";

const ReviewApp = () => {
  // --- STATE MANAGEMENT ---
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    rating: 0, // Default to 0 so user has to select
    comment: "",
  });

  // --- LOGIC ---
  
  // Load from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("review-db-v3");
    if (savedData) setReviews(JSON.parse(savedData));
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("review-db-v3", JSON.stringify(reviews));
  }, [reviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.username.trim() || !formData.comment.trim() || formData.rating === 0) {
      alert("Please fill out all fields and select a star rating.");
      return;
    }

    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        color: getRandomColor(),
      };

      setReviews([newReview, ...reviews]);
      setFormData({ username: "", rating: 0, comment: "" });
      setIsSubmitting(false);
    }, 800);
  };

  const getRandomColor = () => {
    const colors = [
      "bg-blue-500", "bg-indigo-500", "bg-purple-500", 
      "bg-pink-500", "bg-rose-500", "bg-teal-500"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // --- UI COMPONENTS ---

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      
      {/* Main Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 border border-slate-200">
        
        {/* LEFT SIDE: FORM (Takes up 5 columns) */}
        <div className="md:col-span-5 bg-slate-50 p-8 flex flex-col justify-center border-r border-slate-100 relative">
            
            {/* Header Text */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Rate your experience
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Your feedback helps us improve. Tell us what you liked or what we can do better.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Miller"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm text-slate-700 placeholder:text-slate-300"
                />
              </div>

              {/* Custom Star Rater */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className={`text-2xl transition-transform hover:scale-110 focus:outline-none ${
                        star <= formData.rating ? "text-yellow-400" : "text-slate-200 hover:text-yellow-200"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Review
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm text-slate-700 placeholder:text-slate-300 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-white font-bold text-md shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 ${
                  isSubmitting
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </span>
                ) : (
                  "Post Review"
                )}
              </button>
            </form>
        </div>

        {/* RIGHT SIDE: REVIEWS LIST (Takes up 7 columns) */}
        <div className="md:col-span-7 bg-white flex flex-col h-[600px] md:h-[750px]">
          
          {/* List Header */}
          <div className="p-8 border-b border-slate-100 flex justify-between items-end bg-white sticky top-0 z-10">
            <div>
                <h3 className="text-xl font-bold text-slate-800">Recent Feedback</h3>
                <p className="text-slate-400 text-sm">See what others are saying</p>
            </div>
            <div className="text-right">
                <div className="text-3xl font-black text-slate-800 leading-none">
                    {reviews.length > 0
                        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
                        : "0.0"}
                </div>
                <div className="flex text-yellow-400 text-xs gap-0.5 justify-end mt-1">
                    ★★★★★
                </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {reviews.length === 0 ? (
                // Empty State
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl">💬</div>
                    <div>
                        <p className="text-slate-800 font-semibold">No reviews yet</p>
                        <p className="text-slate-400 text-sm">Be the first to share your experience!</p>
                    </div>
                </div>
            ) : (
                // Review List
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="flex gap-4 p-2 animate-fadeIn">
                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full ${review.color} text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0 mt-1`}>
                                {review.username.charAt(0).toUpperCase()}
                            </div>

                            {/* Content */}
                            <div className="flex-1 bg-slate-50 rounded-2xl p-5 relative group hover:bg-slate-100 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">{review.username}</h4>
                                        <span className="text-xs text-slate-400">{review.timestamp}</span>
                                    </div>
                                    <div className="flex text-yellow-400 text-xs">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={i < review.rating ? "text-yellow-400" : "text-slate-200"}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Helper Styles for Custom Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e2e8f0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #cbd5e1;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ReviewApp;