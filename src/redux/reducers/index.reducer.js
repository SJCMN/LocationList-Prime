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
            // ADDS CURRENT INDEX ID TO REDUCER TO GRAB LIST
            let selectedIndex = action.payload
            return selectedIndex
        case 'SET_NEW_INDEX':
            // ADDS CURRENT INDEX ID TO REDUCER TO GRAB LIST
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
            // ADDS CURRENT INDEX ID TO REDUCER TO GRAB LIST
            let name = action.payload
            console.log('in indexName indexReducer', name)
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

