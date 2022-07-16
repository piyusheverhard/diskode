/* eslint-disable no-console */
import bcrypt from 'bcryptjs';
import User from '../model/User';

export const getAllUsers = async (_req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.error(err);
  }
  if (!users) {
    return res.status(404).json({ message: 'No Users Found' });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.error(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists. Try login instead' });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    posts: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.error(err);
  }

  return res.status(201).json({ user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.error(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: 'User does not exists. Try signup instead' });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Incorrect Password' });
  }

  return res.status(200).json({ message: 'Login Successful', user: existingUser });
};
