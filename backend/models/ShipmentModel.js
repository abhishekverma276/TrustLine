// ShipmentModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
  orderRef: { type: Schema.Types.ObjectId, ref: 'Order' },
  shipmentDate: Date,
  status: String
});

module.exports = mongoose.model('Shipment', shipmentSchema);
