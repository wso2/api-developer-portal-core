/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('../db/sequelize');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');
const logger = require('../config/logger');
const constants = require('../utils/constants');
const config = require('../config/config');

async function waitForDB(maxRetries = 10, delayMs = 3000) {
    for (let i = 1; i <= maxRetries; i++) {
        try {
            await sequelize.authenticate();
            logger.info('[init] DB connection established');
            return;
        } catch (err) {
            logger.warn(`[init] DB not ready (attempt ${i}/${maxRetries}): ${err.message}`);
            if (i === maxRetries) throw err;
            await new Promise(r => setTimeout(r, delayMs));
        }
    }
}

async function initSchema() {
    const client = new Client({
        host: config.db.host,
        port: config.db.port,
        database: config.db.database,
        user: config.db.username,
        password: config.db.password,
    });
    await client.connect();
    try {
        const { rows } = await client.query(`
            SELECT 1 FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'DP_ORGANIZATION'`);
        if (rows.length === 0) {
            logger.info('[init] Schema not found, running schema-init.sql...');
            const sql = fs.readFileSync(path.join(process.cwd(), 'artifacts/schema-init.sql'), 'utf8');
            await client.query(sql);
            logger.info('[init] Schema created successfully');
        } else {
            logger.info('[init] Schema already exists, skipping');
        }
    } finally {
        await client.end();
    }
}

async function createDefaultOrg(orgName) {
    const orgHandle = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
        orgName,
        orgHandle,
        organizationIdentifier: orgHandle,
        orgConfig: { devportalMode: constants.API_TYPE.DEFAULT },
    };
    let createdOrgId;
    await sequelize.transaction({ timeout: 60000 }, async (t) => {
        const org = await adminDao.createOrganization(payload, t);
        const orgId = org.ORG_ID;
        createdOrgId = orgId;

        const labels = await apiDao.createLabels(orgId, [{ name: 'default', displayName: 'default' }], t);
        const labelId = labels[0].dataValues.LABEL_ID;

        const view = await apiDao.addView(orgId, { name: 'default', displayName: 'default' }, t);
        const viewId = view.dataValues.VIEW_ID;

        await apiDao.addLabel(orgId, labelId, viewId, t);

        if (config.controlPlane && config.controlPlane.url) {
            await adminDao.createProvider(orgId, { name: 'WSO2', providerURL: config.controlPlane.url }, t);
        }

        if (config.generateDefaultSubPolicies) {
            await apiDao.bulkCreateSubscriptionPolicies(orgId, constants.DEFAULT_SUBSCRIPTION_PLANS, t);
        }

        logger.info('[init] Default org created', { orgId, orgName, orgHandle });
    });
    return createdOrgId;
}

async function runStartupInit() {
    await waitForDB();
    await initSchema();

    const orgs = await adminDao.getOrganizations();
    if (!orgs || orgs.length === 0) {
        const orgName = config.portal?.orgName || 'ACME';
        logger.info(`[init] No organizations found. Creating default org: "${orgName}"`);
        try {
            await createDefaultOrg(orgName);
        } catch (err) {
            if (err instanceof Sequelize.UniqueConstraintError) {
                logger.info('[init] Default org already created by another instance, skipping');
            } else {
                throw err;
            }
        }
    } else {
        logger.info(`[init] ${orgs.length} organization(s) already exist, skipping default org creation`);
    }

    logger.info('[init] Startup initialization complete');
}

module.exports = { runStartupInit };
