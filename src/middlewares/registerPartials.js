/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');
const config = require(process.cwd() + '/config.json');
const markdown = require('marked');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');
const constants = require('../utils/constants');

const filePrefix = config.pathToContent;

const registerPartials = async (req, res, next) => {

  if (config.mode === constants.DEV_MODE) {
    registerAllPartialsFromFile(constants.BASE_URL + config.port, req);
  } else {
    try {
      await registerPartialsFromAPI(req);
    } catch (error) {
      console.error(`Error while loading organization :,${error}`)
      console.log("Registering default partiasl from file");
      registerAllPartialsFromFile('/' + req.params.orgName, req);
    }
  }
  next();
};

const registerAllPartialsFromFile = async (baseURL, req) => {

  const filePath = req.originalUrl.split(baseURL).pop();
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "partials"), req.user);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "home", "partials"), req.user);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "api-landing", "partials"), req.user);
  registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "apis", "partials"), req.user);
  if (fs.existsSync(path.join(process.cwd(), filePrefix + "pages", filePath, "partials"))) {
    registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix + "pages", filePath, "partials"), req.user);
  }
}

const registerPartialsFromAPI = async (req) => {
  
  const { orgName, apiName }  = req.params;
  const orgData = await adminDao.getOrganization(orgName);
  const orgID = orgData.ORG_ID;
  const apiID = await apiDao.getAPIId(apiName);
  const imageUrl = `${req.protocol}://${req.get('host')}${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${orgID}/layout?fileType=image&fileName=`;
  let partials = await adminDao.getOrgContent({
    orgId: orgData.ORG_ID,
    fileType: 'partial',
  });

  let partialObject = {}
  partials.forEach(file => {
    let fileName = file.FILE_NAME.split(".")[0];
    let content = file.FILE_CONTENT.toString(constants.CHARSET_UTF8);
    content = content.replaceAll(constants.ROUTE.IMAGES_PATH, `${imageUrl}`)
    partialObject[fileName] = content;
  });
  const hbs = exphbs.create({});
  hbs.handlebars.partials = partialObject;
  Object.keys(partialObject).forEach((partialName) => {
    hbs.handlebars.registerPartial(partialName, partialObject[partialName]);
  });
  hbs.handlebars.partials = {
    ...hbs.handlebars.partials,
    header: hbs.handlebars.compile(partialObject[constants.HEADER_PARTIAL_NAME])({
      baseUrl: "/" + orgName,
      profile: req.user,
    }),
    [constants.HERO_PARTIAL_NAME]: hbs.handlebars.compile(partialObject[constants.HERO_PARTIAL_NAME])(
      { baseUrl: "/" + orgName }
    ),
  };
  if (req.originalUrl.includes(constants.ROUTE.API_LANDING_PAGE_PATH)) {
    //fetch markdown content for API if exists
    const markdownResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_MD_CONTENT_FILE_NAME, orgID, apiID);
    const markdownContent = markdownResponse ? markdownResponse.API_FILE.toString("utf8") : "";
    const markdownHtml = markdownContent ? markdown.parse(markdownContent) : "";

    //if hbs content available for API, render the hbs page
    let additionalAPIContentResponse = await apiDao.getAPIFile(constants.FILE_NAME.API_HBS_CONTENT_FILE_NAME, orgID, apiID);
    if (additionalAPIContentResponse !== null) {
      let additionalAPIContent = additionalAPIContentResponse.API_FILE.toString("utf8");
      partialObject[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME] = additionalAPIContent ? additionalAPIContent : "";
    }
    hbs.handlebars.partials[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME] = hbs.handlebars.compile(
      partialObject[constants.FILE_NAME.API_CONTENT_PARTIAL_NAME])({ apiContent: markdownHtml });
  }
};

function registerPartialsFromFile(baseURL, dir, profile) {

  const hbs = exphbs.create({});
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
          }),
        };
      }
    }
  });
}

module.exports = registerPartials;
