const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Organization = sequelize.define('DP_ORGANIZATION', {
    ORG_ID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    ORG_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    BUSINESS_OWNER: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    BUSINESS_OWNER_CONTACT: {
        type: DataTypes.STRING,
        allowNull: true
    },
    BUSINESS_OWNER_EMAIL: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false,
    tableName: 'DP_ORGANIZATION',
    returning: true
});

const OrgContent = sequelize.define('DP_ORGANIZATION_ASSETS', {
    ASSERT_ID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    FILE_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FILE_CONTENT: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    FILE_TYPE: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FILE_PATH: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ORG_ID: {
        type: DataTypes.UUID,
        allowNull: false,
        forignKey: true,
    }
}, {
    timestamps: false,
    tableName: 'DP_ORGANIZATION_ASSETS'
},{
    indexes: [
        {
            unique: true,
            fields: ['FILE_TYPE', 'FILE_NAME', 'FILE_PATH', 'ORG_ID'] 
        }
    ]
});

OrgContent.belongsTo(Organization, {
    foreignKey: 'ORG_ID',
});

Organization.hasMany(OrgContent, {
    foreignKey: 'ORG_ID',
    onDelete: 'CASCADE',
});

// Export both models
module.exports = {
    Organization,
    OrgContent
};
