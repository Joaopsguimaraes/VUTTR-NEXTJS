/* eslint-disable import/no-anonymous-default-export */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tailwindcss from 'eslint-plugin-tailwindcss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended'
  ),
  {
    plugins: {
      tailwindcss,
    },

    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.cjs',
      },

      next: {
        rootDir: ['src/app/*/'],
      },
    },

    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tsParser,
    },
  },
]
