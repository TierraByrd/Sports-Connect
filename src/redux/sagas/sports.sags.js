import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Action types and creators
export const fetchSports = (sport_name) => ({
  type: 'FETCH_SPORTS',
  payload: { sport_name }
});

export const setSports = (sports) => ({
  type: 'SET_SPORTS',
  payload: sports
});

export const addSport = (sport_name, newSport) => ({
  type: 'ADD_SPORT',
  payload: { sport_name, newSport }
});

export const setNewSport = (sport) => ({
  type: 'SET_NEW_SPORT',
  payload: sport
});

// Worker saga: fetch sports from the server
function* fetchSportsSaga(action) {
  const { sport_name } = action.payload;
  try {
    const sportResponse = yield axios.get(`/api/sports`);
    yield put(setSports(sportResponse.data));
  } catch (error) {
    console.log('Error fetching sports', error);
  }
}

// Worker saga: add a new sport
function* addSportSaga(action) {
  const { sport_name, newSport } = action.payload;
  try {
    const newSportResponse = yield axios.post(`/api/sports`, newSport);
    yield put(setNewSport(newSportResponse.data[0]));
    yield put(fetchSports(sport_name)); // Note: Use sport_name directly, not { sport_name }
  } catch (error) {
    console.log('Error adding sport', error);
  }
}

// Root saga for sports operations
function* sportsSaga() {
  yield takeLatest('FETCH_SPORTS', fetchSportsSaga);
  yield takeLatest('ADD_SPORTS', addSportSaga);
}

export default sportsSaga;