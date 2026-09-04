/*
 * A faithful, database-free reproduction of the portal's render path.
 *
 * Mirrors src/utils/util.js renderTemplateFromAPI and
 * src/middlewares/registerPartials.js, with the database replaced by a plain
 * object of stored files. That lets the suite exercise the real resolution rules -
 * which partial wins, what the layout receives - without a server or a dump.
 */
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const { registerHelpers } = require('../../src/utils/handlebarsHelpers');
const constants = require('../../src/utils/constants');

const REPO_ROOT = path.join(__dirname, '..', '..');
const DEFAULT_CONTENT = path.join(REPO_ROOT, 'src', 'defaultContent');
const INTERNAL_PAGES = path.join(REPO_ROOT, 'src', 'pages');

// The partial directories registerPartials.js walks, in the same order.
const THEME_PARTIAL_DIRS = [
    'partials',
    'pages/home/partials',
    'pages/api-landing/partials',
    'pages/apis/partials',
    'pages/docs/partials',
    'pages/mcp/partials',
    'pages/mcp-landing/partials',
    'pages/subscriptions/partials',
    'pages/api-subscriptions/partials',
    'pages/api-platform-keys/partials',
    'pages/billing/partials',
    'pages/api-flows/partials',
    'pages/llms-txt/partials',
    'pages/mcps/partials',
];

function registerDir(hbs, dir) {
    if (!fs.existsSync(dir)) return;
    for (const file of fs.readdirSync(dir)) {
        if (file.endsWith('.hbs')) {
            hbs.registerPartial(path.basename(file, '.hbs'), fs.readFileSync(path.join(dir, file), 'utf8'));
        }
    }
}

/**
 * Builds a Handlebars environment matching what a request would see.
 *
 * @param {object} storedPartials  partial name -> source, standing in for the
 *                                 database rows. Only names in CUSTOMIZABLE_FILES
 *                                 are honoured, exactly as registerPartials does.
 */
function buildEnvironment(storedPartials = {}) {
    const hbs = Handlebars.create();
    registerHelpers(hbs);

    // Internal partials first (src/pages/partials and src/pages/*/partials).
    registerDir(hbs, path.join(INTERNAL_PAGES, 'partials'));
    for (const entry of fs.readdirSync(INTERNAL_PAGES, { withFileTypes: true })) {
        if (entry.isDirectory()) registerDir(hbs, path.join(INTERNAL_PAGES, entry.name, 'partials'));
    }

    // Then the theme's own partials from disk.
    for (const dir of THEME_PARTIAL_DIRS) registerDir(hbs, path.join(DEFAULT_CONTENT, dir));

    // Then stored partials override, but only for the customizable names.
    const honoured = [];
    const ignored = [];
    for (const [name, source] of Object.entries(storedPartials)) {
        if (constants.CUSTOMIZABLE_FILES.includes(name)) {
            hbs.registerPartial(name, source);
            honoured.push(name);
        } else {
            ignored.push(name);
        }
    }

    return { hbs, honoured, ignored };
}

/**
 * Renders a themable page the way renderTemplateFromAPI does: page template and
 * layout always from disk, layout given exactly four keys.
 */
function renderThemablePage(pagePath, context, { storedPartials = {}, hasStoredMainCss = false } = {}) {
    const { hbs, honoured, ignored } = buildEnvironment(storedPartials);

    const template = hbs.compile(fs.readFileSync(path.join(DEFAULT_CONTENT, pagePath, 'page.hbs'), 'utf8'));
    let layoutSource = fs.readFileSync(path.join(DEFAULT_CONTENT, 'layout', 'main.hbs'), 'utf8');

    // The only rewrite the render path performs, and only when the org has a stored main.css.
    if (hasStoredMainCss) {
        layoutSource = layoutSource.replace(
            /\/styles\//g,
            `${constants.ROUTE.DEVPORTAL_ASSETS_BASE_PATH}${context.orgID || 'ORG'}/views/default/layout?fileType=style&fileName=`
        );
    }
    const layout = hbs.compile(layoutSource);

    const showApiWorkflowsNav = context.showApiWorkflowsNav === true;
    const body = template({ ...context, showApiWorkflowsNav });

    return {
        html: layout({
            body,
            portalConfigs: context.portalConfigs || {},
            profile: context.profile,
            showApiWorkflowsNav,
        }),
        honoured,
        ignored,
    };
}

/**
 * Renders an internal page. These use the org's STORED layout when it has one,
 * falling back to the disk layout otherwise - which is why a link added to the
 * disk layout never reaches them.
 */
function renderInternalPage(pageRelPath, context, { storedLayout = null } = {}) {
    const { hbs } = buildEnvironment();
    const template = hbs.compile(fs.readFileSync(path.join(INTERNAL_PAGES, pageRelPath, 'page.hbs'), 'utf8'));
    const layoutSource = storedLayout !== null
        ? storedLayout
        : fs.readFileSync(path.join(DEFAULT_CONTENT, 'layout', 'main.hbs'), 'utf8');
    const layout = hbs.compile(layoutSource);

    const showApiWorkflowsNav = context.showApiWorkflowsNav === true;
    return layout({
        body: template({ ...context, showApiWorkflowsNav }),
        portalConfigs: context.portalConfigs || {},
        profile: context.profile,
        showApiWorkflowsNav,
    });
}

module.exports = { buildEnvironment, renderThemablePage, renderInternalPage, DEFAULT_CONTENT, INTERNAL_PAGES };
