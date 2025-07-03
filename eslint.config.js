module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:@typescript-eslint/recommended', // If using TypeScript
    'plugin:import/recommended',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    extraFileExtensions: ['.svelte'],
  },
  plugins: ['svelte', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser', // For TypeScript in Svelte files
      },
    },
  ],
  rules: {
    'import/order': ['error', { 'newlines-between': 'always' }],
    'svelte/no-at-html-tags': 'warn',
  },
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'prettier', // Add this to disable conflicting ESLint rules
  ],
  plugins: ['svelte', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier rules via ESLint
    'import/order': ['error', { 'newlines-between': 'always' }],
    'svelte/no-at-html-tags': 'warn',
  },
};
