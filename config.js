var config = {};

config.port = 3000
config.pathToContent = "../src/"
config.mode = 'production'
config.db = {
    username: 'postgres',
    password: 'postgres',
    database: 'DEVPORTAL_NEWSCHEMA',
    host: 'localhost',
    dialect: 'postgres',
};

module.exports = config;
