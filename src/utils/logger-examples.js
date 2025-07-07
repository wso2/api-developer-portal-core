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

/**
 * Example usage of Winston logger in the Developer Portal application
 * 
 * This file demonstrates how to use the Winston logger throughout your application.
 * Import the logger in any file and use the appropriate log levels.
 */

const logger = require('./utils/logger');

// Example 1: Basic logging in a controller function
function exampleControllerFunction(req, res) {
    // This will show: [logger-examples.js:XX] in the logs
    logger.info('Processing request for example endpoint', {
        userId: req.user?.id,
        endpoint: req.originalUrl
    });

    try {
        // Your business logic here
        const result = performSomeOperation();
        
        // File location automatically captured
        logger.debug('Operation completed successfully', { result });
        
        res.json({ success: true, data: result });
        
    } catch (error) {
        // Error location will be shown as [logger-examples.js:XX]
        logger.error('Error in example controller:', {
            error: error.message,
            stack: error.stack,
            userId: req.user?.id
        });
        
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
}

// Example 2: Database operation logging
async function exampleDatabaseOperation(userId) {
    logger.info('Starting database operation', { userId });
    
    try {
        // Simulate database call
        const user = await findUserById(userId);
        
        if (!user) {
            logger.warn('User not found in database', { userId });
            return null;
        }
        
        logger.info('User retrieved successfully', { 
            userId, 
            userEmail: user.email 
        });
        
        return user;
        
    } catch (error) {
        logger.error('Database operation failed:', {
            error: error.message,
            userId,
            operation: 'findUserById'
        });
        throw error;
    }
}

// Example 3: API call logging
async function exampleApiCall(endpoint, data) {
    logger.http('Making external API call', { 
        endpoint, 
        method: 'POST' 
    });
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        logger.http('API call completed', { 
            endpoint,
            statusCode: response.status,
            success: response.ok
        });
        
        if (!response.ok) {
            logger.warn('API call returned non-2xx status', {
                endpoint,
                statusCode: response.status,
                statusText: response.statusText
            });
        }
        
        return await response.json();
        
    } catch (error) {
        logger.error('API call failed:', {
            endpoint,
            error: error.message
        });
        throw error;
    }
}

// Example 4: Authentication logging
function exampleAuthenticationHandler(req, res, next) {
    const { username } = req.body;
    
    logger.info('Authentication attempt', { 
        username,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    
    // Your authentication logic here
    const isAuthenticated = authenticateUser(username, req.body.password);
    
    if (isAuthenticated) {
        logger.info('Authentication successful', { username });
        next();
    } else {
        logger.warn('Authentication failed', { 
            username,
            ip: req.ip,
            reason: 'Invalid credentials'
        });
        res.status(401).json({ message: 'Authentication failed' });
    }
}

// Example 5: Business logic with detailed logging
function processApiSubscription(apiId, userId, planId) {
    logger.info('Processing API subscription', { 
        apiId, 
        userId, 
        planId 
    });
    
    try {
        // Validate inputs
        if (!apiId || !userId || !planId) {
            logger.warn('Invalid subscription parameters', { 
                apiId, 
                userId, 
                planId 
            });
            throw new Error('Missing required parameters');
        }
        
        // Check if subscription already exists
        const existingSubscription = checkExistingSubscription(apiId, userId);
        if (existingSubscription) {
            logger.info('Subscription already exists', { 
                apiId, 
                userId,
                existingPlanId: existingSubscription.planId
            });
            return existingSubscription;
        }
        
        // Create new subscription
        const subscription = createSubscription(apiId, userId, planId);
        
        logger.info('API subscription created successfully', { 
            subscriptionId: subscription.id,
            apiId,
            userId,
            planId
        });
        
        return subscription;
        
    } catch (error) {
        logger.error('Failed to process API subscription:', {
            error: error.message,
            apiId,
            userId,
            planId
        });
        throw error;
    }
}

// Dummy functions for examples (replace with your actual implementations)
function performSomeOperation() { return { id: 1, name: 'test' }; }
function findUserById(id) { return Promise.resolve({ id, email: 'test@example.com' }); }
function authenticateUser(username, password) { return username === 'admin'; }
function checkExistingSubscription(apiId, userId) { return null; }
function createSubscription(apiId, userId, planId) { return { id: 'sub-123', apiId, userId, planId }; }

module.exports = {
    exampleControllerFunction,
    exampleDatabaseOperation,
    exampleApiCall,
    exampleAuthenticationHandler,
    processApiSubscription
};
