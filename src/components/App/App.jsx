import React, { useEffect } from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SideNav from '../SideNav/SideNav'

import './App.css';

function App() {
  const dispatch = useDispatch();

  // const user = useSelector(store => store.user);

  // useEffect hook
  // component renders when state changes
  // code within useEffect() function runs when component renders
  // providing an empty array as a second argument will limit the useEffect to only run once
  // passing in a variable into the array as a second argument 
  // Will run contents of use effect when variable value changes

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_LIST_INDEX' })

    // console.log('use effect in App ran');
  }, []);

  return (
    <Router>
      <div>
      <SideNav />
      </div>
    </Router>
  );
}

export default App;
