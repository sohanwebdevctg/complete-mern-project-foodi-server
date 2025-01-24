const express = require('express');
const menuControllers = require('../controllers/menuControllers');
const router = express.Router();


router.get('/', menuControllers.getAllMenuItems)




module.exports = router;