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
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize')

const SubscriptionPolicy = sequelize.define('DP_API_SUBSCRIPTION_POLICY', {
    API_ID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    POLICY_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    timestamps: false,
    tableName: 'DP_API_SUBSCRIPTION_POLICY',
    returning: true
});

module.exports = SubscriptionPolicy;
