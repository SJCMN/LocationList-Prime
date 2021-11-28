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
    let searchTerm = action.payload.newItem
    let currentIndex = action.payload.currentIndex
    console.log('in fetchItem list saga currentIndex:', currentIndex)
    // add list id here
    // console.log('searchTerms in fetchItem saga', searchTerm);
    // send search term to the list router
    const response = yield axios.get(`/api/lists/keyword/${searchTerm}/${currentIndex}`, config);
    // set list item with value from search api object
    yield put({ type: 'SET_ITEM', payload: response.data });

    // set list with response matching list id
    const getResponse = yield axios.get(`/api/lists/${currentIndex}`)
    yield put({ type: 'SET_LIST', payload: getResponse.data })
  } catch (error) {
    console.log('Item get request failed', error);
  }
}


// Calls to server to request list from db
// List is always returned by order entered, grouped by hidden false, true
// DOM renders after SET_LIST
function* fetchList() {
  try {
    const response = yield axios.get('/api/lists');
    // console.log('in fetchList', response.data)
    yield put({ type: 'SET_LIST', payload: response.data });
    // yield put({ type: 'SET_LIST_ITEM_TABLE', payload: action.payload})
  } catch (err) {
    console.log('Error on SET_LIST: ', err);
    yield put({ type: 'FETCH_ERROR' })
  }
}



// Deletes one item based on id
function* deleteItem(action) {
  try {
    yield axios.delete(`/api/lists/${action.payload}`);
    yield put({ type: 'GET_LIST' })
  } catch (err) {
    console.log('Error on delete: ', err);
    yield put({ type: 'DELETE_ERROR' })
  }
}

// Flips boolean on item to be hidden or unhidden based on id, flips to the opposite state
// Triggers get of list after hidden status updates
function* toggleHide(action) {
  try {

    const currentIndex = action.payload.currentIndex

    if (action.payload.mode === 'SHOP') {
      yield axios.put(`/api/lists/hide/${action.payload.id}`);
    }
    else {
      yield axios.put(`/api/lists/hide/${action.payload.id}`)

      // set list with response matching list id
    const response = yield axios.get(`/api/lists/${currentIndex}`)
    yield put({ type: 'SET_LIST', payload: response.data })
    }
  } catch (err) {
    console.log('Error with hide toggle', err);
    yield put({ type: 'TOGGLE_HIDE_ERROR' })
  }
}

// add list index id to item
// REFACTOR THIS CODE TO BE USED FOR UPDATING AN ITEM TO ANOTHER LIST
function* setListIndexId(action) {
  try {

    console.log('setListIndex in list saga', action.payload)
    yield axios.put(`/api/lists/updateIndex/${action.payload.currentItem}`, { index: action.payload.currentIndex })


    yield put({ type: 'GET_LIST' })
  } catch (error) {
    console.log('ERROR in setListIndexId POST', error);

  }
}

function* toggleShop(action) {
  try {
    const currentIndex = action.payload.currentIndex
    const response = yield axios.get(`/api/lists/shop/${currentIndex}`);
    yield put({ type: 'SET_LIST', payload: response.data });
  } catch (err) {
    console.log('Error with shop toggle', err);
    yield put({ type: 'TOGGLE_SHOP_ERROR' })
  }

}


function* listSaga() {
  yield takeLatest('GET_ITEM', fetchItem);
  yield takeLatest('GET_LIST', fetchList);
  yield takeLatest('DELETE_ITEM', deleteItem);
  yield takeLatest('TOGGLE_HIDE_ITEM', toggleHide)
  yield takeLatest('TOGGLE_SHOP_MODE', toggleShop);
  yield takeLatest('TOGGLE_LIST_MODE', fetchList);
  yield takeLatest('SET_LIST_INDEX_ID', setListIndexId)
}

export default listSaga;