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
    },
    orgName: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    }
}, {
    timestamps: false,
    tableName: 'OrganizationAssets'
},{
    indexes: [
        {
            unique: true,
            fields: ['pageType', 'pageName', 'filePath'] 
        }
    ]
});

const OrgImage = sequelize.define('OrgImages', {
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    orgId: {
        type: DataTypes.UUID,
        allowNull: false,
        forignKey: true,
        primaryKey: true
    }
}, {
    timestamps: false,
    tableName: 'OrgImages',
    returning: true
});

OrgImage.belongsTo(Organization, {
    foreignKey: 'orgId',
});

OrgContent.belongsTo(Organization, {
    foreignKey: 'orgId',
    foreignKey: 'orgName',
});

// Export both models
module.exports = {
    Organization,
    OrganizationResponse,
    OrgContent,
    OrgImage
};
