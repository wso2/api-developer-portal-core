const { join } = require('path');
const SDKJob = require('../models/sdkJob');
const SdkJob = require('../models/sdkJob');

const createJob = async (jobData) => {
    try {
        const job = await SdkJob.create({
            JOB_ID: jobData.jobId,
            ORG_ID: jobData.orgId,
            APPLICATION_ID: jobData.applicationId,
            JOB_STATUS: jobData.jobStatus || 'PENDING',
            ERROR_MESSAGE: jobData.errorMessage || null
        });
        return job.toJSON();
    } catch (error) {
        console.error('Error creating SDK job:', error);
        throw new Error('Error creating job: ' + error);
    }
}

const updateJob = async (jobId, updateData) => {
    try {
        const [updatedJob] = await SdkJob.update({
            JOB_STATUS: updateData.jobStatus,
            ERROR_MESSAGE: updateData.errorMessage || null
        }, {
            where: { JOB_ID: jobId },
            returning: true
        });
        if (updatedJob[0] === 0) {
            throw new Error('Job not found or no changes made');
        }
        return updatedJob[1];
    } catch (error) {
        console.error('Error updating SDK job:', error);
        throw new Error('Error updating job: ' + error);
    }
}

const getJobById = async (jobId) => {
    try {
        const job = await SDKJob.findByPk(jobId);
        return job ? job.toJSON() : null;
    } catch (error) {
        console.error('Error fetching SDK job:', error);
        throw new Error('Error fetching job: ' + error);
    }
}
