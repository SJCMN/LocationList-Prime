import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';





// adds new list name to db
function* setList(action) {

// server config
const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };
    // console.log('in setList', action.payload)
  try {   
    yield axios.post('/api/index', {newList: action.payload}, config);
    yield put({ type: 'FETCH_LIST_INDEX'}); 
  } catch (error) {
    
    console.log('Item POST request failed', error);
  }
}



// returns list names from db
function* fetchIndex() {
  try{
      const response = yield axios.get('/api/index');
      // send array from db to saga
      yield put({type: 'SET_NEW_INDEX_NAME', payload: response.data});
      // send array to saga to pull out newest index id
      yield put({type: 'SET_NEW_INDEX', payload: response.data})
      // yield axios.post('/api/index', {newList: action.payload}, config);
  } catch (error) {
      console.log('Error on fetchIndex GET: ', error);
      yield put({type: 'FETCH_ERROR'})
  }
}

// Deletes one list index based on id
function* deleteIndex(action) {
    try{ 
      yield axios.delete(`/api/index/${action.payload}`);
      yield put({type: 'FETCH_LIST_INDEX'})
  } catch (err) {
      console.log('Error on delete: ', err);
      yield put({type: 'DELETE_ERROR'})
  }
}



function* indexSaga() {
  yield takeLatest('SET_LIST_NAME', setList);
  yield takeLatest('FETCH_LIST_INDEX', fetchIndex)
  yield takeLatest('DELETE_LIST_INDEX', deleteIndex)
}

export default indexSaga;