var config = {};

config.adminAPI = "http://localhost:8080/admin/";
config.apiMetaDataAPI = "http://localhost:9090/apiMetadata/"
config.port = 3000
config.mode = 'single'
config.db = {
    username: 'postgres',
    password: 'postgres',
    database: 'devportal',
    host: 'localhost',
    dialect: 'postgres',
};

module.exports = config;
