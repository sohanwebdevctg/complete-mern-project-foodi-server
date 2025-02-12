const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// user model data
const userScheme = new mongoose.Schema({
  name : {
    type : String,
    trim: true,
    required : [true, 'Please enter your name']
  },
  image : {
    type : String,
    trim: true,
    required : [true, 'Please enter your image']
  },
  email : {
    type : String,
    trim: true,
    lowercase: true,
    unique: true,
    required : [true, 'Please enter your email'],
    validate: {
      validator: function(value) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  password : {
    type : String,
    required : [true, 'Please enter your password'],
    trim: true,
  },
  role : {
    type : String,
    enum : ['admin', 'user'],
    default : 'user'
  }
});


const User = mongoose.model('User', userScheme);
module.exports = User;