const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const APIContent = require('../models/apiContent')
const AdditionalProperties = require('./additionalAPIProperties')
const APIImages = require('./apiImages')
const SubscriptionPolicy = require('./subscriptionPolicy')
const { Organization } = require('./orgModels')

const APIMetadata = sequelize.define('dp_api_metadata', {
  API_ID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  REFERENCE_ID : {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true
  },
  API_NAME: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  API_DESCRIPTION: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  API_VERSION: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  API_TYPE: {
    type: DataTypes.ENUM,
    values: ['REST', 'AsyncAPI', 'GraphQL', 'SOAP'],
    allowNull: false
  },
  VISIBILITY: {
    type: DataTypes.ENUM,
    values: ['PUBLIC', 'PRIVATE'],
    allowNull: false
  },
  VISIBLE_GROUPS: {
    type: DataTypes.STRING,
    allowNull: true
  },
  TECHNICAL_OWNER: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TECHNICAL_OWNER_EMAIL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  BUSINESS_OWNER: {
    type: DataTypes.STRING,
    allowNull: false
  },
  BUSINESS_OWNER_EMAIL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SANDBOX_URL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PRODUCTION_URL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  METADATA_SEARCH: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'dp_api_metadata',
  returning: false
});

APIContent.belongsTo(APIMetadata, {
  foreignKey: 'API_ID',
});
APIImages.belongsTo(APIMetadata, {
  foreignKey: 'API_ID',
});
SubscriptionPolicy.belongsTo(APIMetadata, {
  foreignKey: 'API_ID',
});
APIMetadata.belongsTo(Organization, {
  foreignKey: 'ORG_ID'
})

APIMetadata.hasMany(SubscriptionPolicy, { 
  foreignKey: 'API_ID',
  onDelete: 'CASCADE'
});
APIMetadata.hasMany(APIImages, { 
  foreignKey: 'API_ID',
  onDelete: 'CASCADE'
});
APIMetadata.hasMany(APIContent, { 
  foreignKey: 'API_ID',
  onDelete: 'CASCADE'
});


// Export both models
module.exports = {
  APIMetadata
};
