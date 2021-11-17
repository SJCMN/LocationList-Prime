import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import ListButton from '../ListButton/ListButton'
import StoreButton from '../StoreButton/StoreButton'
import {useSelector, useDispatch} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: 'GET_LIST'});
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <ListButton className="btn" />
      <StoreButton className="btn" />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
