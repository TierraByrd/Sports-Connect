import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//worker saga: fetch sports from the server
function* fetchSports(){
    try{
        const response = yield axios.get ('/api/sports');
        console.log('Fetched sports:', response.data);
        yield put({ type: 'SET_SPORTS', payload: response.data });
    }catch (error){
        console.error('Error fetching sports:', error);
    }
}
//worker saga: listens for actions dispatched to the store, starts worker saga
export function* sportsSaga() {
    yield takeLatest('FETCH_SPORTS', fetchSports);
  }

export default sportsSaga;