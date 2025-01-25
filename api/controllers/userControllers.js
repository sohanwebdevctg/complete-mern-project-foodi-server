const User = require("../models/User");

const getUser = async (req, res) => {
  try{
    const result = req.body;
    const user = await User.findOne({email : result?.email, password : result?.password});
    if(!user){
      res.status(404).json({message: "user can not exists"})
    }
    res.status(200).json(user);
  }catch(error){
    res.status(404).json({message: error.message})
  }
}

const postUsers = async (req, res) => {
  try{
    const result = req.body;
    const email = await User.findOne({email : result?.email})
    if(!email){
      const createUser = await User.create(result);
      res.status(200).json({message: `${createUser.email} created successfully`});
    }
    res.status(404).json({message: "email already exists"})

  }catch(error){
    res.status(404).json({message: error.message})
  }
}

module.exports = {getUser,postUsers}