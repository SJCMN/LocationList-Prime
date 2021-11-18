import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListItem.css'


function ListItem ({item}) {

  
    const dispatch = useDispatch();

    return (
        
        <li key={item.id} >
            <div className="listItem">
                <button onClick={() =>  (dispatch({ type: "TOGGLE_HIDE_ITEM", payload: item.id }))}>archive</button>
     
                    <p className={item.hidden === false ? "standard" : "hidden"}> 
                    {item.department_id} {item.aisle_id} {item.keyword_search}
                    
                    </p>

                <button onClick={() =>  (dispatch({ type: "DELETE_ITEM", payload: item.id }))}>delete</button>
            </div>
        </li>
    );
};

export default ListItem;