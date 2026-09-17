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

/*
 * Script allowlist for uploaded themes, split out of util.js.
 *
 * The function is pure - a string in, a CustomError or nothing out - but it used to live
 * beside util.js's `require('../dao/admin')`, which loads models/organization,
 * db/sequelize and finally `require(process.cwd() + '/config.json')` at import time.
 * config.json and secret.json are both gitignored, so anything that required util.js
 * could not be loaded on a fresh checkout: themeScripts.test.js failed on the CI runner
 * with MODULE_NOT_FOUND for config.json, and once that was stubbed from the samples,
 * cryptoUtil threw for a missing BILLING_KEY_ENCRYPTION_KEY.
 *
 * util.js re-exports this, so util.validateScripts and every existing caller are
 * unchanged. Keep this module free of anything that reads config or the database.
 */

const logger = require('../config/logger');
const { CustomError } = require('../utils/errors/customErrors');
const constants = require('../utils/constants');

function validateScripts(strContent) {
    try {
        const allowedScripts = new Set([
            "<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'></script>",
            '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>',
            '<script src="https://js.stripe.com/v3/"></script>',
            "<script src='/technical-scripts/search.js' defer></script>",
            "<script src='/technical-scripts/filter.js' defer></script>",
            "<script src='/technical-scripts/common.js' defer></script>",
            "<script src='/technical-scripts/subscription.js' defer></script>",
            "<script src='/technical-scripts/add-application-form.js' defer></script>",
            "<script src='/technical-scripts/platform-subscription.js' defer></script>",
            "<script src='/technical-scripts/subscription-modal.js' defer></script>",
            "<script src='/technical-scripts/subscriptions-page.js' defer></script>",
            "<script src='/technical-scripts/paginate.js' defer></script>",
            "<script src='/technical-scripts/platform-api-keys-page.js' defer></script>",
            '<script src="/technical-scripts/oauth2-key-generation.js" defer></script>',
            '<script src="/technical-scripts/api-key-generation.js" defer></script>',
            '<script src="/technical-scripts/billing.js" defer></script>',
            "<script src='/technical-scripts/delete-confirmation-modal.js' defer></script>",
            "<script src='/technical-scripts/api-flow-detail.js' defer></script>",
            "<script src='/technical-scripts/api-workflows.js' defer></script>",
            "<script src='/technical-scripts/api-agent-prompt.js' defer></script>",
            '<script src="/technical-scripts/home-discover.js" defer></script>',
            "<script src='/technical-scripts/home-particles.js' defer></script>",
            '<script src="/technical-scripts/particles.js" defer></script>',
            '<script src="https://cdn.jsdelivr.net/npm/@jentic/arazzo-ui@1.0.0-alpha.30/dist/arazzo-ui.js" integrity="sha256-OYzURPQLK+lup5rGo+IQmVbjWOjVgjURBWDDtMHIOaw=" crossorigin="anonymous"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js" integrity="sha256-Rdw90D3AegZwWiwpibjH9wkBPwS9U4bjJ51ORH8H69c=" crossorigin="anonymous"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/marked@13.0.3/marked.min.js" integrity="sha256-Wt6n2O5BpwD8zBS7nVAxBPBHDMF6hK0+Fn0/UlHq4No=" crossorigin="anonymous"></script>',
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.2.7/purify.min.js" integrity="sha512-78KH17QLT5e55GJqP76vutp1D2iAoy06WcYBXB6iBCsmO6wWzx0Qdg8EDpm8mKXv68BcvHOyeeP4wxAL0twJGQ==" crossorigin="anonymous"></script>',
        ]);
        const allowedInlineScripts = new Set([
            // Reo analytics loader (src/defaultContent/layout/main.hbs)
            "<script type=\"text/javascript\">\n      !function(){var e,t,n;e=\"{{portalConfigs.reoClientID}}\",t=function(){Reo.init({clientID:\"{{portalConfigs.reoClientID}}\"})},(n=document.createElement(\"script\")).src=\"https://static.reo.dev/\"+e+\"/reo.js\",n.defer=!0,n.onload=t,document.head.appendChild(n)}();\n    </script>",
            // Token-map JSON data island (api-landing/partials/api-subscription-plans.hbs)
            "<script id=\"token-map-data\" type=\"application/json\">{{{jsonSafePlatformSubscriptions ../platformSubscriptions}}}</script>",
            // Token-meta bootstrap (api-landing/partials/api-subscription-plans.hbs)
            "<script>\n                    (function() {\n                        var data = JSON.parse(document.getElementById('token-map-data').textContent || '[]');\n                        window.__tokenMeta = window.__tokenMeta || {};\n                        data.forEach(function(sub) {\n                            // store only non-sensitive metadata and masked token\n                            window.__tokenMeta[sub.subscriptionId] = {\n                                maskedToken: sub.maskedToken,\n                                customerName: sub.customerName,\n                                subscriptionPlanName: sub.subscriptionPlanName,\n                                status: sub.status\n                            };\n                        });\n                        // expose orgID for on-demand fetches\n                        window.__subscriptionOrgID = \"{{@root.orgID}}\";\n                    })();\n                </script>",
            // Existing-subs JSON data island (api-landing/partials/api-subscription-plans.hbs)
            "<script id=\"existing-subs-data\" type=\"application/json\">{{{json platformSubscriptions}}}</script>",
            // API flows JSON data island (pages/api-flows/page.hbs)
            "<script type=\"application/json\" id=\"apiFlowsDataContainer\">{{{json apiFlows}}}</script>",
            /* AI agent data islands. These are exact-string matches, so they have to track
               the pages byte for byte: main added the apiPath key to both pages (the
               shared script reads data.apiPath to choose /api/ or /mcp/ for the markdown
               route), which put both templates outside this list until these entries were
               updated - and a template that is not on it is a 400 from the theme upload
               endpoint, so a customer editing the default theme could not re-upload it. */
            // pages/api-landing/page.hbs
            "<script type=\"application/json\" id=\"apiAgentData\">{\"baseUrl\":\"{{baseUrl}}\",\"apiHandle\":\"{{apiMetadata.apiHandle}}\",\"apiPath\":\"api\"}</script>",
            // pages/mcp-landing/page.hbs
            "<script type=\"application/json\" id=\"apiAgentData\">{\"baseUrl\":\"{{baseUrl}}\",\"apiHandle\":\"{{apiMetadata.apiHandle}}\",\"apiPath\":\"mcp\"}</script>",
            // Home discover data island (pages/home/page.hbs)
            "<script type=\"application/json\" id=\"homeDiscoverData\">{\"baseUrl\":\"{{baseUrl}}\"}</script>",
            // Existing-subs bootstrap (api-landing/partials/api-subscription-plans.hbs)
            "<script>\n                (function() {\n                    window.__subscriptionOrgID = window.__subscriptionOrgID || \"{{@root.orgID}}\";\n                    var raw = document.getElementById('existing-subs-data').textContent || '[]';\n                    try {\n                        var parsed = JSON.parse(raw);\n                        window.existingPlatformSubscriptions = parsed.map(function(sub) {\n                            return { subscriptionId: sub.subscriptionId, subscriptionPlanName: sub.subscriptionPlanName, status: sub.status };\n                        });\n                    } catch (e) {\n                        window.existingPlatformSubscriptions = [];\n                    }\n                })();\n            </script>",
            // tokenMap + orgID bootstrap (api-subscriptions/partials/api-subscription-list.hbs
            // and subscriptions/partials/subscription-list.hbs)
            "<script>\n                window.__tokenMap = window.__tokenMap || {};\n                window.__subscriptionOrgID = \"{{@root.orgID}}\";\n            </script>",
            // Modal click handler (apis/partials/api-listing.hbs)
            "<script>\n    (function(){\n      function findClosest(el, selector){\n        while(el && el !== document){\n          if(el.matches && el.matches(selector)) return el;\n          el = el.parentNode;\n        }\n        return null;\n      }\n\n      document.addEventListener('click', function(e){\n        var modalTrigger = findClosest(e.target, '[data-modal]');\n        if(modalTrigger){\n          e.preventDefault();\n          if(modalTrigger.classList.contains('is-readonly') || modalTrigger.getAttribute('aria-disabled') === 'true'){\n            return;\n          }\n          if(typeof loadModal === 'function'){\n            loadModal(modalTrigger.getAttribute('data-modal'));\n          } else {\n            var id = modalTrigger.getAttribute('data-modal');\n            var el = document.getElementById(id);\n            if(el) {\n              el.style.display = 'flex';\n              document.body.classList.add('modal-open');\n              if(typeof prepareSubscriptionModal === 'function') {\n                try { prepareSubscriptionModal(id); } catch(err) { /* noop */ }\n              }\n            }\n          }\n          return;\n        }\n\n        var nav = findClosest(e.target, '[data-href]');\n        if(nav){\n          var href = nav.getAttribute('data-href');\n          if(href){ window.location.href = href; }\n        }\n      }, false);\n    })();\n  </script>",
        ]);

        const scriptRegex = /<script(?:\s+[^>]*)?>[\s\S]*?<\/script>/gi;
        let match;

        while ((match = scriptRegex.exec(strContent)) !== null) {
            const script = match[0].trim();
            const openingTag = script.match(/^<script(?:\s+[^>]*)?>/i)?.[0] || '';
            const hasSrc = /\bsrc\s*=/i.test(openingTag);

            if (!hasSrc) {
                const isEmpty = /^<script[^>]*>\s*<\/script>$/i.test(script);
                if (isEmpty || allowedInlineScripts.has(script)) {
                    continue;
                }
                logger.error("Script validation failed: inline scripts are not allowed", { script });
                throw new CustomError(400, constants.ERROR_CODE[400], `Inline scripts are not allowed in uploaded themes: ${script}`);
            }
            if (!allowedScripts.has(script)) {
                logger.error("Script validation failed: disallowed script tag found", { script });
                throw new CustomError(400, constants.ERROR_CODE[400], `Additional scripts not allowed: ${script}`);
            }
        }
    } catch (error) {
        if (!(error instanceof CustomError)) {
            logger.error("Error occurred while validating scripts", {
                error: error.message,
                description: error.description,
                stack: error.stack,
            });
        }
        throw error;
    }
}

module.exports = {
    validateScripts,
};
