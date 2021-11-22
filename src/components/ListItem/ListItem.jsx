import { useDispatch, useSelector } from 'react-redux';
import './ListItem.css'


function ListItem ({item}) {

    const mode = useSelector(store => store.mode);
    const list = useSelector(store => store.list);
    const dispatch = useDispatch();

    // List Mode: Toggles hidden to archive items on list
    // SHOP Mode: also calcs new distance relative to archived item 
    const handleUpdate = (item) => {

        // console.log('in handleUpdate',item.id);

        // updateDistance if mode === 'SHOP'
            if(mode === 'SHOP') {
            // DISPATCH TO REDUCER
            dispatch ({ type: "UPDATE_DISTANCE", payload: {list:list, id:item.id}})
            dispatch ({ type: "TOGGLE_HIDE_ITEM", payload: {id:item.id, mode:mode} })

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