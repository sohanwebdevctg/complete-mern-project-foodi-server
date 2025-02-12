const User = require("../models/User");
var bcrypt = require('bcryptjs'); // bcryptjs for password
const jwt = require('jsonwebtoken'); // jwt token
const cookieParser = require('cookie-parser') // cookie-parser

// get profile router data
const profile = async (req, res) => {
  const token = req.cookies.token;
  
  if(!token){
    return res.status(401).json({message: 'unauthorized access'})
  }

  try{

    const decoded = jwt.decode(token, process.env.ACCESS_TOKEN);
    const user = await User.findOne({email : decoded?.email}).select('-password');
    
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
    if(findUser && isMatch ){
      // jwt token create
      const token = jwt.sign({ email : findUser.email }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly : true,
        secure : false
      }).status(201).send({message : 'success login'})
    }
    
  }catch(error){
    res.status(500).json({message : error.message})
  }
}

// user logout router data
const logOut = async (req, res) => {
  res.clearCookie('token', {
    httpOnly : true,
    secure : false
  }).send({message : 'logout successfully'})
}

module.exports = {profile, userRegister, userLogin, logOut}