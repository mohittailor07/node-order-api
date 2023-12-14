const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    manufactureDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    isDelete: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * @typedef Product
 */
const Product = mongoose.model('product', productSchema);

module.exports = Product;
