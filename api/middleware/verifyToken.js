require('dotenv').config() // dotenv configuration
const jwt = require('jsonwebtoken'); // jwt token
const cookieParser = require('cookie-parser') // cookie-parser


//verify token
const verifyToken = (req, res, next) => {
  // token
  const token = req?.cookies?.token;

  //check token
  if(!token){
    return res.status(401).json({message: 'unauthorized access'})
  }
  // decoded token
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {

    // error message
    if(err){
      return res.status(401).json({message: 'unauthorized access'})
    }
    // decoded data
    req.decoded = decoded;
    //call next method
    next();
  })
}

module.exports = verifyToken;