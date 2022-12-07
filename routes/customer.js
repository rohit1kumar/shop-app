const router = require('express').Router();
const { register, login, logout } = require('../controllers/customer');

// CUSTOMER REGISTRATION
router.post('/register', register);

// CUSTOMER LOGIN
router.post('/login', login);

// CUSTOMER LOGOUT
router.post('/logout', logout);

module.exports = router;