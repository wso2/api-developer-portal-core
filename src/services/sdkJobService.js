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
            jobStatus: 'PENDING'
        };
        const job = await SdkJob.createJob(jobData);
        this.activeJobs.set(jobId, job);
        return job;
    }

    async updateJob(jobId, jobStatus, errorMessage = null) {
        const updatedJob = await SdkJob.updateJob(jobId, {
            jobStatus,
            errorMessage
        });
        this.activeJobs.set(jobId, updatedJob);
        return updatedJob;
    }

    async getJob(jobId) {
        if (this.activeJobs.has(jobId)) {
            return this.activeJobs.get(jobId);
        }
        const job = await SdkJob.getJobById(jobId);
        if (job) {
            this.activeJobs.set(jobId, job);
            return job;
        } else {
            return null;
        }
    }

    generateJobId(orgId, applicationId) {
        return `${orgId}-${applicationId}`;
    }

    async completeJob(jobId) {
        const job = await this.getJob(jobId);
        if (job) {
            job.jobStatus = 'COMPLETED';
            await this.updateJob(jobId, 'COMPLETED');
            this.emit('progress', {
                jobId,
                status: 'completed',
                progress: 100,
                currentStep: 'Completed',
                message: 'SDK generation completed successfully',
                resultData
            });
            setTimeout(() => {
                this.activeJobs.delete(jobId);
            }, 30 * 60 * 1000); // Keep for 30 minutes
        } else {
            throw new Error(`Job with ID ${jobId} not found`);
        }
    }
}