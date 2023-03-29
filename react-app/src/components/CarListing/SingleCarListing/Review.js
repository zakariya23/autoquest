import React from "react";

const Review = ({ review, onDelete }) => {
  const { rating, review_text } = review;

  return (
    <div className="review">
      <div className="review-content">
        <p>Rating: {rating}</p>
        <p>{review_text}</p>
      </div>
      <button className="review-delete-button" onClick={() => onDelete(review.id)}>
        Delete
      </button>
    </div>
  );
};

export default Review;
