import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mongourl from './mongourl';
import userRouter from './routes/user-routes';
import postRouter from './routes/post-routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

try {
  await mongoose.connect(mongourl).then(() => app.listen(5000))
    .then(() => console.log('Connected to database and Listen on localhost://5000'));
} catch (err) { console.error(err); }
