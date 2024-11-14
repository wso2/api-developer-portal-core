var config = {};

config.apiMetaDataAPI = "http://localhost:3000/devportal/organizations/"
config.devportalAPI = "http://localhost:3000/devportal/"
config.port = 3000
config.mode = 'production'
config.db = {
    username: 'postgres',
    password: 'postgres',
    database: 'DEVPORTAL_NEWSCHEMA',
    host: 'localhost',
    dialect: 'postgres',
};

module.exports = config;
