const listReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_LIST':
        // SET LIST FROM DB TO STORE
    return action.payload

      default:
        return state;
    }
  };
 
  export default listReducer;