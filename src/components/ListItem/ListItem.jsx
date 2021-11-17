import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function ListItem ({item}) {

  
    const dispatch = useDispatch();

    return (
        
        <li key={item.id}>
            <p> {item.department_id}{item.aisle_id} {item.keyword_search}</p>
        </li>
    );
};

export default ListItem;