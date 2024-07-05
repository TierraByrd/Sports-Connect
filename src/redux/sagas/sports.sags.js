import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Action creators (no need for separate actions.js file)
const fetchSports = (sport_name) => ({
  type: 'FETCH_SPORTS',
  payload: { sport_name }
});

const setSports = (sports) => ({
  type: 'SET_SPORTS',
  payload: sports
});

const addSport = (sport_name, newSport) => ({
  type: 'ADD_SPORT',
  payload: { sport_name, newSport }
});

const setNewSport = (sport) => ({
  type: 'SET_NEW_SPORT',
  payload: sport
});

//worker saga: fetch sports from the server
function* fetchSportsSaga(action) {
  const { sport_name } = action.payload;
  try {
    const sportResponse = yield axios.get(`/api/sports`);
    yield put(setSports(sportResponse.data));
  } catch (error) {
    console.log('Error fetching sports', error);
  }
}

function* addSportSaga(action) {
  const { sport_name, newSport } = action.payload;
  try {
    const newSportResponse = yield axios.post(`/api/sports`, newSport);
    yield put(setNewSport(newSportResponse.data[0]));
    yield put(fetchSports({ sport_name })); 
  } catch (error) {
    console.log('Error adding team', error);
  }
}

function* sportsSaga() {
  yield takeLatest('FETCH_SPORTS', fetchSportsSaga);
  yield takeLatest('ADD_SPORTS', addSportSaga);
}

export default sportsSaga;