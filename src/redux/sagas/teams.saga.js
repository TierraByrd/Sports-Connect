import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// Action types and creators
export const fetchTeams = (sport_name) => ({
  type: 'FETCH_TEAMS',
  payload: { sport_name }
});

export const addTeam = (team_name, newTeam) => ({
  type: 'ADD_TEAM',
  payload: { team_name, newTeam }
});
export const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  payload: [teams]
});

export const setNewTeam = (teams) => ({
  type: 'SET_NEW_TEAM',
  payload: teams
});
function* fetchTeamsSaga(action) {
  const { sport_name } = action.payload;
  try {
    const teamResponse = yield axios.get(`/api/${sport_name}/teams`); // Updated URL
    yield put(setTeams(teamResponse.data));
  } catch (error) {
    console.log('Error fetching teams', error);
  }
}

function* addTeamSaga(action) {
  const { team_name, newTeam } = action.payload;
  try {
    const newTeamResponse = yield axios.post(`/api/:sport_name/teams`, newTeam);
    yield put(setNewTeam(newTeamResponse.data));
    yield put(fetchTeams(team_name)); // Assuming you want to fetch teams after adding a new one
  } catch (error) {
    console.log('Error adding team', error);
  }
}

export function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeamsSaga);
  yield takeLatest('ADD_TEAM', addTeamSaga);
}

export default teamsSaga;