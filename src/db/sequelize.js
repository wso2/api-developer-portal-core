/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const fs = require('fs');
const https = require('https');

const config = require(process.cwd() + '/config.json');
const secret = require(process.cwd() + '/secret.json');

const sequelizeOptions = {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

if (config.advanced.dbSslDialectOption) {
    const urlToDBCert = config.urlToDBCert || 'https://aiven.io/aiven-ca.pem';

    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: true
        }
    };

    https.get(urlToDBCert, (res) => {
        let certData = '';

        res.on('data', (chunk) => {
            certData += chunk;
        });

        res.on('end', () => {
            sequelizeOptions.dialectOptions.ssl.ca = certData;

            const sequelize = new Sequelize(
                config.db.database,
                config.db.username,
                secret.dbSecret,
                sequelizeOptions
            );

            module.exports = sequelize;
        });
    }).on('error', (err) => {
        console.error('Error fetching CA certificate:', err);
        process.exit(1);
    });
} else {
    const sequelize = new Sequelize(
        config.db.database,
        config.db.username,
        secret.dbSecret,
        sequelizeOptions
    );

    module.exports = sequelize;
}
