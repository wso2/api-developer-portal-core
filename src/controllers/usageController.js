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
 *
 */
const subscriptionService = require("../services/monetizationService");
const { CustomError } = require("../utils/errors/customErrors");
const logger = require("../config/logger");

// Utility to convert errors to response format
function errorToResponse(err) {
  if (err instanceof CustomError) {
    return {
      status: err.code,
      body: { error: err.type, message: err.message, details: err.details },
    };
  }
  return {
    status: 500,
    body: { error: "InternalServerError", message: err.message || "An unexpected error occurred" },
  };
}

function getRange(req) {
  const usageFrom = req.query.usageFrom;
  const usageTo = req.query.usageTo;

  const to = usageTo ? new Date(usageTo).toISOString() : new Date().toISOString();
  const from = usageFrom
    ? new Date(usageFrom).toISOString()
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  return { from, to };
}

async function getSubscriptionUsage(req, res) {
  const orgId = req.params.orgId;
  const subId = req.params.subId;

  try {
    const { from, to } = getRange(req);
    const usage = await subscriptionService.getUsage({ orgId, subId, from, to });
    return res.status(200).json(usage);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId, subId }, "getSubscriptionUsage failed");
    return res.status(status).json(body);
  }
}

module.exports = { getSubscriptionUsage };
