const { expect, spyOn } = require('chai');
const sinon = require("sinon");

const { productController } = require('../src/controllers');
const { productService } = require('../src/services');
const Product = require('../src/models/product.model');

const mockData = require('./mockData');

describe("Product Controller Unit Tests", function () {
  // let status, json;
  // this.beforeEach(() => {
  //   status = sinon.stub();
  //   json = sinon.spy();
  //   res = { json, status };
  //   status.returns(res);
  // })

  describe("Products Controller Unit Tests", function () {

    describe("Products Controller functionality testcases getProducts", function () {
      const sandbox = sinon.createSandbox();
      afterEach(function () {
        sinon.restore();
        sandbox.restore();
      });

      const res = {
        send: sinon.spy(),
        status: sinon.spy(),
      };

      it("controller should return all products", async () => {
        const req = {};
        sinon.stub(productService, 'getProducts').resolves()
        await productController.getProducts(req, res);
        expect(res.send.calledOnce).to.be.true;
      });

      it("controller should successfully create a product", async () => {
        const req = {
          body: {
           ...mockData.createdProduct
          }
        };
        sinon.stub(productService, 'createProduct').resolves()
        await productController.createProduct(req, res);
        expect(res.send.calledOnce).to.be.true;
      });

      it("controller should return a product is delete is 0", async () => {
        const req = {
          params: {
            productId: '657869a210fd2d2126495152',
          }
        };

        sinon.stub(productService, 'getProduct').resolves()
        await productController.getProduct(req, res);
        expect(res.send.calledOnce).to.be.false;
      })

      it("controller product with id", async () => {
        const req = {
          params: {
            productId: '657869a210fd2d2126495152',
          },
          body: {
            ...mockData.mockUpdateProductPayload
          }
        };

        sinon.stub(productService, 'updateProductById').resolves()
        await productController.updateProduct(req, res);
        expect(res.send.calledOnce).to.be.false;
      })
    })
  })
})