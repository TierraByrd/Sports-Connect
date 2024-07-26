import React, { useState, useEffect } from "react";


  function ReviewForm({ team_name, addOrUpdateReview, editReviewData, setEditReviewData }) {
    const [rating, setRating] = useState('');
    const [comments, setComments] = useState('');
  
  
    // Populate the form with existing review data if editing
    useEffect(() => {
      if (editReviewData) {
        setRating(editReviewData.rating);
        setComments(editReviewData.comments);
      } else {
        // Reset the form if no review data is provided
        setRating('');
        setComments('');
      }
    }, [editReviewData]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const review = {
        id: editReviewData ? editReviewData.id : Date.now(), // Use existing ID if editing
        team_name: team_name,
        rating: rating,
        comments: comments,
        team_id: editReviewData ? editReviewData.team_id : null 
      };
      console.log('Submitting review:', review);
      addOrUpdateReview(review); // Dispatch action to add or update
    
      //Clear edit form data
      setEditReviewData(null)
    };
  
    return (
      <section>
        <form onSubmit={handleSubmit}>
          <label>
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Comments:
            <textarea
              placeholder="Comment"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">{editReviewData ? 'Update Review' : 'Submit Review'}</button>
        </form>
      </section>
    );
  }
  
  export default ReviewForm;