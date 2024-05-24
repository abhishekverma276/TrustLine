// InventoryModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  item: String,
  quantity: Number,
  location: String
});

module.exports = mongoose.model('Inventory', inventorySchema);
