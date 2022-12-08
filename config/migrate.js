require('dotenv').config();
const data = require('./product.json');
const { Product } = require('../models/db');
const { sequelize } = require('./db');

const addProductToTable = async () => {
    try {
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        await Product.bulkCreate(data);
        console.log('data added to product table');
    } catch (err) {
        console.log(err.message);
    }
};

addProductToTable(); // Add data to product table
