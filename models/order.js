const { DataTypes, sequelize } = require('../db')

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    // customerId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    // productId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Order;
