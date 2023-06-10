const User = require('../models/user');
const userService = require('../services/userService');

exports.createUser = function (req, res) {
    console.log(req.body)
    console.log(typeof req.body)
    const user = new User(req.body);
        user.save()
        .then(() => res.status(201).json({ message: 'User created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.updateRankUser = function (req, res) {
    const userId = req.params.id;
    userService.updateRank(userId, req.body.won)
        .then(() => res.status(200).json({ message: 'User updated rank successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.enterPromotionSeries = function (req, res) {
    const userId = req.params.id;
    userService.enterPromotionSeries(userId)
        .then(() => res.status(200).json({ message: 'User has entered promotion series' }))
        .catch(err => res.status(500).json({ error: err.message }));

}
