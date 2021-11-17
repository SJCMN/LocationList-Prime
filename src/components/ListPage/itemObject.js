const foundItem  = {
    keyword_search: searchTerm,
    product_description: itemObject.product.item.product_description.title,
    store_id: itemObject.product.fulfillment.store_options[0].location_id,
    aisle_id: itemObject.product.store_coordinates[0].aisle,
    TCIN: itemObject.product.tcin,
    x: itemObject.product.store_coordinates[0].x,
    y: itemObject.product.store_coordinates[0].y,
    department_id: itemObject.product.store_coordinates[0].block
    };

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

