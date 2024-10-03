const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const sequelize = require('../db/sequelize')

const APIImages = sequelize.define('ApiImages', {
    
}, {
    timestamps: false,
    tableName: 'ApiMetadata',
    returning: false
});