import React from 'react';
import {
  Avatar,
  Card, CardContent, CardHeader, Typography,
} from '@mui/material';

function Post({ title, description, userName }) {
  return (
    <div>
      <Card sx={{
        width: '70%',
        margin: 'auto',
        mt: 2,
        padding: 2,
        boxShadow: '5px 5px 10px #ccc',
        ':hover': {
          boxShadow: '10px 10px 20px #ccc',
        },
      }}
      >
        <CardHeader
          avatar={(
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              {userName[0]}
            </Avatar>
          )}
          title={title}
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Post;
