import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Auth from './components/Auth';
import AddPost from './components/AddPost';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import UserPosts from './components/UserPosts';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/add" element={<AddPost />} />
          <Route path="/myPosts" element={<UserPosts />} />
          <Route path="/myPosts/:id" element={<PostDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
