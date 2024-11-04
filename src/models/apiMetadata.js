const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const APIContent = require('../models/apiContent')
const AdditionalProperties = require('./additionalAPIProperties')
const APIImages = require('./apiImages')
const ThrottlingPolicy = require('./throttlingPolicy')
const { Organization } = require('./orgModels')

const APIMetadata = sequelize.define('ApiMetadata', {
  apiID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  apiName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  apiDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apiVersion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  apiType: {
    type: DataTypes.ENUM,
    values: ['REST', 'AsyncAPI', 'GraphQL', 'SOAP'],
    allowNull: false
  },
  apiCategory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false
  },
  visibility: {
    type: DataTypes.ENUM,
    values: ['PUBLIC', 'PRIVATE'],
    allowNull: false
  },
  visibleGroups: {
    type: DataTypes.STRING,
    allowNull: true
  },
  technicalOwner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  businessOwner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sandboxUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productionUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'ApiMetadata',
  returning: false
});

APIContent.belongsTo(APIMetadata, {
  foreignKey: 'apiID', 
});
APIContent.belongsTo(Organization, {
  foreignKey: 'orgID', 
});
AdditionalProperties.belongsTo(APIMetadata, {
  foreignKey: 'apiID',
});
AdditionalProperties.belongsTo(Organization, {
  foreignKey: 'orgID',
});
APIImages.belongsTo(APIMetadata, {
  foreignKey: 'apiID',
});
APIImages.belongsTo(Organization, {
  foreignKey: 'orgID',
});
ThrottlingPolicy.belongsTo(APIMetadata, {
  foreignKey: 'apiID', 
});
ThrottlingPolicy.belongsTo(Organization, {
  foreignKey: 'orgID', 
});
APIMetadata.belongsTo(Organization, {
  foreignKey: 'orgID'
})
APIMetadata.hasMany(AdditionalProperties, { foreignKey: 'apiID' });
APIMetadata.hasMany(ThrottlingPolicy, { foreignKey: 'apiID' });
APIMetadata.hasMany(APIImages, { foreignKey: 'apiID' });

// Organization response model
class APIResponse {

  set throttlingPolicies(throttlingPolicies) {
      this.throttlingPolicies = throttlingPolicies;
  }
  set endPoints(endPoints) {
    this.endPoints = endPoints;
}
  constructor(createdAPI) {
    this.apiId = createdAPI.apiId;
    this.apiInfo = createdAPI.apiInfo;
  }
}

// Export both models
module.exports = {
  APIMetadata,
  APIResponse
};
