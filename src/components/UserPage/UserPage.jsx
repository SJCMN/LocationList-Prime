import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import './UserPage.css'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="container">
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
            mx: 'auto',
            width: 'auto',
            textAlign: 'center'
          },
        }}
      >
        <h2>Welcome, {user.username}!</h2>
        {/* <p>Your ID is: {user.id}</p> */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
            mx: 'auto',
            width: 'auto',
            textAlign: 'center'
          },
        }}
      >

        <ButtonGroup
          id="buttonGroup"
          orientation="vertical"
          aria-label="vertical outlined button group"
          variant="contained"
          size="large"
          color="info"
        >
          
          <Button
          id="userButton"
          onClick={() => history.push('/lists')}
          >
            Lists
          </Button>
          <Button
          id="userButton"
          onClick={() => history.push('/stores')}
          >
            Stores
          </Button>
          <Button
          id="userButton"
          onClick={() => dispatch({ type: 'LOGOUT' })}
          >
            Log Out
          </Button>
          
        </ButtonGroup>
      </Box>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;

