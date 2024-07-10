import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//worker saga: fetch sports
export function* fetchSports(action) {
  try {
    const sportResponse = yield axios.get(`/api/sports`, action.payload);
    yield put({ 
      type: 'SET_SPORTS', 
      payload: sportResponse.data });
  } catch (error) {
    console.error('Error fetching sports:', error);
  }
}
//worker saga: add sport
export function* addSport(action) {
  try {
    const addSportResponse = yield axios.post('/api/sports/NewSport', action.payload);
    yield put({ 
      type: 'ADD_SPORT',
     payload: addSportResponse.data 
    });
  } catch (error) {
    console.error('Error adding sport:', error);
  }
}
// Worker saga: update a sport
export function* updateSport(action) {
  try {
    const updateSportResponse = yield axios.put('/api/sports/UpdateSport', action.payload);
    yield put({ 
      type: 'UPDATE_SPORT', 
      payload: updateSportResponse.data 
    });
  } catch (error) {
    console.error('Error updating sport:', error);
  }
}

export function* deleteSport(action) {
  try {
    const deleteSportResopnse = yield axios.put('api/sports/DeleteReview', action.payload);
    yield put({
       type: 'DELETE_SPORTS',
       payload: deleteSportResopnse.data
    });
    } catch (error) {
    console.error('Error deleting sport:', error);
  }
}

// Root saga for reviews operations
function* SportsSaga() {
  yield takeLatest('FETCH_SPORT', fetchSports);
  yield takeLatest('ADD_SPORT', addSport);
  yield takeLatest('UPDATE_SPORT', updateSport);
  yield takeLatest('DELETE_SPORT', deleteSport);
}

export default SportsSaga;
