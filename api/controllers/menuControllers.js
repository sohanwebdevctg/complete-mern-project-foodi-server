const Menu = require("../models/Menu")

const getAllMenuItems = async (req, res) => {
  try{
    const menus = await Menu.find({})
    res.status(200).send(menus)
  }catch(error){
    res.status(404).json({message: error.message})
  }
}


module.exports = {getAllMenuItems}