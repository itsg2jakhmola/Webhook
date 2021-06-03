const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order_id : {
    type: String,
  },
  sku: {
    type: String,
  },
  product_id: {
    type: Schema.Types.ObjectId,
  },
  condition : {
    type: String,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
  },
  order_status : {
      type: String
  },
  deletedAt: { 
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
},
  updatedAt: {
    type: Date,
    default: Date.now()
},
});

module.exports = mongoose.model('order', orderSchema);
