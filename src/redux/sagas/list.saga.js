import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

 

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

// Calls to server to request list from db
// List is always returned by order entered, grouped by hidden false, true
// DOM renders after SET_LIST
function* fetchList() {
  try{
      const response = yield axios.get('/api/lists');
      yield put({type: 'SET_LIST', payload: response.data});
  } catch (err) {
      console.log('Error on SET_LIST: ', err);
      yield put({type: 'FETCH_ERROR'})
  }
}

// Deletes one item based on id
function* deleteItem(action) {
    try{ 
      yield axios.delete(`/api/lists/${action.payload}`);
      yield put({type: 'GET_LIST'})
  } catch (err) {
      console.log('Error on delete: ', err);
      yield put({type: 'DELETE_ERROR'})
  }
}

// Flips boolean on item to be hidden or unhidden based on id, flips to the opposite state
// Triggers get of list after hidden status updates
function* toggleHide(action) {
  try{
    if (action.payload.mode === 'SHOP'){
    yield axios.put(`/api/lists/hide/${action.payload.id}`);}
    else {
      yield axios.put(`/api/lists/hide/${action.payload}`)
      yield put({type: 'GET_LIST'})
    }
  } catch (err) {
    console.log('Error with hide toggle', err);
    yield put({type: 'TOGGLE_HIDE_ERROR'})   
  }
}

function* updateList(action) {

  console.log('in updateList', action.payload);
  

  // try{
  //   yield axios.put(`/api/lists/update` , {list:action.payload});
  //   yield put({type: 'GET_LIST'})
  // } catch (err) {
  //   console.log('Error with updateList', err);
  //   yield put({type: 'UPDATE_LIST_ERROR'})   
  // }
}

// request to server, returns list from db with initial sort by item distance from selected store 0,0

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
  // yield takeLatest('UPDATE_DISTANCE', updateList)
}

export default listSaga;