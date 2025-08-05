/* eslint-disable no-undef */
/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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
const { invokeApiRequest, invokeGraphQLRequest } = require('../utils/util');
const config = require(process.cwd() + '/config');
const controlPlaneUrl = config.controlPlane.url;
const controlPlaneGraphqlUrl = config.controlPlane.graphqlURL;
const util = require('../utils/util');
const passport = require('passport');
const { Strategy: CustomStrategy } = require('passport-custom');
const adminDao = require('../dao/admin');
const constants = require('../utils/constants');
const { ApplicationDTO } = require('../dto/application');
const { Sequelize } = require("sequelize");
const adminService = require('../services/adminService');
const apiDao = require('../dao/apiMetadata');
const sdkJobService = require('../services/sdkJobService');
const progressBroadcaster = require('../services/progressBroadcaster');
const path = require('path');
const fs = require('fs');

// ***** POST / DELETE / PUT Functions ***** (Only work in production)

// ***** Save Application *****

const saveApplication = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        const application = await adminDao.createApplication(orgID, req.user.sub, req.body);
        return res.status(201).json(new ApplicationDTO(application.dataValues));
    } catch (error) {
        console.error("Error occurred while creating the application", error);
        util.handleError(res, error);
    }
};

// ***** Update Application *****

const updateApplication = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        const appID = req.params.applicationId;
        const [updatedRows, updatedApp] = await adminDao.updateApplication(orgID, appID, req.user.sub, req.body);
        if (!updatedRows) {
            throw new Sequelize.EmptyResultError("No record found to update");
        }
        res.status(200).send(new ApplicationDTO(updatedApp[0].dataValues));
    } catch (error) {
        console.error("Error occurred while updating the application", error);
        util.handleError(res, error);
    }
};

// ***** Delete Application *****

const deleteApplication = async (req, res) => {
    try {
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        const applicationId = req.params.applicationId;
        try {
            //delete the CP application
            //TODO: handle non-shared scenarios
            const app = await adminDao.getApplicationKeyMapping(orgID, applicationId, true);
            if (app.length > 0) {
                cpAppID = app[0].dataValues.CP_APP_REF;
                await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/applications/${cpAppID}`, {}, {});
            }
            const appDeleteResponse = await adminDao.deleteApplication(orgID, applicationId, req.user.sub);
            if (appDeleteResponse === 0) {
                throw new Sequelize.EmptyResultError("Resource not found to delete");
            } else {
                res.status(200).send("Resouce Deleted Successfully");
            }
        } catch (error) {
            if (error.statusCode === 404) {
                const appDeleteResponse = await adminDao.deleteApplication(orgID, applicationId, req.user.sub);
                if (appDeleteResponse === 0) {
                    throw new Sequelize.EmptyResultError("Resource not found to delete");
                } else {
                    res.status(200).send("Resouce Deleted Successfully");
                }
            }
            console.error("Error occurred while deleting the application", error);
            util.handleError(res, error);
        }
    } catch (error) {
        console.error("Error occurred while deleting the application", error);
        util.handleError(res, error);
    }
}

// ***** Save Application *****

const resetThrottlingPolicy = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const { userName } = req.body;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/reset-throttle-policy`, {
            'Content-Type': 'application/json'
        }, {
            userName
        });
        res.status(200).json({ message: responseData.message });
    } catch (error) {
        console.error("Error occurred while resetting the application", error);
        util.handleError(res, error);
    }
};

// ***** Generate API Keys *****

const generateAPIKeys = async (req, res) => {
    try {
        const requestBody = req.body;
        const apiID = requestBody.apiId;
        const orgID = await adminDao.getOrgId(req.user[constants.ORG_IDENTIFIER]);
        let cpAppID = requestBody.applicationId;

        const nonSharedKeyMapping = await adminDao.getApplicationAPIMapping(orgID, requestBody.devportalAppId, apiID, cpAppID, false);
        const sharedKeyMapping = await adminDao.getApplicationAPIMapping(orgID, requestBody.devportalAppId, apiID, cpAppID, true);

        if (!(nonSharedKeyMapping.length > 0 || sharedKeyMapping.length > 0)) { 
            const cpApp = await adminService.createCPApplication(req, requestBody.devportalAppId);
            cpAppID = cpApp.applicationId;

            const apiSubscription = await adminService.createCPSubscription(req, apiID, cpAppID, requestBody.subscriptionPlan);

            const appKeyMappping = {
                orgID: orgID,
                appID: requestBody.devportalAppId,
                cpAppRef: cpAppID,
                apiRefID: apiSubscription.apiId,
                subscriptionRefID: apiSubscription.subscriptionId,
                sharedToken: false,
                tokenType: constants.TOKEN_TYPES.API_KEY
            }
            await adminDao.createApplicationKeyMapping(appKeyMappping);
        } else if (!(nonSharedKeyMapping[0]?.dataValues.SUBSCRIPTION_REF_ID || sharedKeyMapping[0]?.dataValues.SUBSCRIPTION_REF_ID)) {
            const apiSubscription = await adminService.createCPSubscription(req, apiID, cpAppID, requestBody.subscriptionPlan);
            const appKeyMappping = {
                orgID: orgID,
                appID: requestBody.devportalAppId,
                cpAppRef: cpAppID,
                apiRefID: apiSubscription.apiId,
                subscriptionRefID: apiSubscription.subscriptionId,
                sharedToken: false,
                tokenType: constants.TOKEN_TYPES.API_KEY
            }
            await adminDao.updateApplicationKeyMapping(apiSubscription.apiId, appKeyMappping);
        }
        
        const query = `
        query ($orgUuid: String!, $projectId: String!) {
          environments(orgUuid: $orgUuid, projectId: $projectId) {
            name
            templateId
          }
        }
      `;

        const variables = {
            orgUuid: req.user[constants.ORG_IDENTIFIER],
            projectId: requestBody.projectID
        };

        const orgDetails = await invokeGraphQLRequest(req, `${controlPlaneGraphqlUrl}`, query, variables, {});
        const environments = orgDetails?.data?.environments || [];
        const apiHandle = await apiDao.getAPIHandle(orgID, req.body.apiId);

        requestBody.name = apiHandle + "-" + cpAppID;
        requestBody.environmentTemplateId = environments.find(env => env.name === 'Production').templateId;
        requestBody.applicationId = cpAppID;
        delete requestBody.projectID;
        delete requestBody.devportalAppId;

        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/api-keys/generate`, {
            'Content-Type': 'application/json'
        }, requestBody);
        responseData.appRefId = cpAppID;
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while deleting the application", error);
        util.handleError(res, error);
    }
};

const revokeAPIKeys = async (req, res) => {
    const apiKeyID = req.params.apiKeyID;
    try {
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/api-keys/${apiKeyID}/revoke`, {}, {});
        // await adminDao.deleteAppKeyMapping(await adminDao.getOrgId((req.user[constants.ORG_IDENTIFIER])), req.body.applicationId, req.body.apiRefID);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while revoking the API key", error);
        util.handleError(res, error);
    }
}

