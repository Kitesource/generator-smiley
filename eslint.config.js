const globals = require('globals')
const pluginJs = require('@eslint/js')
const pluginVue = require('eslint-plugin-vue')
const eslintConfigPrettier = require('eslint-config-prettier')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = [
  // 指定文件匹配模式 和语言选项
  { files: ['**/*.{js,mjs,cjs,ts}'] }, //["**/*.vue"]

  // 指定全局变量和环境
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
  },

  // 基础配置
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // prettier
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,

  // 自定义规则
  {
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 console 使用，开发环境中关闭规则
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 debugger 使用，开发环境中关闭规则
      'linebreak-style': ['warn', 'windows'], // 使用 Unix 风格的换行符
      quotes: ['warn', 'single'], // 使用单引号
      'no-unused-vars': 'off', // 关闭未使用变量警告
      'vue/multi-word-component-names': 'off', //Vue 组件的名称应该是多词的，以提高可读性和维护性
    },
  },
  // 忽略文件
  {
    ignores: [
      '**/__tests__/**',
      '**/generators/**/templates/*',
      '**/dist',
      '.vscode',
      '**/node_modules',
      '*.md',
      '*.woff',
      '*.woff',
      '*.ttf',
      'yarn.lock',
      'package-lock.json',
      'pnpm-lock.yaml',
      '.husky',
    ],
  },
]
