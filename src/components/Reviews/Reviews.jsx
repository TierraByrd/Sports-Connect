import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, updateReview ,deleteReview } from '../../redux/sagas/reviews.saga';
import axios from 'axios';

function Reviews(){
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([])

  const [addReview, setNewReview] = useState({ rating: '', comments: '' });
  const [updateReview, setUpdateReview] = useState({ id: '', rating: '', comments: '' });

  useEffect(() => {
    axios.get('/api/reviews')
    .then(response => {
      setReviews(response.data);
    })
    .catch(error => {
      console.error('Error GET reviews')
    })
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReview({ ...addReview, [name]: value });
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateReview({ ...updateReview, [name]: value });
  };

  const handleAddReview = () => {
    dispatch({ type: 'ADD_REVIEW', payload: addReview });
    setNewReview({ rating: '', comments: '' });
  };

  const handleDeleteReview = (id) => {
    dispatch({ type: 'DELETE_REVIEW', payload: id });
  };

  const handleUpdateReview = (review) => {
    dispatch({ 
      type: 'UPDATE_REVIEW', 
      payload: updateReview });
    setUpdateReview(review);
  };

  return (
    <div>
      <h2>Reviews</h2>
      <div>
        <input type="number" name="rating" value={addReview.rating} onChange={handleInputChange} placeholder="Rating" />
        <input type="text" name="comments" value={addReview.comments} onChange={handleInputChange} placeholder="Comments" />
        <button onClick={handleAddReview}>Add Review</button>
      </div>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.comments}</p>
            <p>Rating: {review.rating}</p>
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
            <button onClick={() => handleUpdateReview(review)}>Edit</button>
          </li>
        ))}
      </ul>
      {updateReview.id && (
        <div>
          <h3>Edit Review</h3>
          <input type="number" name="rating" value={editReview.rating} onChange={handleUpdateInputChange} placeholder="Rating" />
          <input type="text" name="comments" value={editReview.comments} onChange={handleUpdateInputChange} placeholder="Comments" />
          <button onClick={handleUpdateReview}>Update Review</button>
        </div>
      )}
    </div>
  );
};

export default Reviews;