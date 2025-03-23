import React, { useState } from 'react';

const Rating = ({ initialRating = 0, maxStars = 5 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1 p-4">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-600'
            }`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;

