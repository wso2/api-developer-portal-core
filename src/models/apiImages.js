const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const APIImageMetadata = sequelize.define('dp_api_imagedata', {
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
    tableName: 'dp_api_imagedata',
    returning: true
});

// Export both models
module.exports = APIImageMetadata;