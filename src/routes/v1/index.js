const express = require('express');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
