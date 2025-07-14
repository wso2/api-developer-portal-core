const EventEmitter = require('events');
const SdkJob = require('../dao/sdkJob');

class SDKJobService extends EventEmitter {
    constructor() {
        super();
        this.activeJobs = new Map();
    }

    async createJob(orgId, applicationId) {
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
        
        return job;
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
                    message: `Job failed: ${errorMessage}`,
                    error: errorMessage
                });
            }
            
            return updatedJob;
        } catch (error) {
            console.error('Error marking job as failed:', error);
            throw error;
        }
    }

    async startMergingStep(jobId) {
        return await this.updateJobStatus(
            jobId, 
            'MERGING', 
            20, 
            'Merging API Specifications',
            'Merging multiple API specifications using AI'
        );
    }

    async startSDKGenerationStep(jobId) {
        return await this.updateJobStatus(
            jobId, 
            'SDK_GENERATION', 
            50, 
            'Generating SDK',
            'Generating SDK from merged specifications'
        );
    }

    async startAppCodeGenerationStep(jobId) {
        return await this.updateJobStatus(
            jobId, 
            'APP_CODE_GENERATION', 
            80, 
            'Generating Application Code',
            'Generating application code using AI'
        );
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
}

// Create singleton instance
const sdkJobService = new SDKJobService();

module.exports = sdkJobService;