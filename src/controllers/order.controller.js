const httpStatus = require('http-status');
const moment = require('moment');
const catchAsync = require('../utils/catchAsync');
const { orderService, productService } = require('../services');
const { Promise } = require('mongoose');

const createOrder = catchAsync(async (req, res) => {
  const {
    billingAddress, productsDetail = []
  } = req.body;

  const totolAmount = productsDetail.reduce((a, b) => a + (b.quantity * b.amount), 0);

  const orderPayload = {
    billingAddress, totolAmount, productsDetail
  }

  const productList = await productService.getProductsWithInOperator(productsDetail.map(p => p.productId));

  const productFilterData = productsDetail.filter((pd) => {
    return !productList.find(list => pd.productId === list._id && pd.quantity <= list.quantity)
  })

  // This will show error message and throw error which product is not available in stock
  if (productFilterData.length) {
    let productListMessage = 'This product doesn\'t have much quantity left. ';    
    productFilterData.map(pFD => {
      productListMessage += `\n ${pFD.productName} has ${productList.find(p => p._id === pFD.productId)?.quantity || ''} quantity left in stock.`;
    })

    throw new Error(productListMessage);
  }

  await productsDetail.map(pD => productService.updateManageStockOfProduct(pD.productId, pD.quantity));
  const order = await orderService.createOrder(orderPayload);

  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getOrders();
  res.send(orders);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrder(req.params.orderId);
  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
})

const deleteOrder = catchAsync(async (req, res) => {
  const order = await orderService.deleteOrderById(req.params.orderId);
  res.send(order);
})

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
