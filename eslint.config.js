const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
    {
        ignores: [
            'node_modules/**',
            'generated-sdks/**',
            'libs/**',
            'dist/**',
            'build/**',
            'src/defaultContent/**',
            'artifacts/**',
            'test/.local/**',
            'scripts/local/**',
        ],
    },
    {
        // Node-side application code.
        files: ['src/**/*.js', 'test/**/*.js', 'eslint.config.js'],
        ignores: ['src/scripts/**'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'commonjs',
            globals: { ...globals.node },
        },
        rules: {
            ...js.configs.recommended.rules,
            'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
            'no-empty': ['warn', { allowEmptyCatch: true }],
        },
    },
    {
        // Browser scripts served from /technical-scripts.
        files: ['src/scripts/**/*.js'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'script',
            globals: { ...globals.browser },
        },
        rules: {
            ...js.configs.recommended.rules,
            'no-unused-vars': ['warn', { args: 'none', caughtErrors: 'none' }],
            'no-empty': ['warn', { allowEmptyCatch: true }],
            // These files are loaded as plain <script> tags and deliberately share
            // one global scope - alert.js defines showAlert(), subscription.js calls it.
            'no-undef': 'off',
        },
    },
    {
        // Pre-existing findings across the tree. Downgraded so lint can gate CI from
        // day one; P0 changes no source behaviour. Each is worth its own fix later.
        files: ['src/**/*.js'],
        rules: {
            'no-useless-escape': 'warn',
            'no-prototype-builtins': 'warn',
            'no-dupe-keys': 'warn',
            'no-redeclare': 'warn',
            'no-unsafe-optional-chaining': 'warn',
        },
    },
    {
        // Two pre-existing genuine ReferenceErrors, quarantined so that no-undef stays
        // an error everywhere else and any NEW one fails the build:
        //   dao/sdkJob.js:10        JOB_STATUS is never imported (fires when jobStatus is falsy)
        //   services/redisService.js:181  `message` is not in scope (fires on the reconnect path)
        // Both are outside theming scope - fix separately, then delete this block.
        files: ['src/dao/sdkJob.js', 'src/services/redisService.js'],
        rules: { 'no-undef': 'warn' },
    },
];
