import React, { useState } from "react";
import axios from "axios";

function NewReview({ teamId, onAdd }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newReview = { team_id: teamId, rating, comment };

    axios.post('/api/reviews', newReview)
      .then(response => {
        onAdd(response.data);
        setRating('');
        setComment('');
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };

  return (
    <div>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
        <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default NewReview;