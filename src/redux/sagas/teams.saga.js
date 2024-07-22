import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Worker saga: fetch teams
function* fetchTeams(action) {
  try {
    const {sport_name} = action.payload;
    const response = yield axios.get(`/api/teams/${team_name}`);
    console.log('fetchTeams saga works!', action.payload) 
    yield put({ 
      type: 'SET_TEAMS', 
      payload: response.data 
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}
function* fetchTeamDetails(action){
  try{
    const response = yield axios.get(`/api/teams/${team_name}`, action.payload);
    yield put({
      type: 'SET_TEAM_DETAILS',
      payload: response.data
    })
  }catch (error){
    console.error('Error fetching team details', error)
  }
}
function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('FETCH_TEAM_DETAILS', fetchTeamDetails)
}

export default teamsSaga;