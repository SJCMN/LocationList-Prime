import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ListMap from '../ListMap/ListMap';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


function ListPage () {

    const dispatch = useDispatch();
    const list = useSelector(store => store.list);

    const [newItem, setNewItem] = useState('');
    // const [ sortedList , setList ] = useState(list)

    const setItem = () => {

        dispatch({ type: 'GET_ITEM', payload: newItem })
        setNewItem('');
    }



    // useEffect hook
    // component renders when state changes
    // code within useEffect() function runs when component renders
    // providing an empty array as a second argument will limit the useEffect to only run once
    // passing in a variable into the array as a second argument 
    // Will run contents of use effect when variable value changes

    useEffect(() => {

        // setList(sortedList);
        // console.log(sortedList);

    }, [])
 


    return (
        <div className="container">

            <h2>Lists</h2>
            <Box
             sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 2  ,
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
                onChange={(e) =>  setNewItem(e.target.value) }
                onKeyDown={e => e.key === 'Enter' && setItem()}
                ></TextField>
                    {/* <button onClick={() => setItem()}>Add Item</button> */}
                { list && 
                <ListMap list={list}/>
                }
                <Paper elevation={0} />
            </Box>    
        </div>
    );
};

export default ListPage;
