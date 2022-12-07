const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'postgres',
    logging: false
});

// // associations
// Customer.hasMany(Order); // This will add customerId to Order model
// Order.belongsTo(Customer); // This will add customerId to Order model

// Product.hasMany(Order); // This will add productId to Order model
// Order.belongsTo(Product); // This will add productId to Order model

// Customer.hasOne(Cart); // This will add customerId to Cart model
// Cart.belongsTo(Customer); // This will add customerId to Cart model

// Product.belongsToMany(Cart, { through: 'cart_products' });
// Cart.belongsToMany(Product, { through: 'cart_products' });


module.exports = {
    sequelize,
    DataTypes
};
