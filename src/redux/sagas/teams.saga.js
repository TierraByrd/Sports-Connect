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

export const addTeam = (team_name, newTeam) => ({
  type: 'ADD_TEAM',
  payload: { team_name, newTeam }
});

export const setNewTeam = (team) => ({
  type: 'SET_NEW_TEAM',
  payload: team
});

function* fetchTeamsSaga(action) {
  const { sport_name } = action.payload;
  try {
    const teamResponse = yield axios.get(`/api/${sport_name}`);
    yield put(setTeams(teamResponse.data));
  } catch (error) {
    console.log('Error fetching teams', error);
  }
}

function* addTeamSaga(action) {
  const { team_name, newTeam } = action.payload;
  try {
    const newTeamResponse = yield axios.post(`/api/teams`, newTeam);
    yield put(setNewTeam(newTeamResponse.data[0]));
    yield put(fetchTeams({ team_name })); // Refetch teams after adding new team
  } catch (error) {
    console.log('Error adding team', error);
  }
}

function* teamsSaga() {
  yield takeLatest('FETCH_TEAMS', fetchTeamsSaga);
  yield takeLatest('ADD_TEAM', addTeamSaga);
}

export default teamsSaga;

