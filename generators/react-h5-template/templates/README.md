# React + TypeScript + Vite 项目模板

这是一个基于 React 19 + TypeScript + Vite 构建的现代化前端项目模板，提供了完整的开发环境和最佳实践配置。

## 项目简介

该模板集成了主流的前端技术栈和工具链，旨在帮助开发者快速搭建高质量的 React 应用。模板包含了完整的路由配置、状态管理、国际化支持、UI 组件库集成以及开发规范。

## 主要功能

- ✅ 现代化的技术栈：React 19 + TypeScript + Vite
- ✅ 完整的路由配置：基于 React Router 6
- ✅ 状态管理：使用 Zustand 进行轻量级状态管理
- ✅ 国际化支持：基于 i18next 实现多语言切换
- ✅ UI 组件库：集成 Ant Design 5
- ✅ 接口请求：基于 Axios 封装
- ✅ 开发规范：ESLint + Prettier + Stylelint + Husky
- ✅ 响应式布局：适配不同屏幕尺寸
- ✅ 持久化存储：Zustand 持久化中间件

## 技术栈

- [框架：react@19.2.0](https://react.docschina.org/)
- [路由：react-router-dom@7.9.6](https://reactrouter.com/)
- [状态管理：zustand@5.0.8](https://github.com/pmndrs/zustand)
- [构建工具：vite@5.4.10](https://cn.vitejs.dev/)
- [类型语言：typescript@5.6.2](https://www.typescriptlang.org/zh/)
- [CSS预处理器：sass@1.81.0](https://www.sass.hk/)
- [UI库: antd@6.0.0](https://ant-design.antgroup.com/index-cn)
- [接口请求：axios@1.13.2](https://github.com/axios/axios)
- [国际化：i18next@25.6.3](https://www.i18next.com/)
- [图标库：@ant-design/icons@6.1.0](https://ant.design/components/icon/)
- [包管理工具：pnpm@9](https://www.pnpm.cn/)

## 项目结构

```
├── src/
│   ├── assets/           # 静态资源文件
│   ├── components/       # 公共组件
│   ├── configs/          # 配置文件
│   ├── hooks/            # 自定义 hooks
│   ├── i18n/             # 国际化配置
│   ├── layout/           # 布局组件
│   ├── router/           # 路由配置
│   ├── server/           # 接口请求封装
│   ├── store/            # 状态管理
│   ├── styles/           # 全局样式
│   ├── typings/          # TypeScript 类型定义
│   ├── utils/            # 工具函数
│   └── views/            # 页面组件
├── env/                  # 环境配置文件
├── build/                # 构建配置
└── package.json          # 项目依赖
```

## 环境配置

项目支持多种环境配置，配置文件位于 `env/` 目录下：

- `.env.development`：开发环境配置
- `.env.local.development`：本地开发环境配置（可覆盖默认配置）
- `.env.pre`：预发布环境配置
- `.env.production`：生产环境配置
- `.env.production.gizp`：生产环境配置（启用 gzip 压缩）

## Getting Started

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 代码检查

```bash
# ESLint 检查并自动修复
pnpm lint-eslint

# Prettier 格式化代码
pnpm lint-prettier

# Stylelint 检查样式
pnpm lint-style

# 运行所有检查
pnpm lint
```

### 构建项目

```bash
# 生产环境构建
pnpm build

# 测试环境构建
pnpm build-test

# 生产环境构建（启用 gzip 压缩）
pnpm build-gzip
```

### 预览构建结果

```bash
pnpm preview
```

## 开发规范

### 代码风格

- 使用 TypeScript 进行开发
- 遵循 ESLint 和 Prettier 配置
- 组件命名使用 PascalCase
- 函数命名使用 camelCase
- 文件命名使用 kebab-case 或 PascalCase（组件文件）

### 提交规范

项目使用 Husky 进行 git 提交规范检查，提交信息需符合以下格式：

```
type(scope?): description

body?

footer?
```

- `type`：提交类型（feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert）
- `scope`：可选，提交的影响范围
- `description`：提交的简短描述
- `body`：可选，提交的详细描述
- `footer`：可选，关闭的 issue 或 breaking changes

### 组件开发

- 优先使用函数式组件
- 使用 TypeScript 类型定义
- 组件 props 需添加类型注解
- 复杂组件需拆分逻辑

## 路由配置

项目的路由配置位于 `src/router/index.tsx`，采用 React Router 6 的配置方式。路由支持嵌套路由、重定向和权限控制。

## 状态管理

项目使用 Zustand 进行状态管理，状态模块位于 `src/store/modules/` 目录下。支持持久化存储，可将指定状态存储到 localStorage 或 sessionStorage 中。

## 国际化

项目基于 i18next 实现了完整的国际化支持，翻译文件位于 `src/i18n/locales/` 目录下，目前支持中文和英文。

## 接口请求

接口请求封装位于 `src/server/` 目录下，基于 Axios 实现，支持请求拦截、响应拦截和错误处理。

## 注意事项

1. 开发前请确保安装了 pnpm
2. 请遵循项目的开发规范
3. 新增组件请添加类型定义
4. 提交代码前请运行 lint 检查
5. 生产环境构建前请确认环境配置

## License

MIT
