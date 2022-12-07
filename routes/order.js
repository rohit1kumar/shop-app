const router = require('express').Router();
const { validateToken } = require('../middlewares/auth');
const { createOrder, getAllOrders, getOrderById } = require('../controllers/order');
const { orderValidation, paramsValidation, queryValidation, validate } = require('../middlewares/validate');

// ADD TO ORDER (CREATE ORDER)
router.post('/order', orderValidation(), validate, validateToken, createOrder);

// GET ORDERS OF LOGGED IN USER (CUSTOMER) WITH PAGINATION,
// SORTING, FILTERING AND SEARCHING PREVIOUS ORDERS BY DATE,
// BY DEFAULT ONLY LAST 7 DAYS ORDERS ARE SHOWN
router.get('/orders', queryValidation(), validate, validateToken, getAllOrders);

// GET ORDER BY ID
router.get('/order/:id', paramsValidation(), validate, validateToken, getOrderById);

module.exports = router;
