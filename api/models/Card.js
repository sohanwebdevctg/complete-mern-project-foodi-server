const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  menuId : {type: String, required : true},
  name : {type : String, required : true},
  recipe : {type : String, required : true},
  image : {type : String, required : true},
  category : {type : String, required : true},
  price : {type : Number, required : true},
  quantity : {type : Number, required : true},
  email : {type : String, required : true},
})


const Card = mongoose.model('Card', cardSchema);
module.exports = Card;