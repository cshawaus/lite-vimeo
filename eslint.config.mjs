import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";

import { defineConfig, globalIgnores } from "eslint/config";
import html from "eslint-plugin-html";
import lit from "eslint-plugin-lit";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  globalIgnores([".gitignore", "src/**", "**/lib/"]),
  {
    extends: compat.extends(
      "eslint:recommended",
      "prettier",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
    ),

    plugins: {
      html,
      lit,
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        customElements: false,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
    },

    rules: {
      "no-var": "error",
      "arrow-parens": "off",
      "no-console": "off",
      "new-cap": "off",
      "brace-style": [2, "1tbs"],
      "no-loop-func": "error",
      "no-await-in-loop": "error",
      "no-useless-call": "error",
      "space-in-parens": "error",

      "max-len": ["error", {
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      }],

      "padded-blocks": ["error", {
        blocks: "never",
        classes: "never",
        switches: "never",
      }],
    },
  },
  {
    files: ["**/tsup.config.js"],
    extends: compat.extends("plugin:node/recommended", "plugin:prettier/recommended"),
  },
  {
    files: ["**/*.ts"],
    extends: compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
  },
]);