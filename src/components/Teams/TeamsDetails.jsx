import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReviewForm from "../Reviews/ReviewForms";
import axios from "axios";
import { useParams } from "react-router-dom";

function TeamDetails() {
  const { team_name } = useParams();
  const dispatch = useDispatch();
  const teamDetails = useSelector(state => state.teamReducer.teamDetails);
  const reviews = useSelector(state => state.reviewReducer.reviews);

  const [editReviewData, setEditReviewData] = useState(null);

  useEffect(() => {
    axios.get(`/api/teams`)
      .then((response) => {
        dispatch({
          type: "SET_TEAM_DETAILS",
          payload: response.data
        });
      })
      .catch(error => {
        console.error('Error fetching team details:', error);
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
    const reviewToEdit = reviews.find(review => review.id === reviewId);
    if (reviewToEdit) {
      setEditReviewData(reviewToEdit);
    }
  };
  
  const handleDelete = (reviewId) => {
    dispatch({
      type: 'DELETE_REVIEW',
      payload: reviewId
    });
  };

  // Add or update Review
  const addOrUpdateReview = (review) => {
    if (review.id && review.id !== Date.now()) {
      // Update existing review
      dispatch({
        type: 'UPDATE_REVIEW',
        payload: review
      });
    } else {
      // Add new review
      dispatch({
        type: 'ADD_REVIEW',
        payload: review
      });
    }
    setEditReviewData(null); // Clear the edit form after submission
  };

  if (!teamDetails) {
    return <div>Loading team details...</div>;
  }

  return (
    <div>
      <h2>Team Details for {team_name}</h2>
      <p>Team Name: {team_name}</p>
      <p>Coach: {teamDetails.coach_name}</p>
      <p>Contact Info: {teamDetails.contact_info}</p>
      <p>Current Rating: {teamDetails.current_rating}</p>

      <h3>Reviews</h3>
      {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
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

      <ReviewForm
        team_name={team_name}
        addOrUpdateReview={addOrUpdateReview}
        editReviewData={editReviewData}
        setEditReviewData={setEditReviewData}
      />
    </div>
  );
}

export default TeamDetails;