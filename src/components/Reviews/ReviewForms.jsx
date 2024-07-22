import React, { useState } from "react";

function ReviewForm() {
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");


  const addReview = (event) => {
    event.preventDefault();
   
    addReview({rating: rating, comments: comments})
    setRating("");
    setComments("");
  }

  return (
    <section>
    <form onSubmit={addReview}>
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
    </section>
  );
}

export default ReviewForm;