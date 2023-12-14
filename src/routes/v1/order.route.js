const express = require('express');

const orderController = require('../../controllers/order.controller');

const router = express.Router();

router
  .route('/')
  .post(orderController.createOrder)
  .get(orderController.getOrders);

router
  .route('/:orderId')
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;