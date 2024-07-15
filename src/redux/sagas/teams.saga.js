import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Worker saga: fetch teams
export function* fetchTeams(action) {
  try {
    const response = yield axios.get("/");
    yield put({ 
      type: "FETCH_TEAMS", 
      payload: response.data });
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
}
// Worker saga: add a team
export function* addTeam(action) {
  try {
    const response = yield axios.post('/api/teams/NewTeam', action.payload);
    yield put({
      type: 'SET_TEAM',
      payload: response.data
    });
  } catch (error) {
    console.error('Error adding team', error);
  }
}

// Worker saga: update a team
export function* updateTeam(action) {
  try {
    const response = yield axios.put(`/api/teams/${action.payload.updatedTeam.id}`, action.payload);
    yield put({ 
      type: 'UPDATE_TEAM',
      payload: response.data 
    });
  } catch (error) {
    console.error('Error updating team', error);
  }
}

// Worker saga: delete a team
export function* deleteTeam(action) {
  try {
    const response = yield axios.delete(`/api/teams/${action.payload.deleteTeam.id}`, action.payload);
    yield put({
       type: 'DELETE_TEAM', 
       payload: response.data 
    });
  } catch (error) {
    console.error('Error while deleting team', error);
  }
}

// Root saga for teams operations
function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeams);
  yield takeLatest('ADD_TEAM', addTeam);
  yield takeLatest('UPDATE_TEAM', updateTeam);
  yield takeLatest('DELETE_TEAM', deleteTeam);
}

export default teamsSaga;