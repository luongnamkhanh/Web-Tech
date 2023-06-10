const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    games_played: { type: Number, default: 0 },
    games_won: { type: Number, default: 0 },
    games_lost: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    rank: { type: String, default: 'Bronze' }, 
    in_promotion_series: { type: Boolean, default: false },
    promotion_series_won: { type: Number, default: 0 },
    status: { type: String, default: 'offline' },
    current_games: [{ type: Schema.Types.ObjectId, ref: 'Match' }]
});

module.exports = mongoose.model('User', UserSchema);
