/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: SDK
 */

const sdkJobService = require('../../services/sdkJobService');

module.exports = {
    generateSDK: sdkJobService.generateSDK,
    streamSDKProgress: sdkJobService.streamSDKProgress,
    cancelSDK: sdkJobService.cancelSDK,
    downloadSDK: sdkJobService.downloadSDK,
};
