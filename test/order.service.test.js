const sinon = require('sinon');
const { expect } = require('chai');

const Order = require('../src/models/order.model');
const {
  createOrder,
  deleteOrderById,
  getOrder,
  getOrderById,
  getOrders,
  updateOrderById,

} = require('../src/services/order.service');
const mockData = require('./mockData');

describe("Order Service Unit Tests", function () {
  this.afterEach(() => {
    sinon.restore();
  })
  describe("Orders functionality testcases", function () {

    it("should successfully add a order", async function () {
      const orderBody = {
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

      sinon.stub(Order.prototype, 'save').returns(
        { ...mockData.mockOrderData }
      );

      const returnedOrder = await createOrder(orderBody);

      expect(returnedOrder.billingAddress.fullName).to.equal(orderBody.billingAddress.fullName);
      expect(returnedOrder.billingAddress.email).to.equal(orderBody.billingAddress.email);
    });


    it("should get single order base on id", async function () {
      sinon.stub(Order, 'findOne').returns(
        { ...mockData.mockOrderData }
      );

      const returnedOrder = await getOrderById('657869a210fd2d2126495152');

      expect(returnedOrder.billingAddress.fullName).to.equal(mockData.mockOrderData.billingAddress.fullName);
      expect(returnedOrder.billingAddress.email).to.equal(mockData.mockOrderData.billingAddress.email);
    });

    it("should get all orders from getOrders", async function () {
      sinon.stub(Order, 'find').returns(
        [{ ...mockData.mockOrderData }]
      );

      const returnedOrders = await getOrders();

      expect(returnedOrders[0].billingAddress.fullName).to.equal(mockData.mockOrderData.billingAddress.fullName);
      expect(returnedOrders[0].billingAddress.email).to.equal(mockData.mockOrderData.billingAddress.email);
    });

    it("should get a order which is not soft deleted", async function () {
      sinon.stub(Order, 'findOne').returns(
        { ...mockData.mockOrderData }
      );

      const returnedOrder = await getOrder();

      expect(returnedOrder.billingAddress.fullName).to.equal(mockData.mockOrderData.billingAddress.fullName);
      expect(returnedOrder.billingAddress.email).to.equal(mockData.mockOrderData.billingAddress.email);
    });


    it("should update single order base on id", async function () {
      sinon.stub(Order, 'findOne').returns(
        { ...mockData.mockOrderData }
      );
      sinon.stub(Order, 'findOneAndUpdate').returns(
        { ...mockData.mockOrderData }
      );

      const returnedOrder = await updateOrderById('6579a4d94c1d3abfca1efaf7', mockData.mockUpdateOrderPayload);

      expect(returnedOrder.billingAddress.fullName).to.equal(mockData.mockOrderData.billingAddress.fullName);
      expect(returnedOrder.billingAddress.email).to.equal(mockData.mockOrderData.billingAddress.email);
    });


    it("should delete single order base on id", async function () {
      sinon.stub(Order, 'findById').returns(
        { ...mockData.mockOrderData }
      );
      sinon.stub(Order, 'findOneAndUpdate').returns(
        { ...mockData.mockOrderData }
      );

      const removedOrder = await deleteOrderById('6579a4d94c1d3abfca1efaf7');

      expect(removedOrder.billingAddress.fullName).to.equal(mockData.mockOrderData.billingAddress.fullName);
      expect(removedOrder.billingAddress.email).to.equal(mockData.mockOrderData.billingAddress.email);
    });

  });
});