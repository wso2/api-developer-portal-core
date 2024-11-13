const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const APIContent = sequelize.define('dp_api_content', { 
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
    tableName: 'dp_api_content',
    returning: false,
    primaryKey: true
});

// Export both models
module.exports = APIContent;
