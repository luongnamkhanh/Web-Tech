const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
    user_white: { type: Schema.Types.ObjectId, ref: 'User' },
    user_black: { type: Schema.Types.ObjectId, ref: 'User' },
    start_time: { type: Date, default: Date.now },
    end_time: Date,
    game_history: [String],
    winner: { type: Schema.Types.ObjectId, ref: 'User' },
    status: String //e.g., 'playing'
});

module.exports = mongoose.model('Match', MatchSchema);
