class CustomError extends Error {
    constructor(statusCode, message, description) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomError';
        this.code = statusCode;
        this.message = message; 
        this.description = description; 
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace
    }
}

module.exports = {
    CustomError
};