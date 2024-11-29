import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: ['**/*.config.js', 'dist/**', 'node_modules/**', '!**/eslint.config.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.es2020 } }
  },
  // eslint 默认推荐规则
  pluginJs.configs.recommended,
  // typescript 默认推荐规则
  ...tseslint.configs.recommended,
  // react 默认推荐规则
  pluginReact.configs.flat.recommended,
  // prettier 默认推荐规则
  pluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
]
