const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['patient', 'doctor'],
  },
  profileImg: {
    type: String, 
    required: false,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
