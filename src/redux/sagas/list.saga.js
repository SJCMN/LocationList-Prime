import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import listReducer from '../reducers/item.reducer';


// server config
const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

// worker Saga: will be fired on "GET_ITEM" actions
function* fetchItem(action) {
  try {
    let searchTerm = action.payload
    // console.log('searchTerms in fetchItem saga', searchTerm);
    // send search term to the list router
    const response = yield axios.get(`/api/lists/keyword/${searchTerm}`, config);

    // set list item with value from search api object
    yield put({ type: 'SET_ITEM', payload: response.data });    
    yield put({type: 'GET_LIST'})
  } catch (error) {
    console.log('Item get request failed', error);
  }
}


function* fetchList() {
  try{
      const response = yield axios.get('/api/lists');
      yield put({type: 'SET_LIST', payload: response.data});
  } catch (err) {
      console.log('Error on SET_LIST: ', err);
      yield put({type: 'FETCH_ERROR'})
  }
}



function* listSaga() {
  yield takeLatest('GET_ITEM', fetchItem);
  yield takeLatest('GET_LIST', fetchList);
}

export default listSaga;