# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## 技术栈

- [框架：react@18.3.1](https://react.docschina.org/)
- [路由：react-router-dom@6.14.1](https://reactrouter.com/en/6.13.0)
- [状态管理：@reduxjs/toolkit@2.3.0](https://cn.redux.js.org/)
- [构建工具：vite@5.4.10](https://cn.vitejs.dev/)
- [类型语言：typescript@5.6.2](https://www.typescriptlang.org/zh/)
- [CSS预处理器：sass@1.81.0](https://www.sass.hk/)
- [UI库: antd@5.22.0](https://ant-design.antgroup.com/index-cn)
- [接口请求：axios@1.7.8](https://github.com/axios/axios)
- [包管理工具：pnpm@9](https://www.pnpm.cn/)

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run

```bash
pnpm dev
```

### Lint

```bash
pnpm lint
```

### Build

```bash
pnpm build
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname
    }
  }
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules
  }
})
```
