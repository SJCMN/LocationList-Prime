
let foundItem  = {
    keyword_search: listItem.data.search.search_response.typed_metadata.keyword,
    product_description:listItem.data.search.products[0].item.product_description.title,
    store_id: data.search.products[0].fulfillment.store_options[0].location_id,
    asile_id: data.search.products[0].store_positions[0].aisle,
    hidden: false,
    TCIN: listItem.data.search.products[0].item.tcin,
    x: '',
    y: '',
    department_id: data.search.products[0].store_positions[0].block,
    }

 let response = {
        keyword_search: response.data.search.search_response.typed_metadata.keyword,
        product_description:response.data.search.products[0].item.product_description.title,
        store_id: response.data.search.products[0].fulfillment.store_options[0].location_id,
        asile_id: response.data.search.products[0].store_positions[0].aisle,
        hidden: false,
        TCIN: response.data.search.products[0].item.tcin,
        x: response.data.product.store_coordinates[0].x,
        y: response.data.product.store_coordinates[0].y,
        department_id: response.data.search.products[0].store_positions[0].block,
        }