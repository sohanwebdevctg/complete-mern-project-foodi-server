const User = require("../models/User");
var bcrypt = require('bcryptjs'); // bcryptjs for password
const jwt = require('jsonwebtoken'); // jwt token
const cookieParser = require('cookie-parser') // cookie-parser

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
      const token = jwt.sign({ userId : findUser._id }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
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
const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly : true,
    secure : false
  }).send({message : 'logout successfully'})
}

module.exports = {userRegister, userLogin}