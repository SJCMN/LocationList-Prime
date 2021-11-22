import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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

        <ListItem key={item.id}
            secondaryAction = {
                <HighlightOffIcon 
                edge="end" aria-label="delete"
                onClick={() =>  (dispatch({ type: "DELETE_ITEM", payload: item.id }))} >
                </HighlightOffIcon>
            }
            disablePadding
            >

                <ListItemButton  onClick={() =>  handleUpdate(item)} dense>
                    <ListItemIcon>
                        <Checkbox
                            edge = "start"
                            checked={item.hidden}  
                            tabIndex={-1}
                            disableRipple
                            // inputProps={{'aria-labelledby': lableId}}
                        /> 
                    </ListItemIcon>

                    <ListItemText 
                    className={item.hidden === false ? "standard" : "hidden"} 
                    // id={lableId}
                    primary={
                        (mode === 'SHOP') ?
                        <>{item.department_id} {item.aisle_id} {item.keyword_search}</>
                        :
                        <>{item.keyword_search}</>
                    }
                    />
                </ListItemButton>
                {/* <button onClick={() =>  (dispatch({ type: "DELETE_ITEM", payload: item.id }))}>delete</button> */}

        </ListItem>
    );
};

export default ListItem;
