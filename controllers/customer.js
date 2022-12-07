const bcrypt = require('bcrypt');
const { Customer } = require('../models/db');
const { createToken } = require('../middlewares/auth');
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'cookie_secret';

// CUSTOMER REGISTRATION
exports.register = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        let customer = await Customer.findOne({ where: { email } });
        if (customer) {
            return res.status(400).json({
                status: 'error',
                message: 'Customer already exists'
            });
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        customer = await Customer.create({ name, email, password });

        // Generate token
        const token = await createToken({ id: customer.id });

        // Set cookie with token after registration
        res.status(201)
            .cookie(COOKIE_SECRET, token, {
                httpOnly: true,
                sameSite: 'None',
                maxAge: 864_000_000, // 10 days
            }).json({
                status: 'success',
                message: `Customer registered with id ${customer.id}`,
                token
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// CUSTOMER LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ where: { email } });
        if (!customer) {
            return res.status(404).json({
                status: 'error',
                message: 'Customer not found'
            });
        }

        const isValid = await bcrypt.compare(password, customer.password);
        if (!isValid) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = await createToken({ id: customer.id });

        res.status(200)
            .cookie(COOKIE_SECRET, token, {
                httpOnly: true,
                sameSite: 'None',
                maxAge: 864_000_000, // 10 days
            }).json({
                status: 'success',
                message: `Customer logged with id ${customer.id}`,
                token
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};

// CUSTOMER LOGOUT
exports.logout = async (req, res) => {
    try {
        res.clearCookie(COOKIE_SECRET);
        res.status(200).json({
            status: 'success',
            message: 'Customer logged out successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server error'
        });
    }
};
