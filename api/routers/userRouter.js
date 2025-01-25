const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')

router.post('/single', userController.getUser)
router.post('/', userController.postUsers)

module.exports = router;