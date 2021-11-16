const listReducer = (state = {status:'empty'}, action) => {
    switch (action.type) {
      case 'SET_ITEM':
        // return action.payload;
    return {      
        keyword_search: action.payload.data.search.search_response.typed_metadata.keyword,
        product_description: action.payload.data.search.products[0].item.product_description.title,
        store_id: action.payload.data.search.products[0].fulfillment.store_options[0].location_id,
        asile_id: action.payload.data.search.products[0].store_positions[0].aisle,
        hidden: false,
        TCIN: action.payload.data.search.products[0].item.tcin,
        department_id: action.payload.data.search.products[0].store_positions[0].block
        }
 
    case 'UPDATE_SET_ITEM':
        return {...state, x: action.payload.data.product.store_coordinates[0].x, y:action.payload.data.product.store_coordinates[0].y }
        
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.list
  export default listReducer;