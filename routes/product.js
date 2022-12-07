const router = require('express').Router();
const { getAllProducts, getProductById, createProduct, deleteProductById } = require('../controllers/product');
const { validateToken } = require('../middlewares/auth');

// GET ALL PRODUCTS
router.get('/product', getAllProducts);

// GET PRODUCT BY ID
router.get('/product/:id', getProductById);

module.exports = router;
