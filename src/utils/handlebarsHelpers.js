/*
 * Copyright (c) 2026, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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

const constants = require("./constants");

/**
 * Registers every Handlebars helper the developer portal templates rely on.
 *
 * Extracted verbatim from app.js so that templates can be compiled outside a
 * running server - the render tests register the same helpers against the same
 * Handlebars singleton the application uses.
 *
 * @param {object} Handlebars the Handlebars instance to register against
 */
function registerHelpers(Handlebars) {


// Handlebars helper to filter subscriptions by status (case-insensitive, supports 'ALL')
Handlebars.registerHelper('filterByStatus', function (array, status) {
    if (!Array.isArray(array)) return [];
    if (!status || status === 'ALL') return array;
    const statusLower = status.toLowerCase();
    return array.filter(item => item.status && item.status.toLowerCase() === statusLower);
});

// Handlebars helper to check if an array is empty
Handlebars.registerHelper('isEmpty', function (arr) {
    return !arr || arr.length === 0;
});

// Handlebars 'filter' helper: returns a filtered array for use as a subexpression
Handlebars.registerHelper('filter', function (array, property, value, include) {
    if (!Array.isArray(array)) return [];
    if (typeof include !== 'boolean') {
        include = true;
    }
    if (include) {
        return array.filter(item => item && item[property] === value);
    } else {
        return array.filter(item => item && item[property] !== value);
    }
});

Handlebars.registerHelper('json', function (context) {

    if (context) {
        return JSON.stringify(context);
    } else {
        return JSON.stringify();
    }
});

Handlebars.registerHelper('jsonBeautify', function (context) {
    if (context) {
        if (!(typeof context == 'string')) {
            return JSON.stringify(context, null, 2); 
        } else {
            return context;
        }
    } else {
        return '{}'; 
    }
});

Handlebars.registerHelper('jsonSafePlatformSubscriptions', function (context) {
    try {
        if (!context || !Array.isArray(context)) return JSON.stringify([]);
        const safe = context.map(function (s) {
            return {
                subscriptionId: s.subscriptionId,
                subscriptionPlanName: s.subscriptionPlanName,
                status: s.status,
                customerName: s.customerName || s.customer || null,
                maskedToken: s.subscriptionToken ? ('****' + String(s.subscriptionToken).slice(-4)) : '****'
            };
        });
        return JSON.stringify(safe);
    } catch (e) {
        return JSON.stringify([]);
    }
});

Handlebars.registerHelper("every", function (array, key, options) {
    if (!Array.isArray(array)) {
        return options.inverse(this);
    }

    const allMatch = array.every(item => item[key]);

    return allMatch ? true : false;
});

Handlebars.registerHelper("firstTwoLetters", function (text) {
    return text ? text.substring(0, 2).toUpperCase() : "";
});

Handlebars.registerHelper('getSubIDs', function (subAPIs) {
    const subIDs = subAPIs.map(api => api.subID);
    return JSON.stringify(subIDs);
});

Handlebars.registerHelper('beforeSeparator', function (value, separator) {
    if (typeof value === 'string' && typeof separator === 'string') {
        return value.split(separator)[0];
    }
    return value;
});

Handlebars.registerHelper('stripMdExtension', function (value) {
    if (typeof value === 'string' && value.endsWith('.md')) {
        return value.slice(0, -3);
    }
    return value;
});

Handlebars.registerHelper("some", function (array, key, options) {
    if (!Array.isArray(array)) {
        /* Every call site is a subexpression - {{#if (some x "y")}} - and a subexpression
           receives an options object with no `inverse`, so the old
           `return options.inverse(this)` threw TypeError and turned a missing array into
           an HTTP 500 for the whole page. Fall back to the block's else only when there
           actually is a block. */
        return (options && typeof options.inverse === 'function') ? options.inverse(this) : false;
    }

    const someMatch = array.some(item => item && item[key]);

    return someMatch ? true : false;
});

Handlebars.registerHelper('eq', function (a, b) {
    return (a === b || (a != null && b != null && (a === b.toString() || a.toString() === b)));
});

Handlebars.registerHelper('compare', function (a, operator, b, options) {
    if (arguments.length < 4) {
        throw new Error('Handlebars Helper "compare" needs 3 parameters');
    }
    let result;
    switch (operator) {
        case '===': result = a === b; break;
        case '!==': result = a !== b; break;
        case '<': result = a < b; break;
        case '>': result = a > b; break;
        case '<=': result = a <= b; break;
        case '>=': result = a >= b; break;
        default: throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
    }
    return result ? options.fn(this) : options.inverse(this);
});

/**
 * Formats API key expiry for display: ISO-8601 strings, Unix seconds, or Unix milliseconds
 * (e.g. CP may return 1774923420000 as a number or string).
 */
Handlebars.registerHelper('formatExpiresAt', function (value) {
    if (value === null || value === undefined || value === '') {
        return '';
    }
    let d;
    const s = String(value).trim();
    if (/^\d+$/.test(s)) {
        const n = parseInt(s, 10);
        if (Number.isNaN(n)) {
            return s;
        }
        const digitLen = String(n).length;
        d = digitLen <= 10 ? new Date(n * 1000) : new Date(n);
    } else {
        d = new Date(s);
    }
    if (Number.isNaN(d.getTime())) {
        return s;
    }
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
});

Handlebars.registerHelper('in', function (value, options) {
    const rawValues = Array.isArray(options.hash.values)
        ? options.hash.values
        : options.hash.values.split(',');
    const validValues = rawValues.map(v => v.trim());
    const trimmedValue = value?.trim();

    const match = validValues.some(valid => trimmedValue?.includes(valid));
    return match ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('conditionalIf', function (condition, value1, value2) {
    return condition ? value1 : value2;
});

Handlebars.registerHelper('contains', function (array, value) {
    return array && array.includes(value);
});

/* REQUEST_COUNT is a free-text column and three different spellings mean "no limit":
   the string "Unlimited" (2,540 plans), "0" (1,114) and NULL (211). Upstream has a
   numeric limitCount and tests for -1; ours has to accept all four, so the card renders
   an infinity glyph rather than the literal "0 req/min". */
Handlebars.registerHelper('isUnlimitedRate', function (requestCount) {
    if (requestCount === null || requestCount === undefined || requestCount === '') {
        return true;
    }
    const raw = String(requestCount).trim();
    return raw === '0' || raw === '-1' || raw.toLowerCase() === 'unlimited';
});

Handlebars.registerHelper('let', function (name, value, options) {
    const data = Handlebars.createFrame(options.data);
    data[name] = value;
    return options.fn({ ...options.hash, ...data });
});

Handlebars.registerHelper('and', function () {
    const args = Array.prototype.slice.call(arguments);
    const lastArg = args.pop();
    return args.every(Boolean) ? lastArg.fn(this) : lastArg.inverse(this);
});

Handlebars.registerHelper('or', function (...args) {
    // Last arg is the Handlebars options hash; find first truthy value before it
    const vals = args.slice(0, -1);
    return vals.find(v => v) || vals[vals.length - 1];
});

Handlebars.registerHelper('getValue', function (obj, key) {
    return obj[key];
});

Handlebars.registerHelper('lowercase', function (str) {
    return typeof str === 'string' ? str.toLowerCase() : str;
});

Handlebars.registerHelper('isMiddle', function (index, length) {
    const middleIndex = Math.floor(length / 2);
    return index === middleIndex;
});

Handlebars.registerHelper('startsWith', function (str, includeStr, options) {
    if (str && str.startsWith(includeStr)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('isFederatedAPI', function (gatewayVendor) {
    if (!gatewayVendor || typeof gatewayVendor !== 'string') {
        return false;
    }
    return constants.FEDERATED_GATEWAY_VENDORS.includes(gatewayVendor);
});

Handlebars.registerHelper('formatPrice', function (price) {
    if (!price) return '0';
    return parseFloat(price).toString();
});

Handlebars.registerHelper('formatBillingPeriod', function (period) {
    const map = { day: 'daily', week: 'weekly', month: 'monthly', year: 'yearly' };
    const p = String(period || '').toLowerCase();
    return map[p] || (p + 'ly');
});

Handlebars.registerHelper('formatTierRange', function (startUnit, endUnit) {
    const start = startUnit != null ? Number(startUnit).toLocaleString() : '0';
    if (endUnit == null || endUnit === '' || endUnit === Infinity) {
        return start + ' +';
    }
    return start + ' – ' + Number(endUnit).toLocaleString();
});

Handlebars.registerHelper('maskToken', function (token) {
    if (!token || token.length <= 4) return '****';
    return '****' + token.slice(-4);
});

Handlebars.registerHelper('isCurrentPlan', function (policyName, platformSubscriptions) {
    if (!Array.isArray(platformSubscriptions) || !policyName) return false;
    return platformSubscriptions.some(sub => sub.subscriptionPlanName === policyName);
});

Handlebars.registerHelper('currentYear', function () {
    return new Date().getFullYear();
});

/* Counts entries whose dotted path equals value - or, with include=false, does not.
   apiContentController serves the same apiMetadata list to both pages/apis and
   pages/mcp and each template filters by type in the markup, so apiMetadata.length is
   the size of the two catalogues combined. Using it directly overstates a results
   count, and leaves an organization holding only one of the two kinds rendering an
   empty grid with no empty state, because the length is not zero. The existing
   `filter` helper cannot serve here: it reads item[property] and apiType is nested. */
Handlebars.registerHelper('countWhere', function (array, path, value, include) {
    if (!Array.isArray(array)) {
        return 0;
    }
    if (typeof include !== 'boolean') {
        include = true;
    }
    const read = (obj) => String(path).split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
    return array.filter((item) => (read(item) === value) === include).length;
});

/* Names the artefact types this portal serves, for the home hero copy. Built here
   rather than branched in the template because devportalMode x showApiWorkflowsNav
   is six combinations and the string appears twice per page; upstream composes the
   same label server-side from its enabled-artefact list. Joined as "A, B & C". */
Handlebars.registerHelper('artifactTypesLabel', function (devportalMode, showApiWorkflowsNav) {
    const labels = [];
    if (devportalMode !== constants.DEVPORTAL_MODE.MCP_ONLY) {
        labels.push('APIs');
    }
    if (devportalMode !== constants.DEVPORTAL_MODE.API_PROXIES) {
        labels.push('MCP servers');
    }
    if (showApiWorkflowsNav === true) {
        labels.push('workflows');
    }
    return labels.length > 1
        ? labels.slice(0, -1).join(', ') + ' & ' + labels[labels.length - 1]
        : (labels[0] || '');
});


/**
 * The MCP client configuration block shown on the MCP landing page, pretty-printed.
 *
 * Built here rather than written as literal lines inside the <pre> because Handlebars
 * prepends a standalone partial call's own indentation to every line of that partial's
 * output. mcp-config-sidebar is included 12 spaces deep, so each JSON line arrived with
 * 12 extra spaces which <pre> then preserved - the block rendered correctly nested in the
 * source and ragged in the browser. An interpolated value is not re-indented, so
 * returning the whole block as one string keeps the formatting the source shows.
 *
 * SafeString because the URL and name are already escaped by escapeExpression; without it
 * the surrounding {{{ }}} would be the only thing standing between a name and the page.
 */
Handlebars.registerHelper('mcpServerConfig', function (apiName, productionURL) {
    const name = Handlebars.escapeExpression(apiName == null ? '' : String(apiName));
    const url = Handlebars.escapeExpression(productionURL == null ? '' : String(productionURL));
    const config = {
        servers: {
            [name]: {
                url: url,
                type: 'http',
                headers: {
                    // Placeholder the note below the block tells the user to replace.
                    Authorization: 'Bearer ${token}',
                },
            },
        },
    };
    return new Handlebars.SafeString(JSON.stringify(config, null, 2));
});

}

module.exports = { registerHelpers };
