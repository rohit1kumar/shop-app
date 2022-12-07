const router = require('express').Router();
const { getAllProducts, getProductById, createProduct, deleteProductById } = require('../controllers/product');
const { validateToken } = require('../middlewares/auth');

// GET ALL PRODUCTS
router.get('/product', getAllProducts);

// GET PRODUCT BY ID
router.get('/product/:id', getProductById);

// CREATE PRODUCT
router.post('/product', validateToken, createProduct);

// DELETE PRODUCT BY ID
router.delete('/product/:id', validateToken, deleteProductById);

module.exports = router;
