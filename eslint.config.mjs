import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
        }
    }
  },
  {
    ignores: ['dist/', 'public/']
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];