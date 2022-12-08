const { Op } = require('sequelize');
const { Order } = require('../models/db');
const { Product } = require('../models/db');

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_FIELD = 'createdAt';
const DEFAULT_SORT_ORDER = 'DESC'; // DESC for latest orders first
const DEFAULT_TO_DATE = new Date(); // today
const DEFAULT_FROM_DATE = new Date(DEFAULT_TO_DATE.getFullYear(), DEFAULT_TO_DATE.getMonth(), DEFAULT_TO_DATE.getDate() - 7);

// ADD TO ORDER (CREATE ORDER)
exports.createOrder = async (req, res) => {
    try {
        /*
        1 Check the quantity of the product in the database if its greater than
          the quantity in the request then proceed otherwise return error
        2 Create a new order and add the product to the order
        3 Update the quantity of the product in the database
        4 Return the order
        */

        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        if (product.quantity < quantity) {
            return res.status(200).json({
                status: 'error',
                message: 'Available quantity is less than the requested quantity',
                data: {
                    availableQuantity: product.quantity,
                    requestedQuantity: quantity
                }
            });
        }
        const order = await Order.create({
            customerId: req.user.id,
            productId,
            quantity,
            totalAmount: product.price * quantity
        });
        product.quantity = product.quantity - quantity;

        await product.save();

        res.status(201).json({
            status: 'success',
            message: `Order created with id ${order.id}`,
            data: order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

/*
GET ALL ORDERS OF LOGGED IN USER (CUSTOMER) WITH PAGINATION,
SORTING, FILTERING AND SEARCHING PREVIOUS ORDERS BY DATE,
BY DEFAULT ONLY LAST 7 DAYS ORDERS ARE SHOWN
*/
exports.getAllOrders = async (req, res) => {
    try {
        let {
            pageNumber = DEFAULT_PAGE_NUMBER,
            pageSize = DEFAULT_PAGE_SIZE,
            sortField = DEFAULT_SORT_FIELD,
            sortOrder = DEFAULT_SORT_ORDER,
            fromDate = DEFAULT_FROM_DATE,
            toDate = DEFAULT_TO_DATE
        } = req.query;

        pageNumber = parseInt(pageNumber);
        pageSize = parseInt(pageSize);

        // set default values if invalid values are passed
        if (isNaN(pageNumber) || pageNumber < 1) {
            pageNumber = DEFAULT_PAGE_NUMBER;
        }
        if (isNaN(pageSize) || pageSize < 1) {
            pageSize = DEFAULT_PAGE_SIZE;
        }
        if (!['id', 'createdAt', 'totalAmount'].includes(sortField)) {
            sortField = DEFAULT_SORT_FIELD;
        }
        if (!['asc', 'desc'].includes(sortOrder)) {
            sortOrder = DEFAULT_SORT_ORDER;
        }

        // check if date is valid or not if not then set default date
        if (isNaN(Date.parse(fromDate))) {
            fromDate = DEFAULT_FROM_DATE;
        }
        if (isNaN(Date.parse(toDate))) {
            toDate = DEFAULT_TO_DATE;
        }

        // convert date to ISO format
        fromDate = new Date(fromDate).toISOString();
        toDate = new Date(toDate).toISOString();

        const orders = await Order.findAll({
            where: {
                customerId: req.user.id,
                createdAt: {
                    [Op.between]: [fromDate, toDate]
                }
            },
            order: [[sortField, sortOrder]],
            limit: pageSize,
            offset: (pageNumber - 1) * pageSize
        });

        res.status(200).json({
            status: 'success',
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// GET ORDER BY ID (logged in user only)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: {
                model: Product,
                as: 'product'
            }
        });

        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: 'Order not found'
            });
        }
        if (order.customerId !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to access this order'
            });
        }
        res.status(200).json({
            status: 'success',
            data: order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};
