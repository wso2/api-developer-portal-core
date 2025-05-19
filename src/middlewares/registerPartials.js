/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com) All Rights Reserved.
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
/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');
const config = require(process.cwd() + '/config.json');
const markdown = require('marked');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');
const constants = require('../utils/constants');
const apiMetadataService = require('../services/apiMetadataService');
const { loadLayoutFromAPI } = require('../utils/util');
const util = require('../utils/util');
const { validationResult } = require('express-validator');
const filePrefix = config.pathToContent;
const hbs = exphbs.create({});

const registerPartials = async (req, res, next) => {

  const rules = util.validateRequestParameters();
  for (let validation of rules) {
    await validation.run(req);
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(util.getErrors(errors));
  }
  registerInternalPartials(req);
  if (config.mode === constants.DEV_MODE) {
    registerAllPartialsFromFile(config.baseUrl + constants.ROUTE.VIEWS_PATH + req.params.viewName, req, filePrefix);
  } else {
    let matchURL = req.originalUrl;
    if (req.session.returnTo) {
      matchURL = req.session.returnTo;
    }
    try {
      if (req.params.orgName && req.params.orgName !== "portal" && (!(/configure/i.test(matchURL)))) {

        const orgID = await adminDao.getOrgId(req.params.orgName);
        var layoutContent = await loadLayoutFromAPI(orgID, req.params.viewName);
        if (layoutContent === "") {
          console.log("Layout content not found in the database. Loading from file system");
          await registerAllPartialsFromFile(config.baseUrl + "/" + req.params.orgName + constants.ROUTE.VIEWS_PATH + req.params.viewName, req, './src/defaultContent');
          //register doc page partials
          if (req.originalUrl.includes(constants.ROUTE.API_DOCS_PATH) && req.params.docType && req.params.docName) {
            await registerDocsPageContent(req, orgID, {});
          } else if (req.originalUrl.includes(constants.ROUTE.API_LANDING_PAGE_PATH)) {
            await registerAPILandingContent(req, orgID, {});
          }
        } else {
          await registerPartialsFromAPI(req);
        }
      }
    } catch (error) {
      console.error('Error while loading organization :', error);
      next(error);
    }
  }
  next();
};

const registerInternalPartials = async (req) => {

  let isAdmin, isSuperAdmin = false;
  if (req.user) {
    isAdmin = req.user["isAdmin"];
    isSuperAdmin = req.user["isSuperAdmin"];
  }
  const partialsDir = path.join(path.join(require.main.filename, '..', '/pages/partials'));
  const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => path.join(source, dirent.name));

  const partialsDirs = [partialsDir, ...getDirectories(path.join(require.main.filename, '..', '/pages')).map(dir => path.join(dir, 'partials'))];
  let hasWSO2API = true;
  if (config.mode !== constants.DEV_MODE) {
    hasWSO2API = await checkWSO2APIAvailability();
  }

  for (const dir of partialsDirs) {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.hbs')) {
          const partialName = path.basename(file, '.hbs');
          const partialContent = fs.readFileSync(path.join(dir, file), 'utf8');
          hbs.handlebars.registerPartial(partialName, partialContent);
          let profile = {};
          if (req.user) {
            profile = {
              imageURL: req.user.imageURL,
              firstName: req.user.firstName,
              lastName: req.user.lastName,
              email: req.user.email,
            }
          }
          if (partialName === constants.HEADER_PARTIAL_NAME) {
            hbs.handlebars.partials = {
              ...hbs.handlebars.partials,
              header: hbs.handlebars.compile(partialContent)({
                isAdmin: isAdmin,
                isSuperAdmin: isSuperAdmin,
                profile: req.isAuthenticated() ? profile : {},
                baseUrl: "/" + req.params.orgName + constants.ROUTE.VIEWS_PATH + "default",
              }),
            };
          };

          if (partialName === constants.SIDEBAR_PARTIAL_NAME) {
            hbs.handlebars.partials = {
              ...hbs.handlebars.partials,
              sidebar: hbs.handlebars.compile(partialContent)({
                profile: req.isAuthenticated() ? profile : {},
                baseUrl: "/" + req.params.orgName + constants.ROUTE.VIEWS_PATH + "default",
                hasWSO2APIs: hasWSO2API
              }),
            };
          }
        }
      });
    }
  };
}

