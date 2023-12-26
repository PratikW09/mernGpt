const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    role:{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
      },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  chats:[chatSchema],
  timestamp: {
    type: Date,
    default: Date.now,
  },

});


const User = mongoose.model('User', userSchema);

module.exports = User;