import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListItem.css'


function ListItem ({item}) {

    const mode = useSelector(store => store.mode);
    const list = useSelector(store => store.list);
    const dispatch = useDispatch();


    // List Mode: Toggles hidden to archive items on list
    // SHOP Mode: also calcs new distance relative to archived item 
    const handleUpdate = (item) => {

        console.log('in handleUpdate',item.id);

        // updateDistance if mode === 'SHOP'
            if(mode === 'SHOP') {
            
            let currentX;
            let currentY;

            // Find X,Y coords of last archived item
            for ( let listItem of list ) {
                if ( item.id == listItem.id) {
                    currentX = listItem.x;
                    currentY = listItem.y
                    listItem.hidden = !listItem.hidden
                }
            }

            console.log('in updateDistance new origin', currentX, currentY);

            // recalculate distance values based on last item origin
            // update list object with revised x,y values
            for ( let listItem of list ) {
                let distX = Math.abs(currentX - listItem.x);
                distX = Math.round((distX + Number.EPSILON) * 100) / 100

                let distY = Math.abs(currentY - listItem.y);
                distY = Math.round((distY + Number.EPSILON) * 100) / 100

            // Pythagorean theorem rounded to 2 decimal places
            // calcs distance from current origin to item x y
            let distance = 0
            const calcDistance = () => {
                distance =  Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
                return Math.round((distance + Number.EPSILON) * 100) / 100;
            }

            // calculate X Y coordinates from 0,0 to establish initial distance value
            // value from distance is spread back into foundItem in res.send
                distance = calcDistance()
                console.log('new origin calcDistance', listItem.keyword_search ,distance); 
            // as each item is passed into the loop, the distance key is updated
                listItem.distance = distance

            }

            // sort the object array by distance, return new list
            list.sort((a,b) => a.distance - b.distance)
            list.sort((x,y) => (x.hidden===y.hidden) ? 0 : x? -1:1)
            console.log('list sorted by distance from last hidden item',list);

            dispatch ({ type: "UPDATE_DISTANCE", payload: list})
            // dispatch ({type: "UPDATE_HIDE_ITEM_SHOP_MODE", payload: list})
        } //END OF SHOP MODE LOGIC
            else {
        dispatch ({ type: "TOGGLE_HIDE_ITEM", payload: item.id })
            }
    }

  


    return (
        
        <li key={item.id} >
            <div className="listItem">
                <button onClick={() =>  handleUpdate(item)}>archive</button>
     
                    <p className={item.hidden === false ? "standard" : "hidden"}>

                    {(mode === 'SHOP') ? 
                    <>{item.department_id} {item.aisle_id} {item.keyword_search}</> 
                    : 
                    <>{item.keyword_search}</> }
                    
                    </p>

                <button onClick={() =>  (dispatch({ type: "DELETE_ITEM", payload: item.id }))}>delete</button>
            </div>
        </li>
    );
};

export default ListItem;