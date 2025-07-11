# Winston Logging Implementation

This document describes the Winston logging framework implementation in the API Developer Portal.

## Overview

Winston is a multi-transport async logging library for Node.js that provides:
- Multiple logging levels (error, warn, info, http, debug)
- Multiple output transports (console, file)
- Structured logging with metadata
- Colorized console output
- JSON format for file logs

## Configuration

The logger is configured in `src/utils/logger.js` with the following features:

### File Location Tracking
The logger automatically captures and displays the filename and line number where each log statement originates. This helps in debugging by showing exactly where each log message was generated.

- **Console output**: Shows as `[filename:line]` after the log level
- **File output**: Included as `location` field in JSON format

### Log Levels
- **error**: Error conditions that require attention
- **warn**: Warning conditions that might cause issues
- **info**: General information about application flow
- **http**: HTTP request/response logging
- **debug**: Detailed debugging information

### Transports
1. **Console**: Colorized output for development
2. **File (error.log)**: Error-level messages only
3. **File (combined.log)**: All log messages

### Log Format
- **Console**: `YYYY-MM-DD HH:mm:ss:ms LEVEL: [filename:line] MESSAGE`
- **File**: JSON format with timestamp, level, message, location, and metadata

## Usage

### Basic Import
```javascript
const logger = require('./utils/logger');
```

### Log Levels Usage

#### Error Logging
```javascript
try {
    // risky operation
} catch (error) {
    logger.error('Database connection failed:', {
        error: error.message,
        stack: error.stack,
        userId: req.user?.id
    });
}
```

#### Warning Logging
```javascript
if (!user) {
    logger.warn('User not found in database', { 
        userId,
        operation: 'getUserProfile'
    });
}
```

#### Info Logging
```javascript
logger.info('User successfully authenticated', {
    userId: user.id,
    email: user.email,
    loginTime: new Date().toISOString()
});
```

#### HTTP Logging
```javascript
logger.http('External API call completed', {
    endpoint: 'https://api.example.com/users',
    method: 'GET',
    statusCode: 200,
    duration: '150ms'
});
```

#### Debug Logging
```javascript
logger.debug('Processing subscription request', {
    apiId,
    userId,
    planId,
    requestData: sanitizedData
});
```

## Example Log Messages

### Console Output
```
2025-07-07 14:43:14:4314 error: [authController.js:45] Database connection failed
2025-07-07 14:43:14:4314 warn: [userService.js:23] User not found in cache
2025-07-07 14:43:14:4314 info: [app.js:55] Starting server with ID: 12345678-1234-1234-1234-123456789012
2025-07-07 14:43:14:4314 info: [app.js:56] Developer Portal V2 is running on port 3000
2025-07-07 14:43:14:4314 http: [middleware:15] GET /api/applications 200 - 45ms
```

### File Output (JSON)
```json
{
  "timestamp": "2025-07-07 14:43:14:4314",
  "level": "error",
  "message": "Database connection failed",
  "location": "authController.js:45",
  "errorCode": "DB_001",
  "userId": "user123"
}

{
  "timestamp": "2025-07-07 14:43:14:4314",
  "level": "info",
  "message": "User successfully authenticated",
  "location": "authController.js:120",
  "userId": "user123",
  "email": "john.doe@example.com",
  "loginTime": "2025-07-07T14:43:14.123Z"
}
```

## Best Practices

### 1. Use Appropriate Log Levels
- Use `error` for actual errors that need attention
- Use `warn` for potential issues or unusual conditions
- Use `info` for important application events
- Use `http` for request/response logging
- Use `debug` for detailed debugging (disabled in production)

### 2. Include Relevant Metadata
Always include contextual information:
```javascript
logger.info('API subscription created', {
    subscriptionId: subscription.id,
    userId: req.user.id,
    apiId: apiId,
    planId: planId,
    timestamp: new Date().toISOString()
});
```

### 3. Sanitize Sensitive Data
Never log passwords, tokens, or other sensitive information:
```javascript
// BAD
logger.info('User login', { username, password });

// GOOD
logger.info('User login attempt', { 
    username,
    success: true,
    ip: req.ip
});
```

### 4. Use Structured Logging
Prefer objects over string concatenation:
```javascript
// BAD
logger.info(`User ${userId} created subscription for API ${apiId}`);

// GOOD
logger.info('Subscription created', { userId, apiId, subscriptionId });
```

## Environment Configuration

Set the log level using environment variables:
```bash
# Development
export LOG_LEVEL=debug

# Production
export LOG_LEVEL=info
```

## File Locations

- **Error logs**: `logs/error.log`
- **Combined logs**: `logs/combined.log`
- **Log directory**: Created automatically if it doesn't exist

## Integration Points

The Winston logger is integrated into:

1. **Application startup** (`src/app.js`)
2. **HTTP request middleware** (automatic request/response logging)
3. **Error handling middleware** (automatic error logging)
4. **Process error handlers** (uncaught exceptions and unhandled rejections)

## Development vs Production

- **Development**: All levels logged to console with colors
- **Production**: Info level and above, structured JSON to files
- **Log rotation**: Consider implementing log rotation for production deployments

## Dependencies

- `winston`: ^3.17.0 (automatically installed)

## Examples

See `src/utils/logger-examples.js` for comprehensive usage examples across different scenarios including:
- Controller functions
- Database operations
- API calls
- Authentication
- Business logic processing
