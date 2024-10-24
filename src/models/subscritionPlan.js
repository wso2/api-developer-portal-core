const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const SubscriptionPlan = sequelize.define('SubscriptionPlan', {
    subscriptionPlanID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    policyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orgId: {
        type: DataTypes.UUID,
        forignKey: true
    },
}, {
    timestamps: false,
    tableName: 'SubscriptionPlan',
    returning: true
});

// Export both models
module.exports = {
    SubscriptionPlan
};
