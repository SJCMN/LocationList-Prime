import { combineReducers } from "redux";

const indexReducer = (state = [''], action) => {
    switch (action.type) {
        case 'SET_NEW_INDEX':
            // ADDS NEW LIST NAME "INDEX" TO REDUCER
            return action.payload
        default:
            return state;
    }
};

const currentIndex = (state = [''], action) => {
    switch (action.type) {
        case 'SET_CURRENT_INDEX':
            // ADDS CURRENT INDEX ID TO REDUCER TO GRAB LIST
            let newIndex = action.payload
            return newIndex
        default:
            return state;
    }
};


const indexName = ( state = [''], action ) => {
    switch (action.type) {
        case 'SET_INDEX_NAME':
            // ADDS CURRENT INDEX ID TO REDUCER TO GRAB LIST
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

