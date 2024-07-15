import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Worker saga: fetch sports
function* fetchSports (action) {
  try {
    const response = yield axios.get('/api/sports', action.payload);
    yield put({ 
      type: 'SET_SPORTS', 
      payload: response.data 
    });
  } catch (error) {
    console.error('Error fetching sports:', error);
  }
}
function* fetchSingleSports(action) {
  try {
    const response = yield axios.get('/api/sports/single', action.payload);
    yield put({ 
      type: 'SET_SINGLE_SPORTS',
      payload: response.data 
    })
  } catch (error) {
    console.error('Error fetching single sports:', error);
  }
}
function* fetchTeamSports(action) {
  try{
    const response = yield axios.get('/api/sports/team', action.payload);
    yield put({
      type: 'SET_TEAM_SPORTS',
      payload: response.data
    })
  } catch (error){
    console.error('Error fetching team sports', error)
  }
}

// Root saga for fetching sports
function* sportsSaga() {
  yield takeLatest('FETCH_SPORTS', fetchSports);
  yield takeLatest('FETCH_SINGLE_SPORTS',fetchSingleSports );
  yield takeLatest('FETCH_TEAM_SPORTS', fetchTeamSports)
}

export default sportsSaga;