const registerAllPartialsFromFile = async (baseURL, req, filePrefix) => {

  const filePath = req.originalUrl.split(baseURL).pop();
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "partials"), req);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "home", "partials"), req);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "api-landing", "partials"), req);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "apis", "partials"), req);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "docs", "partials"), req);

  if (fs.existsSync(path.join(process.cwd(), filePrefix + "pages", filePath, "partials"))) {
    registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix + "pages", filePath, "partials"), req);
  }
}

const registerPartialsFromAPI = async (req) => {

  const orgName = req.params.orgName;
  const viewName = req.params.viewName;
  const orgID = await adminDao.getOrgId(orgName);
  const imageUrl = `${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}${constants.ROUTE.VIEWS_PATH}${viewName}/layout?fileType=image&fileName=`;

  let partials = await adminDao.getOrgContent({
    orgId: orgID,
    fileType: 'partial',
    viewName: viewName
  });
  let partialObject = {};
  let hasWSO2APIs = await checkWSO2APIAvailability();
  partials.forEach(file => {
    let fileName = file.FILE_NAME.split(".")[0];
    let content = file.FILE_CONTENT.toString(constants.CHARSET_UTF8);
    partialObject[fileName] = content;
  });
  const hbs = exphbs.create({});
  Object.keys(partialObject).forEach((partialName) => {
    hbs.handlebars.registerPartial(partialName, partialObject[partialName]);
  });
  let isAdmin, isSuperAdmin = false;
  if (req.user) {
    isAdmin = req.user["isAdmin"];
    isSuperAdmin = req.user["isSuperAdmin"];
  }
  if (partialObject[constants.HEADER_PARTIAL_NAME] && req.user) {
    const profile = {
      imageURL: req.user.imageURL,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    }
    hbs.handlebars.partials = {
      ...hbs.handlebars.partials,
      header: hbs.handlebars.compile(partialObject[constants.HEADER_PARTIAL_NAME])({
        baseUrl: "/" + orgName + constants.ROUTE.VIEWS_PATH + viewName,
        profile: req.isAuthenticated() ? profile : {},
        isAdmin: isAdmin,
        isSuperAdmin: isSuperAdmin,
        hasWSO2APIs: hasWSO2APIs
      })
    };
  }

  if (partialObject[constants.SIDEBAR_PARTIAL_NAME]) {
    hbs.handlebars.partials = {
      ...hbs.handlebars.partials,
      sidebar: hbs.handlebars.compile(partialObject[constants.SIDEBAR_PARTIAL_NAME])({
        baseUrl: "/" + orgName + constants.ROUTE.VIEWS_PATH + viewName,
        isAdmin: isAdmin,
        isSuperAdmin: isSuperAdmin,
        hasWSO2APIs: hasWSO2APIs
      }),
    };
  }

  if (req.originalUrl.includes(constants.ROUTE.API_LANDING_PAGE_PATH)) {
    await registerAPILandingContent(req, orgID, partialObject);
  }
  //register doc page partials
  if (req.originalUrl.includes(constants.ROUTE.API_DOCS_PATH) && req.params.docType && req.params.docName) {
    await registerDocsPageContent(req, orgID, partialObject);
  }
};

