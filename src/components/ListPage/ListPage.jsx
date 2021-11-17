import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ListComponent from '../ListComponent/ListComponent';

function ListPage () {

    const dispatch = useDispatch();
    const [newItem, setNewItem] = useState('');
    const list = useSelector(store => store.list);

    const setItem = () => {
        console.log('getItem', newItem);
        dispatch({ type: 'GET_ITEM', payload: newItem })
    }

    //   console.log('in ListPage:', list);

    return (
        <div className="container">

            <h2>Lists</h2>
                <input 
                placeholder="add item"
                label='Item'
                id='newItem'
                value={newItem}
                onChange={(e) =>  setNewItem(e.target.value) }
                ></input>
                    <button onClick={() => setItem()}>Add Item</button>
                { list && 
                <ListComponent list={list}/>
                }
        </div>
    );
};

export default ListPage;
