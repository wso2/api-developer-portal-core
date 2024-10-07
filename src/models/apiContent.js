const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const APIContent = sequelize.define('ApiContent', { 
    contentID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    apiFile: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    timestamps: false,
    tableName: 'ApiContent',
    returning: false
});

// Export both models
module.exports = APIContent;
