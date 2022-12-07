const error = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Something went wrong'
    });
};
const notFound = (req, res) => res.status(404).json({ success: false, message: 'Route not found' });

module.exports = { notFound, error };
