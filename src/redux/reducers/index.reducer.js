import { combineReducers } from "redux";

const indexReducer = (state = [''], action) => {
    switch (action.type) {
        case 'SET_NEW_INDEX_NAME':
            // ADDS NEW LIST NAME "INDEX" TO REDUCER
            return action.payload
        default:
            return state;
    }
};

const currentIndex = (state = [''], action) => {
    switch (action.type) {
        case 'SET_SELECTED_INDEX':
            // ADDS CURRENT INDEX ID TO REDUCER 
            let selectedIndex = action.payload
            return selectedIndex
        case 'SET_NEW_INDEX':
            // ADDS CURRENT INDEX ID TO REDUCER 
            let newIndexArr = action.payload
            let newIndex = newIndexArr[newIndexArr.length-1]
            return newIndex.id
        default:
            return state;
    }
};


const indexName = ( state = [''], action ) => {
    switch (action.type) {
        case 'SET_SELECTED_INDEX_NAME':
            // ADDS CURRENT INDEX NAME TO REDUCER 
            let name = action.payload
            return name
        default:
            return state;
    }
}

export default combineReducers({
    indexReducer,
    currentIndex,
    indexName
});

