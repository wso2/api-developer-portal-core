const path = require('path');
const fs = require('fs');
const exphbs = require('express-handlebars');
const config = require('../config/config');
const markdown = require('marked');
const adminDao = require('../dao/admin');
const apiDao = require('../dao/apiMetadata');

const constants = require('../utils/constants');

const filePrefix = config.pathToContent;

const registerPartials = async (req, res, next) => {
  
  if (config.mode === constants.DEV_MODE) {
    console.log("Loading partials from file");
    let baseURL = constants.BASE_URL + config.port
    const filePath = req.originalUrl.split(baseURL).pop();
    registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "partials"), req.user);
    registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "home", "partials"), req.user);
    registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "api-landing", "partials"), req.user);
    registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix, "pages", "apis", "partials"), req.user);
    if (fs.existsSync(path.join(process.cwd(), filePrefix + "pages", filePath, "partials"))) {
      registerPartialsFromFile(baseURL, path.join(process.cwd(), filePrefix + "pages", filePath, "partials"), req.user);
    }
  } else {
    await registerPartialsFromAPI(req);
  }
  next();
};

const registerPartialsFromAPI = async (req) => {
  const orgName = req.params.orgName;
  const orgData = await adminDao.getOrganization(orgName);

  let orgID = orgData.ORG_ID;
  let apiID = "";
  const apiName = req.params.apiName;
  if (apiName) {
    apiID = await apiDao.getAPIId(apiName);
  }

  const imageUrl =`${config.devportalAPI}organizations/${orgData.ORG_ID}/layout?fileType=image&fileName=`;

    let partials =  await adminDao.getOrgContent({
        orgId: orgData.ORG_ID,
        fileType: 'partial',
    });

    let partialObject = {}
    partials.forEach(file => {
        let fileName = file.FILE_NAME.split(".")[0];
        let content = file.FILE_CONTENT.toString(constants.CHARSET_UTF8);
        content = content.replaceAll("/images/", `${imageUrl}`)
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
  if (req.originalUrl.includes(constants.API_LANDING_PAGE_PATH)) {
    //fetch markdown content for API if exists
    let markdownResponse = await apiDao.getAPIFile(constants.API_MD_CONTENT_FILE_NAME, orgID, apiID);
    let markdownContent = markdownResponse.API_FILE.toString("utf8");
    const markdownHtml = markdownContent ? markdown.parse(markdownContent) : "";

    //if hbs content available for API, render the hbs page
    let additionalAPIContentResponse = await apiDao.getAPIFile(constants.API_HBS_CONTENT_FILE_NAME, orgID, apiID);
    let additionalAPIContent = additionalAPIContentResponse.API_FILE.toString("utf8");
    partialObject[constants.API_CONTENT_PARTIAL_NAME] = additionalAPIContent ? additionalAPIContent : "";
    hbs.handlebars.partials[constants.API_CONTENT_PARTIAL_NAME] = hbs.handlebars.compile(
      partialObject[constants.API_CONTENT_PARTIAL_NAME])({ content: markdownHtml });
  }
};

function registerPartialsFromFile(baseURL, dir, profile) {
  const hbs = exphbs.create({});
  const filenames = fs.readdirSync(dir);
  filenames.forEach((filename) => {
    if (filename.endsWith(".hbs")) {
      let template = fs.readFileSync(path.join(dir, filename), constants.CHARSET_UTF8);
      hbs.handlebars.registerPartial(filename.split(".hbs")[0], template);
      if (filename === constants.PARTIAL_HEADER_FILE_NAME) {
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
