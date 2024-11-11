const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const SubscriptionPolicy = sequelize.define('dp_api_subscription_policy', {
    API_ID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    POLICY_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    timestamps: false,
    tableName: 'dp_api_subscription_policy',
    returning: false
});

module.exports = SubscriptionPolicy;
