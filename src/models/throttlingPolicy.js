const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const ThrottlingPolicy = sequelize.define('ThrottlingPolicy', {
    policyId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    policyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category:{
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'ThrottlingPolicy',
    returning: false
});

module.exports = ThrottlingPolicy;
