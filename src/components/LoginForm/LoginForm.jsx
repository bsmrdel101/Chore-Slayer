import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <center>
      <form className="form-panel" onSubmit={login}>
        <h2 className="login-title">Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
          <AccountCircle sx={{ color: '#b0bec5', mr: 1, my: 0.5 }} />
          <input required value={username} onChange={(event) => setUsername(event.target.value)} 
            placeholder='Username' className='form-input'
          />
        </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <VpnKeyIcon sx={{ color: '#b0bec5', mr: 1, my: 0.5 }} />
            <input required value={password} onChange={(event) => setPassword(event.target.value)}
              placeholder='Password' type="password" className='form-input'
            />
          </Box>
        <div className='top-margin-btn'>
          <button className="submit-btn" type="submit" value="Log In">Submit</button>
        </div>
      </form>
    </center>
  );
}

export default LoginForm;
