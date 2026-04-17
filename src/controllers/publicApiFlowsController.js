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
const apiFlowDao = require('../dao/apiFlow');
const adminDao = require('../dao/admin');
const apiMetadataDao = require('../dao/apiMetadata');
const apiFlowService = require('../services/apiFlowService');
const logger = require('../config/logger');
const { renderTemplate } = require('../utils/util');
const config = require(process.cwd() + '/config.json');

const resolveViewId = async (orgID, viewName) => {
    return await apiMetadataDao.getViewID(orgID, viewName);
};

const loadPublicAPIFlows = async (req, res) => {
    const { orgName, viewName } = req.params;

    try {
        const orgDetails = await adminDao.getOrganization(orgName);
        if (!orgDetails) {
            const templateContent = { errorMessage: 'Organization not found' };
            const html = renderTemplate('src/pages/error-page/page.hbs', 'src/defaultContent/layout/main.hbs', templateContent, false);
            return res.status(404).send(html);
        }

        const orgID = orgDetails.ORG_ID;
        const viewId = await resolveViewId(orgID, viewName);

        const apiFlows = await apiFlowDao.getPublishedAPIFlows(orgID, viewId);

        const profile = req.user ? {
            username: req.user.sub,
            authenticated: true,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            imageURL: req.user.imageURL,
            isAdmin: req.user.isAdmin,
        } : null;
        const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || 'DEFAULT';

        const templateContent = {
            apiFlows: apiFlows.map(flow => ({
                apiFlowId: flow.API_FLOW_ID,
                handle: flow.HANDLE,
                name: flow.NAME,
                description: flow.DESCRIPTION,
                agentPrompt: flow.AGENT_PROMPT,
                status: flow.STATUS,
                apiCount: flow.DP_API_METADATA ? flow.DP_API_METADATA.length : 0,
                apis: flow.DP_API_METADATA ? flow.DP_API_METADATA.map(api => ({
                    apiName: api.API_NAME,
                    apiHandle: api.API_HANDLE
                })) : []
            })),
            orgName,
            viewName,
            baseUrl: `/${orgName}/views/${viewName}`,
            profile,
            devportalMode
        };

        const html = renderTemplate(
            'src/defaultContent/pages/public-api-flows/page.hbs',
            'src/defaultContent/layout/main.hbs',
            templateContent,
            false
        );
        res.send(html);
    } catch (error) {
        logger.error('Error loading public API flows', {
            error: error.message,
            stack: error.stack,
            orgName,
            viewName
        });
        const templateContent = { errorMessage: 'Error loading API flows' };
        const html = renderTemplate('src/pages/error-page/page.hbs', 'src/defaultContent/layout/main.hbs', templateContent, false);
        return res.status(500).send(html);
    }
};

const loadPublicAPIFlowDetail = async (req, res) => {
    const { orgName, viewName, handle } = req.params;

    try {
        const orgDetails = await adminDao.getOrganization(orgName);
        if (!orgDetails) {
            const templateContent = { errorMessage: 'Organization not found' };
            const html = renderTemplate('src/pages/error-page/page.hbs', 'src/defaultContent/layout/main.hbs', templateContent, false);
            return res.status(404).send(html);
        }

        const orgID = orgDetails.ORG_ID;
        const viewId = await resolveViewId(orgID, viewName);

        const apiFlow = await apiFlowDao.getPublishedAPIFlowByHandle(orgID, viewId, handle);

        if (!apiFlow) {
            const templateContent = { errorMessage: 'API Workflow not found or not published' };
            const html = renderTemplate('src/pages/error-page/page.hbs', 'src/defaultContent/layout/main.hbs', templateContent, false);
            return res.status(404).send(html);
        }

        const profile = req.user ? {
            username: req.user.sub,
            authenticated: true,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            imageURL: req.user.imageURL,
            isAdmin: req.user.isAdmin,
        } : null;
        const devportalMode = orgDetails.ORG_CONFIG?.devportalMode || 'DEFAULT';

        const rawContent = apiFlow.FILE_CONTENT;
        let fileContentStr = '';
        if (rawContent != null) {
            fileContentStr = Buffer.isBuffer(rawContent) ? rawContent.toString('utf8') : String(rawContent);
        }

        const templateContent = {
            flow: {
                flowId: apiFlow.API_FLOW_ID,
                name: apiFlow.NAME,
                description: apiFlow.DESCRIPTION,
                agentPrompt: apiFlow.AGENT_PROMPT,
                status: apiFlow.STATUS,
                contentType: apiFlow.CONTENT_TYPE,
                content: fileContentStr,
                createdAt: apiFlow.CREATED_AT ? new Date(apiFlow.CREATED_AT).toLocaleDateString() : '',
                updatedAt: apiFlow.UPDATED_AT ? new Date(apiFlow.UPDATED_AT).toLocaleDateString() : '',
                apis: apiFlow.DP_API_METADATA ? apiFlow.DP_API_METADATA.map(api => ({
                    apiName: api.API_NAME,
                    apiHandle: api.API_HANDLE,
                    apiDescription: api.API_DESCRIPTION,
                    productionUrl: api.PRODUCTION_URL,
                    apiType: api.API_TYPE
                })) : []
            },
            orgName,
            viewName,
            baseUrl: `/${orgName}/views/${viewName}`,
            profile,
            devportalMode
        };

        const html = renderTemplate(
            'src/defaultContent/pages/public-api-flows/detail/page.hbs',
            'src/defaultContent/layout/main.hbs',
            templateContent,
            false
        );
        res.send(html);
    } catch (error) {
        logger.error('Error loading public API flow detail', {
            error: error.message,
            stack: error.stack,
            orgName,
            viewName,
            handle
        });
        const templateContent = { errorMessage: 'Error loading API flow' };
        const html = renderTemplate('src/pages/error-page/page.hbs', 'src/defaultContent/layout/main.hbs', templateContent, false);
        return res.status(500).send(html);
    }
};

const getFlowPromptJSON = async (req, res) => {
    const { orgName, viewName, handle } = req.params;

    try {
        const orgDetails = await adminDao.getOrganization(orgName);
        if (!orgDetails) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        const orgID = orgDetails.ORG_ID;
        const viewId = await resolveViewId(orgID, viewName);

        const apiFlow = await apiFlowDao.getPublishedAPIFlowByHandle(orgID, viewId, handle);

        if (!apiFlow) {
            return res.status(404).json({ error: 'API Workflow not found or not published' });
        }

        const rawContent = apiFlow.FILE_CONTENT;
        let content = null;
        if (rawContent != null) {
            content = Buffer.isBuffer(rawContent) ? rawContent.toString('utf8') : String(rawContent);
        }

        res.status(200).json({
            flowId: apiFlow.API_FLOW_ID,
            handle: apiFlow.HANDLE,
            name: apiFlow.NAME,
            description: apiFlow.DESCRIPTION,
            agentPrompt: apiFlow.AGENT_PROMPT,
            contentType: apiFlow.CONTENT_TYPE,
            content,
            apis: apiFlow.DP_API_METADATA ? apiFlow.DP_API_METADATA.map(api => ({
                apiName: api.API_NAME,
                apiHandle: api.API_HANDLE
            })) : []
        });
    } catch (error) {
        logger.error('Error fetching public API workflow prompt', {
            error: error.message,
            stack: error.stack,
            orgName,
            viewName,
            handle
        });
        res.status(500).json({ error: 'Error fetching API workflow' });
    }
};

const getWorkflowDetailMd = async (req, res) => {
    const { orgName, viewName, handle } = req.params;

    try {
        const orgDetails = await adminDao.getOrganization(orgName);
        if (!orgDetails) {
            return res.status(404).send('# Error\n\nOrganization not found.');
        }

        const orgID = orgDetails.ORG_ID;
        const viewId = await resolveViewId(orgID, viewName);

        const apiFlow = await apiFlowDao.getPublishedAPIFlowByHandle(orgID, viewId, handle);

        if (!apiFlow) {
            return res.status(404).send('# Error\n\nWorkflow not found or not published.');
        }

        // Get raw content as string
        const rawContent = apiFlow.FILE_CONTENT;
        let workflowContent = '';
        if (rawContent != null) {
            workflowContent = Buffer.isBuffer(rawContent) ? rawContent.toString('utf8') : String(rawContent);
        }

        // Convert to Markdown format if the content is Arazzo JSON
        let markdownContent = workflowContent;
        if (apiFlow.CONTENT_TYPE === 'ARAZZO') {
            try {
                const arazoJson = JSON.parse(workflowContent);
                markdownContent = generateWorkflowMarkdown(arazoJson, apiFlow, orgName, viewName);
            } catch (e) {
                // If parsing fails, use content as-is
                logger.warn('Could not parse Arazzo JSON, using raw content', { handle, error: e.message });
                markdownContent = workflowContent;
            }
        }

        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.send(markdownContent);
    } catch (error) {
        logger.error('Error fetching workflow detail as markdown', {
            error: error.message,
            stack: error.stack,
            orgName,
            viewName,
            handle
        });
        res.status(500).send('# Error\n\nFailed to load workflow.');
    }
};

const generateWorkflowMarkdown = (arazoJson, apiFlow, orgName, viewName) => {
    const baseUrl = `/${orgName}/views/${viewName}`;
    let md = `# ${apiFlow.NAME}\n\n`;

    md += `**Status:** ${apiFlow.STATUS}\n\n`;
    md += `**Description:** ${apiFlow.DESCRIPTION}\n\n`;

    // Add API info
    if (apiFlow.DP_API_METADATA && apiFlow.DP_API_METADATA.length > 0) {
        md += `## APIs Used \n\n`;
        apiFlow.DP_API_METADATA.forEach(api => {
            const urlPath = api.API_TYPE === 'MCP' ? 'mcp' : 'api';
            md += `- [${api.API_NAME}](${baseUrl}/${urlPath}/${api.API_HANDLE}.md)\n`;
        });
        md += `\nFor detailed API information (base URL, OpenAPI spec, security schemes, credentials), refer to each API's documentation page listed above.\n\n`;
    }

    // Add full Arazzo specification
    md += `## API Flow Specification\n\n`;
    md += '```\n';
    md += JSON.stringify(arazoJson, null, 2);
    md += '\n```\n';

    return md;
};

const getAllPublishedFlowsMD = async (req, res) => {
    const { orgName, viewName } = req.params;

    try {
        const orgDetails = await adminDao.getOrganization(orgName);
        if (!orgDetails) {
            return res.status(404).send('# Error\n\nOrganization not found.');
        }

        const orgID = orgDetails.ORG_ID;
        const viewId = await resolveViewId(orgID, viewName);

        const apiFlows = await apiFlowDao.getPublishedAPIFlows(orgID, viewId);

        const baseUrl = `/${orgName}/views/${viewName}`;
        let md = `# API Workflows\n\n`;

        if (apiFlows.length === 0) {
            md += `No published workflows found.\n`;
        } else {
            apiFlows.forEach(flow => {
                md += `- [${flow.NAME}](${baseUrl}/api-workflows/${flow.HANDLE}.md)\n`;
            });
        }

        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.send(md);
    } catch (error) {
        logger.error('Error fetching published flows as markdown', {
            error: error.message,
            stack: error.stack,
            orgName,
            viewName
        });
        res.status(500).send('# Error\n\nFailed to load workflows.');
    }
};

const generatePrompt = async (req, res) => {
    const { name, description, apis, orgName, viewName, handle } = req.body;
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const prompt = apiFlowService.generateAgentPrompt(name, description, apis || [], orgName || '', viewName || 'default', baseUrl, handle || '');
        res.status(200).json({ agentPrompt: prompt });
    } catch (error) {
        logger.error('Error generating agent prompt', { error: error.message });
        res.status(500).json({ message: 'Error generating agent prompt' });
    }
};

module.exports = {
    loadPublicAPIFlows,
    getAllPublishedFlowsMD,
    loadPublicAPIFlowDetail,
    getFlowPromptJSON,
    getWorkflowDetailMd,
    generatePrompt
};
