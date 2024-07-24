import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Worker saga: fetch Reviews
function* fetchReviews(action) {
  console.log("Action payload for fetchReviews:", action.payload)
  try {
    const response = yield axios.get(`/api/reviews/${action.pateam_name}`);
    console.log('fetchReviews saga works!', action.payload);
    yield put({ 
      type: 'SET_REVIEWS', 
      payload: response.data 
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Worker saga: add review
function* addReview(action) {
  try {
    yield axios.post(`/api/reviews`);
    console.log('addReview action.payload!', action.payload)
    yield put({ 
      type: 'FETCH_REVIEWS',
     
    });
  } catch (error) {
    console.error('Error (Saga) adding review:', error);
  }
}

// Worker saga: update a review
function* updateReview(action) {
  try {
    const { reviewId } = action.payload; 
    const response = yield axios.put(`/api/reviews/${reviewId}`);
    console.log('Update Saga review works!', action.payload)
    yield put({ 
      type: 'UPDATE_REVIEW', 
      payload: response.data 
    });
  } catch (error) {
    console.error('Error Saga updating review:', error);
  }
}

// Worker saga: delete review
function* deleteReview(action) {
  try {
    const { reviewId } = action.payload; 
    const response = yield axios.delete(`/api/reviews/${reviewId}`);
    console.log('Delete in Saga works!', action.payload)
    yield put({
      type: 'DELETE_REVIEW',
      payload: response.data
    });
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