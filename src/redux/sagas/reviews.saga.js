import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Worker saga: fetch Reviews
export function* fetchReviews(team_id) {
  try {
    const response = yield axios.get('/api/reviews/:team_id}');
    yield put({ 
      type: 'SET_REVIEWS', 
      payload: response.data 
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

// Worker saga: add review
export function* addReview(action) {
  try {
    const response = yield axios.post('/api/reviews', action.payload);
    yield put({ 
      type: 'ADD_REVIEW',
      payload: response.data 
    });
  } catch (error) {
    console.error('Error adding review:', error);
  }
}

// Worker saga: update a review
export function* updateReview(action) {
  try {
    const response = yield axios.put('/api/reviews', action.payload);
    yield put({ 
      type: 'UPDATE_REVIEW', 
      payload: response.data 
    });
  } catch (error) {
    console.error('Error updating review:', error);
  }
}

// Worker saga: delete review
export function* deleteReview(action) {
  try {
    const response = yield axios.delete(`/api/reviews/${action.payload}`);
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