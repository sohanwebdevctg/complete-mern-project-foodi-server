const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true,
  },
  recipe : {
    type : String
  },
  image : {
    type : String
  },
  category : {
    type : String
  },
  price : {
    type : Number
  }
});

const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu;