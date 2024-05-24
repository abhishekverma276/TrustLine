// productionOrderModel.js
const mongoose = require('mongoose');

const productionOrderSchema = new mongoose.Schema({
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    // more fields
});

const ProductionOrderModel = mongoose.model('ProductionOrder', productionOrderSchema);

module.exports = ProductionOrderModel;
