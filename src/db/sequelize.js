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
const config = require(process.cwd() + '/config.json');

const sequelize = new Sequelize(
    process.env.CHOREO_DEVELOPER_PORTAL_DB_CONNECTION_DATABASENAME || config.db.database,
    process.env.CHOREO_DEVELOPER_PORTAL_DB_CONNECTION_USERNAME || config.db.username,
    process.env.CHOREO_DEVELOPER_PORTAL_DB_CONNECTION_PASSWORD || config.db.password,
    {
        host: process.env.CHOREO_DEVELOPER_PORTAL_DB_CONNECTION_HOSTNAME || config.db.host,
        port: process.env.CHOREO_DEVELOPER_PORTAL_DB_CONNECTION_PORT || config.db.port,
        dialect: config.db.dialect,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;
