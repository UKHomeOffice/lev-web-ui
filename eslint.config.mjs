import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: [
      'public/**',
    ],
  },
  {
    files: ['**/*.js'],
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    },
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        cy: 'readonly',
        Cypress: 'readonly',
        before: 'readonly',
        }
    },
  },
  pluginJs.configs.recommended,
];