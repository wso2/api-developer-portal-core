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

const filePrefix = config.pathToContent;
const hbs = exphbs.create({});
const registerPartials = async (req, res, next) => {

  registerInternalPartials(req);
  if (config.mode === constants.DEV_MODE) {
    registerAllPartialsFromFile(constants.BASE_URL + config.port + constants.ROUTE.VIEWS_PATH + req.params.viewName, req);
  } else {
    let matchURL = req.originalUrl;
    if (req.session.returnTo) {
      matchURL = req.session.returnTo;
    }
    try {
      if (req.params.orgName && req.params.orgName !== "portal" && (!(/configure/i.test(matchURL)))) {
        await registerPartialsFromAPI(req);
      }
    } catch (error) {
      console.error('Error while loading organization :', error);
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
  const hasWSO2API = await checkWSO2APIAvailability();

  for (const dir of partialsDirs) {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.hbs')) {
          const partialName = path.basename(file, '.hbs');
          const partialContent = fs.readFileSync(path.join(dir, file), 'utf8');
          hbs.handlebars.registerPartial(partialName, partialContent);
          
          if (partialName === constants.HEADER_PARTIAL_NAME) {
            hbs.handlebars.partials = {
              ...hbs.handlebars.partials,
              header: hbs.handlebars.compile(partialContent)({
                isAdmin: isAdmin,
                isSuperAdmin: isSuperAdmin,
                profile: req.user,
                baseUrl: "/" + req.params.orgName + constants.ROUTE.VIEWS_PATH + "default",
                hasWSO2APIs: hasWSO2API
              })
            };
          }
        }
      });
    }
  };
}

const registerAllPartialsFromFile = async (baseURL, req) => {

  const filePath = req.originalUrl.split(baseURL).pop();
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "partials"), req.user);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "home", "partials"), req.user);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "api-landing", "partials"), req.user);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "apis", "partials"), req.user);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "docs", "partials"), req.user);

  if (fs.existsSync(path.join(process.cwd(), filePrefix + "pages", filePath, "partials"))) {
    registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix + "pages", filePath, "partials"), req.user);
  }
}

const registerPartialsFromAPI = async (req) => {

  const orgName = req.params.orgName;
  const viewName = req.params.viewName;
  const orgID = await adminDao.getOrgId(orgName);
  const imageUrl = `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}${constants.ROUTE.VIEWS_PATH}${viewName}/layout?fileType=image&fileName=`;
  let partials = await adminDao.getOrgContent({
    orgId: orgID,
    fileType: 'partial',
    viewName: viewName
  });
  let partialObject = {}
  partials.forEach(file => {
    let fileName = file.FILE_NAME.split(".")[0];
    let content = file.FILE_CONTENT.toString(constants.CHARSET_UTF8);
    content = content.replaceAll(constants.ROUTE.IMAGES_PATH, `${imageUrl}`)
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
  if (partialObject[constants.HEADER_PARTIAL_NAME]) {
    hbs.handlebars.partials = {
      ...hbs.handlebars.partials,
      header: hbs.handlebars.compile(partialObject[constants.HEADER_PARTIAL_NAME])({
        baseUrl: "/" + orgName + constants.ROUTE.VIEWS_PATH + viewName,
        profile: req.user,
        isAdmin: isAdmin,
        isSuperAdmin: isSuperAdmin,
        hasWSO2APIs: await checkWSO2APIAvailability()
      }),
      [constants.HERO_PARTIAL_NAME]: hbs.handlebars.compile(partialObject[constants.HERO_PARTIAL_NAME])(
        { baseUrl: "/" + orgName + constants.ROUTE.VIEWS_PATH + viewName }
      ),
    };
  }
  if (req.originalUrl.includes(constants.ROUTE.API_LANDING_PAGE_PATH)) {

    const apiHandle = req.params.apiHandle;
    const apiID = await apiDao.getAPIId(orgID, apiHandle);

    //fetch markdown content for API if exists
    const markdownResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_MD_CONTENT_FILE_NAME, constants.DOC_TYPES.API_LANDING, orgID, apiID);
    const markdownContent = markdownResponse ? markdownResponse.API_FILE.toString("utf8") : "";
    const markdownHtml = markdownContent ? markdown.parse(markdownContent) : "";

    //if hbs content available for API, render the hbs page
    let additionalAPIContentResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_HBS_CONTENT_FILE_NAME, constants.DOC_TYPES.API_LANDING, orgID, apiID);
    if (additionalAPIContentResponse !== null) {
      let additionalAPIContent = additionalAPIContentResponse.API_FILE.toString("utf8");
      partialObject[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME] = additionalAPIContent ? additionalAPIContent : "";
    }
    metaData = await apiMetadataService.getMetadataFromDB(orgID, apiID);
    const data = metaData ? JSON.stringify(metaData) : {};
    metaData = JSON.parse(data);
    //replace image urls
    let images = metaData.apiInfo.apiImageMetadata;
    for (const key in images) {
      let apiImageUrl = `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}${constants.ROUTE.API_FILE_PATH}${apiID}${constants.API_TEMPLATE_FILE_NAME}`
      const modifiedApiImageURL = apiImageUrl + images[key]
      images[key] = modifiedApiImageURL;
    }
    hbs.handlebars.partials[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME] = hbs.handlebars.compile(
      partialObject[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME])({
        apiContent: markdownHtml,
        apiMetadata: metaData
      });
  }
  //register doc page partials
  if (req.originalUrl.includes(constants.ROUTE.API_DOCS_PATH) && req.params.docType && req.params.docName) {

    const { orgName, apiName, viewName, docType, docName } = req.params;
    const apiID = await apiDao.getAPIId(orgID, apiName);
    let markdownHtml = "";
    let docContentResponse = await apiDao.getAPIDocByName(constants.DOC_TYPES.DOC_ID+docType, docName, orgID, apiID);
    if (docContentResponse !== null) {
      if (docName.endsWith(".md")) {
        const markdownContent = docContentResponse.API_FILE.toString("utf8") ;
        markdownHtml = markdownContent ? markdown.parse(markdownContent) : "";
      } else {
        let additionalDocContent = docContentResponse.API_FILE.toString("utf8");
        partialObject[constants.FILE_NAME.API_DOC_PARTIAL_NAME] = additionalDocContent ? additionalDocContent : "";
      }
    }
    hbs.handlebars.partials[constants.FILE_NAME.API_DOC_PARTIAL_NAME] = hbs.handlebars.compile(
      partialObject[constants.FILE_NAME.API_DOC_PARTIAL_NAME])({
        baseUrl: "/" + orgName + "/views/" + viewName + "/api/" + apiName,
        apiMD: markdownHtml
      });
  }
};

async function checkWSO2APIAvailability() {

  const condition = {
    PROVIDER: "WSO2"
  }
  return await apiDao.getAPIMetadataByCondition(condition).then(apis => apis.length > 0);
}

function registerPartialsFromFile(baseURL, dir, profile) {

  const filenames = fs.readdirSync(dir);
  filenames.forEach((filename) => {
    if (filename.endsWith(".hbs")) {
      const template = fs.readFileSync(path.join(dir, filename), constants.CHARSET_UTF8);
      hbs.handlebars.registerPartial(filename.split(".hbs")[0], template);
      if (filename === constants.FILE_NAME.PARTIAL_HEADER_FILE_NAME) {
        hbs.handlebars.partials = {
          ...hbs.handlebars.partials,
          header: hbs.handlebars.compile(template)({
            baseUrl: baseURL,
            profile: profile,
            hasWSO2APIs: true
          }),
        };
      }
    }
  });
}

module.exports = registerPartials;
