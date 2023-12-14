const { Order } = require('../models');

const createOrder = async (orderBody) => {
  const order = await new Order(orderBody).save();
  return order;
};

const getOrderById = async (id) => {
  return Order.findById(id);
};

const getOrder = async (id) => {
  const order = await Order.findOne({
    _id: id,
    isDelete: 0,
  });
  if (!order) {
    throw new Error("Order not found with given order id")
  }
  return order;
};

const getOrders = async () => {
  const orders = await Order.find({
    isDelete: 0,
  });
  if (!orders.length) {
    throw new Error("No orders found")
  }
  return orders;
};

const updateOrderById = async (orderId, orderBody) => {
  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("Order not found with given order id")
  }

  await Order.findOneAndUpdate(
    {
      '_id': orderId,
      isDelete: 0,
    },
    orderBody,
    { upsert: true }
  )

  const updatedOrder = await getOrder(orderId);
  return updatedOrder;
};

const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found with given order id")
  }

  await Order.findOneAndUpdate(
    {
      '_id': orderId,
    },
    {
      isDelete: 1,
    },
    { upsert: true }
  )

  const updatedOrder = await getOrderById(orderId);
  return updatedOrder;
}

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  getOrder,
  updateOrderById,
  deleteOrderById,
};
