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
const constants = require("../utils/constants");

function errorToResponse(err) {
  if (err instanceof CustomError) {
    return {
      status: err.statusCode,
      body: {
        message: err.message,
        ...(err.description ? { description: err.description } : {}),
      },
    };
  }
  if (typeof err.statusCode === "number" && err.type) {
    return {
      status: err.statusCode >= 500 ? 502 : 400,
      body: { error: "PaymentError", message: "A payment processing error occurred. Please try again or contact support." },
    };
  }
  return {
    status: 500,
    body: {
      error: "InternalServerError",
      message: "An unexpected error occurred",
    },
  };
}

async function listInvoices(req, res) {
  const orgId = req.params.orgId;
  const userId =
    req.user?.sub || req.user?.[constants.USER_ID] || req[constants.USER_ID];
  const period = req.query.period || "last3months";

  try {
    const invoices = await subscriptionService.listInvoices({
      orgId,
      userId,
      period,
    });
    return res.status(200).json(invoices);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ message: err.message, orgId }, "listInvoices failed");
    return res.status(status).json(body);
  }
}

async function listInvoicesBySubscription(req, res) {
  const orgId = req.params.orgId;
  const subId = req.params.subId;
  const userId =
    req.user?.sub || req.user?.[constants.USER_ID] || req[constants.USER_ID];

  try {
    const invoices = await subscriptionService.listInvoicesBySubscription({
      orgId,
      subId,
      userId,
    });
    return res.status(200).json(invoices);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error(
      { message: err.message, orgId, subId },
      "listInvoicesBySubscription failed",
    );
    return res.status(status).json(body);
  }
}

async function getInvoice(req, res) {
  const invoiceId = req.params.invoiceId;
  const orgId = req.params.orgId;
  const userId =
    req.user?.sub || req.user?.[constants.USER_ID] || req[constants.USER_ID];

  try {
    const inv = await subscriptionService.getInvoice({ orgId, invoiceId, userId });
    return res.status(200).json(inv);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ message: err.message, invoiceId }, "getInvoice failed");
    return res.status(status).json(body);
  }
}

async function getInvoicePdfLink(req, res) {
  const orgId = req.params.orgId;
  const invoiceId = req.params.invoiceId;
  const userId =
    req.user?.sub || req.user?.[constants.USER_ID] || req[constants.USER_ID];

  try {
    const inv = await subscriptionService.getInvoice({ orgId, invoiceId, userId });
    if (!inv.invoice_pdf) {
      logger.warn(
        { invoiceId, hosted_invoice_url: inv.hosted_invoice_url },
        "Invoice PDF not available",
      );
      return res.status(404).json({
        error: "InvoicePdfNotAvailable",
        message:
          "Invoice PDF is not available for this invoice. It may not be finalized or paid yet.",
        hosted_invoice_url: inv.hosted_invoice_url,
      });
    }
    return res.status(200).json({
      invoiceId,
      hosted_invoice_url: inv.hosted_invoice_url,
      invoice_pdf: inv.invoice_pdf,
    });
  } catch (err) {
    logger.error(
      { message: err.message, invoiceId },
      "getInvoicePdfLink failed",
    );
    const { status, body } = errorToResponse(err);
    return res.status(status).json(body);
  }
}

async function redirectHostedInvoice(req, res) {
  const invoiceId = req.params.invoiceId;
  const orgId = req.params.orgId;
  const userId =
    req.user?.sub || req.user?.[constants.USER_ID] || req[constants.USER_ID];

  try {
    const inv = await subscriptionService.getInvoice({ orgId, invoiceId, userId });
    if (inv.hosted_invoice_url) return res.redirect(inv.hosted_invoice_url);
    return res
      .status(404)
      .json({ message: "Hosted invoice URL not available" });
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error(
      { message: err.message, invoiceId },
      "redirectHostedInvoice failed",
    );
    return res.status(status).json(body);
  }
}

module.exports = {
  listInvoices,
  listInvoicesBySubscription,
  getInvoice,
  getInvoicePdfLink,
  redirectHostedInvoice,
};
