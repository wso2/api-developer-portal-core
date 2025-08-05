/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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
/* eslint-disable no-undef */

const EventEmitter = require('events');
const SdkJob = require('../dao/sdkJob');
const apiMetadata = require('../dao/apiMetadata');
const adminDao = require('../dao/admin');
const path = require('path');
const fs = require('fs');
const config = require(process.cwd() + '/config');
const aiSDKServiceUrl = config.aiSDKService?.url || 'http://localhost:5001';
const aiSDKServiceEndpoints = config.aiSDKService?.endpoints || {
    mergeSpecs: '/merge-openapi-specs',
    generateApp: '/generate-application-code'
};
const archiver = require('archiver');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const secret = require(process.cwd() + '/secret.json');
class SDKJobService extends EventEmitter {
    constructor() {
        super();
        //this.activeJobs = new Map();
        this.sdkCleanupInterval = null; // Store cleanup interval reference
    }

    /**
     * Utility function to get organization ID from organization name
     * @param {string} orgName - The organization name
     * @returns {Promise<string>} - The organization ID
     */
    async orgIDValue(orgName) {
        const organization = await adminDao.getOrganization(orgName);
        return organization.ORG_ID;
    }

    async createJob(orgId, applicationId, jobPayload = {}) {
        const jobId = this.generateJobId(orgId, applicationId);

        const jobData = {
            jobId,
            orgId,
            applicationId,
            jobStatus: JOB_STATUS.PENDING,
            progress: 0,
            currentStep: 'Initializing'
        };
        
        const job = await SdkJob.createJob(jobData);
        //this.activeJobs.set(jobId, job);
        
        // Emit initial progress
        this.emitProgress(jobId, {
            status: 'pending',
            progress: 0,
            currentStep: 'Initializing',
            message: 'Job created successfully'
        });

        // Start background job processing
        this.runJob(jobId, jobPayload).catch(async (error) => {
            console.error(`Error occurred while running job ${jobId}:`, error);
            try {
                await this.markJobAsFailed(jobId, error.message || 'Unknown error occurred during job processing');
            } catch (failureError) {
                console.error(`Failed to mark job ${jobId} as failed:`, failureError);
            }
        });
        
        return job;
    }

    async runJob(jobId, jobPayload) {
        let mergedSpec, apiSpecs, apiHandles, sdkResult, finalZipPath, baseSdkName;

        jobPayload = { ...jobPayload, jobId };

        const steps = [
            {
                name: 'Merging API Specifications',
                weight: 30,
                title: JOB_STATUS.MERGING,
                task: async () => {
                    const result = await this.performMergingTask(jobPayload);
                    mergedSpec = result.mergedSpec;
                    apiSpecs = result.apiSpecs;
                    apiHandles = result.apiHandles;
                    console.log('Merging step completed');
                }
            },
            {
                name: 'Generating SDK',
                weight: 20, 
                title: JOB_STATUS.SDK_GENERATION,
                task: async () => {
                    sdkResult = await this.performSdkGenerationTask(jobPayload, mergedSpec);
                    console.log('SDK generation step completed');
                }
            },
            {
                name: 'Generating Application Code',
                weight: 50,
                title: JOB_STATUS.APP_CODE_GENERATION,
                task: async () => {
                    const result = await this.performAppCodeGenerationTask(jobPayload, sdkResult, mergedSpec);
                    finalZipPath = result.finalZipPath;
                    baseSdkName = result.baseSdkName;
                    console.log('Application code generation step completed');
                }
            }
        ];

        try {

            await this.checkJobCancellation(jobId);

            let completeWeight = 0;
            for (const step of steps) {
                console.log(`Starting step: ${step.name}`);
                
                // Check for cancellation before each step
                await this.checkJobCancellation(jobId);

                // const progressCallback = (stepProgress) => {
                //     const overallProgress = completeWeight + (stepProgress * (step.weight / 100));
                //     this.updateJobStatus(
                //         jobId,
                //         step.title,
                //         Math.min(99, Math.round(overallProgress)),
                //         step.name,
                //         `In progress: ${step.name}...`
                //     );
                // }

                await step.task();
                // completeWeight += step.weight;
                
                // console.log(`Step ${step.name} completed. Total progress: ${completeWeight}%`);
                
                // Check for cancellation after each step
                await this.checkJobCancellation(jobId);
            }
            
            const { selectedAPIs, sdkConfiguration, orgName, applicationId } = jobPayload;
            
            const resultData = {
                selectedAPIs: selectedAPIs,
                apiSpecsFound: apiSpecs?.length || 0,
                transformedApiHandles: apiHandles || [],
                sdkConfiguration: {
                    language: sdkConfiguration?.language || 'java',
                    version: '1.0.0',
                    mode: 'ai',
                    description: sdkConfiguration.description
                },
                finalDownloadUrl: `/devportal/sdk/download/${path.basename(finalZipPath || `${jobId}.zip`)}`,
                applicationCodeGenerated: true,
                mode: 'ai',
                downloadPath: finalZipPath
            };
            
            await this.completeJob(jobId, resultData);
            
        } catch (error) {
            console.error(`Error in job ${jobId}:`, error);
            throw error;
        }
    }

