
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ListMap from '../ListMap/ListMap';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


function ListPage() {

    const dispatch = useDispatch();

    const indexName = useSelector(store => store.index.indexName)
    const currentIndex = useSelector(store => store.index.currentIndex)
    const list = useSelector(store => store.list)
    
    const [newItem, setNewItem] = useState('');

    const setItem = () => {
              
        dispatch({ type: 'GET_ITEM', payload: {newItem:newItem, currentIndex:currentIndex} });
        setNewItem('');
    }

    return (
        <div className="container">

            <h2>{indexName}</h2>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 2,
                        //   width: 128,
                        //   height: 128,
                    },
                }}
            >
                <TextField
                    placeholder="add item"
                    label='Item'
                    id='standard-basic'
                    variant="standard"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && setItem()}
                ></TextField>
                {/* <button onClick={() => setItem()}>Add Item</button> */}
                {list &&
                    <ListMap list={list} />
                }
                <Paper elevation={0} />
            </Box>
        </div>
    );
};

export default ListPage;
