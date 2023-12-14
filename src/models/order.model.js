const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    billingAddress: {
      type: Object,
      default: {},
      required: true,

      fullName: {
        type: String,
        default: '',
        required: true,
      },
      email: {
        type: String,
        default: '',
        required: true,
      },
      street: {
        type: String,
        default: '',
        required: true,
      },
      city: {
        type: String,
        default: '',
        required: true,
      },
      state: {
        type: String,
        default: '',
        required: true,
      },
      zip: {
        type: String,
        default: '',
        required: true,
      },
      country: {
        type: String,
        default: '',
        required: true,
      },
    },
    productsDetail: [
      {
        productId: {
          type: String,
          default: '',
          required: true,
        },
        productName: {
          type: String,
          default: '',
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
          required: true,
        },
        amount: {
          type: String,
          default: '',
          required: true,
        },
      }
    ],
    totolAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
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
 * @typedef Order
 */
const Order = mongoose.model('order', orderSchema);

module.exports = Order;
