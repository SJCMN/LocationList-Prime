import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListItem.css'


function ListItem ({item}) {

    const mode = useSelector(store => store.mode);
    const list = useSelector(store => store.list);
  
    const dispatch = useDispatch();

    // updateDistance if mode === 'SHOP'
    const updateDistance = (id) => {

        let newX = 0;
        let newY = 0;
      
        for ( item of list ) {
            if ( id == item.id) {
                newX = item.x;
                newY = item.y
            }
        }

        // console.log('in updateDistance new origin', newX, newY);

        // recalculate distance values based on last item origin
        // update list object with revised x,y values

        for ( item of list ) {
            let difX = Math.abs(newX - item.x);
            difX = Math.round((difX + Number.EPSILON) * 100) / 100
            let difY = Math.abs(newY - item.y);
            difY = Math.round((difY + Number.EPSILON) * 100) / 100
            item.x = difX;
            item.y = difY;
        }

        // console.log('updated list', list);
        

        dispatch ({ type: "TOGGLE_HIDE_ITEM", payload: item.id })
        dispatch ({ type: "UPDATE_DISTANCE", payload: list})
    }

  


    return (
        
        <li key={item.id} >
            <div className="listItem">
                <button onClick={() =>  updateDistance(item.id)}>archive</button>
     
                    <p className={item.hidden === false ? "standard" : "hidden"}> 
                    {(mode === 'SHOP') ? <>{item.department_id} {item.aisle_id} {item.keyword_search}</> : <>{item.keyword_search}</> }
                    
                    </p>

                <button onClick={() =>  (dispatch({ type: "DELETE_ITEM", payload: item.id }))}>delete</button>
            </div>
        </li>
    );
};

export default ListItem;