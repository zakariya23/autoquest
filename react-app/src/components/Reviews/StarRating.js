import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const handleStarClick = (value) => {
    onRatingChange(value);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => handleStarClick(i)}
        style={{
          cursor: "pointer",
          color: i <= rating ? "gold" : "lightgray",
        }}
      >
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;
