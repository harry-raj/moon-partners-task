const { DataTypes } = require('sequelize');
const { sequelize } = require("../db.config");

const Tiles = sequelize.define('Tiles', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
});

module.exports = { Tiles };
