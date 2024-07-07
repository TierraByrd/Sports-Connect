import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
 
// Action creators
export const fetchTeams = (sport_name) => ({
  type: 'FETCH_TEAMS',
  payload: { sport_name }
});

export const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  payload: teams
});

export const fetchTeamDetails = (sport_name, teamId) => ({
  type: 'FETCH_TEAM_DETAILS',
  payload: { sport_name, teamId }
});

export const setTeamDetails = (teamDetails) => ({
  type: 'SET_TEAM_DETAILS',
  payload: teamDetails
});


export const addTeam = (team_name, newTeam) => ({
  type: 'ADD_TEAM',
  payload: { team_name, newTeam }
});

export const setNewTeam = (team) => ({
  type: 'SET_NEW_TEAM',
  payload: team
});


export const updateTeam = (updatedTeam) => ({
  type: 'UPDATE_TEAM',
  payload: {updatedTeam }
});

export const deleteTeam = (team_name, teamId) => ({
  type: 'DELETE_TEAM',
  payload: { team_name, teamId }
});

//Worker saga fetch sports from the server
function* addTeamSaga(action) {
  const { team_name, newTeam } = action.payload;
  try {
    const newTeamResponse = yield axios.post(`/api/${sport_name}/teams`, newTeam);
    yield put(setNewTeam(newTeamResponse.data[0]));
    yield put(fetchTeams(team_name)); // Fetch teams after adding a new one
  } catch (error) {
    console.error('Error adding team:', error)
  }
}

// Worker saga: fetch team details
function* fetchTeamsSaga(action) {
  const { sport_name } = action.payload;
  try {
    const response = yield axios.get(`/api/${sport_name}/teams`);
    yield put(setTeams(response.data));
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}

function* fetchTeamDetailsSaga(action) {
  const { sport_name, teamId } = action.payload;
  try {
    const response = yield axios.get(`/api/${sport_name}/teams/${teamId}`);
    yield put(setTeamDetails(response.data));
  } catch (error) {
    console.error('Error fetching team details:', error);
  }
}

// Worker saga: update a team
function* updateTeamSaga(action) {
  const { team_name, updatedTeam } = action.payload;
  try {
    const updatedTeamResponse = yield axios.put(`/api/${sport_name}/teams/${updatedTeam.id}`, updatedTeam);
    yield put(updateTeamSuccess(updatedTeamResponse.data));
    yield put(fetchTeams(team_name)); // Fetch teams after updating
  } catch (error) {
    yield put(teamError(error));
  }
}

// Worker saga: delete a team
function* deleteTeamSaga(action) {
  const { sport_name, teamId } = action.payload;
  try {
    yield axios.delete(`/api/${sport_name}/teams/${teamId}`);
    yield put(deleteTeamSuccess(teamId));
  } catch (error) {
    yield put(teamError(error));
  }
}

// Root saga for teams operations

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeamsSaga);
  yield takeLatest('SET_TEAMS', setTeams)
  yield takeLatest('ADD_TEAM', addTeamSaga);
  yield takeLatest('FETCH_TEAM_DETAILS', fetchTeamDetailsSaga);
  yield takeLatest('UPDATE_TEAM', updateTeamSaga);
  yield takeLatest('DELETE_TEAM', deleteTeamSaga);
}

export default teamsSaga;
