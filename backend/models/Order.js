// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    status: String
});

module.exports = mongoose.model('Order', OrderSchema);
