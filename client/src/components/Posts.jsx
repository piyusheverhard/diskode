/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function Posts() {
  const [posts, setPosts] = useState();
  const sendRequest = async () => {
    const res = await axios.get('http://localhost:5000/api/post').catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setPosts(data.posts));
  }, []);
  console.log(posts);
  return (
    <div>
      {posts && posts.map((post) => (
        <Post
          title={post.title}
          description={post.description}
          userName={post.user.name}
          isUser={localStorage.getItem('userId') === post.user._id}
        />
      ))}
    </div>
  );
}

export default Posts;
