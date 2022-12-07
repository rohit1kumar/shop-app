const { Product } = require('../models/product');
const { Op } = require('sequelize');

// GET ALL PRODUCTS WITH PAGINATION, SORTING AND FILTERING
exports.getAllProducts = async (req, res) => {
    try {
        const DEFAULT_PAGE_NUMBER = 1;
        const DEFAULT_PAGE_SIZE = 10;
        const DEFAULT_SORT_FIELD = 'id';
        const DEFAULT_SORT_ORDER = 'ASC';
        const DEFAULT_IN_STOCK_AVAILABLE = false;

        let {
            pageNumber = DEFAULT_PAGE_NUMBER,
            pageSize = DEFAULT_PAGE_SIZE,
            sortField = DEFAULT_SORT_FIELD,
            sortOrder = DEFAULT_SORT_ORDER,
            inStockAvailable = DEFAULT_IN_STOCK_AVAILABLE
        } = req.query;

        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);

        if (isNaN(pageNumber) || pageNumber < 1) {
            pageNumber = DEFAULT_PAGE_NUMBER;
        }

        if (isNaN(pageSize) || pageSize < 1) {
            pageSize = DEFAULT_PAGE_SIZE;
        }

        if (!['ASC', 'DESC'].includes(sortOrder)) {
            sortOrder = DEFAULT_SORT_ORDER;
        }

        if (inStockAvailable === 'true') inStockAvailable = { quantity: { [Op.gt]: 0 } }; else { }; // available products only (quantity > 0)
        const products = await Product.findAll(
            {
                where: inStockAvailable,
                order: [
                    [sortField, sortOrder]
                ],
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize
            });

        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// CREATE PRODUCT BY ID
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: 'success',
            message: `Product created with id ${product.id}`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// DELETE PRODUCT BY ID
exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        await product.destroy();
        res.status(200).json({
            status: 'success',
            message: `Product deleted with id ${product.id}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};
