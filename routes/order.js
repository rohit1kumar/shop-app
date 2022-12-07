const router = require('express').Router();
const { validateToken } = require('../middlewares/auth');
const { addToOrder, getAllOrder, getOrderById } = require('../controllers/order');
const { orderValidation, validate } = require('../middlewares/validate');

// ADD TO ORDER (CREATE ORDER)
router.post('/order', validateToken, orderValidation(), validate, addToOrder);

// GET ORDERS OF LOGGED IN USER (CUSTOMER) WITH PAGINATION,
// SORTING, FILTERING AND SEARCHING PREVIOUS ORDERS BY DATE,
// BY DEFAULT ONLY LAST 7 DAYS ORDERS ARE SHOWN
router.get('/orders', validateToken, getAllOrder);

// GET ORDER BY ID
router.get('/order/:id', validateToken, getOrderById);

module.exports = router;
