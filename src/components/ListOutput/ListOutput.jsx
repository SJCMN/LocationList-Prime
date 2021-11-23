import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useDispatch, useSelector } from 'react-redux';
import './ListOutput.css'


function ListOutput ({item}) {

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

export default ListOutput;


// <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
// {[0, 1, 2, 3].map((value) => {
//   const labelId = `checkbox-list-label-${value}`;

//   return (
//     <ListItem
//       key={value}
//       secondaryAction={
//         <IconButton edge="end" aria-label="comments">
//           <CommentIcon />
//         </IconButton>
//       }
//       disablePadding
//     >
//       <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
//         <ListItemIcon>
//           <Checkbox
//             edge="start"
//             checked={checked.indexOf(value) !== -1}
//             tabIndex={-1}
//             disableRipple
//             inputProps={{ 'aria-labelledby': labelId }}
//           />
//         </ListItemIcon>
//         <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//       </ListItemButton>
//     </ListItem>
//   );
// })}
// </List> 