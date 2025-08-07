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
 * Redis connection helper methods for RedisService
 * Contains all connection management and event handling logic
 */

const Redis = require('ioredis');
const config = require(process.cwd() + '/config');

class RedisConnectionHelper {
    static async performConnection(service) {
        if (service.isShuttingDown) {
            throw new Error('Service is shutting down');
        }

        if (service.reconnectAttempts >= service.maxReconnectAttempts) {
            console.error(`Max Redis connection attempts reached for pod: ${service.podId}. Operating in offline mode.`);
            RedisConnectionHelper.enterOfflineMode(service);
            throw new Error('Max reconnection attempts exceeded');
        }

        service.isConnecting = true;

        try {
            await RedisConnectionHelper.cleanupConnections(service);

            const redisConfig = {
                host: config.redis?.host || process.env.REDIS_HOST || 'localhost',
                port: config.redis?.port || process.env.REDIS_PORT || 6379,
                password: config.redis?.password || process.env.REDIS_PASSWORD,
                db: config.redis?.db || process.env.REDIS_DB || 0,
                retryDelayOnFailover: 1000,
                maxRetriesPerRequest: 0,
                lazyConnect: true,
                connectTimeout: 8000,
                commandTimeout: 20000,
                keyPrefix: 'sdkfiles:',
                retryConnectOnFailure: false,
                enableOfflineQueue: false,
                tls: true
            };

            console.log(`Attempting Redis connection ${service.reconnectAttempts + 1}/${service.maxReconnectAttempts} on pod: ${service.podId}`);

            // Create new connections
            service.redis = new Redis(redisConfig);
            service.publisher = new Redis(redisConfig);
            service.subscriber = new Redis(redisConfig);

            RedisConnectionHelper.setupEventHandlers(service);

            await Promise.race([
                Promise.all([
                    service.redis.connect(),
                    service.publisher.connect(),
                    service.subscriber.connect()
                ]),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Connection timeout')), 12000)
                )
            ]);

            await service.subscriber.subscribe('sdk-progress');
            
            service.isConnected = true;
            service.isConnecting = false;
            service.reconnectAttempts = 0;
            
            console.log(`✅ RedisService fully connected on pod: ${service.podId}`);
            
        } catch (error) {
            service.isConnecting = false;
            service.isConnected = false;

            console.error(`Redis connection failed (attempt ${service.reconnectAttempts + 1}):`, error.message);

            await RedisConnectionHelper.cleanupConnections(service);
            
            service.reconnectAttempts++;
            
            if (service.reconnectAttempts < service.maxReconnectAttempts && !service.isShuttingDown) {
                RedisConnectionHelper.scheduleReconnect(service);
            } else {
                console.error(`Max Redis connection attempts reached for pod: ${service.podId}. Operating in offline mode.`);
                RedisConnectionHelper.enterOfflineMode(service);
            }
            
            throw error;
        }
    }

    static setupEventHandlers(service) {
        // Publisher events
        service.publisher.removeAllListeners(); 
        service.publisher.on('connect', () => {
            console.log(`Publisher connected to Redis from pod: ${service.podId}`);
        });
        service.publisher.on('error', (error) => {
            console.error(`Redis publisher error on pod ${service.podId}:`, error.message);

            if (service.isConnected) {
                service.isConnected = false;
            }
        });
        service.publisher.on('close', () => {
            console.warn(`Redis publisher connection closed on pod: ${service.podId}`);
            service.isConnected = false;
            if (!service.isShuttingDown) {
                RedisConnectionHelper.handleConnectionLoss(service);
            }
        });

        // Subscriber events
        service.subscriber.removeAllListeners();
        service.subscriber.on('connect', () => {
            console.log(`Subscriber connected to Redis from pod: ${service.podId}`);
        });

        service.subscriber.on('error', (error) => {
            console.error(`Redis subscriber error on pod ${service.podId}:`, error.message);
            if (service.isConnected) {
                service.isConnected = false;
            }
        });

        service.subscriber.on('message', async (channel, data) => {
            try {
                if (channel === 'sdk-progress') {
                    const jsonData = JSON.parse(data);
                    if (jsonData.type === 'progress') {
                        await service.handleProgressEvent(jsonData);
                    }
                }
            } catch (error) {
                console.error('Error processing Redis message:', error.message);
            }
        });
        service.subscriber.on('close', () => {
            console.warn(`🔌 Redis subscriber connection closed on pod: ${service.podId}`);
            service.isConnected = false;
            if (!service.isShuttingDown) {
                RedisConnectionHelper.handleConnectionLoss(service);
            }
        });

        // Main Redis events
        service.redis.removeAllListeners();
        service.redis.on('connect', () => {
            console.log(`Redis file storage connected successfully on pod: ${service.podId}`);
        });

        service.redis.on('error', (error) => {
            console.error(`Redis file storage error on pod ${service.podId}:`, error.message);

            if (service.isConnected) {
                service.isConnected = false;
            }
        });

        service.redis.on('close', () => {
            console.log(`Redis file storage connection closed on pod: ${service.podId}`);
            service.isConnected = false;
            if (!service.isShuttingDown) {
                RedisConnectionHelper.handleConnectionLoss(service);
            }
        });
    }

    static handleConnectionLoss(service) {
        if (service.isConnecting || service.isShuttingDown) {
            return;
        }

        if (service.reconnectAttempts >= service.maxReconnectAttempts) {
            console.warn(`Redis connection lost on pod: ${service.podId}, but max attempts reached. Staying in offline mode.`);
            RedisConnectionHelper.enterOfflineMode(service);
            return;
        }

        console.warn(`Redis connection lost on pod: ${service.podId}`);
        service.isConnected = false;
        
        RedisConnectionHelper.scheduleReconnect(service);
    }

    static scheduleReconnect(service) {
        if (service.isShuttingDown || service.reconnectTimeout) {
            return; 
        }

        if (service.reconnectAttempts >= service.maxReconnectAttempts) {
            console.error(`Max reconnection attempts reached for pod: ${service.podId}. Stopping retries.`);
            RedisConnectionHelper.enterOfflineMode(service);
            return;
        }

        const delay = Math.min(1000 * Math.pow(2, service.reconnectAttempts), 30000); // Exponential backoff, max 30s

        console.log(`Scheduling reconnect attempt ${service.reconnectAttempts + 1}/${service.maxReconnectAttempts} in ${delay}ms for pod: ${service.podId}`);

        service.reconnectTimeout = setTimeout(async () => {
            service.reconnectTimeout = null;
            
            if (service.isShuttingDown) {
                console.log(`Skipping reconnect - service is shutting down on pod: ${service.podId}`);
                return;
            }
            
            try {
                await service.init();
            } catch (error) {
                console.error(`Reconnection attempt ${service.reconnectAttempts + 1} failed:`, error.message);
            }
        }, delay);
    }

    static enterOfflineMode(service) {
        console.warn(`Redis service entering offline mode on pod: ${service.podId}`);
        service.isConnected = false;
        service.isConnecting = false;
        
        if (service.reconnectTimeout) {
            clearTimeout(service.reconnectTimeout);
            service.reconnectTimeout = null;
        }
        
        service.emit('offline', { podId: service.podId, timestamp: Date.now() });
    }

    static async cleanupConnections(service) {
        const connections = [
            { name: 'redis', instance: service.redis },
            { name: 'publisher', instance: service.publisher },
            { name: 'subscriber', instance: service.subscriber }
        ];

        for (const { name, instance } of connections) {
            if (instance) {
                try {
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

        service.redis = null;
        service.publisher = null;
        service.subscriber = null;
    }
}

module.exports = RedisConnectionHelper;
