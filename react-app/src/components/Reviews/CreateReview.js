import React, { useState } from "react";
import StarRating from "./StarRating";

const ReviewForm = ({ onSubmit, review }) => {
  const [rating, setRating] = useState(review ? review.rating : 0);
  const [review_text, setContent] = useState(review ? review.review_text : "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!review_text.trim()) {
      setErrorMessage("Review text cannot be left empty.");
      return;
    }

    if (review_text.length > 1000) {
      setErrorMessage("Review text should be less than 1000 characters.");
      return;
    }

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
      {errorMessage && <p className="error-message" style={{fontWeight: 'bold', color: 'red'}}>{errorMessage}</p>}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
