import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../Reviews/ReviewForms";
import axios from "axios";
import { useParams } from "react-router-dom";

function TeamDetails() {
  const {team_name } = useParams();
  const dispatch = useDispatch();
  const teamDetails = useSelector(state => state.teamReducer.teamDetails);
  const reviews = useSelector(state => state.reviewReducer.reviews);

  const [editReviewData, setEditReviewData] = useState(null);

  useEffect(() => {
    axios.get(`/api/teams/${team_name}`)
      .then((response) => {
        dispatch({
          type: "SET_TEAM_DETAILS",
          payload: response.data
        });
      })
      .catch(error => {
        console.error('Error fetching associated teams:', error);
      });

    axios.get(`/api/reviews/${team_name}`)
      .then((response) => {
        dispatch({
          type: 'SET_REVIEWS',
          payload: response.data
        });
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [dispatch, team_name]);

  const handleEdit = (reviewId) => {
    axios.put(`/api/reviews/${reviewId}`, editReviewData)
    .then((response) => {
      console.log('handleEdit works', response.data);
      dispatch({
        type: 'UPDATE_REVIEW',
        payload: response.data
      });
      // Clear edit form data
      setEditReviewData({
        rating: 1,
        comments: ""
      });
    })
    .catch(error => {
      console.error('Error updating review:', error);
    });
};

  const handleDelete = (reviewId) => {
    axios.delete(`/api/reviews/${reviewId}`)
      .then((response) => {
        console.log('DELETE review works!', response.data);
        dispatch({
          type: 'DELETE_REVIEW',
          payload: reviewId
        });
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  if (!teamDetails) {
    return <div>Loading team details...</div>;
  }

  return (
    <div>
      <h2>Team Details for {team_name}</h2>
      <p>Team Name: {teamDetails.team_name}</p>
      <p>Coach: {teamDetails.coach_name}</p>
      <p>Contact Info: {teamDetails.contact_info}</p>
      <p>Current Rating: {teamDetails.current_rating}</p>

      <h3>Reviews</h3>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <p>User: {review.user_id}</p>
              <p>Team:{review.team_name}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comments}</p>
              <button onClick={() => handleEdit(review.id)}>🖋️ Edit</button>
              <button onClick={() => handleDelete(review.id)}>🗑️ Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
          <ReviewForm team_name={team_name} 
          editReviewData={editReviewData} 
          setEditReviewData={setEditReviewData}
           />
    </div>
  );
}

export default TeamDetails; 