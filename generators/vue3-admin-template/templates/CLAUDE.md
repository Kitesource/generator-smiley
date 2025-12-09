# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 3 + TypeScript + Vite project with Element Plus and Naive UI component libraries. Uses pnpm as the package manager.

## Development Commands

### Start Development Server
```bash
pnpm dev
```
Starts Vite dev server with hot reload on local network (uses `--host` flag).

### Build Commands
```bash
pnpm build              # Production build
pnpm build-staging      # Staging environment build
pnpm serve              # Preview production build
```

### Code Quality
```bash
pnpm lint               # ESLint check
pnpm autofix            # Auto-fix ESLint errors
pnpm ts-lint            # TypeScript type checking (no emit)
pnpm format             # Format code with Prettier
```

### Git Commits
```bash
pnpm commit             # Use commitizen for guided commits
```

Git hooks are enabled via Husky:
- `pre-commit`: Runs `lint-staged` on staged files
- `commit-msg`: Validates commit message format using commitlint

## Architecture

### State Management (Pinia)
Pinia store enhanced with custom plugins (src/store/index.ts):
- `store.router`: Raw router instance injected into all stores via `markRaw`
- `store.setState(key, value)`: Helper to set state property with deep cloning for objects
- `store.updateState(key, value)`: Helper to partially update state property with shallow merge

Store modules located in `src/store/modules/`.

### Routing
Router setup in src/router/index.ts exports a `useRouter(app)` function instead of directly installing the router. This function must be called in main.ts before mounting the app.

Routes defined in src/router/routes.ts with lazy-loaded components using dynamic imports.

### API Layer
Axios instance configured in src/apis/request.ts:
- Base URL: `/api` (proxied in dev mode via vite.config.mts)
- Timeout: 8 seconds
- `withAbortRequest(req)`: Utility to create auto-aborting requests (cancels previous request when new one starts)

### Auto-Import System
The project uses unplugin-auto-import and unplugin-vue-components:
- Vue APIs (`ref`, `computed`, `reactive`, etc.) are auto-imported
- Vue Router APIs are auto-imported
- VueUse composables are auto-imported
- Element Plus and Naive UI components are auto-imported and tree-shaken
- Component auto-import scans `src/components` and `src/views`
- Type definitions generated in `auto-imports.d.ts` and `.components.d.ts`

Do NOT manually import these APIs or components unless there's a specific reason.

### SVG Icons
Uses vite-plugin-svg-icons for sprite-based SVG icons:
- Place SVG files in `src/assets/sprites/`
- Icon ID format: `icon-[dir]-[name]`
- Icons are automatically registered via `virtual:svg-icons-register`

### Internationalization
Vue I18n plugin registered in src/plugins/i18n.ts. Dictionary files in src/i18n/.

### ECharts Integration
ECharts registered as a global plugin via src/plugins/echarts.ts, configured with specific chart types to reduce bundle size.

### Path Aliases
- `@/` maps to `src/`
- Configured in both vite.config.mts and tsconfig.json

### Styling
- TailwindCSS for utility classes (imported in main.ts)
- SCSS with global variables at `src/styles/_variable.scss` (auto-injected via Vite config)
- Element Plus uses Sass import style for better tree-shaking

## ESLint Rules (Notable)

- **Quotes**: Single quotes required (allow escape, no unnecessary template literals)
- **Semicolons**: Never use semicolons
- **Equality**: Must use `===` and `!==`
- **Unused vars**: Prefix with `_` to ignore (e.g., `_unusedParam`)
- **Type definitions**: Use `interface` over `type`
- **Component naming**: Multi-word not enforced (`vue/multi-word-component-names: off`)
- **Self-closing tags**: All tags must self-close (HTML, SVG, components)
- **Console**: Allowed in development
- **Debugger**: Error in production, allowed in development

## Environment Configuration

Environment files:
- `.env.development` - Dev mode
- `.env.staging` - Staging build
- `.env.production` - Production build

All files currently define `VITE_CDN_ADDRESS='/'` for asset base path.

## Commit Message Format

Follows Conventional Commits specification enforced by commitlint:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting (not CSS)
- `refactor`: Code refactoring (neither feature nor fix)
- `perf`: Performance optimization
- `test`: Test code or mock data updates
- `build`: Build system or dependency updates
- `ci`: CI/CD configuration changes
- `chore`: Static resources, utilities, libraries
- `revert`: Commit rollback

Format: `type(optional-scope): subject`

Example: `feat(auth): add login validation`

## Directory Structure

- `src/apis/` - API request definitions
- `src/assets/` - Static assets (images, sprites)
- `src/components/` - Reusable components (auto-imported)
- `src/configs/` - Configuration files
- `src/hooks/` - Composable functions (Vue 3 composition patterns)
- `src/i18n/` - Internationalization dictionaries
- `src/layouts/` - Layout components
- `src/plugins/` - Vue plugin registrations
- `src/router/` - Routing configuration
- `src/store/` - Pinia state stores
- `src/styles/` - Global styles (SCSS, CSS)
- `src/typings/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `src/views/` - Page components (auto-imported)

## Build Output Structure

Production builds organize assets into:
- `js/[name]-[hash].js` - JavaScript chunks
- `css/[name]-[hash].css` - Stylesheets
- `img/[name]-[hash].[ext]` - Images (jpg, png, svg)
- `fonts/[name]-[hash].[ext]` - Fonts (woff, ttf, eot)
