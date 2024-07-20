import React from 'react';
import { useDispatch } from 'react-redux';


function ReviewItem({ review }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteReview(review.id)); // Assuming deleteReview action creator is defined properly
  };

  const handleEdit = () => {
    // Implement edit functionality as needed
    console.log("Implement edit functionality for review:", review);
  };

  return (
    <div>
      <h3>User: {review.user_id}</h3>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comments}</p>
      <button onClick={handleEdit}>🖋️ Edit</button>
      <button onClick={handleDelete}>🗑️ Delete</button>
    </div>
  );
}

export default ReviewItem;