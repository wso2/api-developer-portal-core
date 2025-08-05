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
 *
 * Redis-based progress broadcaster for multi-pod deployments
 * Handles SSE progress events across multiple pod instances
 */

const Redis = require('ioredis');
const EventEmitter = require('events');
const config = require(process.cwd() + '/config');

class ProgressBroadcaster extends EventEmitter {
    constructor() {
        super();
        this.publisher = null;
        this.subscriber = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.podId = process.env.POD_NAME || `pod-${Math.random().toString(36).substr(2, 9)}`;
        
        this.init();
    }

    async init() {
        try {
            const redisConfig = {
                host: config.redis?.host || process.env.REDIS_HOST || 'localhost',
                port: config.redis?.port || process.env.REDIS_PORT || 6379,
                password: config.redis?.password || process.env.REDIS_PASSWORD,
                db: config.redis?.db || process.env.REDIS_DB || 0,
                retryDelayOnFailover: 100,
                maxRetriesPerRequest: 3,
                lazyConnect: true,
                connectTimeout: 10000,
                commandTimeout: 5000
            };

            this.publisher = new Redis(redisConfig);
            this.subscriber = new Redis(redisConfig);

            this.setupEventHandlers();

            await this.connect();

            console.log(`ProgressBroadcaster initialized for pod: ${this.podId}`);
            
        } catch (error) {
            console.error('❌ Failed to initialize ProgressBroadcaster:', error);
            this.scheduleReconnect();
        }
    }

    setupEventHandlers() {

        this.publisher.on('connect', () => {
            console.log(`Publisher connected to Redis from pod: ${this.podId}`);
        });

        this.publisher.on('error', (error) => {
            console.error('Redis publisher error:', error);
            this.isConnected = false;
        });

        this.subscriber.on('connect', () => {
            console.log(`Subscriber connected to Redis from pod: ${this.podId}`);
        });

        this.subscriber.on('error', (error) => {
            console.error('Redis subscriber error:', error);
            this.isConnected = false;
        });

        this.subscriber.on('message', (channel, message) => {
            try {
                if (channel === 'sdk-progress') {
                    const progressData = JSON.parse(message);

                    this.emit('progress', progressData);

                    console.log(`Received progress for job ${progressData.jobId} on pod ${this.podId}: ${progressData.currentStep} (${progressData.progress}%)`);
                }
            } catch (error) {
                console.error('Error processing Redis message:', error);
            }
        });

        this.publisher.on('close', () => {
            console.warn(`Redis publisher connection closed on pod: ${this.podId}`);
            this.scheduleReconnect();
        });

        this.subscriber.on('close', () => {
            console.warn(`Redis subscriber connection closed on pod: ${this.podId}`);
            this.scheduleReconnect();
        });
    }

    async connect() {
        try {
            await Promise.all([
                this.publisher.connect(),
                this.subscriber.connect()
            ]);

            // Subscribe to progress events
            await this.subscriber.subscribe('sdk-progress');
            
            this.isConnected = true;
            this.reconnectAttempts = 0;
            
            console.log(`ProgressBroadcaster fully connected on pod: ${this.podId}`);
            
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    async publishProgress(jobId, progressData) {
        if (!this.isConnected || !this.publisher) {
            console.warn(`Cannot publish progress - Redis not connected on pod: ${this.podId}`);
            return false;
        }

        try {
            const message = JSON.stringify({
                ...progressData,
                jobId,
                timestamp: Date.now(),
                podId: this.podId
            });

            await this.publisher.publish('sdk-progress', message);
            
            console.log(`Published progress for job ${jobId} from pod ${this.podId}: ${progressData.currentStep} (${progressData.progress}%)`);
            return true;
            
        } catch (error) {
            console.error('Failed to publish progress:', error);
            return false;
        }
    }

    scheduleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error(`Max reconnection attempts reached for pod: ${this.podId}`);
            return;
        }

        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff, max 30s
        this.reconnectAttempts++;

        console.log(`Scheduling reconnect attempt ${this.reconnectAttempts} in ${delay}ms for pod: ${this.podId}`);

        setTimeout(async () => {
            try {
                await this.connect();
            } catch (error) {
                console.error('Reconnection failed:', error);
                this.scheduleReconnect();
            }
        }, delay);
    }

    async disconnect() {
        try {
            if (this.subscriber) {
                await this.subscriber.unsubscribe('sdk-progress');
                await this.subscriber.disconnect();
            }
            
            if (this.publisher) {
                await this.publisher.disconnect();
            }
            
            this.isConnected = false;
            console.log(`ProgressBroadcaster disconnected for pod: ${this.podId}`);
            
        } catch (error) {
            console.error('Error during disconnect:', error);
        }
    }

    // Fallback method for when Redis is not available
    emitLocal(jobId, progressData) {
        this.emit('progress', { ...progressData, jobId });
    }

}

// Create singleton instance
const progressBroadcaster = new ProgressBroadcaster();

process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, closing Redis connections...');
    await progressBroadcaster.disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received, closing Redis connections...');
    await progressBroadcaster.disconnect();
    process.exit(0);
});

module.exports = progressBroadcaster;
module.exports.ProgressBroadcaster = ProgressBroadcaster;
