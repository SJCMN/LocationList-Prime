import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import IndexMap from '../IndexMap/IndexMap';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';


function ListIndex() {

    const dispatch = useDispatch();
    const listIndex = useSelector(store => store.index.indexReducer);
    const [newList, setNewList] = useState('');

    const setListName = () => {

        dispatch({ type: 'SET_LIST_NAME', payload: newList })
        setNewList('');
    }


    return (
        <div className="container">

            <Box
            sx={{
                pl:16,
                m:1.8   
            }}
            >
            <h2>Lists</h2>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: .8,
                    },
                }}
            >
                <TextField
                    sx={{
                        pl:9,
                    }}
                    placeholder="add list"
                    id='standard-basic'
                    variant="standard"
                    value={newList}
                    onChange={(e) => setNewList(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && setListName()}
                ></TextField>

                {listIndex &&
                    <IndexMap list={listIndex} />
                }
                <Paper elevation={0} />
            </Box>
        </div>
    );
};

export default ListIndex;
