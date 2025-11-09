import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'no-unterminated-string': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
]);
