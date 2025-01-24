const Menu = require("../models/Menus")

const getAllMenuItems = async(req, res)=> {
  try{
    const menus = await Menu.find({})
    res.status(200).json(menus)
  }catch(error){
    res.status(400).json({message: error.message})
  }
}

module.exports = {getAllMenuItems}