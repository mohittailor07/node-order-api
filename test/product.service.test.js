const sinon = require('sinon');
const { expect } = require('chai');

const Product = require('../src/models/product.model');
const {
  createProduct,
  getProductById,
  getProducts,
  getProduct,
  updateProductById,
  deleteProductById,
  getProductsWithInOperator,
  updateManageStockOfProduct,
} = require('../src/services/product.service');
const mockData = require('./mockData');

describe("Product Service Unit Tests", function () {
  this.afterEach(() => {
    sinon.restore();
  })
  
  describe("Products functionality testcases", function () {

    it("should successfully add a product", async function () {

      const productBody = {
        name: 'One Plus 13',
        description: '13 max is new product',
        manufactureDate: '11-12-2023',
        price: 12999
      }

      sinon.stub(Product.prototype, 'save').returns(
        { ...mockData.createdProduct }
      );

      const returnedProduct = await createProduct(productBody);

      expect(returnedProduct.name).to.equal(productBody.name);
      expect(returnedProduct.description).to.equal(productBody.description);
    });

    it("should get single product base on id", async function () {
      sinon.stub(Product, 'findOne').returns(
        { ...mockData.mockProductData }
      );

      const returnedProduct = await getProductById('657869a210fd2d2126495152');

      expect(returnedProduct.name).to.equal(mockData.mockProductData.name);
      expect(returnedProduct.description).to.equal(mockData.mockProductData.description);
    });

    it("should get all products from getProducts", async function () {
      sinon.stub(Product, 'find').returns(
        [{ ...mockData.mockProductData }]
      );

      const returnedProducts = await getProducts();

      expect(returnedProducts[0].name).to.equal(mockData.mockProductData.name);
      expect(returnedProducts[0].description).to.equal(mockData.mockProductData.description);
    });

    it("should get a product which is not soft deleted", async function () {
      sinon.stub(Product, 'findOne').returns(
        { ...mockData.mockProductData }
      );

      const returnedProduct = await getProduct();

      expect(returnedProduct.name).to.equal(mockData.mockProductData.name);
      expect(returnedProduct.description).to.equal(mockData.mockProductData.description);
    });

    it("should update single product base on id", async function () {
      sinon.stub(Product, 'findOne').returns(
        { ...mockData.mockProductData }
      );
      sinon.stub(Product, 'findOneAndUpdate').returns(
        { ...mockData.mockProductData }
      );

      const returnedProduct = await updateProductById('657869a210fd2d2126495152', mockData.mockUpdateProductPayload);

      expect(returnedProduct.name).to.equal(mockData.mockProductData.name);
      expect(returnedProduct.description).to.equal(mockData.mockProductData.description);
    });

    it("should delete single product base on id", async function () {
      sinon.stub(Product, 'findById').returns(
        { ...mockData.mockProductData }
      );
      sinon.stub(Product, 'findOneAndUpdate').returns(
        { ...mockData.mockProductData }
      );

      const removedProduct = await deleteProductById('657869a210fd2d2126495152');

      expect(removedProduct.name).to.equal(mockData.mockProductData.name);
      expect(removedProduct.description).to.equal(mockData.mockProductData.description);
    });

    it("should get products with in query", async function () {
      sinon.stub(Product, 'find').returns(
        [{ ...mockData.mockProductData }]
      );

      const returnedProduct = await getProductsWithInOperator(['657869a210fd2d2126495152']);

      expect(returnedProduct[0].name).to.equal(mockData.mockProductData.name);
      expect(returnedProduct[0].description).to.equal(mockData.mockProductData.description);
    });

    it("should update product quantity with id", async function () {
      sinon.stub(Product, 'findOne').returns(
        { ...mockData.mockProductData }
      );
      sinon.stub(Product, 'findOneAndUpdate').returns(
        { ...mockData.mockProductData, quantity: 5 }
       );

      const returnedProduct = await updateManageStockOfProduct('657869a210fd2d2126495152', 5);

      expect(returnedProduct.name).to.equal(mockData.mockProductData.name);
      expect(returnedProduct.quantity).to.equal(mockData.mockProductData.quantity);
    });
  });
});