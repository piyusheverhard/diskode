import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';

function AddPost() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/post/add', {
      title: inputs.title,
      description: inputs.description,
      user: localStorage.getItem('userId'),
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Typography
          fontWeight="bold"
          color="grey"
          marginTop={2}
          variant="h4"
          textAlign="center"
        >
          Create a Post
        </Typography>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(10,10,130,1) 35%, rgba(0,212,255,1) 100%)"
          borderRadius={5}
          boxShadow="5px 5px 10px #ccc"
          padding={3}
          margin={2}
          display="flex"
          flexDirection="column"
          width="93%"
        >
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            label="Title"
          />
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            label="Description"
            multiline
            rows={10}
          />
          <Button sx={{ mt: 2, borderRadius: 4 }} type="submit" variant="contained">Post</Button>
        </Box>
      </form>
    </div>
  );
}
export default AddPost;
