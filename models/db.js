const Customer = require('./customer');
const Product = require('./product');
const Order = require('./order');

Customer.hasMany(Order);
Order.belongsTo(Customer);

Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = { Customer, Product, Order };
