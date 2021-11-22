const listReducer = (state = [], action) => {





    switch (action.type) {
      case 'SET_LIST':
        // SET LIST FROM DB TO STORE
    return action.payload
    case 'UPDATE_DISTANCE':



      // UPDATE DISTANCE VALUES IN LIST STORE ONLY
// re calc distance here




  return action.payload

      default:
        return state;
    }
  };
 
  export default listReducer;