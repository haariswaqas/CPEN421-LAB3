const { DataTypes } = require('sequelize');
const sequelize = require('../database');

// Define the Genre model
const Genre = sequelize.define('Genre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Genre;
