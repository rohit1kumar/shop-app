const router = require('express').Router();
const { addToCart, getMyCartItems, deleteCartItem } = require('../controllers/cart');
const { validateToken } = require('../middlewares/auth');
// ADD TO CART
router.post('/cart', validateToken, addToCart);

// GET MY CART ITEMS
router.get('/cart', validateToken, getMyCartItems);

// DELETE CART ITEM BY ID
router.delete('/cart/:id', validateToken, deleteCartItem);

module.exports = router;