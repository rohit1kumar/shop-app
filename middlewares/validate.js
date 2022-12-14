const { body, param, query, validationResult } = require('express-validator');

// VALIDATING REGISTER REQUEST BODY
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
// VALIDATING LOGIN REQUEST BODY
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
// VALIDATING ORDER REQUEST BODY
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
// VALIDATING PARAMS ID
const paramsValidation = () => {
    return [
        param('id')
            .not()
            .isEmpty()
            .isLength({ min: 1 })
            .withMessage('params id cannot be empty or null')
            .isInt()
            .withMessage('params id must be an integer')
            .trim(),
    ];
};
// VALIDATING QUERY
const queryValidation = () => {
    return [
        query('pageNumber')
            .optional()
            .isInt()
            .withMessage('pageNumber must be an integer')
            .trim(),
        query('pageSize')
            .optional()
            .isInt()
            .withMessage('pageSize must be an integer')
            .trim(),
        query('sortField')
            .optional()
            .isString()
            .withMessage('sortField must be a string')
            .isIn(['id', 'title', 'price', 'quantity', 'createdAt'])
            .withMessage('sortField must be either id, title, price, quantity or createdAt')
            .trim(),
        query('sortOrder')
            .optional()
            .isString()
            .withMessage('sortOrder must be a string')
            .isIn(['asc', 'desc'])
            .withMessage('sortOrder must be either asc or desc')
            .trim(),
        query('inStockAvailable')
            .optional()
            .isBoolean()
            .withMessage('inStockAvailable must be a boolean')
            .isIn(['true', 'false'])
            .withMessage('inStockAvailable must be either true or false')
            .trim(),
        query('toDate')
            .optional()
            .isDate() // yyyy-mm-dd
            .withMessage('toDate must be a date')
            .trim(),
        query('fromDate')
            .optional()
            .isDate() // yyyy-mm-dd
            .withMessage('fromDate must be a date')
            .trim()
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

module.exports = {
    registerValidation, loginValidation, orderValidation,
    paramsValidation, queryValidation, validate
};