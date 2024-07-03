import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//worker saga: fetch sports from the server
function* fetchSports(){
    try{
      const config ={
        headers: { 'Content-type': 'application/json'},
        withCredentials: true, 
      };
        const response = yield axios.get('/api/sports', config);
        console.log('Fetched sports:', response.data);
        yield put({ type: 'SET_SPORTS', payload: response.data });
    }catch (error){
        console.log('Error fetching sports:', error);
    }
}
//worker saga: listens for actions dispatched to the store, starts worker saga
function* sportsSaga() {
    yield takeLatest('FETCH_SPORTS', fetchSports);
  }

export default sportsSaga;