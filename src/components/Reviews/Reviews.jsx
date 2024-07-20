import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Reviews() {
  const { team_name } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviewReducer.reviews);

  useEffect(() => {
    axios.get(`/api/reviews/${team_name}`)
      .then(response => {
        dispatch({ 
          type: 'SET_REVIEWS', 
          payload: response.data 
        });
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [dispatch, team_name]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews && reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p>{review.comments}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </ul>
    </div>
  );
}

export default Reviews;