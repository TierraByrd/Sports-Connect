import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker saga: fetch teams from the server
function* fetchTeams() {
  try {
    const response = yield axios.get('/api/teams');
    yield put({ type: 'SET_TEAMS', payload: response.data });
  } catch (error) {
    console.log('Error fetching teams', error);
  }
}

// watcher saga: watches for FETCH_TEAMS actions
export default function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
}
