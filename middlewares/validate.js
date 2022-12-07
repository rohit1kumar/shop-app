const { body, validationResult } = require('express-validator');

const registerValidation = () => {
    return [
        body('name')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Name cannot be empty or null')
            .trim(),
        body('email')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Email cannot be empty or null')
            .isEmail()
            .withMessage('Email Format Incorrect')
            .trim(),
        body('password')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Password cannot be empty')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
            .trim(),
    ];
};
const loginValidation = () => {
    return [
        body('email')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Email cannot be empty or null')
            .isEmail()
            .withMessage('Email Format Incorrect')
            .trim(),
        body('password')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Password cannot be empty or null')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
            .trim(),
    ];
};
const orderValidation = () => {
    return [
        body('productId')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Product Id cannot be empty or null')
            .isInt()
            .withMessage('Product Id must be an integer')
            .trim(),
        body('quantity')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('Quantity cannot be empty or null')
            .isInt()
            .withMessage('Quantity must be an integer')
            .trim(),
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        statusCode: 422,
        status: 'error',
        msg: 'Validation Failed',
        errors: extractedErrors,
    });
};

module.exports = { registerValidation, loginValidation, orderValidation, validate };