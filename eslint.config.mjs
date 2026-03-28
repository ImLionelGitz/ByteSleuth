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
