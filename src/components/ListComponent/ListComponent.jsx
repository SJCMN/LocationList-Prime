import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { useState } from 'react';


function ListComponent () {

    const storeListItem = useSelector(store => store.list);
    const dispatch = useDispatch();



    useEffect(() => {
        // saveItems()
        // dispatch({ type: 'GET_ITEM_XY', payload: storeListItem.TCIN });
        
      }, []);

    return (
        <ul>
        <li>{storeListItem?.keyword_search}</li>

        {/* {storeListItem?.map((item) => (
                    <ListItem key={item.id} item={item}/>))} */}
                   
        </ul>
    );
};

export default ListComponent;