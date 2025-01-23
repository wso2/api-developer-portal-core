/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')
const APIContent = require('../models/apiContent')
const APIImages = require('./apiImages')
const SubscriptionPolicy = require('./subscriptionPolicy')
const { Organization } = require('./orgModels')

const APIMetadata = sequelize.define('DP_API_METADATA', {
  API_ID: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  REFERENCE_ID : {
    type: DataTypes.UUID,
    allowNull: true,
    unique: true
  },
  API_NAME: {
    type: DataTypes.STRING,
    allowNull: false
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
    allowNull: true
  },
  TECHNICAL_OWNER_EMAIL: {
    type: DataTypes.STRING,
    allowNull: true
  },
  BUSINESS_OWNER: {
    type: DataTypes.STRING,
    allowNull: true
  },
  BUSINESS_OWNER_EMAIL: {
    type: DataTypes.STRING,
    allowNull: true
  },
  SANDBOX_URL: {
    type: DataTypes.STRING,
    allowNull: true
  },
  PRODUCTION_URL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PROVIDER: {
    type: DataTypes.STRING,
    allowNull: false
  },
  METADATA_SEARCH: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  timestamps: false,
  tableName: 'DP_API_METADATA',
  returning: true
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
