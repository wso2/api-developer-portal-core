const SDKJob = require('../models/sdkJob');

const createJob = async (jobData) => {
    try {
        const job = await SDKJob.create({
            JOB_ID: jobData.jobId,
            ORG_ID: jobData.orgId,
            APP_ID: jobData.applicationId,
            JOB_STATUS: jobData.jobStatus || 'PENDING',
            PROGRESS: jobData.progress || 0,
            CURRENT_STEP: jobData.currentStep || 'Initializing',
            ERROR_MESSAGE: jobData.errorMessage || null
        });
        return job.toJSON();
    } catch (error) {
        console.error('Error creating SDK job:', error);
        throw new Error('Error creating job: ' + error.message);
    }
}

const updateJob = async (jobId, updateData) => {
    try {
        const [affectedRows] = await SDKJob.update({
            JOB_STATUS: updateData.jobStatus,
            PROGRESS: updateData.progress,
            CURRENT_STEP: updateData.currentStep,
            ERROR_MESSAGE: updateData.errorMessage || null
        }, {
            where: { JOB_ID: jobId }
        });
        
        if (affectedRows === 0) {
            throw new Error('Job not found or no changes made');
        }
        
        // Fetch and return the updated job
        const updatedJob = await SDKJob.findByPk(jobId);
        return updatedJob ? updatedJob.toJSON() : null;
    } catch (error) {
        console.error('Error updating SDK job:', error);
        throw new Error('Error updating job: ' + error.message);
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

module.exports = {
    createJob,
    updateJob,
    getJobById
};
