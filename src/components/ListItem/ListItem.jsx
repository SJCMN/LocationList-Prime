
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useDispatch, useSelector } from 'react-redux';
import './ListItem.css'


function ListItem ({item}) {

    const mode = useSelector(store => store.mode);
    const list = useSelector(store => store.list);
    const dispatch = useDispatch();

    

    // List Mode: Toggles hidden to archive items on list
    // SHOP Mode: also calcs new distance relative to archived item 
    const handleUpdate = (item) => {

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
        <FormGroup key={item.id}
            >
                <FormControlLabel  
                    className={item.hidden === false ? "standard" : "hidden"}
                    control={ <Checkbox checked={item.hidden} onClick={() =>  handleUpdate(item)} /> } 
                    label={
                        (mode === 'SHOP') ?
                        <>{item.department_id} {item.aisle_id} {item.keyword_search}</>
                        :
                        <>{item.keyword_search}</>
                    }
                    color="default"
                /> 
                <button onClick={() =>  (dispatch({ type: "DELETE_ITEM", payload: item.id }))}>delete</button>
        </FormGroup>
    );
};

export default ListItem;