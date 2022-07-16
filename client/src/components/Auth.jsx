/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const sendRequest = async (type = 'login') => {
    const uri = `http://localhost:5000/api/user/${type}`;
    const res = await axios.post(uri, {
      name: inputs.name[0],
      email: inputs.email[0],
      password: inputs.password[0],
    }).catch((err) => console.error(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest('signup')
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/posts'));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/posts'));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography padding={3} textAlign="center" variant="h4">
            {isSignUp ? 'Sign Up' : 'Login'}
          </Typography>
          {isSignUp
            && (
              <TextField
                onChange={handleChange}
                name="name"
                value={inputs.name}
                placeholder="Name"
                margin="normal"
              />
            )}
          <TextField
            type="email"
            onChange={handleChange}
            name="email"
            value={inputs.email}
            placeholder="email"
            margin="normal"
          />
          <TextField
            type="password"
            onChange={handleChange}
            name="password"
            value={inputs.password}
            placeholder="password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ borderRadius: 3, margin: 1 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            color="info"
            sx={{ borderRadius: 3, marginTop: 1 }}
          >
            Change to
            {' '}
            {isSignUp ? 'Login' : 'SignUp'}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth;
