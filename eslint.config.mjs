import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: {
    // Specify the environment for Node.js so __dirname is recognized
    globals: {
      __dirname: "readonly",
      ...globals.node,
    },
    ecmaVersion: "latest",
  }},
  pluginJs.configs.recommended,
];
