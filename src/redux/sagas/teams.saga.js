import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//worker saga: feth teams from the server
function* fetchTeams(){
    try{
        const response = yield(axios.get,'/api/teams');
        yield put({type: 'SET_TEAMS', payload: response.data});
    }catch(error){
        console.log('Error fetching teams', error);
    }
} 
//worker saga: listens for actions dispatch to the store, starts worker saga
function* teamsSaga(){
    yield takeLatest('FETCH_TEAMS', fetchTeams)
}

export default teamsSaga;