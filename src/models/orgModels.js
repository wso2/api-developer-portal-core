const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Organization = sequelize.define('Organization', {
    orgId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    orgName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    authenticatedPages: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
}, {
    timestamps: false,
    tableName: 'Organization',
    returning: true
});

// Organization response model
class OrganizationResponse {
    constructor(orgName, orgId, authenticatedPages) {
        this.orgName = orgName;
        this.orgId = orgId;
        this.authenticatedPages = authenticatedPages;
    }
}

const OrgContent = sequelize.define('OrganizationAssets', {
    orgAssetId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    pageType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pageName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pageContent: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orgId: {
        type: DataTypes.UUID,
        allowNull: false,
        forignKey: true,
    }
}, {
    timestamps: false,
    tableName: 'OrganizationAssets'
});

// Export both models
module.exports = {
    Organization,
    OrganizationResponse,
    OrgContent
};
