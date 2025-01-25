const Card = require("../models/Card");

const getCardData = async (req, res) => {
  try{
    const email = req.query.email;
    const query = {email : email};
    const findData = await Card.find(query).exec();
    if(findData){
      res.status(200).send(findData)
    }
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

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


module.exports = {getCardData,postCardData}