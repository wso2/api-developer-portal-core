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
const path = require('path');
const fs = require('fs');

class RedisService extends EventEmitter {
    constructor() {
        super();
        this.redis = null;
        this.publisher = null;
        this.subscriber = null;
        this.isConnected = false;
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 3;
        this.reconnectTimeout = null;
        this.connectionPromise = null;
        this.podId = process.env.POD_NAME || `pod-${Math.random().toString(36).substr(2, 9)}`;
        this.maxFileSize = 50 * 1024 * 1024; // 50 MB
        this.defaultTTL = 3600;
        this.isShuttingDown = false;

        // Start connection without waiting
        this.init().catch(error => {
            console.error('❌ Initial Redis connection failed:', error.message);
        });
    }

    async init() {
        if (this.isConnecting || this.isConnected) {
            return this.connectionPromise;
        }

        this.connectionPromise = this._performConnection();
        return this.connectionPromise;
    }

    async _performConnection() {
        if (this.isShuttingDown) {
            throw new Error('Service is shutting down');
        }

        // Check if we've exceeded max attempts before even starting
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error(`❌ Max Redis connection attempts reached for pod: ${this.podId}. Operating in offline mode.`);
            this._enterOfflineMode();
            throw new Error('Max reconnection attempts exceeded');
        }

        this.isConnecting = true;

        try {
            // Clean up existing connections first
            await this._cleanupConnections();

            const redisConfig = {
                host: config.redis?.host || process.env.REDIS_HOST || 'localhost',
                port: config.redis?.port || process.env.REDIS_PORT || 6379,
                password: config.redis?.password || process.env.REDIS_PASSWORD,
                db: config.redis?.db || process.env.REDIS_DB || 0,
                retryDelayOnFailover: 1000,
                maxRetriesPerRequest: 0, // Disable internal retries to prevent timeout loops
                lazyConnect: true,
                connectTimeout: 8000,
                commandTimeout: 3000,
                keyPrefix: 'sdkfiles:',
                retryConnectOnFailure: false,
                enableOfflineQueue: false,
                tls: true
            };

            console.log(`🔄 Attempting Redis connection ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts} on pod: ${this.podId}`);

            // Create new connections
            this.redis = new Redis(redisConfig);
            this.publisher = new Redis(redisConfig);
            this.subscriber = new Redis(redisConfig);

            // Set up event handlers before connecting
            this._setupEventHandlers();

            // Connect all instances with timeout
            await Promise.race([
                Promise.all([
                    this.redis.connect(),
                    this.publisher.connect(),
                    this.subscriber.connect()
                ]),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Connection timeout')), 12000)
                )
            ]);

            // Subscribe to progress events
            await this.subscriber.subscribe('sdk-progress');
            
            this.isConnected = true;
            this.isConnecting = false;
            this.reconnectAttempts = 0;
            
