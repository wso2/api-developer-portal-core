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

async function listInvoices(req, res) {
  const orgId = req.params.orgId;
  const period = req.query.period || 'last3months';
  
  try {
    const invoices = await subscriptionService.listInvoices({ orgId, user: req.user, period });
    return res.status(200).json(invoices);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId }, "listInvoices failed");
    return res.status(status).json(body);
  }
}

async function listInvoicesBySubscription(req, res) {
  const orgId = req.params.orgId;
  const subId = req.params.subId;

  try {
    const invoices = await subscriptionService.listInvoicesBySubscription({ orgId, subId });
    return res.status(200).json(invoices);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, orgId, subId }, "listInvoicesBySubscription failed");
    return res.status(status).json(body);
  }
}

async function getInvoice(req, res) {
  const invoiceId = req.params.invoiceId;

  try {
    const inv = await subscriptionService.getInvoice({ invoiceId });
    return res.status(200).json(inv);
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, invoiceId }, "getInvoice failed");
    return res.status(status).json(body);
  }
}

async function getInvoicePdfLink(req, res) {
  const orgId = req.params.orgId;
  const invoiceId = req.params.invoiceId;

  try {
    const inv = await subscriptionService.getInvoice({ orgId, invoiceId });
    // Stripe returns hosted_invoice_url and invoice_pdf.
    if (!inv.invoice_pdf) {
      logger.warn({ invoiceId, hosted_invoice_url: inv.hosted_invoice_url }, "Invoice PDF not available");
      return res.status(404).json({
        error: "InvoicePdfNotAvailable",
        message: "Invoice PDF is not available for this invoice. It may not be finalized or paid yet.",
        hosted_invoice_url: inv.hosted_invoice_url
      });
    }
    return res.status(200).json({
      invoiceId,
      hosted_invoice_url: inv.hosted_invoice_url,
      invoice_pdf: inv.invoice_pdf,
    });
  } catch (err) {
    // Add more detailed logging for debugging
    logger.error({
      message: err.message,
      stack: err.stack,
      invoiceId,
      stripeError: err.raw || err,
    }, "getInvoicePdfLink failed - detailed");
    // If Stripe error, return more helpful message
    if (err.raw && err.raw.type === 'invalid_request_error') {
      return res.status(404).json({
        error: "StripeInvoiceNotFound",
        message: `Stripe could not find invoice: ${invoiceId}`,
        stripeError: err.raw
      });
    }
    const { status, body } = errorToResponse(err);
    return res.status(status).json(body);
  }
}

async function redirectHostedInvoice(req, res) {
  const invoiceId = req.params.invoiceId;

  try {
    const inv = await subscriptionService.getInvoice({ invoiceId });
    if (inv.hosted_invoice_url) return res.redirect(inv.hosted_invoice_url);
    return res.status(404).json({ message: "Hosted invoice URL not available" });
  } catch (err) {
    const { status, body } = errorToResponse(err);
    logger.error({ err, invoiceId }, "redirectHostedInvoice failed");
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
