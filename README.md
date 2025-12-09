# generator-smiley [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> 个人脚手架工具，支持多种前端项目模板快速生成

[English](./README_EN.md) | 简体中文

## 特性

- 🚀 支持多种前端框架模板（Vue2、Vue3、React）
- 📦 内置最佳实践和工程化配置
- 🎨 支持 H5、管理后台等多种场景模板
- 🔧 集成 ESLint、Prettier、Husky 等代码质量工具
- 📱 移动端适配和响应式设计
- 🛠️ 支持多种包管理器（npm、yarn、pnpm）

## 安装

首先，安装 [Yeoman](http://yeoman.io) 和 generator-smiley：

```bash
# 全局安装 Yeoman
npm install -g yo

# 全局安装 generator-smiley
npm install -g generator-smiley
```

## 使用方法

### 交互式创建项目

运行以下命令启动交互式项目创建流程：

```bash
yo smiley
```

然后按照提示选择项目模版和输入项目名称。
❯ React Template
  Vue 2 Template
  Vue 3 Template
  Vue 3 Admin Template
  Vue 3 H5 Template
  React Admin Template
  React H5 Template

### 直接创建特定类型项目

您也可以直接指定项目类型创建项目：

#### Vue 项目

- Vue 2 项目
```bash
yo smiley:vue2-template <project_name>
```

- Vue 3 项目
```bash
yo smiley:vue3-template <project_name>
```

- Vue 3 管理后台项目
```bash
yo smiley:vue3-admin-template <project_name>
```

- Vue 3 H5 移动端项目
```bash
yo smiley:vue3-h5-template <project_name>
```

#### React 项目

- React 项目
```bash
yo smiley:react-template <project_name>
```

- React 管理后台项目
```bash
yo smiley:react-admin-template <project_name>
```

- React H5 移动端项目
```bash
yo smiley:react-h5-template <project_name>
```

## 项目模板详情

### Vue 2 模板

- 基于 Vue 2.x + Vue CLI
- 包含 ESLint、Prettier 代码规范
- 支持现代浏览器构建配置

### Vue 3 模板

- 基于 Vue 3.x + Vite
- 使用 TypeScript
- 集成 Vue Router、Pinia
- 支持 Element Plus / Ant Design Vue
- 包含 ESLint、Prettier、Husky
- 支持自动导入组件和 API

### Vue 3 管理后台模板

- 基于 Vue 3 + TypeScript + Vite
- 集成 Element Plus UI 组件库
- 包含完整的后台管理系统布局
- 支持动态路由、权限控制
- 集成 ECharts 图表库
- 支持多主题切换

### Vue 3 H5 模板

- 专为移动端优化的 Vue 3 项目
- 集成 Vant UI 移动端组件库
- 支持移动端适配和手势操作
- 包含常见的移动端页面模板
- 支持微信小程序环境适配

### React 模板

- 基于 React 18 + TypeScript + Vite
- 使用函数组件和 Hooks
- 集成 React Router v6
- 支持 Ant Design / Material-UI
- 包含状态管理（Redux Toolkit/Zustand）
- 集成 ESLint、Prettier、Husky

### React 管理后台模板

- 基于 React 18 + TypeScript + Vite
- 集成 Ant Design Pro 组件库
- 包含完整的后台管理系统布局
- 支持动态路由、权限控制
- 集成 ECharts 图表库
- 支持多主题切换

### React H5 模板

- 专为移动端优化的 React 项目
- 集成 Ant Design Mobile 移动端组件库
- 支持移动端适配和手势操作
- 包含常见的移动端页面模板
- 支持微信小程序环境适配


## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 版本历史

- 1.0.3 - 添加 React H5 模板，优化 Vue 3 H5 模板
- 1.0.2 - 添加 React 管理后台模板
- 1.0.1 - 添加 Vue 3 H5 模板和 Vue 3 管理后台模板
- 1.0.0 - 初始版本，支持 Vue 2、Vue 3 和 React 基础模板

## 许可证

© [Smiley](https://github.com/Kitesource) - MIT License

## 相关链接

- [Yeoman 官方网站](http://yeoman.io/)
- [Yeoman 生成器文档](http://yeoman.io/authoring/)

[npm-image]: https://badge.fury.io/js/generator-smiley.svg
[npm-url]: https://npmjs.org/package/generator-smiley
[travis-image]: https://travis-ci.com/Kitesource/generator-smiley.svg?branch=master
[travis-url]: https://travis-ci.com/Kitesource/generator-smiley
[daviddm-image]: https://david-dm.org/Kitesource/generator-smiley.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Kitesource/generator-smiley
[coveralls-image]: https://coveralls.io/repos/Kitesource/generator-smiley/badge.svg
[coveralls-url]: https://coveralls.io/r/Kitesource/generator-smiley