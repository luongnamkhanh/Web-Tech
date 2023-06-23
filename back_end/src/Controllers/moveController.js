const Move = require('../models/move');
const moveService = require('../services/moveService');

exports.createMove = function(req, res) {
    const move = new Move(req.body);
    move.save()
        .then(() => res.status(201).json({ message: 'Move created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};