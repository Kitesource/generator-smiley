'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-smiley:main', () => {
  describe('选择 Vue 3 Template', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators'))
        .withPrompts({
          projectType: 'vue3-template',
          projectName: 'test-vue3-project',
        })
        .withLocalConfig({
          packagesManager: 'pnpm',
        })
    })

    it('创建项目基础文件', () => {
      assert.file(['package.json', 'vite.config.ts'])
    })

    it('package.json 包含正确的项目名称', () => {
      assert.fileContent('package.json', /"name":\s*"test-vue3-project"/)
    })
  })

  describe('选择 React Template', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators')).withPrompts({
        projectType: 'react-template',
        projectName: 'test-react-project',
      })
    })

    it('创建项目基础文件', () => {
      assert.file(['package.json'])
    })

    it('package.json 包含正确的项目名称', () => {
      assert.fileContent('package.json', /"name":\s*"test-react-project"/)
    })
  })

  describe('使用命令行参数提供项目名称', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators')).withArguments(['cli-project']).withPrompts({
        projectType: 'vue3-template',
      })
    })

    it('创建基础文件', () => {
      assert.file(['package.json'])
    })

    it('使用命令行提供的项目名称', () => {
      assert.fileContent('package.json', /"name":\s*"cli-project"/)
    })
  })
})
