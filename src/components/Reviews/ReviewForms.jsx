import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";


function ReviewForm() {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {rating, comments};

    axios.post(`/api/reviews/$`, newReview)
      .then((response) => {
        dispatch({
          type: 'ADD_REVIEW',
          payload: response.data
        });
        // Reset form fields after successful submission
        setRating(1);
        setComments('');
  
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input 
        type="number" min="1" max="5" 
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
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;