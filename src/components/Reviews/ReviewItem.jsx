import React from 'react';

function ReviewItem({ review }) {
  return (
    <div>
      <h3>User: {review.user_id}</h3>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comments}</p>
    </div>
  );
}

export default ReviewItem;