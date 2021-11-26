import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListOutput from '../ListOutput/ListOutput';
import List from '@mui/material/List';




function ListMap ({list}) {

    const indexName = useSelector(store => store.index.indexName)
    const currentIndex = useSelector(store => store.index.currentIndex)
    
  
    const [listId, setListId] = useState(currentIndex);
    const [itemId, setItemId] = useState('')
    
    const listItem = {
        list_id: listId,
        item_id: itemId
    }


    useEffect(() => {
    
        console.log('use effect in ListMap ran');
        console.log('value of listItem from setItem', listItem)
      }, []);

    return (
       
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {list.map((item) => (    
                    <ListOutput key={item.id} item={item}/>
                ))}
        </List>
        
    );
};

export default ListMap;


