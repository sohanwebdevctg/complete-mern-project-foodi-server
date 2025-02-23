require('dotenv').config() // dotenv configuration
const User = require("../models/User");
var bcrypt = require('bcryptjs'); // bcryptjs for password
const jwt = require('jsonwebtoken'); // jwt token
const cookieParser = require('cookie-parser') // cookie-parser


// get single user data
const singleUser = async (req, res) => {
  try{
    const id = req.params.id;
    const singleUser = await User.findById({_id : id});
    if(!singleUser){
      return res.status(200).json({message : 'user not found'})
    }
    return res.status(200).json({message : 'success'})
  }catch(error){
    return res.status(401).json({message : 'invalid token'})
  }
}

// get profile router data
const profile = async (req, res) => {
  
  // const token = req.cookies.token;
  
  // if(!token){
  //   return res.status(401).json({message: 'unauthorized access'})
  // }
  // const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

  try{
    // get decoded middleware token
    const email = req?.decoded?.email;
    const user = await User.findOne({email : email}).select('-password');
    
    if(!user){
      return res.status(404).json({message : 'user not found'})
    }
    res.json({
      name : user.name,
      email : user.email,
      image : user.image,
      role : user.role
    })

  }catch(error){
    return res.status(401).json({message : 'invalid token'})
  }
}

// get all users data
const allUsers = async (req, res) => {

  try{
    // get all users data
    const users = await User.find({});
    res.status(200).send(users);

  }catch(error){
  res.status(500).json({message : error.message})
  }

}

// user register router data
const userRegister = async (req, res) => {

  try{
    const {name, email, image, password} = req.body;
    const query = {email : email}
    const findUser = await User.findOne(query);

    if(findUser){
      res.status(401).json({message : "User already registered."})
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const createUser = await User.create({name, email, image, password : hash});

    if(!createUser){
      res.status(401).json({message : "user can not be created"})
    }

    res.status(200).json({message : "User created successfully"})

  }catch(error){
    res.status(500).json({message : error.message})
  }

}

// user login router data
const userLogin = async (req, res) => {
  try{
    const {email, password} = req.body;

    const findUser = await User.findOne({email : email});

    const isMatch = await bcrypt.compareSync(password, findUser.password);

    delete findUser._doc.password;
    
    if(!findUser && !isMatch){
      return res.status(401).json({message : 'Invalid credentials'})
    }else{
      // jwt token create
      const token = jwt.sign({ email : findUser.email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly : true,
        secure : false
      }).status(200).json({message : 'success'})
    }
  }catch(error){
    res.status(500).json({message : error.message})
  }
}

// makeAdmin user data
const makeAdmin = async (req, res) => {
  try{
    const _id = req.params.id;
    const {role} = req.body;
    const updateData = await User.findByIdAndUpdate({_id : _id}, {role : role}, {new : true, runValidators : true})
    console.log(updateData)
    if(!updateData){
      return res.status(401).json({message : 'user not found'})
    }
    return res.status(200).json({message : 'make admin'})
  }catch(error){
    return res.status(401).json({message : 'invalid token'})
  }
}

// delete single user data
const deleteSingleUser = async (req, res) => {
  try{
    const id = req.params.id;
    const deleteSingleUser = await User.findByIdAndDelete({_id : id});
    if(!deleteSingleUser){
      return res.status(401).json({message : 'user not found'})
    }
    return res.status(200).json({message : 'success'})
  }catch(error){
    return res.status(401).json({message : 'invalid token'})
  }
}

// user logout router data
const logOut = async (req, res) => {
  res.clearCookie('token', {
    httpOnly : true,
    secure : false
  }).send({message : 'logout successfully'})
}

module.exports = {singleUser,profile, allUsers, userRegister, userLogin, makeAdmin, deleteSingleUser, logOut}