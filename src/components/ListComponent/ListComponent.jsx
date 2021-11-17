
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { useState } from 'react';


function ListComponent ({list}) {

  

    // console.log('in ListComponent:', list);
    return (
        <ul>
       
        {list?.map((item) => (
                    <ListItem key={item.id} item={item}/>))}
                   
        </ul>
    );
};

export default ListComponent;