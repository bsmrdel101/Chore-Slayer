import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          max_hp: 15,
          new_user: true
        },
      });
    }
  }; // end registerUser

  return (
    <center className='top-margin-btn'>
      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="username-input" label="Username" variant="standard" 
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <VpnKeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="password-input" label="Password" variant="standard" type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}/>
        </Box>
        <div className='top-margin-btn'>
          <Button type='submit' variant='contained'>Submit</Button>
        </div>
      </form>
    </center>
  );
}

export default RegisterForm;
