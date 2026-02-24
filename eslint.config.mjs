import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(['**/.husky/', '**/node_modules/', '**/.env']),
  {
    extends: compat.extends('eslint:recommended'),

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        document: false,
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          spread: true,
          arrowFunctions: true,
        },

        requireConfigFile: false,
      },
    },

    rules: {
      'no-const-assign': 'error',
      'no-dupe-else-if': 'warn',
      'no-duplicate-imports': 'error',
      'no-dupe-keys': 'error',
      'no-irregular-whitespace': 'warn',
      'no-unreachable': 'error',
      'use-isnan': 'error',
      'max-depth': ['warn', 3],
      'jsx-quotes': ['error', 'prefer-single'],
      'no-multi-spaces': 'error',

      'no-trailing-spaces': [
        'error',
        {
          ignoreComments: true,
        },
      ],

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],

      semi: ['error', 'never'],
      'eol-last': ['error', 'always'],
      'no-var': 'error',
      'prefer-arrow-callback': 'warn',
      'spaced-comment': ['warn', 'always'],
      'prefer-spread': 'warn',
      'array-bracket-spacing': 'warn',

      'comma-dangle': [
        'warn',
        {
          arrays: 'only-multiline',
          objects: 'only-multiline',
          imports: 'always-multiline',
          exports: 'never',
          functions: 'never',
        },
      ],

      eqeqeq: 'error',
      'linebreak-style': ['error', 'windows'],
      'no-case-declarations': 'off',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'local',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'no-undef': 'off',
    },
  },
])
