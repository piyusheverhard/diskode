import mongoose from 'mongoose';
import Post from '../model/Post';
import User from '../model/User';

export const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find().populate('user');
  } catch (err) {
    return res.status(404).json({ message: err });
  }
  if (!posts) {
    return res.status(404).json({ message: 'No Posts Found' });
  }
  return res.status(200).json({ posts });
};

export const addPost = async (req, res) => {
  const { title, description, user } = req.body;

  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return res.status(404).json({ message: err });
  }

  if (!existingUser) {
    return res.status(404).json({ message: 'User Not Found' });
  }

  const post = new Post({
    title,
    description,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.save({ session });
    existingUser.posts.push(post);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return res.status(500).json({ message: err });
  }

  return res.status(201).json({ post });
};

export const updatePost = async (req, res) => {
  const { title, description } = req.body;
  const postId = req.params.id;
  let post;
  try {
    post = await Post.findByIdAndUpdate(postId, {
      title,
      description,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  if (!post) {
    return res.status(500).json({ message: 'Unable to update the post' });
  }
  return res.status(200).json({ post });
};

export const getById = async (req, res) => {
  const postId = req.params.id;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
  if (!post) {
    return res.status(404).json({ message: 'Post Not Found' });
  }
  return res.status(200).json({ post });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  let post;
  try {
    post = await Post.findOneAndRemove(postId).populate('user');
    await post.user.posts.pull(post);
    await post.user.save();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  if (!post) {
    return res.status(500).json({ message: 'Unable to Delete' });
  }
  return res.status(200).json({ message: 'Succesfully Deleted' });
};

export const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userPosts;
  try {
    userPosts = await User.findById(userId).populate('posts');
  } catch (err) {
    return res.status(404).json({ message: err });
  }
  if (!userPosts) {
    return res.status(404).json({ message: 'No Posts Found' });
  }
  return res.status(200).json({ userPosts });
};
