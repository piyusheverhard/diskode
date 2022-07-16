import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

function UserPosts() {
  const [userPosts, setPosts] = useState();
  const userId = localStorage.getItem('userId');
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/post/user/${userId}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => {
      setPosts(data.userPosts);
    });
  }, []);
  return (
    <div>
      {userPosts && userPosts.posts && userPosts.posts.map((post) => (
        <Post
          title={post.title}
          description={post.description}
          userName={userPosts.name}
          isUser
        />
      ))}
    </div>
  );
}

export default UserPosts;
