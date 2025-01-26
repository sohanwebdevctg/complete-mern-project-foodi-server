const express = require('express');
const router = express.Router();
const cardControllers = require('../controllers/cardControllers')

router.get('/', cardControllers.getCardData)
router.post('/', cardControllers.postCardData)
router.delete('/:id', cardControllers.deleteCard)

module.exports = router;