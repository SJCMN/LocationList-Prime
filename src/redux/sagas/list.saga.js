import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import listReducer from '../reducers/list.reducer';


// server config
const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

// worker Saga: will be fired on "GET_ITEM" actions
function* fetchItem(action) {
  try {
    let searchTerm = action.payload
    console.log('searchTerms in fetchItem saga', searchTerm);

    // send search term to the list router
    const response = yield axios.get(`/api/lists/keyword/${searchTerm}`, config);

    // set list item with value from search api object
    
    yield put({ type: 'SET_ITEM', payload: response.data });    

  } catch (error) {
    console.log('Item get request failed', error);
  }
}


// Fires on "GET_ITEM_XY"
function* fetchItemXY (action) {
    try {
        let TCIN = action.payload
        console.log('TCIN in fetchItemXY saga', TCIN);
        
        // send TCIN to second API
        const response = yield axios.get(`/api/lists/TCIN/${TCIN}`, config);
    
        // set list item with updated X Y coordinates
        yield put({ type: 'UPDATE_SET_ITEM', payload: response.data });
    
      } catch (error) {
        console.log('Item get request failed', error);
      }
}

function* saveItem (action) {
    try{

      console.log('saveItem payload', action.payload);
      yield axios.post('/api/lists', action.payload )

    } catch (error) {
        console.log('saveItem post failed', error);
        
    }
} 

function* listSaga() {
  yield takeLatest('GET_ITEM', fetchItem);
  // yield takeLatest('GET_ITEM_XY', fetchItemXY);
  yield takeLatest('SAVE_LIST_ITEM', saveItem)
}

export default listSaga;