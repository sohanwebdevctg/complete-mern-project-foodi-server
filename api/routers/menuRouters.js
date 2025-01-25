const express = require('express');
const router = express.Router();
const menuControllers = require('../controllers/menuControllers');

router.get('/', menuControllers.getAllMenuItems)

module.exports = router;