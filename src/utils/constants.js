module.exports = {
    DEV_MODE: 'development',
    FILE_PREFIX: '../src/',
    IMAGE: 'image',
    STYLE: 'style',
    CHARSET_UTF8: 'utf-8',
    FILE_NAME_PARAM : '&fileName=',
    API_TEMPLATE_FILE_NAME: '/template?fileName=',
    HEADER_PARTIAL_NAME: 'header',
    HERO_PARTIAL_NAME: "hero",
    BASE_URL: 'http://localhost:',

    MIME_TYPES: {
        HTML: 'text/html',
        TEXT: 'text/plain',
        JSON: 'application/json',
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
    },

    ROUTE: {
      DEV_PORTAL:  '/devportal',
      STYLES: '/styles',
      IMAGES: '/images',
      IMAGES_PATH: '/images/',
      DEFAULT: '/',
      MOCK: '/mock',
      API_LISTING_PAGE: '/apis',  
      API_FILE_PATH: '/apis/',
      API_LANDING_PAGE_PATH: '/api/',
    },

    FILE_TYPE: {
        LAYOUT: 'layout',
        TEMPLATE: 'template',
    },

    FILE_NAME: {
        MAIN: 'main.hbs',
        PAGE: 'page.hbs',
        API_MD_CONTENT_FILE_NAME: 'apiContent.md',
        API_HBS_CONTENT_FILE_NAME: 'api-content.hbs',
        API_CONTENT_PARTIAL_NAME: "api-content",
        API_DEFINITION_FILE_NAME: 'apiDefinition.json',
        PARTIAL_HEADER_FILE_NAME: 'header.hbs',
    }
}

