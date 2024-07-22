import React, { useState } from "react";

function ReviewForm() {
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here we can perform any actions needed with rating and comments
    console.log("Rating:", rating);
    console.log("Comments:", comments);

    // Reset the form fields after submission
    setRating("");
    setComments("");
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
        <button type="submit">Submit Review</button>
      </form>
    </section>
  );
}

export default ReviewForm;