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

const crypto = require("crypto");
const logger = require("../config/logger");
const config = require("../../config.json");
const secret = require("../../secret.json");

function ensureBillingAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    const orgId = req.params.orgId;
    if (orgId) {
      const userOrg = req.user.userOrg;
      const authorizedOrgs = req.user.authorizedOrgs;
      const orgMatches =
        userOrg === orgId ||
        (Array.isArray(authorizedOrgs) && authorizedOrgs.includes(orgId));
      if (!orgMatches) {
        logger.warn("Billing auth: org membership check failed", {
          path: req.path,
          requestedOrgId: orgId,
          userOrg,
        });
        return res.status(403).json({
          error: "Forbidden",
          message: "You do not have access to this organization",
        });
      }
    }
    return next();
  }

  const keyType = config.advanced?.apiKey?.keyType;
  if (keyType && secret.apiKeySecret) {
    const apiKey = req.headers[keyType.toLowerCase()];
    if (apiKey) {
      const apiKeyBuf = Buffer.from(apiKey);
      const secretBuf = Buffer.from(secret.apiKeySecret);
      if (
        apiKeyBuf.length === secretBuf.length &&
        crypto.timingSafeEqual(apiKeyBuf, secretBuf)
      ) {
        return next();
      }
    }
  }

  logger.warn("Billing auth check failed - user not authenticated", {
    path: req.path,
    hasUser: !!req.user,
    isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
  });

  return res.status(401).json({
    error: "Unauthorized",
    message: "Please log in to access billing information",
  });
}

function verifyCsrfOrigin(req, res, next) {
  const origin = req.headers["origin"];
  const referer = req.headers["referer"];
  const source = origin || referer;

  if (!source) {
    return next();
  }

  const expectedOrigin = config.baseUrl
    ? new URL(config.baseUrl).origin
    : `${req.protocol}://${req.get("host")}`;

  const sourceOrigin = origin || new URL(referer).origin;

  if (sourceOrigin !== expectedOrigin) {
    logger.warn("CSRF origin check failed", {
      path: req.path,
      sourceOrigin,
      expectedOrigin,
    });
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid request origin",
    });
  }

  return next();
}

module.exports = {
  ensureBillingAuth,
  verifyCsrfOrigin,
};
