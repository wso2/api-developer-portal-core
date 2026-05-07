/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * Tag: Invoices
 */

const invoiceController = require('../../controllers/invoiceController');
const { ensureBillingAuth } = require('../../middlewares/billingAuth');
const { compose } = require('./_compose');

module.exports = {
    listInvoices: compose(ensureBillingAuth, invoiceController.listInvoices),
    getInvoice: compose(ensureBillingAuth, invoiceController.getInvoice),
    listInvoicesBySubscription: compose(ensureBillingAuth, invoiceController.listInvoicesBySubscription),
    getInvoicePdfLink: compose(ensureBillingAuth, invoiceController.getInvoicePdfLink),
    redirectHostedInvoice: compose(ensureBillingAuth, invoiceController.redirectHostedInvoice),
};
