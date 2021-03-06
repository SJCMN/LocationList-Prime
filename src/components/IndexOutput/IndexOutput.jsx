import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';


function IndexOutput({ item }) {

  const mode = useSelector(store => store.mode);
  const currentIndex = useSelector(store => store.index.currentIndex)
  const dispatch = useDispatch();
  const history = useHistory()


  // List Mode: Toggles hidden to archive items on list
  // SHOP Mode: also calcs new distance relative to archived item 
  const handleCurrentIndex = () => {
    dispatch({ type: 'SET_SELECTED_INDEX', payload: item.id })
    dispatch({ type: 'SET_SELECTED_INDEX_NAME', payload: item.list_name })
  }

  const sendToList = () => {

    dispatch({ type: 'SET_SELECTED_INDEX', payload: item.id })
    dispatch({ type: 'SET_SELECTED_INDEX_NAME', payload: item.list_name })

    history.push(`/lists/${item.id}`)
  }


  return (
    <ListItem key={item.id}
      secondaryAction={
        <IconButton
          edge="end" aria-label="delete"
          onClick={() => (dispatch({ type: "DELETE_LIST_INDEX", payload: item.id }))}
        >
          <HighlightOffIcon />

        </IconButton>
      }
      disablePadding
    >

      <ListItemButton
        // onClick={() => handleCurrentIndex(item)}
        dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={currentIndex === item.id ? true : false}
            disableRipple
            inputProps={{ 'aria-labelledby': item }}
            color="default"
          />

        </ListItemIcon>
        <ListItemText
          primary={item.list_name}
          onClick={() => sendToList()}
        />
      </ListItemButton>

    </ListItem>

  );
};

export default IndexOutput;