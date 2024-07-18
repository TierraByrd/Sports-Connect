import React from "react";

function ReviewItem({review}) {
  return (
    <div>
      <h3>{review.reviewer_name}</h3>
      <p>Rating: {review.rating}</p>
      <button onClick={onEdit}>🖋️Edit</button>
      <button onClick={onDelete}>🗑️ Delete</button>
    </div>
  );
}

export default ReviewItem;