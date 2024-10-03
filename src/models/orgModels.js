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
    returning: false
});

// Organization response model
class OrganizationResponse {
    constructor(orgName, orgId, authenticatedPages) {
        this.orgName = orgName;
        this.orgId = orgId;
        this.authenticatedPages = authenticatedPages;
    }
}

// Export both models
module.exports = {
    Organization,
    OrganizationResponse
};
