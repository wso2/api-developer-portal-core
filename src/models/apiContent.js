const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const APIContent = sequelize.define('DP_API_CONTENT', { 
    API_ID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    API_FILE: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    FILE_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    timestamps: false,
    tableName: 'DP_API_CONTENT',
    returning: false,
    primaryKey: true
});

// Export both models
module.exports = APIContent;