const regenerateAPIKeys = async (req, res) => {
    const apiKeyID = req.params.apiKeyID;
    try {
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/api-keys/${apiKeyID}/regenerate`, {}, {});
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while revoking the API key", error);
        util.handleError(res, error);
    }
}

const generateApplicationKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/generate-keys`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the application keys", error);
        util.handleError(res, error);
    }
};

const generateOAuthKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}/generate-token`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the OAuth keys", error);
        util.handleError(res, error);
    }
};

const revokeOAuthKeys = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'DELETE', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}`, {}, {});
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the OAuth keys", error);
        util.handleError(res, error);
    }
};

const cleanUp = async (req, res) => {
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'POST', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}/clean-up`, {}, req.body);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the OAuth keys", error);
        util.handleError(res, error);
    }
};

const updateOAuthKeys = async (req, res) => {

    let tokenDetails = req.body;
    try {
        const applicationId = req.params.applicationId;
        const keyMappingId = req.params.keyMappingId;
        const responseData = await invokeApiRequest(req, 'PUT', `${controlPlaneUrl}/applications/${applicationId}/oauth-keys/${keyMappingId}`, {}, tokenDetails);
        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error occurred while generating the OAuth keys", error);
        util.handleError(res, error);
    }
};

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const defaultUser = config.defaultAuth.users.find(user => user.username === username && user.password === password);
    passport.use(
        'default-auth',
        new CustomStrategy((req, done) => {
            if (defaultUser) {
                const user = { ...defaultUser };
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid credentials' });
            }
        })
    );

    passport.authenticate('default-auth', (err, user, info) => {
        if (err) {
            console.error("Error occurred while logging in", err);
            return util.handleError(res, err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return util.handleError(res, err);
            }
            res.status(200).json({ message: 'Login successful' });
        });
    })(req, res);
};

// ***** Route Handler Methods *****

/**
 * Route handler for SDK generation
 * Validates input and creates SDK generation job
 */
const generateSDK = async (req, res) => {
    try {
        const { selectedAPIs, sdkConfiguration, orgName } = req.body;
        const { applicationId } = req.params;

        // Validate input
        if (!orgName) {
            return res.status(400).json({
                success: false,
                message: 'Organization name is required'
            });
        }

        if (!selectedAPIs || selectedAPIs.length < 1) {
            return res.status(400).json({
                success: false,
                message: 'At least 1 API must be selected for SDK generation'
            });
        }

        if (!sdkConfiguration) {
            return res.status(400).json({
                success: false,
                message: 'Please provide SDK configuration details'
            });
        }

        // Validate AI description is provided
        if (!sdkConfiguration.description || sdkConfiguration.description.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'AI description is required for SDK generation'
            });
        }

        // Convert orgName to orgId
        const orgId = await sdkJobService.orgIDValue(orgName);
        
        // Create job for tracking progress
        const jobPayload = {
            selectedAPIs,
            sdkConfiguration,
            orgName,
            applicationId,
            orgId
        };
        const job = await sdkJobService.createJob(orgId, applicationId, jobPayload);
        const jobId = job.JOB_ID;

        // Send immediate response with job ID
        res.json({
            success: true,
            message: 'SDK generation job started successfully',
            data: {
                jobId: jobId,
                status: JOB_STATUS.PENDING,
                progress: 0,
                currentStep: 'Initializing',
                sseEndpoint: `/devportal/applications/${applicationId}/sdk/job-progress/${jobId}`
            }
        });
        
    } catch (error) {
        console.error('Error starting SDK generation job:', error);
        res.status(500).json({
            success: false,
            message: 'Error starting SDK generation job',
            error: error.message
        });
    }
};

/**
 * Route handler for SDK job progress streaming via SSE
 * Establishes Server-Sent Events connection for real-time progress updates
 */
const streamSDKProgress = (req, res) => {
    try {
        const { jobId } = req.params;
    
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Cache-Control',
            'X-Accel-Buffering': 'no',
            'X-Content-Type-Options': 'nosniff'
        });

        console.log(`Client connected to SSE for job: ${jobId}`);

        const onProgress = (progressData) => {
            if (progressData.jobId === jobId) {
                console.log(`Progress update for job ${jobId} step [${progressData.currentStep}] progress ${progressData.progress}%`);
                const dataToSend = { ...progressData, type: 'progress' };
                res.write(`data: ${JSON.stringify(dataToSend)}\n\n`);

                // Close SSE connection after sending completion or failure events
                if (progressData.status === 'completed' || progressData.status === 'failed' || progressData.status === 'cancelled') {
                    console.log(`Closing SSE connection for job ${jobId} after ${progressData.status} event`);
                    progressBroadcaster.removeListener('progress', onProgress);

                    // Close the connection after a brief delay to ensure the client receives the final event
                    setTimeout(() => {
                        try {
                            res.end();
                        } catch (error) {
                            console.warn(`Error closing SSE connection for job ${jobId}:`, error.message);
                        }
                    }, 100);
                }
            }
        };

        progressBroadcaster.on('progress', onProgress);

        // Send initial ping
        res.write(`data: ${JSON.stringify({ type: 'ping', jobId })}\n\n`);

        req.on('close', () => {
            console.log(`Client disconnected from SSE for job: ${jobId}`);
            progressBroadcaster.removeListener('progress', onProgress);
        });
    } catch (error) {
        console.error('Error in SDK progress streaming:', error);
        res.status(500).end(`Error: ${error.message}`);
    }
};

/**
 * Route handler for SDK job cancellation
 * Cancels an ongoing SDK generation job
 */
const cancelSDK = async (req, res) => {
    try {
        const { jobId } = req.params;
        
        console.log(`Received request to cancel SDK job: ${jobId}`);
        
        await sdkJobService.cancelJob(jobId);
        
        res.status(200).json({ 
            success: true, 
            message: 'SDK generation cancelled successfully',
            jobId: jobId
        });
        
    } catch (error) {
        console.error('Error cancelling SDK generation:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Failed to cancel SDK generation'
        });
    }
};

/**
 * Route handler for SDK download
 * Serves the generated SDK ZIP file for download
 */
const downloadSDK = async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(process.cwd(), 'generated-sdks', filename);

        const normalizedPath = path.normalize(filePath);
        const expectedDir = path.join(process.cwd(), 'generated-sdks');

        if (!normalizedPath.startsWith(expectedDir)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'SDK file not found' });
        }

        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        console.log(`Streaming SDK file: ${filename} from ${filePath}`);

        showGeneratedSdksContent();

        // Stream the file
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on('error', (err) => {
            console.error('Error streaming SDK file:', err);
            res.status(500).json({ error: 'Error downloading SDK' });
        });
        
    } catch (error) {
        console.error('Error downloading SDK:', error);
        res.status(500).json({
            success: false,
            message: 'Error downloading SDK file',
            error: error.message
        });
    }
};

/**
 * Route handler for SDK job status polling
 * Returns current job status from the database
 */
const statusSDK = async (req, res) => {
    try {
        const { jobId } = req.params;
        
        console.log(`Status request for SDK job: ${jobId}`);
        
        const job = await sdkJobService.getJob(jobId);
        
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        let resultData = {};
        if (job.JOB_STATUS === JOB_STATUS.COMPLETED) {
            const permanentDir = path.join(process.cwd(), 'generated-sdks');
            const zipFileName = `${jobId}-sdk.zip`;

            const finalZipPath = path.join(permanentDir, zipFileName);

            resultData = {
                finalDownloadUrl: `/devportal/sdk/download/${path.basename(finalZipPath || `${jobId}.zip`)}`,
            };
        }

        res.json({
            success: true,
            data: {
                jobId: jobId,
                JOB_STATUS: job.JOB_STATUS,
                CURRENT_STEP: job.CURRENT_STEP,
                PROGRESS: job.PROGRESS || 0,
                resultData: resultData
            }
        });
        
    } catch (error) {
        console.error('Error getting SDK job status:', error);
        res.status(500).json({
            success: false,
            message: 'Error getting SDK job status',
            error: error.message
        });
    }
};


/**
 * Show content of generated-sdks folder for debugging with detailed file sizes
 */
const showGeneratedSdksContent = async () => {
    try {
        const generatedSdksDir = path.join(process.cwd(), 'generated-sdks');
        
        if (!(await fs.promises.access(generatedSdksDir).then(() => true).catch(() => false))) {
            console.log('📁 Generated-sdks directory does not exist');
            return;
        }
        
        console.log('=== Generated-sdks folder content ===');
        console.log(`📂 Directory: ${generatedSdksDir}`);
        
        const items = await fs.promises.readdir(generatedSdksDir, { withFileTypes: true });
        
        if (items.length === 0) {
            console.log('📭 Generated-sdks folder is empty');
            return;
        }
        
        let totalSize = 0;
        let fileCount = 0;
        let dirCount = 0;
        
        console.log('────────────────────────────────────────────────────────────────────────────────');
        console.log('📋 Item Name                           📏 Size        🕐 Age      📝 Type');
        console.log('────────────────────────────────────────────────────────────────────────────────');
        
        for (const item of items) {
            const itemPath = path.join(generatedSdksDir, item.name);
            
            try {
                const stats = await fs.promises.stat(itemPath);
                const ageMinutes = Math.round((Date.now() - stats.birthtime.getTime()) / 60000);
                const ageHours = Math.round(ageMinutes / 60);
                const ageDays = Math.round(ageHours / 24);
                
                let ageDisplay;
                if (ageMinutes < 60) {
                    ageDisplay = `${ageMinutes}m`;
                } else if (ageHours < 24) {
                    ageDisplay = `${ageHours}h`;
                } else {
                    ageDisplay = `${ageDays}d`;
                }
                
                if (item.isFile()) {
                    const sizeBytes = stats.size;
                    const sizeKB = Math.round(sizeBytes / 1024);
                    const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);
                    
                    let sizeDisplay;
                    if (sizeBytes < 1024) {
                        sizeDisplay = `${sizeBytes}B`;
                    } else if (sizeBytes < 1024 * 1024) {
                        sizeDisplay = `${sizeKB}KB`;
                    } else {
                        sizeDisplay = `${sizeMB}MB`;
                    }
                    
                    console.log(`📄 ${item.name.padEnd(35)} ${sizeDisplay.padStart(12)} ${ageDisplay.padStart(8)} File`);
                    totalSize += sizeBytes;
                    fileCount++;
                    
                } else if (item.isDirectory()) {
                    // Calculate directory size by recursively checking contents
                    const dirSize = await calculateDirectorySize(itemPath);
                    const dirSizeKB = Math.round(dirSize / 1024);
                    const dirSizeMB = (dirSize / (1024 * 1024)).toFixed(2);
                    
                    let dirSizeDisplay;
                    if (dirSize < 1024) {
                        dirSizeDisplay = `${dirSize}B`;
                    } else if (dirSize < 1024 * 1024) {
                        dirSizeDisplay = `${dirSizeKB}KB`;
                    } else {
                        dirSizeDisplay = `${dirSizeMB}MB`;
                    }
                    
                    console.log(`📁 ${item.name.padEnd(35)} ${dirSizeDisplay.padStart(12)} ${ageDisplay.padStart(8)} Directory`);
                    totalSize += dirSize;
                    dirCount++;
                }
                
            } catch (statError) {
                console.log(`❌ ${item.name.padEnd(35)} ${'Error'.padStart(12)} ${'N/A'.padStart(8)} Unknown`);
                console.warn(`   Error getting stats for ${item.name}:`, statError.message);
            }
        }
        
        console.log('────────────────────────────────────────────────────────────────────────────────');
        
        // Display summary
        const totalSizeKB = Math.round(totalSize / 1024);
        const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
        
        let totalSizeDisplay;
        if (totalSize < 1024) {
            totalSizeDisplay = `${totalSize}B`;
        } else if (totalSize < 1024 * 1024) {
            totalSizeDisplay = `${totalSizeKB}KB`;
        } else {
            totalSizeDisplay = `${totalSizeMB}MB`;
        }
        
        console.log(`📊 Summary: ${fileCount} files, ${dirCount} directories`);
        console.log(`📏 Total size: ${totalSizeDisplay}`);
        console.log(`📂 Total items: ${items.length}`);
        console.log('=====================================');
        
        // Show recent SDK files specifically
        const zipFiles = items
            .filter(item => item.isFile() && item.name.endsWith('.zip'))
            .sort((a, b) => {
                // Sort by creation time (newest first)
                try {
                    const aPath = path.join(generatedSdksDir, a.name);
                    const bPath = path.join(generatedSdksDir, b.name);
                    const aStats = fs.statSync(aPath);
                    const bStats = fs.statSync(bPath);
                    return bStats.birthtime.getTime() - aStats.birthtime.getTime();
                } catch (error) {
                    return 0;
                }
            });
        
        if (zipFiles.length > 0) {
            console.log('🔍 Recent SDK ZIP files:');
            for (const zipFile of zipFiles.slice(0, 5)) { // Show last 5 ZIP files
                try {
                    const zipPath = path.join(generatedSdksDir, zipFile.name);
                    const zipStats = await fs.promises.stat(zipPath);
                    const zipSizeKB = Math.round(zipStats.size / 1024);
                    const zipAge = Math.round((Date.now() - zipStats.birthtime.getTime()) / 60000);
                    console.log(`   📦 ${zipFile.name} (${zipSizeKB}KB, ${zipAge}m old)`);
                } catch (error) {
                    console.log(`   📦 ${zipFile.name} (size unknown)`);
                }
            }
        }
        
    } catch (error) {
        console.error('❌ Error showing generated-sdks content:', error);
    }
}

/**
 * Calculate total size of a directory recursively
 * @param {string} dirPath - Directory path
 * @returns {Promise<number>} - Total size in bytes
 */
const calculateDirectorySize = async (dirPath) => {
    let totalSize = 0;
    
    try {
        const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item.name);
            
            try {
                if (item.isFile()) {
                    const stats = await fs.promises.stat(itemPath);
                    totalSize += stats.size;
                } else if (item.isDirectory()) {
                    totalSize += await calculateDirectorySize(itemPath);
                }
            } catch (error) {
                // Skip files that can't be accessed
                continue;
            }
        }
        
    } catch (error) {
        // If we can't read the directory, return 0
        return 0;
    }
    
    return totalSize;
}

// Create singleton instance
// const sdkJobService = new SDKJobService();

const JOB_STATUS = {
    PENDING: 'PENDING',
    MERGING: 'MERGING',
    SDK_GENERATION: 'SDK_GENERATION',
    APP_CODE_GENERATION: 'APP_CODE_GENERATION',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED'
}

module.exports = {
    saveApplication,
    updateApplication,
    deleteApplication,
    resetThrottlingPolicy,
    generateAPIKeys,
    generateApplicationKeys,
    generateOAuthKeys,
    revokeOAuthKeys,
    updateOAuthKeys,
    cleanUp,
    login,
    revokeAPIKeys,
    regenerateAPIKeys,
    generateSDK,
    streamSDKProgress,
    cancelSDK,
    downloadSDK,
    statusSDK
};