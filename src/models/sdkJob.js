const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const { ERROR_MESSAGE } = require('../utils/constants');

const SDKJob = sequelize.define('DP_SDK_JOB', {
    JOB_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    ORG_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    APPLICATION_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    JOB_STATUS: {
        type: DataTypes.ENUM('PENDING', 'MERGING', 'SDK_GENERATION', 'APP_CODE_GENERATION', 'COMPLETED', 'FAILED'),
        allowNull: false,
        defaultValue: 'PENDING'
    },
    ERROR_MESSAGE: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'DP_API_CONTENT',
    returning: false,
    primaryKey: true
});

module.exports = SDKJob;