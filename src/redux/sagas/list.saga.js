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

function* deleteItem(action) {
    try{ 
      yield axios.delete(`/api/lists/${action.payload}`);
      yield put({type: 'GET_LIST'})
  } catch (err) {
      console.log('Error on delete: ', err);
      yield put({type: 'DELETE_ERROR'})
  }
}

function* toggleHide(action) {
  try{
    yield axios.put(`/api/lists/hide/${action.payload}`);
    yield put({type: 'GET_LIST'})
  } catch (err) {
    console.log('Error with hide toggle', err);
    yield put({type: 'TOGGLE_HIDE_ERROR'})   
  }
}

function* toggleShop(action) {

    try{
      const response = yield axios.get(`/api/lists/shop/${action.payload}`);
      yield put({type: 'SET_LIST', payload: response.data}); 
    } catch (err) {
      console.log('Error with shop toggle', err);
      yield put({type: 'TOGGLE_SHOP_ERROR'})   
    }

}



function* listSaga() {
  yield takeLatest('GET_ITEM', fetchItem);
  yield takeLatest('GET_LIST', fetchList);
  yield takeLatest('DELETE_ITEM', deleteItem);
  yield takeLatest('TOGGLE_HIDE_ITEM', toggleHide)
  yield takeLatest('TOGGLE_SHOP_MODE', toggleShop);
  yield takeLatest('TOGGLE_LIST_MODE', fetchList);
}

export default listSaga;