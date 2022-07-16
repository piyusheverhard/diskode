import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Post',
    required: true,
  }],
});

export default mongoose.model('User', userSchema);

// users
