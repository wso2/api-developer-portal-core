const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const SubscriptionPolicy = sequelize.define('DP_API_SUBSCRIPTION_POLICY', {
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
    tableName: 'DP_API_SUBSCRIPTION_POLICY',
    returning: true
});

module.exports = SubscriptionPolicy;