    async performMergingTask(jobPayload) {
        try {
            //reportProgress(10); // 10% of 30% = 3% overall

            this.updateJobStatus(
                jobPayload.jobId,
                JOB_STATUS.MERGING,
                3,
                'Merging API Specifications',
                `In progress: Merging API Specifications...`
            );
            
            const { selectedAPIs, orgId } = jobPayload;
                        // Get API specifications and handles
            const apiSpecs = await apiMetadata.getAPISpecs(orgId, selectedAPIs);
            
            if (apiSpecs.length === 0) {
                throw new Error('No API specifications found for the selected APIs');
            }
            //reportProgress(80); // 80% of 30% = 24% overall
            this.updateJobStatus(
                jobPayload.jobId,
                JOB_STATUS.MERGING,
                24,
                'Merging API Specifications',
                `In progress: Merging API Specifications...`
            );

            const apiHandles = await this.getApiHandlers(orgId, selectedAPIs);
            
            let mergedSpec;
            if (selectedAPIs.length === 1) {
                mergedSpec = JSON.parse(apiSpecs[0].apiSpec);
            } else {
                const mergeSpecApiRequest = this.prepareSDKGenerationRequest(apiSpecs, apiHandles);
                //reportProgress(90); // 90% of 30% = 27% overall
                this.updateJobStatus(
                    jobPayload.jobId,
                    JOB_STATUS.MERGING,
                    27,
                    'Merging API Specifications',
                    `In progress: Merging API Specifications...`
                );
                mergedSpec = await this.invokeMergeSpecApi(mergeSpecApiRequest);
                console.log('Merged API specifications received');
            }


            return { mergedSpec, apiSpecs, apiHandles };
        } catch (error) {
            console.error('Error during merging step:', error);
            let userMessage = 'Failed to merge API specifications';
            
            if (error.message.includes('No API specifications found')) {
                userMessage = 'No API specifications were found for the selected APIs. Please check your API selection.';
            } else if (error.message.includes('fetch failed')) {
                userMessage = 'Unable to connect to the AI service for merging specifications. Please try again later.';
            } else if (error.message.includes('HTTP error')) {
                userMessage = 'AI service returned an error while merging specifications. Please check your API specifications.';
            }
            
            throw new Error(userMessage);
        }
    }

    async performSdkGenerationTask(jobPayload, mergedSpec) {
        try {            
            const { sdkConfiguration, orgName, applicationId, jobId } = jobPayload;
            
            //reportProgress(50); // 50% of 20% = 10% overall (40% total)
            this.updateJobStatus(
                jobPayload.jobId,
                JOB_STATUS.SDK_GENERATION,
                40,
                'Generating SDK',
                `In progress: Generating SDK...`
            );
            const sdkResult = await this.generateSDKWithOpenAPIGenerator(
                mergedSpec,
                sdkConfiguration,
                jobId
            );

            console.log('SDK generated successfully, saved to:', sdkResult.sdkPath);

            return sdkResult;
        } catch (error) {
            console.error('Error during SDK generation step:', error);
            let userMessage = 'Failed to generate SDK';
            
            if (error.message.includes('openapi-generator-cli')) {
                userMessage = 'OpenAPI Generator tool is not available. Please contact support.';
            } else if (error.message.includes('invalid API specification')) {
                userMessage = 'Invalid API specification format. Please check your API specifications.';
            } else if (error.message.includes('timeout')) {
                userMessage = 'SDK generation timed out. Please try again with fewer APIs.';
            } else if (error.message.includes('ENOENT')) {
                userMessage = 'Required files not found during SDK generation. Please try again.';
            }
            
            throw new Error(userMessage);
        }
    }

    async performAppCodeGenerationTask(jobPayload, sdkResult, mergedSpec) {
        try {

            this.updateJobStatus(
                jobPayload.jobId,
                JOB_STATUS.APP_CODE_GENERATION,
                70,
                'Generating Application Code',
                `In progress: Generating Application Code...`
            );

            const result = await this.processAIModeSDK(sdkResult, mergedSpec, jobPayload.sdkConfiguration);

            this.updateJobStatus(
                jobPayload.jobId,
                JOB_STATUS.APP_CODE_GENERATION,
                100,
                'Generating Application Code',
                `In progress: Generating Application Code...`
            );

            return {
                finalZipPath: result
            };
        } catch (error) {
            console.error('Error during application code generation step:', error);
            let userMessage = 'Failed to generate application code';
            
            if (error.message.includes('fetch failed')) {
                userMessage = 'Unable to connect to AI service for application code generation. Please try again later.';
            } else if (error.message.includes('use case is invalid')) {
                userMessage = 'AI service failed to generate application code. Please try with a different description.';
            } else if (error.message.includes('ZIP')) {
                userMessage = 'Failed to create final package. Please try again.';
            }
            
            throw new Error(userMessage);
        }
    }

    async updateJobStatus(jobId, status, progress = null, currentStep = null, message = null, resultData = null) {
        try {
            const updateData = {
                jobStatus: status.toUpperCase(),
                progress: progress,
                currentStep: currentStep,
                resultData: resultData ? JSON.stringify(resultData) : null
            };

            const updatedJob = await SdkJob.updateJob(jobId, updateData);
            // if (updatedJob) {
            //this.activeJobs.set(jobId, updatedJob);
            // Emit progress event
            await this.emitProgress(jobId, {
                status: status.toLowerCase(),
                progress: progress,
                currentStep: currentStep,
                message: message || this.getDefaultMessage(status),
                resultData: resultData
            });
            // }
            
            return updatedJob;
        } catch (error) {
            console.error('Error updating job status:', error);
            await this.markJobAsFailed(jobId, error.message);
            throw error;
        }
    }

    async cancelJob(jobId) {
        try {
            console.log(`Cancelling job ${jobId}`);
            
            // Check if job exists and is cancellable
            const job = await this.getJob(jobId);
            if (!job) {
                throw new Error('Job not found');
            }

            if (job.JOB_STATUS === JOB_STATUS.COMPLETED || job.JOB_STATUS === JOB_STATUS.FAILED) {
                throw new Error('Cannot cancel a job that is already completed or failed');
            }
            
            // Mark the job as cancelled in the database
            const updateData = {
                jobStatus: JOB_STATUS.CANCELLED,
                progress: 0,
                currentStep: 'Cancelled',
                errorMessage: 'Job was cancelled by user'
            };

            const updatedJob = await SdkJob.updateJob(jobId, updateData);
            
            // Remove from active jobs
            //this.activeJobs.delete(jobId);
            
            // Clean up any generated files for this job
            await this.cleanupJobFiles(jobId);
            
            // Emit cancellation event
            this.emitProgress(jobId, {
                status: 'cancelled',
                progress: 0,
                currentStep: 'Cancelled',
                message: 'Job cancelled by user'
            });
            
            console.log(`Job ${jobId} cancelled successfully`);
            return updatedJob;
            
        } catch (error) {
            console.error('Error cancelling job:', error);
            throw error;
        }
    }

