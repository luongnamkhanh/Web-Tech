const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    profile: { type: String},
    isOnline: { type: Boolean, default: false},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    games_played: { type: Number, default: 0 },
    games_won: { type: Number, default: 0 },
    games_lost: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    rank: { type: String, default: 'Bronze' }, 
    in_promotion_series: { type: Boolean, default: false },
    promotion_series_won: { type: Number, default: 0 },
    current_games: [{ type: Schema.Types.ObjectId, ref: 'Match' }]
});

module.exports = mongoose.model('User', UserSchema);;
