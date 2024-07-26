import React from 'react';

function ReviewItem({ review }) {
  return (
    <div>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comments}</p>
    </div>
  );
}

export default ReviewItem;