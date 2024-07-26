import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Worker saga: fetch Reviews
function* fetchReviews(action) {
  console.log("Action payload for fetchReviews:", action.payload)
  try {
    const {team_name} = action.payload;
   yield axios.get(`/api/reviews/${team_name}`);
    console.log('fetchReviews saga works!', action.payload);
    yield put({ 
      type: 'SET_REVIEWS', 
      payload: action.payload 
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Worker saga: add review
function* addReview(action) {
  try {
    const response = yield axios.post(`/api/reviews`, action.payload);
    console.log('Add Review Saga works!', response.data);
    yield put({
      type: 'ADD_REVIEW_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    console.error('Error (Saga) adding review:', error);
    yield put({
      type: 'ADD_REVIEW_FAILURE',
      payload: error.message
    });
  }
}

// Worker saga: update a review
function* updateReview(action) {
  try {
   yield axios.put(`/api/reviews/${action.payload}`);
    console.log('Update Saga review works!', action.payload)
  } catch (error) {
    console.error('Error Saga updating review:', error);
  }
}

// Worker saga: delete review
function* deleteReview(action) {
   try {
    const { reviewId } = action.payload; 
    yield axios.delete(`/api/reviews/${reviewId}`);
     console.log('Delete in Saga works!', action.payload)
  } catch (error) {
    console.error('Error deleting review:', error);
  }
}

// Root saga for reviews operations
function* reviewsSaga() {
  yield takeLatest('FETCH_REVIEWS', fetchReviews);
  yield takeLatest('ADD_REVIEW', addReview);
  yield takeLatest('UPDATE_REVIEW', updateReview);
  yield takeLatest('DELETE_REVIEW', deleteReview);
}

export default reviewsSaga;