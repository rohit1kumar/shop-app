const router = require('express').Router();
const { register, login, logout } = require('../controllers/customer');
const { registerValidation, loginValidation, validate } = require('../middlewares/validate');

// CUSTOMER REGISTRATION
router.post('/register', registerValidation(), validate, register);

// CUSTOMER LOGIN
router.post('/login', loginValidation, validate, login);

// CUSTOMER LOGOUT
router.get('/logout', logout);

module.exports = router;