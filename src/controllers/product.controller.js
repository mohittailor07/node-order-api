const httpStatus = require('http-status');
const moment = require('moment');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const {
    name, description, manufactureDate, price, quantity,
  } = req.body
  const productPayload = {
    name,
    description,
    manufactureDate: moment(manufactureDate, 'DD-MM-YYYY').format(),
    price,
    quantity,
  }

  const product = await productService.createProduct(productPayload);
  return res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const products = await productService.getProducts();
  return res.send(products);
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProduct(req.params.productId);
  return res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  return res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req.params.productId);
  return res.status(httpStatus.NO_CONTENT).send(product);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
