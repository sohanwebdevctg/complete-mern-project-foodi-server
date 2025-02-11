const express = require('express')
const router = express.Router();
const {userRegister, userLogin} = require('../controllers/userControllers')

// user register router data
router.post('/register', userRegister)

// user login router data
router.post('/login', userLogin)

module.exports = router;