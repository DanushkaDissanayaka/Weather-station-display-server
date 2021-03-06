const mongoose = require('mongoose');

const station = mongoose.Schema({
    id: { type: String, unique: true },
    name: { type: String },
    type: { type: Number },
    ldlog: { type: String , default: null },
    location: [Number],
})

module.exports = mongoose.model('Station', station);