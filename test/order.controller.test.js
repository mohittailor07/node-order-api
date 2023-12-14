const { expect, spyOn } = require('chai');
const sinon = require("sinon");

const { orderController } = require('../src/controllers');
const { orderService } = require('../src/services');
const Order = require('../src/models/order.model');

const mockData = require('./mockData');

describe("Order Controller Unit Tests", function () {
  describe("Orders Controller Unit Tests", function () {


    describe("Orders Controller functionality testcases getOrders", function () {
      const sandbox = sinon.createSandbox();
      afterEach(function () {
        sinon.restore();
        sandbox.restore();
      });

      const res = {
        send: sinon.spy(),
        status: sinon.spy(),
      };

      it("controller should return all orders", async () => {
        const req = {};
        sinon.stub(orderService, 'getOrders').resolves()
        await orderController.getOrders(req, res);
        expect(res.send.calledOnce).to.be.true;
      });

      it("controller should successfully create a order", async () => {
        const req = {
          body: {
            "billingAddress": {
              "fullName": "Jane Doe",
              "email": "janedoe@email.com",
              "street": "123 Main Street",
              "city": "Austin",
              "state": "Texas",
              "zip": "78751",
              "country": "United States"
            },
            "productsDetail": [
              {
                "productId": "657869a210fd2d2126495152",
                "productName": "dgdfgdsfgdsfgsdfgdf",
                "quantity": 3,
                "amount": 12999
              }
            ]
          }
        };
        sinon.stub(orderService, 'createOrder').resolves()
        await orderController.createOrder(req, res);
        expect(res.send.calledOnce).to.be.true;
      });

      it("controller should return a order is delete is 0", async () => {
        const req = {
          params: {
            orderId: '657869a210fd2d2126495152',
          }
        };

        sinon.stub(orderService, 'getOrder').resolves()
        await orderController.getOrder(req, res);
        expect(res.send.calledOnce).to.be.false;
      })

      it("controller update order with id", async () => {
        const req = {
          params: {
            orderId: '657869a210fd2d2126495152',
          },
          body: {
            ...mockData.mockUpdateOrderPayload
          }
        };

        sinon.stub(orderService, 'updateOrderById').resolves()
        await orderController.updateOrder(req, res);
        expect(res.send.calledOnce).to.be.false;
      })
    })
  })
})