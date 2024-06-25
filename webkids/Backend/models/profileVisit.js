const mongoose = require('mongoose');

const profileVisitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    visitedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProfileVisit', profileVisitSchema);