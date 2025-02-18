const cookieParser = require('cookie-parser') // cookie-parser


//verify token
const verifyToken = (req, res, next) => {
  console.log('success data');
  next();
}

module.exports = verifyToken;