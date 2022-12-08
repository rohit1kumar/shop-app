const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_NAME = process.env.DATABASE_NAME || 'shopdb';
const DATABASE_USER = process.env.DATABASE_USER || 'postgres';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'postgres';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = process.env.DATABASE_PORT || 5432;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialect: 'postgres',
    logging: false
});

module.exports = { sequelize, DataTypes };
