const Match = require('../models/match');
const userService = require('./userService');

exports.createMatch = (user_white, user_black, game_state, status) => {
    const match = new Match({
        user_white,
        user_black,
        game_state,
        status
    });

    return match.save();
}

exports.endMatch = function(matchId, winnerId) {
    return Match.findById(matchId).then(match => {
        match.winner = winnerId;
        match.end_time = new Date();
        match.status = 'completed';

        let loserId = match.user_white.equals(winnerId) ? match.user_black : match.user_white;

        return Promise.all([
            userService.updateRank(winnerId, true),
            userService.updateRank(loserId, false)
        ]).then(() => match.save());
    });
};
