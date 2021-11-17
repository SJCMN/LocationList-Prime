const listReducer = (state = {status:'empty'}, action) => {
    switch (action.type) {
      case 'SET_ITEM':
        // format object with keys returned from keyword search API
    return action.payload
    
        // {      
        // keyword_search: action.payload.data.search.search_response.typed_metadata.keyword,
        // product_description: action.payload.data.search.products[0].item.product_description.title,
        // store_id: action.payload.data.search.products[0].fulfillment.store_options[0].location_id,
        // asile_id: action.payload.data.search.products[0].store_positions[0].aisle,
        // hidden: false,
        // TCIN: action.payload.data.search.products[0].item.tcin,
        // department_id: action.payload.data.search.products[0].store_positions[0].block
        // }
 
        // append state list object with x,y coordinates from TCIN api search
    case 'UPDATE_SET_ITEM':
        return {...state, x: action.payload.data.product.store_coordinates[0].x, y:action.payload.data.product.store_coordinates[0].y }
        
      default:
        return state;
    }
  };
 
  export default listReducer;