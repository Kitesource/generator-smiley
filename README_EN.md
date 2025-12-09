# generator-smiley [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Personal scaffolding tool that supports rapid generation of various frontend project templates

English | [简体中文](./README.md)

## Features

- 🚀 Support for multiple frontend framework templates (Vue2, Vue3, React)
- 📦 Built-in best practices and engineering configurations
- 🎨 Support for various scenario templates including H5 and admin dashboards
- 🔧 Integrated code quality tools like ESLint, Prettier, Husky
- 📱 Mobile adaptation and responsive design
- 🛠️ Support for multiple package managers (npm, yarn, pnpm)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-smiley:

```bash
# Install Yeoman globally
npm install -g yo

# Install generator-smiley globally
npm install -g generator-smiley
```

## Usage

### Interactive Project Creation

Run the following command to start the interactive project creation process:

```bash
yo smiley
```

Then follow the prompts to select a project template and enter the project name.
<div>❯&nbsp; React Template </div>
<div> &nbsp;&nbsp;&nbsp; Vue 2 Template</div>
<div> &nbsp;&nbsp;&nbsp; Vue 3 Template</div>
<div> &nbsp;&nbsp;&nbsp; Vue 3 Admin Template</div>
<div> &nbsp;&nbsp;&nbsp; Vue 3 H5 Template</div>
<div> &nbsp;&nbsp;&nbsp; React Admin Template</div>
<div> &nbsp;&nbsp;&nbsp; React H5 Template</div>

### Direct Creation of Specific Project Types

You can also directly specify the project type to create a project:

#### Vue Projects

- Vue 2 Project
```bash
yo smiley:vue2-template <project_name>
```

- Vue 3 Project
```bash
yo smiley:vue3-template <project_name>
```

- Vue 3 Admin Dashboard Project
```bash
yo smiley:vue3-admin-template <project_name>
```

- Vue 3 H5 Mobile Project
```bash
yo smiley:vue3-h5-template <project_name>
```

#### React Projects

- React Project
```bash
yo smiley:react-template <project_name>
```

- React Admin Dashboard Project
```bash
yo smiley:react-admin-template <project_name>
```

- React H5 Mobile Project
```bash
yo smiley:react-h5-template <project_name>
```

## Project Template Details

### Vue 2 Template

- Based on Vue 2.x + Vue CLI
- Includes ESLint, Prettier code standards
- Supports modern browser build configuration

### Vue 3 Template

- Based on Vue 3.x + Vite
- Uses TypeScript
- Integrated Vue Router, Pinia
- Supports Element Plus / Ant Design Vue
- Includes ESLint, Prettier, Husky
- Supports automatic component and API imports

### Vue 3 Admin Template

- Based on Vue 3 + TypeScript + Vite
- Integrated Element Plus UI component library
- Contains complete admin dashboard system layout
- Supports dynamic routing and permission control
- Integrated ECharts chart library
- Supports multi-theme switching

### Vue 3 H5 Template

- Vue 3 project optimized for mobile
- Integrated Vant UI mobile component library
- Supports mobile adaptation and gesture operations
- Includes common mobile page templates
- Supports WeChat Mini Program environment adaptation

### React Template

- Based on React 18 + TypeScript + Vite
- Uses function components and Hooks
- Integrated React Router v6
- Supports Ant Design / Material-UI
- Includes state management (Redux Toolkit/Zustand)
- Integrated ESLint, Prettier, Husky

### React Admin Template

- Based on React 18 + TypeScript + Vite
- Integrated Ant Design Pro component library
- Contains complete admin dashboard system layout
- Supports dynamic routing and permission control
- Integrated ECharts chart library
- Supports multi-theme switching

### React H5 Template

- React project optimized for mobile
- Integrated Ant Design Mobile component library
- Supports mobile adaptation and gesture operations
- Includes common mobile page templates
- Supports WeChat Mini Program environment adaptation

## Contributing

Issues and Pull Requests are welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Version History

- 1.0.3 - Added React H5 template, optimized Vue 3 H5 template
- 1.0.2 - Added React admin template
- 1.0.1 - Added Vue 3 H5 template and Vue 3 admin template
- 1.0.0 - Initial version, supporting Vue 2, Vue 3 and React basic templates

## License

© [Smiley](https://github.com/Kitesource) - MIT License

## Related Links

- [Yeoman Official Website](http://yeoman.io/)
- [Yeoman Generator Documentation](http://yeoman.io/authoring/)

[npm-image]: https://badge.fury.io/js/generator-smiley.svg
[npm-url]: https://npmjs.org/package/generator-smiley
[travis-image]: https://travis-ci.com/Kitesource/generator-smiley.svg?branch=master
[travis-url]: https://travis-ci.com/Kitesource/generator-smiley
[daviddm-image]: https://david-dm.org/Kitesource/generator-smiley.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Kitesource/generator-smiley
[coveralls-image]: https://coveralls.io/repos/Kitesource/generator-smiley/badge.svg
[coveralls-url]: https://coveralls.io/r/Kitesource/generator-smiley