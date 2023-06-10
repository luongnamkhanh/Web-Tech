const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.post('/', matchController.createMatch);
router.put('/:id/end', matchController.endMatch);

module.exports = router;
