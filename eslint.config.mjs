import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config'

export default defineConfig(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['templates/**', 'examples/**']
  },
  {
    // Explicitly target TSX and JSX files
    files: ['**/*.{ts,tsx,js,jsx}'], 
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    rules: {
      'prettier/prettier': 'error',
      "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["**/background/*", "**/content/*"],
            "message": "Direct imports from background and content are restricted"
          },
          {
            "group": ["**/components/settings/*"],
            "message": "Direct imports from settings slots are restricted"
          },
          {
            "group": ["**/helpers/formatter/*"],
            "message": "Direct imports from formatter are restricted"
          }
        ]
      }
    ],
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules, // For React 17+
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
  prettierConfig,
);
