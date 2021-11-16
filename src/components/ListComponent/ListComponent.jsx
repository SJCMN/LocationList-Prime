import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function ListComponent () {

    const storeListItem = useSelector(store => store.list);
    const dispatch = useDispatch();

    // const listItem =  {
    //     keyword_search: storeListItem.data.search.search_response.typed_metadata.keyword,
    //     product_description: storeListItem.data.search.products[0].item.product_description.title,
    //     store_id: storeListItem.data.search.products[0].fulfillment.store_options[0].location_id,
    //     asile_id: storeListItem.data.search.products[0].store_positions[0].aisle,
    //     hidden: false,
    //     TCIN: storeListItem.data.search.products[0].item.tcin,
    //     // x: storeListItem.data.product.store_coordinates[0].x,
    //     // y: storeListItem.data.product.store_coordinates[0].y,
    //     department_id: storeListItem.data.search.products[0].store_positions[0].block,
    //     }


    // console.log(listItem)

    useEffect(() => {

        dispatch({ type: 'GET_ITEM_XY', payload: storeListItem.TCIN });
      }, []);

    return (
        <ul>
        <li>{storeListItem?.keyword_search}</li>
        </ul>
    );
};

export default ListComponent;