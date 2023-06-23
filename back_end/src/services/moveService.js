const Move = require('../models/move');

exports.createMove = (match, user, piece, start_coordinate, end_coordinate) => {
    const move = new Move({
        match,
        user,
        piece,
        start_coordinate,
        end_coordinate
    });

    return move.save();
}
