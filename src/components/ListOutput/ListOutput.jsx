import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


import { useDispatch, useSelector } from 'react-redux';
import './ListOutput.css'


function ListOutput({ item }) {

  const mode = useSelector(store => store.mode);
  const list = useSelector(store => store.list);
  const currentIndex = useSelector(store => store.index.currentIndex)
  const dispatch = useDispatch();



  // List Mode: Toggles hidden to archive items on list
  // SHOP Mode: also calcs new distance relative to archived item 
  const handleUpdate = (item) => {

    // updateDistance if mode === 'SHOP'
    if (mode === 'SHOP') {
      // DISPATCH TO REDUCER
      dispatch({ type: "UPDATE_DISTANCE", payload: { list: list, id: item.id } })
      dispatch({ type: "TOGGLE_HIDE_ITEM", payload: { id: item.id, mode: mode } })

    } //END OF SHOP MODE LOGIC
    else {
      dispatch({ type: "TOGGLE_HIDE_ITEM", payload: {id:item.id, currentIndex:currentIndex} })
    }
  }

  return (
    <ListItem key={item.id}
      className={item.hidden === false ? "standard" : "hidden"}
      secondaryAction={
        <IconButton
          edge="end" aria-label="delete"
          onClick={() => (dispatch({ type: "DELETE_ITEM", payload: item.id }))}
        >
          <HighlightOffIcon />


        </IconButton>
      }
      disablePadding
    >

      <ListItemButton
        onClick={() => handleUpdate(item)}
        dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.hidden ? true : false}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': item }}
            color="default"
          />

        </ListItemIcon>
        <ListItemText

          primary=
          {(mode === 'SHOP') ?
            <>{item.department_id} {item.aisle_id} {item.keyword_search}</>
            :
            <>{item.keyword_search}</>}
        />
      </ListItemButton>

    </ListItem>

  );
};

export default ListOutput;