const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    role: { type: String, required: true },
    supply: String,
    delivery: String,
    sales: String,
    feedback: String,
    logistics: String,
    production: String,
    challenges: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
