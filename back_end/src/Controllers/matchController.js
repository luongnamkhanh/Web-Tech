const Match = require('../models/match');
const matchService = require('../services/matchService');

exports.createMatch = function(req, res) {
    console.log(req.body)
    console.log(typeof req.body)
    const match = new Match(req.body);
    match.save()
        .then(() => res.status(201).json({ message: 'Match created successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.endMatch = function(req, res) {
    const matchId = req.params.id;
    const winnerId = req.body.winnerId;
    matchService.endMatch(matchId, winnerId)
        .then(() => res.status(200).json({ message: 'Match ended successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
};
