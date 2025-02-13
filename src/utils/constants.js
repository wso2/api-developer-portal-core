/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
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
module.exports = {
    DEV_MODE: 'development',
    IMAGE: 'image',
    STYLE: 'style',
    TEXT: 'text',
    CHARSET_UTF8: 'utf-8',
    FILE_NAME_PARAM: '&fileName=',
    API_TEMPLATE_FILE_NAME: '/template?fileName=',
    HEADER_PARTIAL_NAME: 'header',
    HERO_PARTIAL_NAME: 'hero',
    BASE_URL: 'http://localhost:',
    BASE_URL_NAME: 'baseUrl',
    ORG_ID: 'orgID',
    ORG_IDENTIFIER: 'organizationIdentifier',
    ACCESS_TOKEN: 'accessToken',
    BASIC_HEADER: 'basicAuthHeader',
    API_VISIBILITY: {
        PUBLIC: 'PUBLIC',
        PRIVATE: 'PRIVATE'    
    },
    MIME_TYPES: {
        HTML: 'text/html',
        TEXT: 'text/plain',
        JSON: 'application/json',
        YAML: 'application/x-yaml',
        XML: 'application/xml',
        CSS: 'text/css',
        JAVASCRIPT: 'application/javascript',
        PNG: 'image/png',
        JPEG: 'image/jpeg',
        SVG: 'image/svg+xml',
        PDF: 'application/pdf',
        CONYEMT_TYPE_OCT: 'application/octet-stream',
        CONYEMT_TYPE: 'Content-Type',
        CONTENT_DISPOSITION: 'Content-Disposition',
        Cache_Control: 'Cache-Control',
    },

    SCOPES: {
        ADMIN: 'admin',
        DEVELOPER: 'dev',
    },

    FILE_EXTENSIONS: {
        HTML: '.html',
        JSON: '.json',
        CSS: '.css',
        JAVASCRIPT: '.js',
        PNG: '.png',
        JPEG: '.jpeg',
        JPG: '.jpg',
        SVG: '.svg',
        PDF: '.pdf',
        HBS: '.hbs',
        MD: '.md',
        GIF: '.gif',
        YAML: '.yaml',
        YML: '.yml',
        XML: '.xml'
    },

    ROUTE: {
        DEV_PORTAL: '/devportal',
        STYLES: '/styles',
        TECHNICAL_STYLES: '/technical-styles',
        TECHNICAL_SCRIPTS: '/technical-scripts',
        IMAGES: '/images',
        IMAGES_PATH: '/images/',
        DEFAULT: '/',
        MOCK: '/mock',
        API_LISTING_PAGE: '/apis',
        API_FILE_PATH: '/apis/',
        API_LANDING_PAGE_PATH: '/api/',
        DEVPORTAL_ASSETS_BASE_PATH: '/devportal/organizations/',
        DEVPORTAL_CONFIGURE: '/*/configure',
        DEVPORTAL_ROOT: ['/portal','/portal/*/edit', '/devportal'],
        DEVPORTAL_API_LISTING: '/*/apis',
        DEVPORTAL_TECHNICAL_PAGES: ['*/application']
    },
    ROLES: {
        ADMIN: 'admin',
        SUBSCRIBER: 'subscriber',
        SUPER_ADMIN: 'superAdmin',
        ROLE_CLAIM: 'roles',
        GROUP_CLAIM: 'groups',
        ORGANIZATION_CLAIM: 'orgClaimName'
    },
    FILE_TYPE: {
        LAYOUT: 'layout',
        TEMPLATE: 'template',
    },
    KEY_TYPE: {
        PRODUCTION: 'PRODUCTION',
        SANDBOX: 'SANDBOX',
    },
    FILE_NAME: {
        MAIN: 'main.hbs',
        PAGE: 'page.hbs',
        API_MD_CONTENT_FILE_NAME: 'apiContent.md',
        API_HBS_CONTENT_FILE_NAME: 'api-content.hbs',
        API_CONTENT_PARTIAL_NAME: "api-content",
        API_DEFINITION_FILE_NAME: 'apiDefinition.json',
        API_DEFINITION_GRAPHQL: 'apiDefinition.graphql',
        API_DEFINITION_XML: 'apiDefinition.xml',
        PARTIAL_HEADER_FILE_NAME: 'header.hbs',
    },
    ERROR_MESSAGE: {
        ORG_NOT_FOUND: "Failed to load organization",
        ORG_CREATE_ERROR: "Error while creating organization",
        ORG_UPDATE_ERROR: "Error while updating organization",
        ORG_DELETE_ERROR: "Erro while deleting organization",
        ORG_CONTENT_NOT_FOUND: "Organization content not found",
        ORG_CONTENT_UPDATE_ERROR: "Error while updating organization content",
        ORG_CONTENT_DELETE_ERROR: "Error while deleting organization content",
        ORG_CONTENT_CREATE_ERROR: "Error while creating organization content",
        API_NOT_FOUND: "Failed to load API",
        API_CREATE_ERROR: "Error while creating API",
        API_UPDATE_ERROR: "Error while updating API",
        API_DELETE_ERROR: "Error while deleting API",
        API_CONTENT_NOT_FOUND: "API content not found",
        API_CONTENT_UPDATE_ERROR: "Error while updating API content",
        API_CONTENT_DELETE_ERROR: "Error while deleting API content",
        API_CONTENT_CREATE_ERROR: "Error while creating API content",
        API_LISTING_LOAD_ERROR: "Error while loading API listing",
        IDP_NOT_FOUND: "Failed to load IDP",
        IDP_CREATE_ERROR: "Error while creating IDP",
        IDP_UPDATE_ERROR: "Error while updating IDP",
        IDP_DELETE_ERROR: "Error while deleting IDP",
        API_NOT_IN_ORG: "API does not belong to given organization",
        UNAUTHENTICATED: "User is not authenticated",
        FORBIDDEN: "You do not have permission to access this resource",
        PROVIDER_CREATE_ERROR: "Error while creating provider",
        PROVIDER_UPDATE_ERROR: "Error while updating provider",
        PROVIDER_DELETE_ERROR: "Error while deleting provider",
        PROVIDER_FETCH_ERROR: "Error while fetching providers",
        LABEL_DELETE_ERROR: "Error while deleting label",
        LABEL_RETRIEVE_ERROR: "Error while deleting label",
        LABEL_CREATE_ERROR: "Error while creating labels",
        LABEL_UPDATE_ERROR: "Error while updating labels",
        VIEW_CREATE_ERROR: "Error while creating view",
        VIEW_UPDATE_ERROR: "Error while updating view",
        VIEW_DELETE_ERROR: "Error while deleting view",
        VIEW_RETRIEVE_ERROR: "Error while fetching view",
        SUBSCRIPTION_POLICY_CREATE_ERROR: "Error while creating subscription policy",
        SUBSCRIPTION_POLICY_NOT_FOUND: "Subscription policy not found",
    },
    ERROR_CODE: {
        401: "Unauthenticated",
        403: "Forbidden",
        404: "Not Found"
    }
}