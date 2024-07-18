import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview, updateReview } from "../../redux/sagas/reviews.saga";

function ReviewForm({}) {
  const [reviewData, setReviewData] = useState(
    initialReview || { reviewer_name: '', 
    review_text: '', rating: 1 });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (initialReview) {
      dispatch(updateReview(reviewData));
    } else {
      dispatch(addReview(reviewData));
    }
    // Clear form 
    setReviewData({ 
      reviewer_name: '', review_text: '', rating: 1 });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Reviewer Name" value={reviewData.reviewer_name} onChange={(e) => setReviewData({ ...reviewData, reviewer_name: e.target.value })} />
      <textarea placeholder="Review Text" value={reviewData.review_text} onChange={(e) => setReviewData({ ...reviewData, review_text: e.target.value })}></textarea>
      <select value={reviewData.rating} onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button type="submit">{initialReview ? 'Update Review' : 'Add Review'}</button>
    </form>
  );
}

export default ReviewForm;