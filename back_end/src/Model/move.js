const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoveSchema = new Schema({
    match: { type: Schema.Types.ObjectId, ref: 'Match' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    piece: { type: String, required: true }, // e.g., 'Knight', 'Rook', 'Queen', etc.
    start_coordinate: { type: String, required: true }, // e.g., 'e4'
    end_coordinate: { type: String, required: true }, // e.g., 'd5'
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Move', MoveSchema);
