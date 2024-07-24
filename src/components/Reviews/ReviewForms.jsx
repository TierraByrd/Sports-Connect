import React, { useState } from "react";
import { useDispatch} from "react-redux";

function ReviewForm({team_name}) {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const dispatch = useDispatch()

  const addReview = (event) => {
    event.preventDefault();

    // Here we can perform any actions needed with rating and comments
    console.log("Rating:", rating);
    console.log("Comments:", comments);

    // Reset the form fields after submission
    dispatch({
      type: 'ADD_REVIEW',
      payload: {
        team_name: team_name,
        rating: rating,
        comments: comments,
      }
    })
  };

  return (
    <section>
      <form onSubmit={addReview}>
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
        <button type="submit">Submit Review</button>
      </form>
    </section>
  );
}

export default ReviewForm;