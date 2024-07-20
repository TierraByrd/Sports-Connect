import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, updateReview, deleteReview } from '../redux/actions/reviewActions';

const Reviews = ({ team_name }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviewReducer.reviews);

  const [editReviewData, setEditReviewData] = useState({
    id: null,
    rating: '',
    comments: ''
  });

  useEffect(() => {
    dispatch(fetchReviews(team_name)); 
  }, [dispatch, team_name]);

  const handleEditReview = (review) => {
    setEditReviewData({
      id: review.id,
      rating: review.rating,
      comments: review.comments
    });
  };

  const handleSubmitEdit = () => {
    dispatch(updateReview(editReviewData.id, editReviewData));
    setEditReviewData({ id: null, user_id: loggedInUser.id, rating: '', comments: '' });
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(reviewId));
    }
  };

  const handleAddReview = () => {
    const newReview = {
      user_id: loggedInUser.id,
      rating: editReviewData.rating,
      comments: editReviewData.comments
    };
    dispatch(addReview(newReview));
    setEditReviewData({ id: null, user_id: loggedInUser.id, rating: '', comments: '' });
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>User: {review.user_name}</p>
            <p>Rating: {review.rating}</p>
            <p>Comments: {review.comments}</p>
            <button onClick={() => handleEditReview(review)}>Edit</button>
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Edit Review Form */}
      {editReviewData.id !== null && (
        <div>
          <h3>{editReviewData.id ? 'Edit Review' : 'Add Review'}</h3>
          <p>User: {loggedInUser.name}</p>
          <label>Rating:</label>
          <input type="number" value={editReviewData.rating} onChange={(e) => setEditReviewData({ ...editReviewData, rating: e.target.value })} />
          <br />
          <label>Comments:</label>
          <textarea value={editReviewData.comments} onChange={(e) => setEditReviewData({ ...editReviewData, comments: e.target.value })} />
          <br />
          <button onClick={editReviewData.id ? handleSubmitEdit : handleAddReview}>{editReviewData.id ? 'Update' : 'Add'}</button>
        </div>
      )}
    </div>
  );
};

export default Reviews;