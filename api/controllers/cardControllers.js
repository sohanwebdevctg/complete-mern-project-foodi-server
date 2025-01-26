const Card = require("../models/Card");

// get single card data
const getSingleCard = async (req, res) => {
  try{
    const id = req.params.id;
    const singleCard = await Card.findById({_id : id});
    if(!singleCard){
      return res.status(401).json({message : 'card not found'})
    }
    return res.status(200).json({message : 'success'})
    
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

// get single user query card data by email
const getCardData = async (req, res) => {
  try{
    const email = req.query.email;
    const data = {email:email};
    const result = await Card.find(data).exec();
    if(result){
      return res.status(200).send(result)
    }
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

// post single card data
const postCardData = async (req, res) => {
  try{
    const {menuId, name, recipe, image, category, price, email, quantity} = req.body;
    const existingCard = await Card.findOne({menuId, email})
    if(existingCard){
      return res.status(400).json({message : "card already existing"})
    }
    const newCard = await Card.create({menuId, name, recipe, image, category, price, email, quantity})
    if(newCard){
      return res.status(200).json({message : 'success'})
    }
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

// patch single card data
const updateCard = async (req, res) => {
  try{
    const _id = req.params.id;
    const {quantity} = req.body;
    const updateData = await Card.findByIdAndUpdate(_id, {quantity: quantity}, {new : true, runValidators: true});
    if(!updateData){
      return res.status(401).json({message : 'card not found'})
    }
    return res.status(200).json({message : 'success'})
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

// delete single card data
const deleteCard = async (req, res) => {
  try{

    const id = req.params.id;
    const deleteCard = await Card.findByIdAndDelete({_id : id});
    if(!deleteCard){
      return res.status(401).json({message : 'card not found'})
    }
    return res.status(200).json({message : 'success'})

  }catch(error){
    res.status(404).json({message: error.message})
  }
}


module.exports = {getCardData,getSingleCard,updateCard,postCardData,deleteCard}