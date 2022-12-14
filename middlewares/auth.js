const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'token_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '10d';

// CREATE TOKEN
exports.createToken = async (data) => {
    try {
        const token = await jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return token;
    } catch (err) {
        return null;
    }
};
// VALIDATE TOKEN (MIDDLEWARE)
exports.validateToken = async (req, res, next) => {
    try {
        // get toke from header or cookies
        const token = req.cookies[process.env.COOKIE_SECRET] || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const decoded = await jwt.verify(token, JWT_SECRET);
        req.user = decoded
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }
};
