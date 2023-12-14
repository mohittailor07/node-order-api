const { Product } = require('../models');

const createProduct = async (productBody) => {
  const product = await new Product(productBody).save();

  return product;
};

const getProductById = async (id) => {
  return Product.findById(id);
};

const getProducts = async () => {
  const products = await Product.find({
    isDelete: 0,
  });
  if (!products.length) {
    throw new Error("No products found")
  }
  return products;
};

const getProductsWithInOperator = async (idList) => {
  const products = await Product.find({
    _id: { "$in": idList },
    isDelete: 0,
  });

  return JSON.parse(JSON.stringify(products));
};

const getProduct = async (id) => {
  const product = await Product.findOne({
    _id: id,
    isDelete: 0,
  });
  if (!product) {
    throw new Error("Product not found with given product id")
  }
  return product;
};

const updateManageStockOfProduct = async (productId, quantity) => {
  const product = await getProduct(productId);
  if (!product) {
    throw new Error("Product not found with given product id")
  }

  await Product.findOneAndUpdate(
    {
      '_id': productId,
      isDelete: 0,
    },
    {
      quantity: product.quantity - quantity,
    },
    { upsert: true }
  )

  return product;
};


const updateProductById = async (productId, productBody) => {
  const product = await getProduct(productId);
  if (!product) {
    throw new Error("Product not found with given product id")
  }

  await Product.findOneAndUpdate(
    {
      '_id': productId,
      isDelete: 0,
    },
    productBody,
    { upsert: true }
  )

  const updatedProduct = await getProduct(productId);
  return updatedProduct;
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);

  if (!product) {
    throw new Error("Product not found with given product id")
  }

  await Product.findOneAndUpdate(
    {
      '_id': productId,
    },
    {
      isDelete: 1,
    },
    { upsert: true }
  )

  const updatedProduct = await getProductById(productId);
  return updatedProduct;
};

module.exports = {
  createProduct,
  getProduct,
  // queryProducts, todo get data based on the pagination
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsWithInOperator,
  updateManageStockOfProduct,
};

