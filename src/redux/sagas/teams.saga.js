import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Action creators (no need for separate actions.js file)
export const fetchTeams = (sport_name) => ({
  type: 'FETCH_TEAMS',
  payload: { sport_name }
});

const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  payload: teams
});

const addTeam = (sport_name, newTeam) => ({
  type: 'ADD_TEAM',
  payload: { sport_name, newTeam }
});

const setNewTeam = (team) => ({
  type: 'SET_NEW_TEAM',
  payload: team
});

function* fetchTeamsSaga(action) {
  const { sport_name } = action.payload;
  try {
    const teamResponse = yield axios.get(`/api/sports/${sport_name}`);
    yield put(setTeams(teamResponse.data));
  } catch (error) {
    console.log('Error fetching teams', error);
  }
}

function* addTeamSaga(action) {
  const { sport_name, newTeam } = action.payload;
  try {
    const newTeamResponse = yield axios.post(`/api/sports/${sport_name}`, newTeam);
    yield put(setNewTeam(newTeamResponse.data[0]));
    yield put(fetchTeams({ sport_name })); // Refetch teams after adding new team
  } catch (error) {
    console.log('Error adding team', error);
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeamsSaga);
  yield takeLatest('ADD_TEAM', addTeamSaga);
}

export default teamsSaga;

