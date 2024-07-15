import React, { useState } from "react";
import axios from "axios";

function EditReview({ review, onUpdate, onCancel }) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedReview = { rating, comment };

    axios.put(`/api/reviews/${review.id}`, updatedReview)
      .then(response => {
        onUpdate(response.data);
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
  };

  return (
    <div>
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
        <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button type="submit">Update Review</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditReview;