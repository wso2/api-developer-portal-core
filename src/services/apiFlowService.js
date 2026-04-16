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
const sequelize = require('../db/sequelize');
const logger = require('../config/logger');
const constants = require('../utils/constants');
const yaml = require('js-yaml');

const resolveViewId = async (orgID, viewName) => {
    return await apiMetadataDao.getViewID(orgID, viewName);
};

/**
 * If content is YAML, converts it to a JSON string. If already JSON, returns it as-is.
 * Returns null for null/undefined input.
 */
const normalizeToJSON = (content) => {
    if (content == null) return null;
    const str = typeof content === 'string' ? content.trim() : String(content).trim();
    if (!str) return null;
    try {
        JSON.parse(str);
        return str; // already valid JSON
    } catch {
        // try YAML parse
        const parsed = yaml.load(str);
        return JSON.stringify(parsed);
    }
};

/**
 * Generates a structured, LLM-ready agent prompt from APIFlow metadata and its associated APIs.
 * @param {string} name - APIFlow name
 * @param {string} description - APIFlow description
 * @param {Array} apis - Array of API metadata objects { API_NAME, API_DESCRIPTION, PRODUCTION_URL, API_HANDLE, API_TYPE }
 * @param {string} orgHandle - Organization handle for building spec URLs
 * @param {string} viewName - View name
 * @param {string} baseUrl - Base URL of the portal
 * @param {string} handle - APIFlow handle for constructing the workflow detail URL
 * @returns {string} Structured agent prompt
 */
const generateAgentPrompt = (name, description, apis = [], orgHandle = '', viewName = 'default', baseUrl = '', handle = '') => {
    const apiSections = apis.map((api, i) => {
        const specPath = orgHandle
            ? `/${orgHandle}/views/${viewName}/api/${api.API_HANDLE || api.apiHandle}/docs/specification.json`
            : `/views/${viewName}/api/${api.API_HANDLE || api.apiHandle}/docs/specification.json`;
        const specUrl = baseUrl ? `${baseUrl}${specPath}` : specPath;
        return `### ${i + 1}. ${api.API_NAME || api.apiName}
- **Type**: ${api.API_TYPE || api.apiType || 'REST'}
- **Base URL**: ${api.PRODUCTION_URL || api.productionUrl || '(not set)'}
- **Description**: ${api.API_DESCRIPTION || api.apiDescription || '(no description)'}
- **Specification**: ${specUrl}`;
    }).join('\n\n');

    const apiListForConstraints = apis.map(a => `"${a.API_NAME || a.apiName}"`).join(', ');

    const workflowUrl = (handle && orgHandle && baseUrl)
        ? `${baseUrl}/${orgHandle}/views/${viewName}/api-workflows/${handle}/view.json`
        : '';

    const workflowSourceLine = workflowUrl
        ? `\nWorkflow definition (source of truth): ${workflowUrl}`
        : '';

    return `You are an API orchestration agent executing the "${name}" flow.${workflowSourceLine}

## Execution Mode
- Be deterministic, not creative.
- Do NOT assume or fabricate data — if a required input is missing, ask the user.
- Fetch the workflow definition URL above and follow it exactly. Do not reorder, skip, or add steps.

## Objective
${description}

## Available APIs
${apiSections || '_(No APIs assigned to this flow yet)_'}

## Execution State
Maintain the following state throughout execution:
\`\`\`
workflow_state = {
  current_step: "",
  completed_steps: [],
  data: {},
  errors: []
}
\`\`\`

## Authentication
Before making any API calls:
1. Read each API's specification to identify the required security scheme(s) (e.g., Bearer token, API key, OAuth2, Basic auth).
2. For each distinct credential required, ask the user to provide it. Example prompts:
   - "Please provide your Bearer token for <API Name>:"
   - "Please provide your API key for <API Name> (sent as the <header-name> header):"
3. Do not proceed with execution until all required credentials have been supplied.
4. Include the provided credentials in the appropriate headers or query parameters for every request to that API.

## Step Execution Protocol
For each step defined in the workflow:
1. Identify the step ID and operation from the workflow definition.
2. Resolve required inputs in this order — do NOT fabricate if not found:
   a. \`workflow_state.data\` (outputs from previous steps)
   b. API specification defaults
   c. Ask the user
3. Execute the API call using only endpoints defined in the specification.
4. Validate the response (expect 2xx). Store outputs in \`workflow_state.data\` and mark the step complete.
5. If the response is not 2xx, stop immediately and record the step ID, status code, and response body in \`workflow_state.errors\`.

## Retry Policy
- Retry only on network errors or 5xx responses. Maximum 3 attempts with backoff: 0s, +1s, +2s.
- Do NOT retry 4xx responses — treat them as terminal failures.

## Constraints
- Only call APIs listed in the **Available APIs** section above: ${apiListForConstraints || 'none assigned'}.
- Never expose raw credentials or tokens in the final output summary.
`;
};

const createAPIFlow = async (req, res) => {
    const orgID = req.params.orgId;
    const viewName = req.params.viewName;
    const { name, handle, description, agentPrompt, status, arazoContent, llmsTxtContent, contentType, apiIds } = req.body;
    const resolvedContentType = contentType || 'ARAZZO';
    const resolvedContent = resolvedContentType === 'LLMS_TXT'
        ? (llmsTxtContent || null)
        : normalizeToJSON(arazoContent);
    const t = await sequelize.transaction();
    try {
        const viewId = await resolveViewId(orgID, viewName);
        const resolvedPrompt = agentPrompt && agentPrompt.trim()
            ? agentPrompt.trim()
            : generateAgentPrompt(name, description, [], req.params.orgName, viewName);

        const apiFlow = await apiFlowDao.createAPIFlow(orgID, viewId, {
            name,
            handle,
            description,
            agentPrompt: resolvedPrompt,
            status: status || 'PUBLISHED',
            arazoContent: resolvedContent,
            contentType: resolvedContentType
        }, t);

        if (apiIds && apiIds.length > 0) {
            await apiFlowDao.addAPIFlowAPIs(apiFlow.API_FLOW_ID, apiIds, orgID, viewId, t);
        }

        await t.commit();
        logger.info('APIFlow created', { apiFlowId: apiFlow.API_FLOW_ID, orgID, viewId });
        res.status(201).json({
            apiFlowId: apiFlow.API_FLOW_ID,
            name: apiFlow.NAME,
            status: apiFlow.STATUS
        });
    } catch (error) {
        await t.rollback();
        logger.error('Error creating APIFlow', { error: error.message, stack: error.stack });
        res.status(500).json({ message: constants.ERROR_MESSAGE.API_FLOW_CREATE_ERROR });
    }
};

const updateAPIFlow = async (req, res) => {
    const { orgId, apiFlowId, viewName } = req.params;
    const { name, handle, description, agentPrompt, status, arazoContent, llmsTxtContent, contentType, apiIds } = req.body;
    const resolvedContentType = contentType;
    const resolvedContent = resolvedContentType === 'LLMS_TXT'
        ? (llmsTxtContent || null)
        : (arazoContent !== undefined ? normalizeToJSON(arazoContent) : undefined);
    const t = await sequelize.transaction();
    try {
        const viewId = await resolveViewId(orgId, viewName);
        const [count] = await apiFlowDao.updateAPIFlow(orgId, viewId, apiFlowId, {
            name,
            handle,
            description,
            agentPrompt,
            status,
            arazoContent: resolvedContent,
            contentType: resolvedContentType
        }, t);

        if (count === 0) {
            await t.rollback();
            return res.status(404).json({ message: constants.ERROR_MESSAGE.API_FLOW_NOT_FOUND });
        }

        if (apiIds !== undefined) {
            await apiFlowDao.replaceAPIFlowAPIs(apiFlowId, apiIds, orgId, viewId, t);
        }

        await t.commit();
        logger.info('APIFlow updated', { apiFlowId, orgId, viewId });
        res.status(200).json({ message: 'APIFlow updated successfully' });
    } catch (error) {
        await t.rollback();
        logger.error('Error updating APIFlow', { error: error.message, stack: error.stack });
        res.status(500).json({ message: constants.ERROR_MESSAGE.API_FLOW_UPDATE_ERROR });
    }
};

const deleteAPIFlow = async (req, res) => {
    const { orgId, apiFlowId, viewName } = req.params;
    const t = await sequelize.transaction();
    try {
        const viewId = await resolveViewId(orgId, viewName);
        const count = await apiFlowDao.deleteAPIFlow(orgId, viewId, apiFlowId, t);
        if (count === 0) {
            await t.rollback();
            return res.status(404).json({ message: constants.ERROR_MESSAGE.API_FLOW_NOT_FOUND });
        }
        await t.commit();
        logger.info('APIFlow deleted', { apiFlowId, orgId, viewId });
        res.status(200).json({ message: 'APIFlow deleted successfully' });
    } catch (error) {
        await t.rollback();
        logger.error('Error deleting APIFlow', { error: error.message, stack: error.stack });
        res.status(500).json({ message: constants.ERROR_MESSAGE.API_FLOW_DELETE_ERROR });
    }
};

const getAPIFlow = async (req, res) => {
    const { orgId, apiFlowId, viewName } = req.params;
    try {
        const viewId = await resolveViewId(orgId, viewName);
        const apiFlow = await apiFlowDao.getAPIFlow(orgId, viewId, apiFlowId);
        if (!apiFlow) {
            return res.status(404).json({ message: constants.ERROR_MESSAGE.API_FLOW_NOT_FOUND });
        }
        res.status(200).json(toAPIFlowDTO(apiFlow));
    } catch (error) {
        logger.error('Error fetching APIFlow', { error: error.message, stack: error.stack });
        res.status(500).json({ message: constants.ERROR_MESSAGE.API_FLOW_RETRIEVE_ERROR });
    }
};

const getAllAPIFlows = async (req, res) => {
    const { orgId, viewName } = req.params;
    try {
        const viewId = await resolveViewId(orgId, viewName);
        const apiFlows = await apiFlowDao.getAllAPIFlows(orgId, viewId);
        res.status(200).json(apiFlows.map(toAPIFlowDTO));
    } catch (error) {
        logger.error('Error fetching APIFlows', { error: error.message, stack: error.stack });
        res.status(500).json({ message: constants.ERROR_MESSAGE.API_FLOW_RETRIEVE_ERROR });
    }
};

const addAPIFlowAPIs = async (req, res) => {
    const { orgId, apiFlowId, viewName } = req.params;
    const { apiIds } = req.body;
    const t = await sequelize.transaction();
    try {
        if (!apiIds || apiIds.length === 0) {
            await t.rollback();
            return res.status(400).json({ message: 'apiIds array is required' });
        }
        const viewId = await resolveViewId(orgId, viewName);
        await apiFlowDao.addAPIFlowAPIs(apiFlowId, apiIds, orgId, viewId, t);
        await apiFlowDao.updateAPIFlow(orgId, viewId, apiFlowId, { updatedAt: new Date() }, t);
        await t.commit();
        res.status(200).json({ message: 'APIs added to APIFlow successfully' });
    } catch (error) {
        await t.rollback();
        logger.error('Error adding APIs to APIFlow', { error: error.message });
        res.status(500).json({ message: constants.ERROR_MESSAGE.API_FLOW_UPDATE_ERROR });
    }
};

const removeAPIFlowAPIs = async (req, res) => {
    const { orgId, apiFlowId, viewName } = req.params;
    const { apiIds } = req.body;
    const t = await sequelize.transaction();
    try {
        if (!apiIds || apiIds.length === 0) {
            await t.rollback();
            return res.status(400).json({ message: 'apiIds array is required' });
        }
        const viewId = await resolveViewId(orgId, viewName);
        await apiFlowDao.removeAPIFlowAPIs(apiFlowId, apiIds, orgId, viewId, t);
        await apiFlowDao.updateAPIFlow(orgId, viewId, apiFlowId, { updatedAt: new Date() }, t);
        await t.commit();
        res.status(200).json({ message: 'APIs removed from APIFlow successfully' });
    } catch (error) {
        await t.rollback();
        logger.error('Error removing APIs from APIFlow', { error: error.message });
        res.status(500).json({ message: constants.ERROR_MESSAGE.API_FLOW_UPDATE_ERROR });
    }
};

const generatePrompt = async (req, res) => {
    const { name, description, apis, orgHandle, viewName, handle } = req.body;
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const prompt = generateAgentPrompt(name, description, apis || [], orgHandle || '', viewName || 'default', baseUrl, handle || '');
        res.status(200).json({ agentPrompt: prompt });
    } catch (error) {
        logger.error('Error generating agent prompt', { error: error.message });
        res.status(500).json({ message: 'Error generating agent prompt' });
    }
};

// Internal utility used by settingsController
const getAllAPIFlowsFromDB = async (orgID, viewId) => {
    const apiFlows = await apiFlowDao.getAllAPIFlows(orgID, viewId);
    return apiFlows.map(toAPIFlowDTO);
};

const parseFileContent = (raw) => {
    if (raw == null) return null;
    const str = Buffer.isBuffer(raw) ? raw.toString('utf8') : String(raw);
    try { return JSON.stringify(JSON.parse(str), null, 2); } catch { return str; }
};

const toAPIFlowDTO = (apiFlow) => {
    const fileContent = parseFileContent(apiFlow.FILE_CONTENT);
    return {
    apiFlowId: apiFlow.API_FLOW_ID,
    name: apiFlow.NAME,
    handle: apiFlow.HANDLE,
    description: apiFlow.DESCRIPTION,
    agentPrompt: apiFlow.AGENT_PROMPT,
    status: apiFlow.STATUS,
    contentType: apiFlow.CONTENT_TYPE || 'ARAZZO',
    arazoContent: (apiFlow.CONTENT_TYPE || 'ARAZZO') === 'ARAZZO' ? fileContent : null,
    llmsTxtContent: apiFlow.CONTENT_TYPE === 'LLMS_TXT' ? fileContent : null,
    createdAt: apiFlow.CREATED_AT ? new Date(apiFlow.CREATED_AT).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    }) : '',
    updatedAt: apiFlow.UPDATED_AT,
    apis: (apiFlow.DP_API_METADATA || []).map(api => ({
        apiId: api.API_ID,
        apiName: api.API_NAME,
        apiHandle: api.API_HANDLE,
        apiDescription: api.API_DESCRIPTION,
        productionUrl: api.PRODUCTION_URL,
        apiType: api.API_TYPE
    }))
    };
};

module.exports = {
    createAPIFlow,
    updateAPIFlow,
    deleteAPIFlow,
    getAPIFlow,
    getAllAPIFlows,
    addAPIFlowAPIs,
    removeAPIFlowAPIs,
    generatePrompt,
    getAllAPIFlowsFromDB,
    generateAgentPrompt
};
