import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "script", 
      globals: globals.browser 
    } 
  },
  {
    ignores: [
      'dist/', 
      'public/javascripts/application.js',
      'models/RestApiModel.js',
      'models/OrganisationRestApiModel.js',
      'lib/metrics.js',
      'cypress.config.js',
      'app.js', 
      'config/index.js', 
      'controllers/', 
      'cypress/', 
      'test/',
      'routes/',
      'services/'
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];