const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const APIImages = sequelize.define('ApiImages', {
    apiImageID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    imageTag: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    imagePath: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    image: {
        type: DataTypes.BLOB,
        primaryKey: true
    },
}, {
    timestamps: false,
    tableName: 'ApiImages',
    returning: false
});

// Export both models
module.exports = APIImages;