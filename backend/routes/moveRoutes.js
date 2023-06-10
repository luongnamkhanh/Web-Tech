const express = require('express');
const router = express.Router();
const moveController = require('../controllers/moveController');

router.post('/', moveController.createMove);

module.exports = router;
