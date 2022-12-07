const router = require('express').Router();
const { getAllProducts, getProductById, } = require('../controllers/product');
const { paramsValidation, queryValidation, validate } = require('../middlewares/validate');

// GET ALL PRODUCTS
router.get('/products', queryValidation(), validate, getAllProducts);

// GET PRODUCT BY ID
router.get('/product/:id', paramsValidation(), validate, getProductById);

module.exports = router;
