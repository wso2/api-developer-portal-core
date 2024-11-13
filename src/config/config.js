var config = {};

config.adminAPI = "http://localhost:8080/admin/";
config.apiMetaDataAPI = "http://localhost:3000/apiMetadata/organizations/"

config.port = 3000
config.mode = 'multi'
config.db = {
    username: 'postgres',
    password: 'postgres',
    database: 'DEVPORTAL_NEWSCHEMA',
    host: 'localhost',
    dialect: 'postgres',
};

module.exports = config;
