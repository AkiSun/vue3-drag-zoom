# Changelog

All notable changes to `vue3-drag-zoom` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2026-02-11

### Added
- **Props Export**: Props types are now exported for external usage (`import { DragZoomProps } from 'vue3-drag-zoom/props'`)
- **Unit Tests**: Added comprehensive Vitest test suite for core functionality

### Changed
- **Type Safety**: Improved TypeScript type definitions throughout the codebase
- **Code Quality**: Refactored duplicate code and optimized component structure

### Fixed
- **Event Listener Cleanup**: Added proper event listener cleanup to prevent memory leaks
- **Touch Event Support**: Added missing touch event support for mobile devices
- **Wheel Event Passive**: Fixed passive event listener issue with wheel events

### Improved
- **Template Ref**: Optimized ref获取方式 using templateRef pattern
- **Boundary Handling**: Enhanced edge case handling for drag and zoom operations
- **Code Quality**: Applied ESLint and Prettier for consistent code style

### Infrastructure
- Added ESLint configuration for code linting
- Added Prettier configuration for code formatting
- Updated build scripts with proper lint checks

## [1.0.6] - 2026-02-10

### Added
- Initial release of vue3-drag-zoom
- Basic drag functionality
- Zoom functionality
- Mouse event support
- Basic TypeScript support

## [1.0.0] - 2026-02-01

### Added
- Initial project setup
- Vue 3 + TypeScript configuration
- Vite build configuration

[Unreleased]: https://github.com/AkiSun/vue3-drag-zoom/compare/v1.0.7...HEAD
[1.0.7]: https://github.com/AkiSun/vue3-drag-zoom/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/AkiSun/vue3-drag-zoom/compare/v1.0.0...v1.0.6
[1.0.0]: https://github.com/AkiSun/vue3-drag-zoom/releases/tag/v1.0.0
