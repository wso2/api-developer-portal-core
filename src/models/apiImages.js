const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const APIImageMetadata = sequelize.define('DP_API_IMAGEDATA', {
    API_ID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    IMAGE_TAG: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IMAGE_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    timestamps: false,
    tableName: 'DP_API_IMAGEDATA',
    returning: true
});

// Export both models
module.exports = APIImageMetadata;