    async cleanupJobFiles(jobId) {
        try {
            const fs = require('fs').promises;
            const path = require('path');
            const os = require('os');
            
            const tempDir = path.join(os.tmpdir(), `sdk-generation`, `${jobId}-sdk`);
            const generatedSdksDir = path.join(process.cwd(), 'generated-sdks');
            
            // Clean up temporary SDK generation directory
            try {
                const tempDirExists = await fs.access(tempDir).then(() => true).catch(() => false);
                if (tempDirExists) {
                    await fs.rm(tempDir, { recursive: true, force: true });
                    console.log(`Cleaned up temp directory: ${tempDir}`);
                }
            } catch (error) {
                console.warn(`Failed to clean up temp directory ${tempDir}:`, error.message);
            }
            
            // Clean up any generated ZIP files for this job
            try {
                const generatedDirExists = await fs.access(generatedSdksDir).then(() => true).catch(() => false);
                if (generatedDirExists) {
                    const files = await fs.readdir(generatedSdksDir);
                    const jobFiles = files.filter(file => file.includes(jobId));
                    
                    for (const file of jobFiles) {
                        const filePath = path.join(generatedSdksDir, file);
                        await fs.unlink(filePath);
                        console.log(`Cleaned up generated file: ${filePath}`);
                    }
                }
            } catch (error) {
                console.warn(`Failed to clean up generated files for job ${jobId}:`, error.message);
            }
            
        } catch (error) {
            console.error(`Error cleaning up files for job ${jobId}:`, error);
        }
    }

    // Make jobs cancellable by checking for cancellation status during processing
    async checkJobCancellation(jobId) {
        const job = await this.getJob(jobId);
        if (job && job.JOB_STATUS === JOB_STATUS.CANCELLED) {
            throw new Error('Job was cancelled');
        }
        return job;
    }

    async markJobAsFailed(jobId, errorMessage) {
        try {
            console.log(`Marking job ${jobId} as failed with message: ${errorMessage}`);

            const job = await this.getJob(jobId);

            if (job && job.JOB_STATUS === JOB_STATUS.CANCELLED) {
                console.log(`Job ${jobId} is already cancelled, skipping failure update.`);
                return job;
            }
            
            const updateData = {
                jobStatus: JOB_STATUS.FAILED,
                progress: 0,
                currentStep: 'Failed',
                errorMessage: errorMessage
            };

            const updatedJob = await SdkJob.updateJob(jobId, updateData);
            if (updatedJob) {
                //this.activeJobs.set(jobId, updatedJob);
                
                this.emitProgress(jobId, {
                    status: 'failed',
                    progress: 0,
                    currentStep: 'Failed',
                    message: errorMessage,
                    error: errorMessage
                });
                
                console.log(`Job ${jobId} marked as failed and frontend notified`);
            }
            
            return updatedJob;
        } catch (error) {
            console.error('Error marking job as failed:', error);
            throw error;
        }
    }

    async completeJob(jobId, resultData = null) {
        //this.activeJobs.delete(jobId); // Remove from active jobs
        return await this.updateJobStatus(
            jobId, 
            JOB_STATUS.COMPLETED, 
            100, 
            'Completed',
            'SDK generation completed successfully',
            resultData
        );
    }

    async getJob(jobId) {
        // if (this.activeJobs.has(jobId)) {
        //     return this.activeJobs.get(jobId);
        // }
        
        const job = await SdkJob.getJobById(jobId);
        if (job) {
            // this.activeJobs.set(jobId, job);
            return job;
        }
        
        return null;
    }

    generateJobId(orgId, applicationId) {
        const randomPostfix = Math.floor(10000 + Math.random() * 90000); // 5 digit random number
        return `${orgId}-${applicationId}-${randomPostfix}`;
    }

    async emitProgress(jobId, progressData) {
        this.emit('progress', {
            jobId,
            ...progressData
        });
    }

    getDefaultMessage(status) {
        const messages = {
            'PENDING': 'Job is pending',
            'MERGING': 'Merging API specifications',
            'SDK_GENERATION': 'Generating SDK',
            'APP_CODE_GENERATION': 'Generating application code',
            'COMPLETED': 'Job completed successfully',
            'FAILED': 'Job failed'
        };
        return messages[status.toUpperCase()] || 'Processing...';
    }

    async simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ***** SDK Cleanup Methods *****

    /**
     * Utility function to clean up generated SDK files and folders older than 10 minutes
     * This runs periodically to remove all files and folders in the generated-sdks directory
     */
    async cleanupGeneratedSDKs() {
        try {
            const generatedSdksDir = path.join(process.cwd(), 'generated-sdks');
            
            if (!(await fs.promises.access(generatedSdksDir).then(() => true).catch(() => false))) {
                return;
            }
            
            const tenMinutesAgo = Date.now() - (10 * 60 * 1000); // 10 minutes in milliseconds
            
            try {
                const items = await fs.promises.readdir(generatedSdksDir, { withFileTypes: true });
                let cleanedCount = 0;
                
                for (const item of items) {
                    const itemPath = path.join(generatedSdksDir, item.name);
                    
                    try {
                        const stats = await fs.promises.stat(itemPath);
                        
                        // Check if the item is older than 10 minutes (using creation time)
                        if (stats.birthtime.getTime() < tenMinutesAgo) {
                            if (item.isDirectory()) {
                                await fs.promises.rm(itemPath, { recursive: true, force: true });
                                console.log(`Cleaned up SDK directory (${Math.round((Date.now() - stats.birthtime.getTime()) / 60000)} minutes old): ${itemPath}`);
                            } else {
                                await fs.promises.unlink(itemPath);
                                console.log(`Cleaned up SDK file (${Math.round((Date.now() - stats.birthtime.getTime()) / 60000)} minutes old): ${itemPath}`);
                            }
                            cleanedCount++;
                        }
                    } catch (error) {
                        console.warn(`Error processing SDK item ${itemPath}:`, error.message);
                    }
                }
                
                if (cleanedCount > 0) {
                    console.log(`SDK cleanup completed: ${cleanedCount} items removed from generated-sdks directory`);
                }
                
            } catch (error) {
                console.warn(`Error reading generated-sdks directory: ${error.message}`);
            }
            
        } catch (error) {
            console.error('Error during generated SDK cleanup:', error);
        }
    }

