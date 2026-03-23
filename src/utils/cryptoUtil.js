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
"use strict";

const crypto = require("crypto");
const secret = require(process.cwd() + "/secret.json");

const ENCRYPTION_KEY =
  secret.billingKeyEncryptionKey || "34497c9ad32b1e9cc5dd264681b9afa9";

if (!ENCRYPTION_KEY) {
  throw new Error(
    "BILLING_KEY_ENCRYPTION_KEY secret is required for encryption operations",
  );
}

// Enforce 32 *bytes* for AES-256 (not just "32 characters")
const KEY_BUF = Buffer.from(ENCRYPTION_KEY, "utf8");
if (KEY_BUF.length !== 32) {
  throw new Error(
    `BILLING_KEY_ENCRYPTION_KEY must be exactly 32 bytes (utf8) for AES-256. Got ${KEY_BUF.length} bytes.`,
  );
}

const GCM_IV_LENGTH = 12;
const GCM_AUTH_TAG_LENGTH = 16;
const GCM_ALGO = "aes-256-gcm";

function encrypt(text) {
  if (typeof text !== "string") {
    throw new TypeError("encrypt: text must be a string");
  }

  const iv = crypto.randomBytes(GCM_IV_LENGTH);
  const cipher = crypto.createCipheriv(GCM_ALGO, KEY_BUF, iv);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  const authTag = cipher.getAuthTag();

  return `gcm:${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted}`;
}

function decrypt(payload) {
  if (typeof payload !== "string") {
    throw new TypeError("decrypt: payload must be a string");
  }

  if (!payload.startsWith("gcm:")) {
    throw new Error("decrypt: invalid payload format");
  }

  const parts = payload.slice(4).split(":");
  if (parts.length !== 3) {
    throw new Error("decrypt: invalid payload format");
  }
  const [ivStr, authTagStr, encrypted] = parts;
  const iv = Buffer.from(ivStr, "base64");
  const authTag = Buffer.from(authTagStr, "base64");

  if (iv.length !== GCM_IV_LENGTH) {
    throw new Error("decrypt: invalid IV length");
  }

  const decipher = crypto.createDecipheriv(GCM_ALGO, KEY_BUF, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
