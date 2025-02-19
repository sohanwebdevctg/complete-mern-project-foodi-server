const express = require('express')
const router = express.Router();
const {singleUser, profile, allUsers, userRegister, userLogin, makeAdmin, deleteSingleUser, logOut} = require('../controllers/userControllers');
const verifyToken = require('../middleware/verifyToken')

// get single user data
router.get('/singleUser/:id', verifyToken, singleUser)

// get profile router data
router.get('/profile', verifyToken, profile)

// get all users data
router.get('/allUsers/admin', verifyToken, allUsers);

// user register router data
router.post('/register', userRegister)

// user login router data
router.post('/login', userLogin)

// makeAdmin router data
router.patch('/makeAdmin/admin/:id', verifyToken, makeAdmin)

// delete single user data
router.delete('/deleteSingleUser/admin/:id', verifyToken, deleteSingleUser)

// user login router data
router.post('/logOut', logOut)

module.exports = router;