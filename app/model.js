const mongoose = require('mongoose');

const shortSchema = new mongoose.Schema({
    url: { type: String},
    id: { type: String, unique: true },
    visitCount: { type: Number, default: 0 }
}, {
    versionKey: false
});

const ShortModel = new mongoose.model('urls', shortSchema);

module.exports = ShortModel;