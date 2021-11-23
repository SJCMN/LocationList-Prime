const indexReducer = (state = [''], action) => {
    switch (action.type) {
      case 'SET_NEW_INDEX':
        // ADDS NEW LIST NAME "INDEX" TO REDUCER
    return action.payload
      default:
        return state;
    }
  };
 
  export default indexReducer;