    /**
     * Start the periodic SDK cleanup process
     * Runs every 5 minutes to check for files/folders older than 10 minutes
     */
    startSDKCleanupScheduler() {
        if (this.sdkCleanupInterval) {
            return; 
        }
        
        console.log('Starting SDK cleanup scheduler - runs every 60 minutes to clean files older than 10 minutes');

        this.cleanupGeneratedSDKs();

        // Set up periodic cleanup every 60 minutes
        this.sdkCleanupInterval = setInterval(async () => {
            try {
                await this.cleanupGeneratedSDKs();
            } catch (error) {
                console.error('Error in scheduled SDK cleanup:', error);
            }
        }, 60 * 60 * 1000);
    }

    /**
     * Stop the periodic SDK cleanup process
     */
    stopSDKCleanupScheduler() {
        if (this.sdkCleanupInterval) {
            clearInterval(this.sdkCleanupInterval);
            this.sdkCleanupInterval = null;
            console.log('SDK cleanup scheduler stopped');
        }
    }

    // ***** Helper Methods *****

    /**
     * Helper method to get API handlers for selected APIs
     * @param {string} orgID - Organization ID
     * @param {Array} selectedAPIs - Array of selected API IDs
     * @returns {Array} - Array of API handles
     */
    async getApiHandlers(orgID, selectedAPIs) {
        const apiHandlesArray = [];
        
        for (const apiId of selectedAPIs) {
            try {
                const apiMetadataResult = await apiMetadata.getAPIMetadata(orgID, apiId);
                if (apiMetadataResult && apiMetadataResult.length > 0) {
                    const apiData = apiMetadataResult[0];
                    const apiHandle = apiData.API_HANDLE || apiData.dataValues?.API_HANDLE;
                    
                    if (apiHandle) {
                        // Transform API handle: financeapi-v1.0 -> financeapi/v1.0
                        const transformedHandle = apiHandle.replace(/-v(\d+\.\d+)$/, '/v$1');
                        apiHandlesArray.push(transformedHandle);
                    }
                } else {
                    console.warn(`No metadata found for API ${apiId}`);
                }
            } catch (error) {
                console.error(`Error loading metadata for API ${apiId}:`, error);
            }
        }
        
        return apiHandlesArray;
    }

    /**
     * Prepare SDK generation request payload for merge API
     * @param {Array} apiSpecs - Array of API specifications
     * @param {Array} apiHandlesArray - Array of API handles
     * @returns {Object} - Request payload for merge API
     */
    prepareSDKGenerationRequest(apiSpecs, apiHandlesArray) {
        // Collect apiSpecString array for further processing
        const apiSpecStrings = apiSpecs.map(spec => {
            const parsedSpec = JSON.parse(spec.apiSpec);
            return JSON.stringify(parsedSpec).replace(/\n/g, '');
        });
        
        // Combine all specs using '\n'
        const allSpecsString = apiSpecStrings.join('\n');

        const apiHandleMap = {};
        apiHandlesArray.forEach((apiHandle, index) => {
            apiHandleMap[`spec${index + 1}`] = apiHandle;
        });
        
        return {
            "specifications": allSpecsString,
            "contexts": JSON.parse(JSON.stringify(apiHandleMap))
        };
    }

