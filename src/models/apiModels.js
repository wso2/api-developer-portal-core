const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');
const sequelize = require('../db/sequelize')

const APIMetadata = sequelize.define('ApiMetadata', {
    apiId: {
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
    authenticatedPages: {
        type: DataTypes.STRING,
        defaultValue: ''
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
    authorizedRoles: {
      type: DataTypes.STRING,
      allowNull: false
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
    }
}, {
    timestamps: false,
    tableName: 'ApiMetadata',
    returning: false
});

// {
//     "apiId": "xHvv6",
//     "apiInfo": {
//       "orgName": "ACME",
//       "apiName": "NavigationAPI",
//       "apiDescription": "API for retrieving information about directions to tourist sites",
//       "apiVersion": "v1.0.0",
//       "apiType": "REST",
//       "apiCategory": "travel",
//       "tags": "Transportation Travel Navigation",
//       "additionalProperties": {
//         "averageResponseTime": "1ms"
//       },
//       "authorizedRoles": [
//         "ABCTeamDev"
//       ],
//       "subscriptionPlanId": "sub0001",
//       "owners": {
//         "technicalOwner": "joe@acme.com",
//         "businessOwner": "joe@acme.com"
//       },
//       "apiArtifacts": {
//         "apiImages": {
//           "api-icon": "ProductIcon.png"
//         }
//       }
//     },
//     "throttlingPolicies": [
//       {
//         "policyName": "ThrottlePolicy001",
//         "description": "Each client can make up to 1000 requests per minute."
//       }
//     ],
//     "serverUrl": {
//       "sandboxUrl": "https://ACME/NavgiationSandbox",
//       "productionUrl": "https://ACME/Navgiation"
//     }
//   }