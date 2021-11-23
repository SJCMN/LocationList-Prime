const indexReducer = (state = [''], action) => {
    switch (action.type) {
      case 'SET_NEW_LIST':
        // ADDS NEW LIST NAME TO REDUCER
    return action.payload
      default:
        return state;
    }
  };
 
  export default indexReducer;