            console.log(`✅ RedisService fully connected on pod: ${this.podId}`);
            
        } catch (error) {
            this.isConnecting = false;
            this.isConnected = false;
            
            console.error(`❌ Redis connection failed (attempt ${this.reconnectAttempts + 1}):`, error.message);
            
            // Clean up failed connections
            await this._cleanupConnections();
            
            // Increment attempts after failure
            this.reconnectAttempts++;
            
            // Schedule retry if within limits
            if (this.reconnectAttempts < this.maxReconnectAttempts && !this.isShuttingDown) {
                this._scheduleReconnect();
            } else {
                console.error(`❌ Max Redis connection attempts reached for pod: ${this.podId}. Operating in offline mode.`);
                this._enterOfflineMode();
            }
            
            throw error;
        }
    }

    _setupEventHandlers() {
        // Publisher events
        this.publisher.removeAllListeners(); // Prevent duplicate listeners
        this.publisher.on('connect', () => {
            console.log(`✅ Publisher connected to Redis from pod: ${this.podId}`);
        });

        this.publisher.on('error', (error) => {
            console.error(`❌ Redis publisher error on pod ${this.podId}:`, error.message);
            // Don't throw here - just log and handle gracefully
            if (this.isConnected) {
                this.isConnected = false;
            }
        });

        this.publisher.on('close', () => {
            console.warn(`🔌 Redis publisher connection closed on pod: ${this.podId}`);
            this.isConnected = false;
            if (!this.isShuttingDown) {
                this._handleConnectionLoss();
            }
        });

        // Subscriber events
        this.subscriber.removeAllListeners(); // Prevent duplicate listeners
        this.subscriber.on('connect', () => {
            console.log(`✅ Subscriber connected to Redis from pod: ${this.podId}`);
        });

        this.subscriber.on('error', (error) => {
            console.error(`❌ Redis subscriber error on pod ${this.podId}:`, error.message);
            // Don't throw here - just log and handle gracefully
            if (this.isConnected) {
                this.isConnected = false;
            }
        });

        this.subscriber.on('message', (channel, message) => {
            try {
                if (channel === 'sdk-progress') {
                    const progressData = JSON.parse(message);
                    this.emit('progress', progressData);
                    console.log(`📨 Received progress for job ${progressData.jobId} on pod ${this.podId}: ${progressData.currentStep} (${progressData.progress}%)`);
                }
            } catch (error) {
                console.error('❌ Error processing Redis message:', error.message);
            }
        });

        this.subscriber.on('close', () => {
            console.warn(`🔌 Redis subscriber connection closed on pod: ${this.podId}`);
            this.isConnected = false;
            if (!this.isShuttingDown) {
                this._handleConnectionLoss();
            }
        });

        // Main Redis events
        this.redis.removeAllListeners(); // Prevent duplicate listeners
        this.redis.on('connect', () => {
            console.log(`✅ Redis file storage connected successfully on pod: ${this.podId}`);
        });

        this.redis.on('error', (error) => {
            console.error(`❌ Redis file storage error on pod ${this.podId}:`, error.message);
            // Don't throw here - just log and handle gracefully
            if (this.isConnected) {
                this.isConnected = false;
            }
        });

        this.redis.on('close', () => {
            console.log(`🔌 Redis file storage connection closed on pod: ${this.podId}`);
            this.isConnected = false;
            if (!this.isShuttingDown) {
                this._handleConnectionLoss();
            }
        });
    }

    _handleConnectionLoss() {
        if (this.isConnecting || this.isShuttingDown) {
            return; // Already handling connection or shutting down
        }

        // Check if we've already exceeded max attempts
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.warn(`⚠️ Redis connection lost on pod: ${this.podId}, but max attempts reached. Staying in offline mode.`);
            this._enterOfflineMode();
            return;
        }

        console.warn(`⚠️ Redis connection lost on pod: ${this.podId}`);
        this.isConnected = false;
        
        // Schedule reconnection
        this._scheduleReconnect();
    }

    _scheduleReconnect() {
        if (this.isShuttingDown || this.reconnectTimeout) {
            return; // Already scheduled or shutting down
        }

        // Check limits before scheduling
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error(`❌ Max reconnection attempts reached for pod: ${this.podId}. Stopping retries.`);
            this._enterOfflineMode();
            return;
        }

        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff, max 30s

        console.log(`⏰ Scheduling reconnect attempt ${this.reconnectAttempts + 1}/${this.maxReconnectAttempts} in ${delay}ms for pod: ${this.podId}`);

        this.reconnectTimeout = setTimeout(async () => {
            this.reconnectTimeout = null;
            
            if (this.isShuttingDown) {
                console.log(`🛑 Skipping reconnect - service is shutting down on pod: ${this.podId}`);
                return;
            }
            
            try {
                await this.init();
            } catch (error) {
                console.error(`❌ Reconnection attempt ${this.reconnectAttempts + 1} failed:`, error.message);
                // The _performConnection method will handle incrementing attempts and further retries
            }
        }, delay);
    }

    _enterOfflineMode() {
        console.warn(`🔴 Redis service entering offline mode on pod: ${this.podId}`);
        this.isConnected = false;
        this.isConnecting = false;
        
        // Clear any pending reconnection
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        
        // Emit offline mode event for application awareness
        this.emit('offline', { podId: this.podId, timestamp: Date.now() });
    }

    async _cleanupConnections() {
        const connections = [
            { name: 'redis', instance: this.redis },
            { name: 'publisher', instance: this.publisher },
            { name: 'subscriber', instance: this.subscriber }
        ];

        for (const { name, instance } of connections) {
            if (instance) {
                try {
                    // Remove all listeners to prevent memory leaks
                    instance.removeAllListeners();
                    
                    if (instance.status !== 'end') {
                        await Promise.race([
                            instance.disconnect(),
                            new Promise(resolve => setTimeout(resolve, 2000)) // 2s timeout for cleanup
                        ]);
                    }
                } catch (error) {
                    console.warn(`⚠️ Error cleaning up ${name} connection:`, error.message);
                }
            }
        }

        this.redis = null;
        this.publisher = null;
        this.subscriber = null;
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
        console.log(`🛑 Initiating Redis service shutdown for pod: ${this.podId}`);
        this.isShuttingDown = true;
        
        // Clear any pending reconnect timeout
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        
        try {
            // Gracefully disconnect subscriber first
            if (this.subscriber && this.subscriber.status !== 'end') {
                try {
                    await this.subscriber.unsubscribe('sdk-progress');
                    await Promise.race([
                        this.subscriber.disconnect(),
                        new Promise(resolve => setTimeout(resolve, 3000)) // 3s timeout
                    ]);
                } catch (error) {
                    console.warn(`⚠️ Error disconnecting subscriber:`, error.message);
                }
            }
            
            // Disconnect publisher
            if (this.publisher && this.publisher.status !== 'end') {
                try {
                    await Promise.race([
                        this.publisher.disconnect(),
                        new Promise(resolve => setTimeout(resolve, 3000)) // 3s timeout
                    ]);
                } catch (error) {
                    console.warn(`⚠️ Error disconnecting publisher:`, error.message);
                }
            }
            
            // Disconnect main Redis connection
            if (this.redis && this.redis.status !== 'end') {
                try {
                    await Promise.race([
                        this.redis.disconnect(),
                        new Promise(resolve => setTimeout(resolve, 3000)) // 3s timeout
                    ]);
                } catch (error) {
                    console.warn(`⚠️ Error disconnecting main Redis:`, error.message);
                }
            }
            
            this.isConnected = false;
            this.isConnecting = false;
            
            console.log(`✅ Redis service disconnected cleanly for pod: ${this.podId}`);
            
        } catch (error) {
            console.error(`❌ Error during Redis service shutdown:`, error.message);
        } finally {
            // Clean up references
            this.redis = null;
            this.publisher = null;
            this.subscriber = null;
            
            // Remove all event listeners to prevent memory leaks
            this.removeAllListeners();
        }
    }

    // Fallback method for when Redis is not available
    emitLocal(jobId, progressData) {
        this.emit('progress', { ...progressData, jobId });
    }

    async storeFile(fileKey, filePath, ttl = this.defaultTTL) {
        if (!this.isConnected) {
            console.warn(`Cannot store file - Redis not connected on pod: ${this.podId}`);
            return false;
        }

        try {
            console.log(`Storing file ${fileKey} from ${filePath}`);

            const fileExists = await fs.promises.access(filePath).then(() => true).catch(() => false);
            if (!fileExists) {
                throw new Error(`File does not exist: ${filePath}`);
            }

            const stats = await fs.promises.stat(filePath);
            if (stats.size > this.maxFileSize) {
                throw new Error(`File too large: ${stats.size} bytes (max: ${this.maxFileSize})`);
            }

            const fileBuffer = await fs.promises.readFile(filePath);

            const pipeline = this.redis.pipeline();
            pipeline.setex(`${fileKey}:data`, ttl, fileBuffer)

            const result = await pipeline.exec();

            const dataStored = result[0][1] === 'OK';

            if (dataStored) {
                console.log(`✅ File stored in Redis successfully: ${fileKey} (${stats.size} bytes)`);
                return true;
            } else {
                throw new Error('Failed to store file in Redis');
            }
        } catch (error) {
            console.error(`❌ Error storing file ${fileKey}:`, error.message);
            return false;
        }
    }

    async retrieveFile(fileKey) {
        if (!this.isConnected) {
            console.warn(`Cannot retrieve file - Redis not connected on pod: ${this.podId}`);
            return null;
        }

        try {
            console.log(`Retrieving file ${fileKey} from Redis`);

            const pipeline = this.redis.pipeline();
            pipeline.getBuffer(`${fileKey}:data`);
            
            const result = await pipeline.exec();

            const fileBuffer = result[0][1];
            if (!fileBuffer) {
                console.warn(`File not found in Redis: ${fileKey}`);
                return null;
            }

            console.log(`✅ File retrieved successfully: ${fileKey} (${fileBuffer.length} bytes)`);
            return {
                data: fileBuffer
            }

        } catch (error) {
            console.error(`❌ Error retrieving file ${fileKey}:`, error.message);
            return null;
        }
    }

    async fileExists(fileKey) {
        if (!this.isConnected) {
            return false;
        }

        try {
            const exists = await this.redis.exists(`${fileKey}:data`);
            return exists === 1;
        } catch (error) {
            console.error(`❌ Error checking file existence in Redis: ${error.message}`);
            return false;
        }
   }

    // async deleteFile(fileKey) {
    //     if (!this.isConnected) {
    //         return false;
    //     }

    //     try {
    //         console.log(`🗑️ Deleting file from Redis: ${fileKey}`);
            
    //         const pipeline = this.redis.pipeline();
    //         pipeline.del(`${fileKey}:data`);
    //         pipeline.del(`${fileKey}:metadata`);
            
    //         const results = await pipeline.exec();
    //         const deletedCount = results[0][1] + results[1][1];
            
    //         if (deletedCount > 0) {
    //             console.log(`✅ File deleted from Redis: ${fileKey}`);
    //             return true;
    //         } else {
    //             console.log(`📭 File not found for deletion: ${fileKey}`);
    //             return false;
    //         }
            
    //     } catch (error) {
    //         console.error(`❌ Error deleting file from Redis: ${error.message}`);
    //         return false;
    //     }
    // }

    // async cleanupExpiredFiles() {
    //     if (!this.isConnected) {
    //         return 0;
    //     }

    //     try {
    //         // Redis handles TTL automatically, but we can manually check for orphaned data
    //         const dataKeys = await this.redis.keys('*:data');
    //         const metadataKeys = await this.redis.keys('*:metadata');
            
    //         const dataKeySet = new Set(dataKeys.map(k => k.replace(':data', '')));
    //         const metadataKeySet = new Set(metadataKeys.map(k => k.replace(':metadata', '')));
            
    //         let cleaned = 0;
            
    //         // Clean up orphaned data keys (without metadata)
    //         for (const dataKey of dataKeys) {
    //             const baseKey = dataKey.replace(':data', '');
    //             if (!metadataKeySet.has(baseKey)) {
    //                 await this.redis.del(dataKey);
    //                 cleaned++;
    //                 console.log(`🧹 Cleaned orphaned data key: ${dataKey}`);
    //             }
    //         }
            
    //         // Clean up orphaned metadata keys (without data)
    //         for (const metadataKey of metadataKeys) {
    //             const baseKey = metadataKey.replace(':metadata', '');
    //             if (!dataKeySet.has(baseKey)) {
    //                 await this.redis.del(metadataKey);
    //                 cleaned++;
    //                 console.log(`🧹 Cleaned orphaned metadata key: ${metadataKey}`);
    //             }
    //         }
            
    //         if (cleaned > 0) {
    //             console.log(`🧹 Redis file storage cleanup completed: ${cleaned} orphaned keys removed`);
    //         }
            
    //         return cleaned;
    //     } catch (error) {
    //         console.error(`❌ Error during Redis file storage cleanup: ${error.message}`);
    //         return 0;
    //     }
    // }

}

// Create singleton instance
const redisService = new RedisService();

process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, closing Redis connections...');
    await redisService.disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received, closing Redis connections...');
    await redisService.disconnect();
    process.exit(0);
});

module.exports = redisService;
module.exports.RedisService = RedisService;
