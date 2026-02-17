import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: [
      'public/**',
      'coverage/'
    ],
  },
  {
    files: ['**/*.js'],
    rules: {
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ]
    },
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        before: 'readonly',
        }
    },
  },
  pluginJs.configs.recommended,
];