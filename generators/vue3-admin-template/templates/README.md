# Vue3 TypeScript 项目

一个基于 Vue3、TypeScript、Vite 构建的现代化前端项目模板，集成了 Element Plus、Tailwind CSS、Pinia 等主流技术栈。

## 项目特性

- 🚀 基于 Vite 构建，提供极速的开发体验
- 🖖 Vue 3 Composition API
- 📦 TypeScript 支持，提供完整的类型检查
- 🎨 Element Plus UI 组件库
- 🎯 Tailwind CSS 实用工具类
- 📊 ECharts 数据可视化
- 🌍 国际化支持 (vue-i18n)
- 🔄 状态管理 (Pinia)
- 📦 自动导入 Vue API 和组件
- 🎨 SCSS 样式预处理器
- 📝 ESLint + Prettier 代码规范
- 🐶 Husky + lint-staged Git hooks
- 📦 按需加载、代码分割、资源压缩

## 技术栈

### 核心技术
- **构建工具**: Vite
- **前端框架**: Vue 3.5.24
- **开发语言**: TypeScript
- **路由管理**: Vue Router 4.6.3
- **状态管理**: Pinia 3.0.4
- **HTTP 客户端**: Axios 1.13.2

### UI 组件与样式
- **UI 组件库**: Element Plus 2.11.8
- **CSS 框架**: Tailwind CSS 4.1.17
- **CSS 预处理器**: Sass 1.94.2
- **图标库**: @element-plus/icons-vue 2.3.2

### 开发工具
- **代码规范**: ESLint 9.39.1
- **代码格式化**: Prettier 3.6.2
- **Git Hooks**: Husky 9.1.7
- **提交规范**: Commitizen + Commitlint

### 功能插件
- **数据可视化**: ECharts 6.0.0
- **国际化**: Vue I18n 11.2.1
- **自动导入**: unplugin-auto-import 20.2.0
- **组件自动导入**: unplugin-vue-components 30.0.0
- **打包压缩**: vite-plugin-compression 0.5.1
- **SVG 图标**: vite-plugin-svg-icons 2.0.1

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0 (推荐) 或 npm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 或
npm run dev
```

### 构建项目

```bash
# 构建生产环境
pnpm build

# 构建测试环境
pnpm build-staging
```

### 代码检查与格式化

```bash
# ESLint 检查
pnpm lint

# 自动修复 ESLint 错误
pnpm autofix

# 代码格式化
pnpm format

# TypeScript 类型检查
pnpm ts-lint
```

## 项目结构

```
src/
├── apis/                 # API 请求相关定义
│   └── request.ts       # Axios 请求封装
├── assets/              # 静态资源
│   └── sprites/         # SVG 图标资源
├── components/          # 公共组件
│   ├── index.ts         # 组件导出文件
│   └── widgets/         # 通用组件
├── configs/             # 配置文件
│   ├── common.ts        # 通用配置
│   └── index.ts         # 配置入口
├── hooks/               # 自定义 Hooks
│   ├── hookCopy.ts      # 复制功能 Hook
│   ├── hookNotify.ts    # 通知功能 Hook
│   └── index.ts         # Hooks 导出
├── i18n/                # 国际化
│   ├── index.ts         # i18n 配置
│   └── modules/         # 语言包
├── layouts/             # 布局组件
│   └── MainLayout.vue   # 主布局
├── plugins/             # 插件配置
│   ├── echarts.ts       # ECharts 配置
│   └── i18n.ts          # i18n 插件配置
├── router/              # 路由配置
│   ├── index.ts         # 路由入口
│   └── routes.ts        # 路由定义
├── store/               # 状态管理
│   ├── index.ts         # Store 入口
│   └── modules/         # Store 模块
├── styles/              # 样式文件
│   ├── _variable.scss   # SCSS 变量
│   ├── element.scss     # Element Plus 样式覆盖
│   ├── global.scss      # 全局样式
│   ├── index.scss       # 样式入口
│   ├── reset.scss       # 样式重置
│   └── tailwind.css     # Tailwind CSS
├── typings/             # TypeScript 类型定义
│   ├── common.d.ts      # 通用类型
│   ├── element-plus.d.ts # Element Plus 类型
│   ├── env.d.ts         # 环境变量类型
│   ├── index.ts         # 类型导出
│   └── store.d.ts       # Store 类型
├── utils/               # 工具函数
│   ├── day.ts           # 日期工具
│   ├── index.ts         # 工具函数导出
│   └── util.ts          # 通用工具函数
├── views/               # 页面组件
│   ├── Home.vue         # 首页
│   └── common/          # 通用页面
├── App.vue              # 根组件
├── env.d.ts             # 环境变量类型
└── main.ts              # 应用入口
```

## 环境配置

项目支持多环境配置，通过 `.env` 文件管理不同环境的变量：

- `.env.development` - 开发环境
- `.env.production` - 生产环境
- `.env.staging` - 测试环境

## Git 提交规范

项目使用 Conventional Commits 规范，支持以下类型：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化（不影响代码运行的变动）
- `refactor`: 代码重构（既不是新增功能，也不是修改 bug 的代码变动）
- `perf`: 性能优化
- `test`: 增加测试或修改测试
- `ci`: 持续集成相关
- `chore`: 构建过程或辅助工具的变动
- `revert`: 回滚之前的提交

### 提交示例

```bash
# 添加新功能
git commit -m "feat: 添加用户登录功能"

# 修复 bug
git commit -m "fix: 修复登录页面样式问题"

# 文档更新
git commit -m "docs: 更新 README 文档"
```

## 分支规范

推荐使用以下分支策略：

- `master`: 生产环境分支
- `develop`: 开发环境分支
- `feature/*`: 功能开发分支
- `hotfix/*`: 紧急修复分支
- `release/*`: 发布准备分支

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

[MIT](LICENSE)

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的变更 (`git commit -m 'feat: 添加某个特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 常见问题

### 1. 如何添加新的页面？

在 `src/views` 目录下创建新的页面组件，然后在 `src/router/routes.ts` 中添加路由配置。

### 2. 如何添加新的 API？

在 `src/apis` 目录下创建新的 API 文件，使用封装好的 request 方法进行请求。

### 3. 如何添加新的状态管理模块？

在 `src/store/modules` 目录下创建新的模块，然后在 `src/store/index.ts` 中注册。

### 4. 如何添加新的语言包？

在 `src/i18n/modules` 目录下添加对应语言的 JSON 文件，然后在 `src/i18n/index.ts` 中引入。