import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { blueGrey } from '@mui/material/colors'
import { useHistory } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';
// import './ListOutput.css'


function IndexOutput ({item}) {

    const mode = useSelector(store => store.mode);
    const currentIndex = useSelector(store => store.currentIndex)
    // const list = useSelector(store => store.list);
    const dispatch = useDispatch();
    const history = useHistory()
    const accent = blueGrey['900']

    

    // List Mode: Toggles hidden to archive items on list
    // SHOP Mode: also calcs new distance relative to archived item 
    const handleCurrentIndex = () => {
      dispatch({ type: 'SET_CURRENT_INDEX', payload: item.id })
      
    }

    const sendToList = () => {
      history.push(`/lists/${item.id}`)
    }
 
    return (
        <ListItem key={item.id} 
          // className={item.hidden === false ? "standard" : "hidden"}
          secondaryAction={
            <IconButton 
            edge="end" aria-label="delete"
            onClick={() =>  (dispatch({ type: "DELETE_LIST_INDEX", payload: item.id }))}
            >
              <HighlightOffIcon />
           
            </IconButton>
          }
        disablePadding
        >
         
          <ListItemButton 
            onClick={() =>  handleCurrentIndex(item)} 
            dense>
            <ListItemIcon>
              <Checkbox
              edge="start"
              checked={ currentIndex }
              disableRipple
              inputProps={{ 'aria-labelledby': item }}
              color="default"
              />
             
              </ListItemIcon>
              <ListItemText 
                primary= {item.list_name} 
                onClick={() =>  sendToList()} 
              />
          </ListItemButton>

        </ListItem>

    );
};

export default IndexOutput;