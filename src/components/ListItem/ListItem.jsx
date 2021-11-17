import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function ListItem () {

    const storeListItem = useSelector(store => store.list);
    const dispatch = useDispatch();



    

    // useEffect(() => {
    //     dispatch({ type: 'SAVE_ITEM', payload: storeListItem });
    //   }, []);

    return (
        
        <div key={item.id}>
            <p> {item.keyword_search} </p>
            <p> {item.department_id}</p>
            <p> {item.asile_id} </p>
        </div>
    );
};

export default ListItem;