const { Cart } = require('../models/cart')

// CREATE CART ITEM
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const cart = await Cart.create({
            productId,
            customerId: req.user.id,
            quantity
        });

        res.status(201).json({
            status: 'success',
            message: `Cart item created with id ${cart.id}`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// GET MY CART ITEMS
exports.getMyCartItems = async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: {
                customerId: req.user.id
            }
        });

        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// DELETE CART ITEM BY ID
exports.deleteCartItem = async (req, res) => {
    try {
        const cart = await Cart.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Cart item deleted'
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};
