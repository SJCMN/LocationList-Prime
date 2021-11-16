import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ListComponent from '../ListComponent/ListComponent';

function ListPage () {

    const dispatch = useDispatch();
    const [newItem, setNewItem] = useState('');
    const storeListItem = useSelector(store => store.list);

    const setItem = () => {
        console.log('getItem', newItem);
        dispatch({ type: 'GET_ITEM', payload: newItem })
    }

    // useEffect(() => {
    //     dispatch({ type: 'GET_ITEM_XY', payload: listItem.TCIN });
    //   }, []);

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
        { (storeListItem.status === 'empty') ? '' : 
        <ListComponent />
        }
    </div>
    );
};

export default ListPage;