async function registerAPILandingContent(req, orgID, partialObject) {

  const apiHandle = req.params.apiHandle;
  const apiID = await apiDao.getAPIId(orgID, apiHandle);
  //fetch markdown content for API if exists
  const markdownResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_MD_CONTENT_FILE_NAME, constants.DOC_TYPES.API_LANDING, orgID, apiID);
  const markdownContent = markdownResponse !== null ? markdownResponse.API_FILE.toString("utf8") : "";
  const markdownHtml = markdownContent ? markdown.parse(markdownContent) : "";

  metaData = await apiMetadataService.getMetadataFromDB(orgID, apiID);
  if (metaData !== "") {
    const data = metaData ? JSON.stringify(metaData) : {};
    metaData = JSON.parse(data);
    //replace image urls
    let images = metaData.apiInfo.apiImageMetadata;
    for (const key in images) {
      let apiImageUrl = `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}${constants.ROUTE.API_FILE_PATH}${apiID}${constants.API_TEMPLATE_FILE_NAME}`
      const modifiedApiImageURL = apiImageUrl + images[key]
      images[key] = modifiedApiImageURL;
    }
  }
  //if hbs content available for API, render the hbs page
  let additionalAPIContentResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_HBS_CONTENT_FILE_NAME, constants.DOC_TYPES.API_LANDING, orgID, apiID);
  if (additionalAPIContentResponse !== null) {
    let additionalAPIContent = additionalAPIContentResponse.API_FILE.toString("utf8");
    partialObject[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME] = additionalAPIContent ? additionalAPIContent : "";
    hbs.handlebars.partials[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME] = hbs.handlebars.compile(
      partialObject[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME])({
        apiContent: markdownHtml,
        apiMetadata: metaData
      });
  }

}

async function registerDocsPageContent(req, orgID, partialObject) {

  const { orgName, apiHandle, viewName, docType, docName } = req.params;
  const apiID = await apiDao.getAPIId(orgID, apiHandle);
  let markdownHtml = "";
  let docContentResponse = await apiDao.getAPIDocByName(constants.DOC_TYPES.DOC_ID + docType, docName, orgID, apiID);
  if (docContentResponse !== null) {
    if (docName.endsWith(".md")) {
      const markdownContent = docContentResponse.API_FILE.toString("utf8");
      markdownHtml = markdownContent ? markdown.parse(markdownContent) : "";
      partialObject[constants.FILE_NAME.API_DOC_PARTIAL_NAME] = hbs.handlebars.partials[constants.FILE_NAME.API_DOC_PARTIAL_NAME];
    } else {
      let additionalDocContent = docContentResponse.API_FILE.toString("utf8");
      partialObject[constants.FILE_NAME.API_DOC_PARTIAL_NAME] = additionalDocContent ? additionalDocContent : "";
    }
  }

  hbs.handlebars.partials[constants.FILE_NAME.API_DOC_PARTIAL_NAME] = hbs.handlebars.compile(
    partialObject[constants.FILE_NAME.API_DOC_PARTIAL_NAME])({
      baseUrl: "/" + orgName + "/views/" + viewName + "/api/" + apiHandle,
      apiMD: markdownHtml
    });
}


async function checkWSO2APIAvailability() {

  const condition = {
    PROVIDER: "WSO2"
  }
  return await apiDao.getAPIMetadataByCondition(condition).then(apis => apis.length > 0);
}

function registerPartialsFromFile(baseURL, dir, req) {

  const filenames = fs.readdirSync(dir);
  filenames.forEach((filename) => {
    if (filename.endsWith(".hbs")) {
      const template = fs.readFileSync(path.join(dir, filename), constants.CHARSET_UTF8);
      hbs.handlebars.registerPartial(filename.split(".hbs")[0], template);

      let profile;
      if (req.isAuthenticated()) {
        profile = {
          imageURL: req.user.imageURL,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          email: req.user.email
        }
      }
      if (filename === constants.FILE_NAME.PARTIAL_HEADER_FILE_NAME) {
        hbs.handlebars.partials = {
          ...hbs.handlebars.partials,
          header: hbs.handlebars.compile(template)({
            baseUrl: baseURL,
            profile: profile,
            hasWSO2APIs: true
          }),
        };
      };
      if (filename === constants.FILE_NAME.PARTIAL_SIDEBAR_FILE_NAME) {
        hbs.handlebars.partials = {
          ...hbs.handlebars.partials,
          sidebar: hbs.handlebars.compile(template)({
            baseUrl: baseURL,
            hasWSO2APIs: true
          }),
        };
      }
    }
  });
}

module.exports = registerPartials;
