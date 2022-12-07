const router = require('express').Router();
const { getAllProducts, getProductById, } = require('../controllers/product');

// GET ALL PRODUCTS
router.get('/products', getAllProducts);

// GET PRODUCT BY ID
router.get('/product/:id', getProductById);

module.exports = router;
