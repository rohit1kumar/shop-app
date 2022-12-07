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

module.exports = { sequelize, DataTypes };
