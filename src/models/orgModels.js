const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

// Organization model
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: 'postgres'
});

const Organization = sequelize.define('Organization', {
    orgId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // This ensures the id will be auto-generated
        primaryKey: true // Mark this field as the primary key
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
