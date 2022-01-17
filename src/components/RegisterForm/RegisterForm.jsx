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
    <center>
      <form className="form-panel" onSubmit={registerUser}>
        <h2 className="login-title">Register User</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <AccountCircle sx={{ color: '#b0bec5', mr: 1, my: 0.5 }} />
          <input className="form-input" required value={username} onChange={(event) => setUsername(event.target.value)} 
            placeholder='Username'
          />
        </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKeyIcon sx={{ color: '#b0bec5', mr: 1, my: 0.5 }} />
            <input className="form-input" required value={password} onChange={(event) => setPassword(event.target.value)} 
              placeholder='Password' type="password"  
            />
          </Box>
        <div className='top-margin-btn'>
          <button className="submit-btn" type="submit" value="Register">Submit</button>
        </div>
      </form>
    </center>
  );
}

export default RegisterForm;
