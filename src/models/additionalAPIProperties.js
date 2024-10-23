const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const AdditionalProperties = sequelize.define('AdditionalProperties', {
    propertyID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    key: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'AdditionalProperties',
    returning: false
});

module.exports = AdditionalProperties;
