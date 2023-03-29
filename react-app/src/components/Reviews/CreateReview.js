import React, { useState } from "react";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit, review }) => {
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [review_text, setContent] = useState(review ? review.review_text : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, review_text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="rating">Rating:</label>
      <StarRating rating={rating} onRatingChange={setRating} />
      <label htmlFor="content">Review:</label>
      <div>
      <textarea
        id="review_text"
        value={review_text}
        onChange={(e) => setContent(e.target.value)}
      />
      </div>

      <div>
      <button type="submit">Submit</button>
      </div>

    </form>
  );
};

export default ReviewForm;
