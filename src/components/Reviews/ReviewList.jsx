import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import ReviewItem from "./ReviewItem";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ReviewList(){
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
          <h2>Reviews for {team_name}</h2>
          {reviews && reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}
export default ReviewList;