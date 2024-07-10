import React from "react";

function ReviewItem({ review, onEdit, onDelete }) {
  return (
    <div>
      <p>{review.comment} - Rating: {review.rating}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default ReviewItem;