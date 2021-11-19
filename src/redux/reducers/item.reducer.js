const itemReducer = (state = {status:'empty'}, action) => {
    switch (action.type) {
      case 'SET_ITEM':
        // set value of each item when added to list
    return action.payload

    // case 'UPDATE_SET_ITEM':
    //     return {...state, x: action.payload.data.product.store_coordinates[0].x, y:action.payload.data.product.store_coordinates[0].y }
        
      default:
        return state;
    }
  };
 
  export default itemReducer;