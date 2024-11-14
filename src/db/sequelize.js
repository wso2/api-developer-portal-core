const { Sequelize } = require('sequelize');
const config = require(process.cwd() + '/config');

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
          }
    },
);

module.exports = sequelize;
