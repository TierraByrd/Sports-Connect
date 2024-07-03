import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker saga: fetch review
function* fetchReviews(action) {
  try {
    const response = yield axios.get('/api/reviews');
    yield put({ type: 'SET_REVIEWS', payload: response.data });
  } catch (error) {
    console.log('Error fetching reviews:', error);
  }
}

// watcher saga: watches for FETCH_REVIEWS actions
export default function* reviewsSaga() {
  yield takeLatest('FETCH_REVIEWS', fetchReviews);
}
