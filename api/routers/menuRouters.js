const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();


router.get('/', async (req, res) => {
  try{
    const menus = await Menu.find({});
    res.status(200).send(menus);
  }catch(error){
    res.send(400).json({message: error.message})
  }
})




module.exports = router;