import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function ReviewForm({ team_name }) {
  const dispatch = useDispatch();
  const [reviewData, setReviewData] = useState({
    date: new Date().toISOString(),
    user_id: 1, // Assuming you have a way to determine the user id
    team_id: 1, // You may need to adjust how you get the team_id
    rating: 1,
    comments: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/reviews/${team_name}`, reviewData)
      .then(response => {
        dispatch({
          type: 'ADD_REVIEW',
          payload: response.data
        });
        setReviewData({
          date: new Date().toISOString(),
          user_id: 1,
          team_id: 1,
          rating: 1,
          comments: ""
        });
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Username: {/* Display username here */}</p>
      <p>Team: {team_name}</p>
      <textarea
        placeholder="Comments"
        value={reviewData.comments}
        onChange={(event) => setReviewData({ ...reviewData, comments: event.target.value })}
      ></textarea>
      <select
        value={reviewData.rating}
        onChange={(event) => setReviewData({ ...reviewData, rating: Number(event.target.value) })}
      >
        <option value="1">⭐️</option>
        <option value="2">⭐️⭐️</option>
        <option value="3">⭐️⭐️⭐️</option>
        <option value="4">⭐️⭐️⭐️⭐️</option>
        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
      </select>
      <button type="submit">Add Review</button>
    </form>
  );
}

export default ReviewForm;