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
const path = require('path');
const fs = require('fs');
const os = require('os');
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
class SDKJobService extends EventEmitter {
    constructor() {
        super();
        this.activeJobs = new Map();
    }

    async createJob(orgId, applicationId, jobPayload = {}) {
        const jobId = this.generateJobId(orgId, applicationId);

        const jobData = {
            jobId,
            orgId,
            applicationId,
            jobStatus: 'PENDING',
            progress: 0,
            currentStep: 'Initializing'
        };
        
        const job = await SdkJob.createJob(jobData);
        this.activeJobs.set(jobId, job);
        
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
            // Make sure the job is marked as failed in the database and frontend is notified
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

        const steps = [
            {
                name: 'Merging API Specifications',
                weight: 30,
                title: 'MERGING',
                task: async (reportProgress) => {
                    const result = await this.performMergingTask(jobPayload, reportProgress);
                    mergedSpec = result.mergedSpec;
                    apiSpecs = result.apiSpecs;
                    apiHandles = result.apiHandles;
                    console.log('Merging step completed');
                }
            },
            {
                name: 'Generating SDK',
                weight: 20, 
                title: 'SDK_GENERATION',
                task: async (reportProgress) => {
                    sdkResult = await this.performSdkGenerationTask(jobPayload, mergedSpec, reportProgress);
                    console.log('SDK generation step completed');
                }
            },
            {
                name: 'Generating Application Code',
                weight: 50,
                title: 'APP_CODE_GENERATION',
                task: async (reportProgress) => {
                    const result = await this.performAppCodeGenerationTask(jobPayload, sdkResult, mergedSpec, apiHandles, reportProgress);
                    finalZipPath = result.finalZipPath;
                    baseSdkName = result.baseSdkName;
                    console.log('Application code generation step completed');
                }
            }
        ];

        try {

            let completeWeight = 0;
            for (const step of steps) {
                console.log(`Starting step: ${step.name}`);

                const progressCallback = (stepProgress) => {
                    const overallProgress = completeWeight + (stepProgress * (step.weight / 100));
                    this.updateJobStatus(
                        jobId,
                        step.title,
                        Math.min(99, Math.round(overallProgress)),
                        step.name,
                        `In progress: ${step.name}...`
                    );
                }

                await step.task(progressCallback);
                completeWeight += step.weight;
                
                console.log(`Step ${step.name} completed. Total progress: ${completeWeight}%`);
            }
            
            const { selectedAPIs, sdkConfiguration, orgName, applicationId } = jobPayload;
            const finalBaseSdkName = baseSdkName || sdkConfiguration?.name || `${orgName}-${applicationId}-sdk`;
            
            const resultData = {
                selectedAPIs: selectedAPIs,
                apiSpecsFound: apiSpecs?.length || 0,
                transformedApiHandles: apiHandles || [],
                sdkConfiguration: {
                    language: sdkConfiguration?.language || 'java',
                    name: finalBaseSdkName,
                    version: '1.0.0',
                    packageName: finalBaseSdkName,
                    mode: 'ai',
                    description: sdkConfiguration.description
                },
                finalDownloadUrl: `/download/sdk/${path.basename(finalZipPath || `${jobId}.zip`)}`,
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

    async performMergingTask(jobPayload, reportProgress) {
        try {
            reportProgress(10); // 10% of 30% = 3% overall
            
            const { selectedAPIs, orgId } = jobPayload;
                        // Get API specifications and handles
            const apiSpecs = await apiMetadata.getAPISpecs(orgId, selectedAPIs);
            
            if (apiSpecs.length === 0) {
                throw new Error('No API specifications found for the selected APIs');
            }

            const apiHandles = await this.getApiHandlers(orgId, selectedAPIs);
            
            let mergedSpec;
            if (selectedAPIs.length === 1) {
                mergedSpec = JSON.parse(apiSpecs[0].apiSpec);
            } else {
                const mergeSpecApiRequest = this.prepareSDKGenerationRequest(apiSpecs, apiHandles);
                reportProgress(80); // 80% of 30% = 24% overall
                mergedSpec = await this.invokeMergeSpecApi(mergeSpecApiRequest);
                console.log('Merged API specifications received');
            }


            return { mergedSpec, apiSpecs, apiHandles };
        } catch (error) {
            console.error('Error during merging step:', error);
            let userMessage = 'Failed to merge API specifications';
            
            if (error.message.includes('No API specifications found')) {
                userMessage = 'No API specifications were found for the selected APIs. Please check your API selection.';
            } else if (error.message.includes('fetch')) {
                userMessage = 'Unable to connect to the AI service for merging specifications. Please try again later.';
            } else if (error.message.includes('HTTP error')) {
                userMessage = 'AI service returned an error while merging specifications. Please check your API specifications.';
            }
            
            throw new Error(userMessage);
        }
    }

    async performSdkGenerationTask(jobPayload, mergedSpec, reportProgress) {
        try {            
            const { sdkConfiguration, orgName, applicationId } = jobPayload;
            
            reportProgress(50); // 50% of 20% = 10% overall (40% total)
            const sdkResult = await this.generateSDKWithOpenAPIGenerator(
                mergedSpec,
                sdkConfiguration,
                orgName,
                applicationId
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

    async performAppCodeGenerationTask(jobPayload, sdkResult, mergedSpec, apiHandles, reportProgress) {
        try {

            reportProgress(40); // 40% of 50% = 20% overall (70% total)
            const result = await this.processAIModeSDK(sdkResult, mergedSpec, jobPayload.sdkConfiguration, apiHandles, jobPayload.sdkConfiguration?.name);
            
            reportProgress(100); // 100% of 50% = 50% overall (100% total)
            return {
                finalZipPath: result,
                baseSdkName: jobPayload.sdkConfiguration?.name
            };
        } catch (error) {
            console.error('Error during application code generation step:', error);
            let userMessage = 'Failed to generate application code';
            
            if (error.message.includes('AI service')) {
                userMessage = 'Unable to connect to AI service for application code generation. Please try again later.';
            } else if (error.message.includes('Failed to generate application')) {
                userMessage = 'AI service failed to generate application code. Please try with a different description.';
            } else if (error.message.includes('ZIP')) {
                userMessage = 'Failed to create final package. Please try again.';
            } else if (error.message.includes('file')) {
                userMessage = 'File processing error during application generation. Please try again.';
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
            if (updatedJob) {
                this.activeJobs.set(jobId, updatedJob);
                
                // Emit progress event
                this.emitProgress(jobId, {
                    status: status.toLowerCase(),
                    progress: progress,
                    currentStep: currentStep,
                    message: message || this.getDefaultMessage(status),
                    resultData: resultData
                });
            }
            
            return updatedJob;
        } catch (error) {
            console.error('Error updating job status:', error);
            await this.markJobAsFailed(jobId, error.message);
            throw error;
        }
    }

    async markJobAsFailed(jobId, errorMessage) {
        try {
            console.log(`Marking job ${jobId} as failed with message: ${errorMessage}`);
            
            const updateData = {
                jobStatus: 'FAILED',
                progress: 0,
                currentStep: 'Failed',
                errorMessage: errorMessage
            };

            const updatedJob = await SdkJob.updateJob(jobId, updateData);
            if (updatedJob) {
                this.activeJobs.set(jobId, updatedJob);
                
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
        this.activeJobs.delete(jobId); // Remove from active jobs
        return await this.updateJobStatus(
            jobId, 
            'COMPLETED', 
            100, 
            'Completed',
            'SDK generation completed successfully',
            resultData
        );
    }

    async getJob(jobId) {
        if (this.activeJobs.has(jobId)) {
            return this.activeJobs.get(jobId);
        }
        
        const job = await SdkJob.getJobById(jobId);
        if (job) {
            this.activeJobs.set(jobId, job);
            return job;
        }
        
        return null;
    }

    generateJobId(orgId, applicationId) {
        const randomPostfix = Math.floor(10000 + Math.random() * 90000); // 5 digit random number
        return `${orgId}-${applicationId}-${randomPostfix}`;
    }

    emitProgress(jobId, progressData) {
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

    // Helper methods
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

    async invokeMergeSpecApi(requestPayload) {
        const aiSDKServiceUrl = config.aiSDKService?.url || 'http://localhost:5001';
        const aiSDKServiceEndpoints = config.aiSDKService?.endpoints || {
            mergeSpecs: '/merge-openapi-specs',
            generateApp: '/generate-application-code'
        };

        try {
            const response = await fetch(`${aiSDKServiceUrl}${aiSDKServiceEndpoints.mergeSpecs}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestPayload)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error invoking merge spec API:", error);
            throw error;
        }
    }

    async generateSDKWithOpenAPIGenerator(mergedSpec, sdkConfiguration, orgName, applicationId) {
        
        let tempDir = null;
        let outputDir = null;
        
        try {
            console.log('Starting SDK generation with OpenAPI Generator...');
            const language = sdkConfiguration?.language || 'javascript';
            const sdkName = sdkConfiguration?.name || `${orgName}-${applicationId}-sdk`;
            
            // Create temporary directory for SDK generation
            tempDir = path.join(os.tmpdir(), 'sdk-generation', `${sdkName}-${Date.now()}`);
            const specFilePath = path.join(tempDir, 'merged-spec.json');
            outputDir = path.join(process.cwd(), 'generated-sdks', `${sdkName}-${Date.now()}`);
            
            // Create directories
            await fs.promises.mkdir(tempDir, { recursive: true });
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
                'openapi-generator-cli',
                'generate',
                '-i', specFilePath,
                '-g', generator,
                '-o', outputDir,
                '--package-name', sdkName,
                '--additional-properties',
                `packageName=${sdkName},projectName=${sdkName},packageVersion=1.0.0`
            ].join(' ');
            
            console.log(`Generating SDK with command: ${command}`);
            
            // Execute openapi-generator
            const { stdout, stderr } = await execAsync(command, { 
                cwd: tempDir,
                timeout: 120000
            });
            
            if (stderr && !stderr.includes('WARN')) {
                console.warn('SDK generation warnings/errors:', stderr);
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
                if (tempDir) await fs.promises.rm(tempDir, { recursive: true, force: true });
                if (outputDir) await fs.promises.rm(outputDir, { recursive: true, force: true });
            } catch (cleanupError) {
                console.error('Error cleaning up directories:', cleanupError);
            }
            
            throw new Error(errorMessage);
        }
    }

    async processAIModeSDK(sdkResult, mergedSpec, sdkConfiguration, apiHandles, baseSdkName) {        
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

            const finalZipName = this.createSDKFileName(apiHandles, baseSdkName, true);
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
            } else if (language === 'python') {
                // Look for API class in Python SDKs
                const pythonApiPath = await this.findFileRecursively(sdkDir, /.*_api\.py$|.*api\.py$/);
                if (pythonApiPath) {
                    apiClassFile = pythonApiPath;
                    apiClassContent = await fs.promises.readFile(pythonApiPath, 'utf8');
                    console.log(`Found Python API class: ${pythonApiPath}`);
                }
            }
            
            if (!apiClassContent) {
                console.warn(`No API class file found for language: ${language}`);
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
     */
    async getApplicationGenApiReqBody(apiClassContent, language, mergedSpec, sdkConfiguration) {
        let useCase;
        
        if (sdkConfiguration?.mode === 'ai' && sdkConfiguration?.description && sdkConfiguration.description.trim()) {
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
    };

    async invokeApplicationCodeGenApi(requestData) {
        try {
            const response = await fetch(`${aiSDKServiceUrl}${aiSDKServiceEndpoints.generateApp}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            if (!response.ok) {
                throw new Error(`Failed to generate application: ${response.statusText}`);
            }
            const data = await response.text();
            return data;
        } catch (error) {
            console.error("Error invoking application generation API:", error);
            throw error;
        }
    };

     /**
     * Create SDK filename based on API handles and mode
     */
    createSDKFileName(apiHandles, baseSdkName, isAIMode) {
        const apiHandlesSuffix = apiHandles.map(handle => 
            handle.replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
        ).join('-');
        
        const suffix = isAIMode ? '-with-app' : '';
        return `${baseSdkName}-${apiHandlesSuffix}${suffix}.zip`;
    };

    /**
     * Process application code response and create final ZIP with SDK + application code
     */
    async processApplicationCodeAndCreateFinalZip(applicationCode, sdkPath, sdkConfiguration, zipFileName) {
        try {
            console.log('Processing application code response and creating final ZIP...');
            const language = sdkConfiguration?.language || 'java';
            
            // Create application code files in the SDK folder
            if (applicationCode) {
                const fileExtension = this.getFileExtension(language);
                
                if (language === 'java' || language === 'javascript') {
                    // For Java projects, place Application.java in the correct package structure
                    console.log('Searching for Java package directory structure...');
                    const javaPackageDir = await this.findJavaPackageDirectory(sdkPath);
                    
                    if (javaPackageDir) {
                        // Place Application.java at the same level as api, auth, model packages
                        const mainAppFile = path.join(javaPackageDir, `Application.${fileExtension}`);
                        await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                        console.log(`Java Application code written to: ${mainAppFile}`);
                        
                        // Also log the relative path for clarity
                        const relativePath = path.relative(sdkPath, mainAppFile);
                        console.log(`Relative path: ${relativePath}`);
                    } else {
                        // Fallback: create in application-code directory
                        console.warn('Could not find Java package directory, using fallback location');
                        const appCodeDir = path.join(sdkPath, 'application-code');
                        await fs.promises.mkdir(appCodeDir, { recursive: true });
                        const mainAppFile = path.join(appCodeDir, `Application.${fileExtension}`);
                        await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                        console.log(`Application code written to fallback location: ${mainAppFile}`);
                    }
                } else {
                    // For non-Java languages, use the application-code directory
                    const appCodeDir = path.join(sdkPath, 'application-code');
                    await fs.promises.mkdir(appCodeDir, { recursive: true });
                    const mainAppFile = path.join(appCodeDir, `Application.${fileExtension}`);
                    await fs.promises.writeFile(mainAppFile, applicationCode, 'utf8');
                    console.log(`Application code written to: ${mainAppFile}`);
                }
            }
            
            await this.createProjectReadme(sdkPath, sdkConfiguration, language);
            
            // Create final ZIP with SDK + application code
            const permanentDir = path.join(process.cwd(), 'generated-sdks');
            await fs.promises.mkdir(permanentDir, { recursive: true });
            
            const finalZipPath = path.join(permanentDir, zipFileName);
            await this.createZipArchive(sdkPath, finalZipPath);
            console.log(`Final ZIP created: ${finalZipPath}`);
            
            // Clean up SDK folder
            await fs.promises.rm(sdkPath, { recursive: true, force: true });
            console.log('Cleaned up temporary SDK folder');
            
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
    };

     /**
     * Get file extension based on programming language
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
                'src/main/java'
            ];
            
            // First, try the common OpenAPI tools structure
            for (const possiblePath of possiblePaths) {
                const fullPath = path.join(sdkDir, possiblePath);
                console.log(`Checking path: ${fullPath}`);
                
                if (await fs.promises.access(fullPath).then(() => true).catch(() => false)) {
                    console.log(`Path exists: ${fullPath}`);
                    
                    // Check if this directory contains the expected subdirectories
                    const hasApiDir = await fs.promises.access(path.join(fullPath, 'api')).then(() => true).catch(() => false);
                    const hasAuthDir = await fs.promises.access(path.join(fullPath, 'auth')).then(() => true).catch(() => false);
                    const hasModelDir = await fs.promises.access(path.join(fullPath, 'model')).then(() => true).catch(() => false);
                    
                    console.log(`Directory contents check - api: ${hasApiDir}, auth: ${hasAuthDir}, model: ${hasModelDir}`);
                    
                    if (hasApiDir || hasAuthDir || hasModelDir) {
                        console.log(`Found Java package directory: ${fullPath}`);
                        return fullPath;
                    }
                } else {
                    console.log(`Path does not exist: ${fullPath}`);
                }
            }
            
            // If common paths don't work, search recursively for a directory that contains api/auth/model subdirs
            console.log('Searching recursively for Java package structure...');
            console.log('Current SDK directory structure:');
            await this.listDirectoryStructure(sdkDir);

            const foundPath = await this.findJavaPackageRecursively(sdkDir);
            if (foundPath) {
                console.log(`Found Java package directory recursively: ${foundPath}`);
                return foundPath;
            }
            
            console.warn('Could not find Java package directory structure');
            return null;
            
        } catch (error) {
            console.error('Error finding Java package directory:', error);
            return null;
        }
    };

    /**
     * Debug function to list directory structure (helpful for troubleshooting)
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
     */
    async createProjectReadme(sdkPath, sdkConfiguration, language) {
        try {
            const sdkName = sdkConfiguration?.name || 'generated-sdk';
            const mode = sdkConfiguration?.mode || 'default';
            
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
    - **Generation Mode**: ${mode}
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
    };

    /**
     * Create ZIP archive of the generated SDK
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
    };
}

// Create singleton instance
const sdkJobService = new SDKJobService();

module.exports = sdkJobService;