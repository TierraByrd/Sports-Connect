import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { fetchReviews } from '../actions/reviewActions';

const ReviewComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    // Component JSX
  );
};

export default ReviewComponent;
