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

const winston = require('winston');
const path = require('path');

// Define log levels
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define log colors
const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

// Tell winston that you want to link the colors 
winston.addColors(logColors);

// Custom format for console output
const consoleFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.errors({ stack: true }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => {
        const location = info.location ? ` [${info.location}]` : '';
        return `${info.timestamp} ${info.level}:${location} ${info.message}`;
    }),
);

// Custom format for file output
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
);

// Define which transports the logger must use to print out messages
const transports = [
    // Allow the use of the console to print the messages
    new winston.transports.Console({
        format: consoleFormat
    }),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        filename: path.join(process.cwd(), 'logs', 'error.log'),
        level: 'error',
        format: fileFormat
    }),
    // Allow to print all the messages inside the all.log file
    new winston.transports.File({
        filename: path.join(process.cwd(), 'logs', 'combined.log'),
        format: fileFormat
    }),
];

// Create the logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    levels: logLevels,
    transports,
    // Do not exit on handled exceptions
    exitOnError: false,
});

// Create the logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Helper function to get caller information
function getCallerInfo() {
    const stack = new Error().stack;
    const stackLines = stack.split('\n');
    
    // Find the first line that's not this file and not a Node.js internal
    for (let i = 3; i < stackLines.length; i++) {
        const line = stackLines[i];
        if (line.includes('logger.js') || line.includes('node_modules') || line.includes('internal/')) {
            continue;
        }
        
        // Extract file path and line number
        const match = line.match(/\s+at\s+.*?\s+\((.+):(\d+):(\d+)\)/) || line.match(/\s+at\s+(.+):(\d+):(\d+)/);
        if (match) {
            const fullPath = match[1];
            const lineNumber = match[2];
            const fileName = path.basename(fullPath);
            return `${fileName}:${lineNumber}`;
        }
    }
    return null;
}

// Create enhanced logger with location info
const enhancedLogger = {
    error: (message, meta = {}) => {
        const location = getCallerInfo();
        logger.error(message, { ...meta, location });
    },
    warn: (message, meta = {}) => {
        const location = getCallerInfo();
        logger.warn(message, { ...meta, location });
    },
    info: (message, meta = {}) => {
        const location = getCallerInfo();
        logger.info(message, { ...meta, location });
    },
    http: (message, meta = {}) => {
        const location = getCallerInfo();
        logger.http(message, { ...meta, location });
    },
    debug: (message, meta = {}) => {
        const location = getCallerInfo();
        logger.debug(message, { ...meta, location });
    },
    // Also expose the original logger methods for compatibility
    log: (level, message, meta = {}) => {
        const location = getCallerInfo();
        logger.log(level, message, { ...meta, location });
    }
};

module.exports = enhancedLogger;
