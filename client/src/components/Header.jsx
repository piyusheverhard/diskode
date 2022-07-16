import React, { useState } from 'react';
import {
  AppBar, Button, Tab, Tabs, Toolbar, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(10,10,130,1) 35%, rgba(0,212,255,1) 100%)',
      }}
    >
      <Toolbar>
        <Typography variant="h4">Diskode</Typography>
        {isLoggedIn
          && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs textColor="inherit" value={value} onChange={(_e, val) => setValue(val)}>
                <Tab LinkComponent={Link} to="/posts" label="All Posts" />
                <Tab LinkComponent={Link} to="/myPosts" label="My Posts" />
                <Tab LinkComponent={Link} to="/posts/add" label="Add Post" />
              </Tabs>
            </Box>
          )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn
            && (
              <Button
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: 1, borderRadius: 10 }}
                variant="contained"
                color="info"
              >
                Login | SignUp
              </Button>
            )}
          {isLoggedIn
            && (
              <Button
                onClick={() => dispatch(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: 1, borderRadius: 10 }}
                variant="contained"
                color="info"
              >
                Logout
              </Button>
            )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
