import js from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import eslintPluginPromise from "eslint-plugin-promise";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        self: "readonly",
        module: "readonly",
        fetch: "readonly",
        window: "readonly",
      },
    },
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/*.config.js",
      "**/.ruff_cache/**",
    ],
    plugins: {
      import: eslintPluginImport,
      "unused-imports": eslintPluginUnusedImports,
      promise: eslintPluginPromise,
      "@typescript-eslint": ts,
      react,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
      "import/no-unresolved": "error",
      "promise/always-return": "warn",
      "promise/no-nesting": "warn",
      "react/jsx-uses-react": "warn",
      "react/jsx-uses-vars": "warn",
    },
  },
];
