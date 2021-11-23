import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();



  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">LocationList</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <div>
            <Link className="navLink" to="/user">
              Home
            </Link>

            {/* SEND USER TO ACTIVE LIST TO SHOP */}
            <Link className="navLink" to="/lists"
            onClick={() =>  (dispatch({ type: "TOGGLE_SHOP_MODE", payload: 'SHOP' }))}
            >
              Shop
            </Link>

            {/* SEND USER TO LIST OF LISTS */}
            <Link className="navLink" to="/lists"
             onClick={() =>  (dispatch({ type: "TOGGLE_LIST_MODE", payload: 'LIST' }))}
            >
              Lists
            </Link>
            

            <LogOutButton className="navLink" />
          </div>
        )}

        {/* link button to about hidden */}
        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