    /**
     * Invoke the merge specification API
     * @param {Object} requestPayload - Request payload for merge API
     * @returns {Object} - Merged API specification
     */
    async invokeMergeSpecApi(requestPayload) {
        const aiSDKServiceUrl = config.aiSDKService?.url || 'http://localhost:5001';
        const aiSDKServiceEndpoints = config.aiSDKService?.endpoints || {
            mergeSpecs: '/merge-openapi-specs',
            generateApp: '/generate-application-code'
        };
        const { authHeaderName, apiKey } = secret.aiSDKService || {};

        try {
            const response = await fetch(`${aiSDKServiceUrl}${aiSDKServiceEndpoints.mergeSpecs}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    [authHeaderName]: apiKey
                },
                body: JSON.stringify(requestPayload)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to generate application: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error invoking merge spec API:", error);
            throw error;
        }
    }

    /**
     * Generate SDK using OpenAPI Generator
     * @param {Object} mergedSpec - Merged API specification
     * @param {Object} sdkConfiguration - SDK configuration
     * @param {string} jobId - Job ID for tracking
     * @returns {Object} - SDK generation result
     */
    async generateSDKWithOpenAPIGenerator(mergedSpec, sdkConfiguration, jobId) {
        let specDir = null;
        let outputDir = null;
        
        try {
            console.log('Starting SDK generation with OpenAPI Generator...');
            const language = sdkConfiguration?.language || 'javascript';
            const sdkName = `${jobId}-sdk`;

            // Create temporary directory for SDK generation
            specDir = path.join(process.cwd(), 'generated-sdks', 'merged-specs', `${sdkName}`);
            const specFilePath = path.join(specDir, 'merged-spec.json');
            outputDir = path.join(process.cwd(), 'generated-sdks', `${sdkName}`);
            
            // Create directories
            await fs.promises.mkdir(specDir, { recursive: true });
            await fs.promises.mkdir(outputDir, { recursive: true });
            
            // Write merged spec to file
            await fs.promises.writeFile(specFilePath, JSON.stringify(mergedSpec, null, 2));
            
            // Determine the generator name based on language
            const generatorMap = {
                'javascript': 'javascript',
                'java': 'java',
                'android': 'javascript'
            };
            
            const generator = generatorMap[language] || 'javascript';
            
            // Build openapi-generator command
            const command = [
                'npx',
                '@openapitools/openapi-generator-cli',
                'generate',
                '-i', specFilePath,
                '-g', generator,
                '-o', outputDir,
                '--package-name', sdkName,
                '--additional-properties',
                `packageName=${sdkName},projectName=${sdkName},packageVersion=1.0.0`
            ].join(' ');
            
            // Execute openapi-generator
            const { stdout, stderr } = await execAsync(command, { 
                cwd: specDir,
                timeout: 120000
            });

            const dirExists = await fs.promises.access(outputDir).then(() => true).catch(() => false);
            if (!dirExists) {
                throw new Error(`SDK generation failed: Output directory ${outputDir} does not exist`);
            }

            const files = await fs.promises.readdir(outputDir);
            if (files.length === 0) {
                throw new Error(`SDK generation failed: No files generated in ${outputDir}`);
            }
            
            if (stderr && !stderr.includes('WARN')) {
                console.warn('OpenAPI Generator warnings:', stderr);
            }

            console.log('SDK generation completed successfully. Output directory:', outputDir);

            // Clean up spec directory
            try {
                await fs.promises.rm(specDir, { recursive: true, force: true });
                console.log('Cleaned up spec file');
            } catch (cleanupError) {
                console.warn('Could not clean up spec directory:', cleanupError);
            }
                    
            return {
                success: true,
                sdkPath: outputDir,
                language: language,
                sdkName: sdkName
            };
            
        } catch (error) {
            console.error('Error generating SDK with openapi-generator:', error);
            
            // Provide more specific error messages based on error type
            let errorMessage = 'SDK generation failed';
            
            if (error.message && error.message.includes('NullPointerException')) {
                errorMessage = 'SDK generation failed due to invalid API specification format';
            } else if (error.message && error.message.includes('command not found')) {
                errorMessage = 'OpenAPI Generator CLI not found. Please install openapi-generator-cli';
            } else if (error.code === 'ENOENT') {
                errorMessage = 'Required files not found during SDK generation';
            }
            
            // Clean up directories on error
            try {
                if (specDir) await fs.promises.rm(specDir, { recursive: true, force: true });
                if (outputDir) await fs.promises.rm(outputDir, { recursive: true, force: true });
            } catch (cleanupError) {
                console.warn('Error cleaning up directories after SDK generation failure:', cleanupError);
            }
            
            throw new Error(errorMessage);
        }
    }

    /**
     * Process AI mode SDK generation
     * @param {Object} sdkResult - SDK generation result
     * @param {Object} mergedSpec - Merged API specification
     * @param {Object} sdkConfiguration - SDK configuration
     * @returns {string} - Final ZIP file path
     */
    async processAIModeSDK(sdkResult, mergedSpec, sdkConfiguration) {        
        try {
            console.log('Processing AI mode SDK generation...');

            const sdkMethods = await this.extractMethodFile(sdkResult.sdkPath, sdkConfiguration?.language || 'java');

            const applicationApiRequest = await this.getApplicationGenApiReqBody(
                sdkMethods.apiClassContent,
                sdkConfiguration?.language || 'java',
                mergedSpec,
                sdkConfiguration
            );

            const applicationCodeResponse = await this.invokeApplicationCodeGenApi(applicationApiRequest);

            const finalZipName = this.createSDKFileName(sdkResult.sdkName, true);
            const finalZipResult = await this.processApplicationCodeAndCreateFinalZip(
                applicationCodeResponse,
                sdkResult.sdkPath,
                sdkConfiguration,
                finalZipName
            );

            return finalZipResult.finalZipPath;
            
        } catch (error) {
            console.error('Error processing AI mode SDK:', error);
            throw error;
        }
    }

    /**
     * Extract ZIP and process SDK files to send to backend API
     * @param {string} sdkDir - SDK directory path
     * @param {string} language - Programming language
     * @returns {Object} - Extracted method information
     */
    async extractMethodFile(sdkDir, language) {
        try {
            // Find the API class file based on language
            let apiClassFile = null;
            let apiClassContent = null;
            
            if (language === 'java') {
                // Look for DefaultApi.java file in src/main/java directory structure
                const javaApiPath = await this.findFileRecursively(sdkDir, 'DefaultApi.java');
                if (javaApiPath) {
                    apiClassFile = javaApiPath;
                    apiClassContent = await fs.promises.readFile(javaApiPath, 'utf8');
                    console.log(`Found Java API class: ${javaApiPath}`);
                }
            } else if (language === 'javascript' || language === 'android') {
                // Look for API class in JavaScript/TypeScript SDKs
                const jsApiPath = await this.findFileRecursively(sdkDir, /.*[Aa]pi\.js$|.*[Aa]pi\.ts$/);
                if (jsApiPath) {
                    apiClassFile = jsApiPath;
                    apiClassContent = await fs.promises.readFile(jsApiPath, 'utf8');
                    console.log(`Found JS/TS API class: ${jsApiPath}`);
                }
            } 
            
            if (!apiClassContent) {
                throw new Error(`No API class file found for language: ${language}`);
            }
            
            return {
                apiClassContent: apiClassContent || '',
                apiClassFile: path.basename(apiClassFile || 'UnknownApi'),
                apiClassFound: !!apiClassContent,
                SdkPath: sdkDir
            };
            
        } catch (error) {
            console.error('Error extracting and processing SDK:', error);
            throw error;
        }
    }

    /**
     * Create JSON request data for backend API request
     * @param {string} apiClassContent - API class content
     * @param {string} language - Programming language
     * @param {Object} mergedSpec - Merged API specification
     * @param {Object} sdkConfiguration - SDK configuration
     * @returns {Object} - Request body for application generation API
     */
    async getApplicationGenApiReqBody(apiClassContent, language, mergedSpec, sdkConfiguration) {
        let useCase;
        
        if (sdkConfiguration?.description && sdkConfiguration.description.trim()) {
            useCase = sdkConfiguration.description.trim();
            console.log('Using AI mode with user prompt:', useCase);
        } else {
            // Default use case for default mode
            useCase = `Generate application which uses the provided APIs to demonstrate their functionality with sample data and proper error handling`;
            console.log('Using default mode with standard use case');
        }
        
        return {
            sdkMethodsFile: apiClassContent || '',
            useCase: useCase,
            language: language,
            APISpecification: JSON.stringify(mergedSpec)
        };
    }

    /**
     * Invoke application code generation API
     * @param {Object} requestData - Request data for application generation
     * @returns {string} - Generated application code
     */
    async invokeApplicationCodeGenApi(requestData) {
        try {
            const { authHeaderName, apiKey } = secret.aiSDKService || {};
            const response = await fetch(`${aiSDKServiceUrl}${aiSDKServiceEndpoints.generateApp}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    [authHeaderName]: apiKey
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to generate application: ${response.statusText}`);
            }
            
            const data = await response.text();
            return data;
        } catch (error) {
            console.error("Error invoking application generation API:", error);
            throw error;
        }
    }

    /**
     * Create SDK filename based on API handles and mode
     * @param {string} baseSdkName - Base SDK name
     * @param {boolean} isAIMode - Whether AI mode is enabled
     * @returns {string} - Final SDK filename
     */
    createSDKFileName(baseSdkName, isAIMode) {        
        // const suffix = isAIMode ? 'with-app' : '';
        return `${baseSdkName}.zip`;
    }

    /**
     * Process application code response and create final ZIP with SDK + application code
     * @param {string} applicationCode - Generated application code
     * @param {string} sdkPath - SDK directory path
     * @param {Object} sdkConfiguration - SDK configuration
     * @param {string} zipFileName - Final ZIP filename
     * @returns {Object} - Final ZIP result
     */
    async processApplicationCodeAndCreateFinalZip(applicationCode, sdkPath, sdkConfiguration, zipFileName) {
        try {
            console.log('Processing application code response and creating final ZIP...');
            const language = sdkConfiguration?.language || 'java';
            
            // Create application code files in the SDK folder
            if (applicationCode) {
                const fileExtension = this.getFileExtension(language);
                
                console.log('Searching for package directory structure...');
                const javaPackageDir = await this.findJavaPackageDirectory(sdkPath);
                
                if (javaPackageDir) {
                    // Place Application.java at the same level as api, auth, model packages
                    const mainAppFile = path.join(javaPackageDir, `Application.${fileExtension}`);
                    await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                    console.log(`Java Application code written to: ${mainAppFile}`);
                } else {
                    // create in application-code directory
                    console.warn('Could not find Java package directory, using fallback location');
                    const appCodeDir = path.join(sdkPath, 'application-code');
                    await fs.promises.mkdir(appCodeDir, { recursive: true });
                    const mainAppFile = path.join(appCodeDir, `Application.${fileExtension}`);
                    await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                    console.log(`Application code written to fallback location: ${mainAppFile}`);
                }
            }
            
            await this.createProjectReadme(sdkPath, sdkConfiguration, language);
            
            // Create final ZIP with SDK + application code
            const permanentDir = path.join(process.cwd(), 'generated-sdks');
            await fs.promises.mkdir(permanentDir, { recursive: true });
            
            const finalZipPath = path.join(permanentDir, zipFileName);
            await this.createZipArchive(sdkPath, finalZipPath);

            // need to write logic to check whether the zip file is exist in finalZipPath
            const zipExists = await this.isFileExists(finalZipPath, sdkPath);

            if (!zipExists) {
                throw new Error(`Final ZIP file not created: ${finalZipPath}`);
            }

            console.log(`Final ZIP created: ${finalZipPath}`);
            
            // Clean up SDK folder
            await fs.promises.rm(sdkPath, { recursive: true, force: true });
            console.log('Cleaned up SDK folder');

            // Show content of generated-sdks folder for debugging
            // await this.showGeneratedSdksContent();
            
            return {
                finalZipPath: finalZipPath,
            };
            
        } catch (error) {
            console.error('Error processing application code and creating final ZIP:', error);
            
            try {
                await fs.promises.rm(sdkPath, { recursive: true, force: true });
                console.log('Cleaned up SDK folder after ZIP creation error');
            } catch (cleanupError) {
                console.error('Error cleaning up SDK folder:', cleanupError);
            }
            
            throw error;
        }
    }

    async isFileExists(filePath, sdkPath = null) {
        let retryCount = 0;
        
        // First attempt: Check 4 times with exponential backoff
        for (retryCount = 0; retryCount < 4; retryCount++) {
            console.log(`Checking if file exists: ${filePath} (Attempt ${retryCount + 1})`);
            let exists = await fs.promises.access(filePath).then(() => true).catch(() => false);
            if (exists) {
                return true;
            }
            
            // Exponential backoff: 2s, 4s, 8s, 16s
            const waitTime = Math.pow(2, retryCount + 1) * 1000;
            console.log(`File not found, waiting ${waitTime}ms before next attempt...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        // If file still doesn't exist and we have sdkPath, re-run createZipArchive
        if (sdkPath) {
            console.log(`File still not found after 4 attempts. Re-running createZipArchive for: ${filePath}`);
            try {
                await this.createZipArchive(sdkPath, filePath);
                console.log(`Re-ran createZipArchive successfully for: ${filePath}`);
            } catch (error) {
                console.error(`Failed to re-run createZipArchive for ${filePath}:`, error);
                return false;
            }
            
            // Second attempt: Check 4 more times after re-running createZipArchive
            for (retryCount = 0; retryCount < 4; retryCount++) {
                console.log(`Post re-run check if file exists: ${filePath} (Attempt ${retryCount + 1})`);
                let exists = await fs.promises.access(filePath).then(() => true).catch(() => false);
                if (exists) {
                    return true;
                }
                
                // Exponential backoff: 2s, 4s, 8s, 16s
                const waitTime = Math.pow(2, retryCount + 1) * 1000;
                console.log(`File not found after re-run, waiting ${waitTime}ms before next attempt...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
        
        return false;
    }

    /**
     * Get file extension based on programming language
     * @param {string} language - Programming language
     * @returns {string} - File extension
     */
    getFileExtension(language) {
        const extensionMap = {
            'java': 'java',
            'javascript': 'js',
            'typescript': 'ts',
            'python': 'py',
            'csharp': 'cs',
            'go': 'go',
            'php': 'php',
            'ruby': 'rb'
        };
        return extensionMap[language] || 'java';
    };

    /**
     * Find the Java package directory where API classes are located
     * This looks for the directory that contains api/, auth/, and model/ subdirectories
     */
    async findJavaPackageDirectory(sdkDir) {
        try {
            console.log(`Searching for Java package directory in: ${sdkDir}`);
            
            // Common Java package paths in OpenAPI generated SDKs
            const possiblePaths = [
                'src/main/java/org/openapitools/client',
                'src/main/java/io/swagger/client',
                'src/main/java/com/example/client',
                'src/main/java',
                'src'
            ];
            
            for (const possiblePath of possiblePaths) {
                const fullPath = path.join(sdkDir, possiblePath);
                console.log(`Checking path: ${fullPath}`);
                
                if (await fs.promises.access(fullPath).then(() => true).catch(() => false)) {
                    console.log(`Path exists: ${fullPath}`);
                    
                    // Check if this directory contains the expected subdirectories
                    const hasApiDir = await fs.promises.access(path.join(fullPath, 'api')).then(() => true).catch(() => false);
                    const hasAuthDir = await fs.promises.access(path.join(fullPath, 'auth')).then(() => true).catch(() => false);
                    const hasModelDir = await fs.promises.access(path.join(fullPath, 'model')).then(() => true).catch(() => false);
                    
                    console.log(`Directory contents check - api: ${hasApiDir}, model: ${hasModelDir}`);

                    if (hasApiDir && hasModelDir) {
                        console.log(`Found package directory: ${fullPath}`);
                        return fullPath;
                    }
                } else {
                    console.log(`Path does not exist: ${fullPath}`);
                }
            }
            
            // If common paths don't work, search recursively for a directory that contains api/model subdirs
            console.log('Searching recursively for Java package structure...');
            console.log('Current SDK directory structure:');
            await this.listDirectoryStructure(sdkDir);

            const foundPath = await this.findJavaPackageRecursively(sdkDir);
            if (foundPath) {
                console.log(`Found package directory recursively: ${foundPath}`);
                return foundPath;
            }

            console.warn('Could not find package directory structure');
            return null;
            
        } catch (error) {
            console.error('Error finding package directory:', error);
            return null;
        }
    };

    /**
     * Debug function to list directory structure
     */
    async listDirectoryStructure(dir, prefix = '', maxDepth = 3, currentDepth = 0) {
        if (currentDepth > maxDepth) {
            return;
        }
        
        try {
            const items = await fs.promises.readdir(dir, { withFileTypes: true });
            
            for (const item of items.slice(0, 20)) { // Limit to first 20 items to avoid spam
                console.log(`${prefix}${item.isDirectory() ? '📁' : '📄'} ${item.name}`);
                
                if (item.isDirectory() && currentDepth < maxDepth) {
                    const fullPath = path.join(dir, item.name);
                    await this.listDirectoryStructure(fullPath, prefix + '  ', maxDepth, currentDepth + 1);
                }
            }
            
            if (items.length > 20) {
                console.log(`${prefix}... and ${items.length - 20} more items`);
            }
        } catch (error) {
            console.log(`${prefix} Error reading directory: ${error.message}`);
        }
    };


    /**
     * Recursively find a file by name or pattern
     */
    async findFileRecursively(dir, filePattern) {
        try {
            const items = await fs.promises.readdir(dir, { withFileTypes: true });
            
            for (const item of items) {
                const fullPath = path.join(dir, item.name);
                
                if (item.isDirectory()) {
                    const result = await this.findFileRecursively(fullPath, filePattern);
                    if (result) return result;
                } else if (item.isFile()) {
                    if (typeof filePattern === 'string') {
                        if (item.name === filePattern) {
                            return fullPath;
                        }
                    } else if (filePattern instanceof RegExp) {
                        if (filePattern.test(item.name)) {
                            return fullPath;
                        }
                    }
                }
            }
            
            return null;
        } catch (error) {
            console.error(`Error searching in directory ${dir}:`, error);
            return null;
        }
    };

     /**
     * Recursively search for Java package directory
     */
    async findJavaPackageRecursively(dir, maxDepth = 10, currentDepth = 0) {
        if (currentDepth > maxDepth) {
            return null;
        }
        
        try {
            const items = await fs.promises.readdir(dir, { withFileTypes: true });
            
            // Check if current directory has api, auth, or model subdirectories
            const subdirs = items.filter(item => item.isDirectory()).map(item => item.name);
            const hasApiDir = subdirs.includes('api');
            const hasModelDir = subdirs.includes('model');
            
            // If we found at least one of the expected directories, this is likely the package root
            if (hasApiDir && hasModelDir) {
                return dir;
            }
            
            // Continue searching in subdirectories
            for (const item of items) {
                if (item.isDirectory() && item.name !== 'api' && item.name !== 'auth' && item.name !== 'model') {
                    const fullPath = path.join(dir, item.name);
                    const result = await this.findJavaPackageRecursively(fullPath, maxDepth, currentDepth + 1);
                    if (result) {
                        return result;
                    }
                }
            }
            
            return null;
        } catch (error) {
            console.error(`Error searching directory ${dir}:`, error);
            return null;
        }
    };

    /**
     * Create a comprehensive README file for the generated SDK and application
     * @param {string} sdkPath - SDK directory path
     * @param {Object} sdkConfiguration - SDK configuration
     * @param {string} language - Programming language
     */
    async createProjectReadme(sdkPath, sdkConfiguration, language) {
        try {
            const sdkName = sdkConfiguration?.name || 'generated-sdk';
            
            let readmeContent = `# ${sdkName}

            Generated SDK with Application Code

            ## Overview
            This package contains:
            1. **SDK Library**: Generated from your selected API specifications
            2. **Application Code**: Sample application demonstrating API usage
            3. **Documentation**: This README and any additional documentation

            ## Configuration
            - **Language**: ${language}
            - **SDK Name**: ${sdkName}
            - **Generated**: ${new Date().toISOString()}

            `;

                    if (language === 'java') {
                        readmeContent += `## Java Project Structure

            The generated Java SDK follows standard Maven/Gradle project structure:

            \`\`\`
            src/
            ├── main/
            │   ├── AndroidManifest.xml (for Android projects)
            │   └── java/
            │       └── org/openapitools/client/
            │           ├── Application.java          # ← Your generated application
            │           ├── ApiClient.java           # Main API client
            │           ├── Configuration.java       # SDK configuration
            │           ├── api/                     # API endpoints
            │           ├── auth/                    # Authentication classes
            │           └── model/                   # Data models
            ├── build.gradle (or pom.xml)
            └── README.md
            \`\`\`

            ## Quick Start (Java)

            ### 1. Build the Project
            \`\`\`bash
            # For Gradle projects
            ./gradlew build

            # For Maven projects
            mvn clean compile
            \`\`\`

            ### 2. Run the Application
            \`\`\`bash
            # Compile and run Application.java
            javac -cp "lib/*:src/main/java" src/main/java/org/openapitools/client/Application.java
            java -cp "lib/*:src/main/java" org.openapitools.client.Application

            # Or use your build tool
            ./gradlew run
            # or
            mvn exec:java -Dexec.mainClass="org.openapitools.client.Application"
            \`\`\`

            ### 3. Integration
            To use this SDK in your own project:

            1. **Add the SDK as a dependency** in your \`build.gradle\` or \`pom.xml\`
            2. **Import the necessary classes**:
            \`\`\`java
            import org.openapitools.client.ApiClient;
            import org.openapitools.client.Configuration;
            import org.openapitools.client.api.*;
            import org.openapitools.client.model.*;
            \`\`\`
            3. **Initialize the API client**:
            \`\`\`java
            ApiClient client = Configuration.getDefaultApiClient();
            client.setBasePath("https://your-api-server.com");
            \`\`\`

            ## Application.java
            The generated \`Application.java\` file contains:
            - Complete working examples of API calls
            - Error handling patterns
            - Authentication setup (if required)
            - Sample data processing

            `;
                    } else {
                        readmeContent += `## ${language.charAt(0).toUpperCase() + language.slice(1)} Project

            Please refer to the application code in the application-code directory.

            `;
                    }

                    readmeContent += `## API Documentation
            - Check the docs/ directory for detailed API documentation
            - Each API endpoint is documented with request/response examples
            - Model classes are documented with field descriptions

            ## Authentication
            If your APIs require authentication, update the configuration in Application.${this.getFileExtension(language)}:
            - API Keys: Set in the ApiClient configuration
            - OAuth2: Configure the OAuth2 flow
            - Basic Auth: Set username/password in the client

            ## Troubleshooting

            ### Common Issues
            1. **Compilation Errors**: Ensure all dependencies are installed
            2. **Runtime Errors**: Check API endpoint URLs and authentication
            3. **Network Issues**: Verify server connectivity and firewall settings

            ### Getting Help
            - Check the generated documentation in docs/ folder
            - Review the API specification used for generation
            - Examine the sample code in Application.${this.getFileExtension(language)}

            ## License
            This generated code is provided as-is for demonstration purposes.
            Check your API provider's terms of service for usage guidelines.
            `;

            const readmePath = path.join(sdkPath, 'README.md');
            await fs.promises.writeFile(readmePath, readmeContent, 'utf8');
            console.log(`Comprehensive README created: ${readmePath}`);
            
        } catch (error) {
            console.error('Error creating project README:', error);
        }
    }

    /**
     * Create ZIP archive of the generated SDK
     * @param {string} sourceDir - Source directory to zip
     * @param {string} outputPath - Output ZIP file path
     * @returns {Promise} - Promise that resolves when ZIP is created
     */
    async createZipArchive(sourceDir, outputPath) {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(outputPath);
            const archive = archiver('zip', { zlib: { level: 9 } });
            
            output.on('close', () => {
                console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
                resolve();
            });

            archive.on('error', (err) => {
                reject(err);
            });

            archive.pipe(output);
            archive.directory(sourceDir, false);
            archive.finalize();
        });
    }
}

const JOB_STATUS = {
    PENDING: 'PENDING',
    MERGING: 'MERGING',
    SDK_GENERATION: 'SDK_GENERATION',
    APP_CODE_GENERATION: 'APP_CODE_GENERATION',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED'
}

const sdkJobService = new SDKJobService();

module.exports = sdkJobService;
module.exports.SDKJobService = SDKJobService;
module.exports.JOB_STATUS = JOB_STATUS;