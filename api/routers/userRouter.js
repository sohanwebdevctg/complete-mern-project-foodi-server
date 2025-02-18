const express = require('express')
const router = express.Router();
const {profile, userRegister, userLogin, logOut} = require('../controllers/userControllers');
const verifyToken = require('../middleware/verifyToken')

// get profile router data
router.get('/profile',verifyToken, profile)

// user register router data
router.post('/register', userRegister)

// user login router data
router.post('/login', userLogin)

// user login router data
router.post('/logOut', logOut)

module.exports = router;