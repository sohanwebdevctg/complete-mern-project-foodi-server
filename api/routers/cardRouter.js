const express = require('express');
const router = express.Router();
const cardControllers = require('../controllers/cardControllers')

router.post('/', cardControllers.postCardData)

module.exports = router;