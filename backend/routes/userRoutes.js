const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.put('/:id/rank', userController.updateRankUser);
router.post('/:id/promotion', userController.enterPromotionSeries);

module.exports = router;
