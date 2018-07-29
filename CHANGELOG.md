# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.0.8] - 2018-07-30
### Changed
- Make one Dockerfile and docker-compose.
- Restore yarn workspaces. Fixed docker copy files 😂🤦‍

## [0.0.7] - 2018-07-28
### Added
- Nginx config
- Dockerfile for each project

### Changed
- Directory structure for api and client. Now they have separate node_modules

## [0.0.6] - 2018-07-22
### Added
- Service worker and offline storage - PWA


## [0.0.5] - 2018-07-22
### Added
- New design
- Some GraphQL

### Changed
- Fixed parcel with babel

### Removed
- Old design which was from dribbble or behance

## [0.0.4] - 2018-06-25
### Added
- Jest testing
- Signale log instead of loglevel

### Changed
- Fixed type definitions for project. Somehow typescript doesn't read custom module definition files.
  BaseUrl fixed it. Disabling `strict` in tsconfig fixes it.

### Important
 - Use dts-gen to generate definition types for modules without types file. Use `baseUrl: '.'` in tsconfig for including tests. Wihtout it the compiler search probably in directory with ts-node.

## [0.0.3] - 2018-06-17
### Added
- Parcel bundler
- Yarn workspaces (SZTOS)

### Removed
- Webpack from client side

### Changed
- Directory structure overhaul. Move api and client dir into separate locations

## [0.0.2] - 2018-05-17
### Added
- Paths to app and www directory in config file.

### Removed
- Browsersync has been removed because LiveServer extension from VSCode is better. So manny troubles with browsersync and gulp 😞

### Changed
- Directory structure overhaul. Move api and static files into app directory.

## [0.0.1] - 2018-05-06
### Added
- GraphQL schemas and resolvers.

### Removed
- Webpack config from config directory. Gulpfile has been moved too.
- @Polish adnotation: Webpack się rzucał razem z typescriptem, bo nie mógł znaleźć modułów do ts'a i importował .mjs z node_modules 🤦‍

### Changed
- API and Client config in one webpack file.

[0.0.6]: https://gitlab.com/DevDigitalNomad/DashboardTS/compare/master...master
[0.0.5]: https://gitlab.com/DevDigitalNomad/DashboardTS/compare/master...master
[0.0.4]: https://gitlab.com/DevDigitalNomad/DashboardTS/compare/master...master
[0.0.3]: https://gitlab.com/DevDigitalNomad/DashboardTS/compare/master...master
[0.0.2]: https://gitlab.com/DevDigitalNomad/DashboardTS/compare/master...master
[0.0.1]: https://gitlab.com/DevDigitalNomad/DashboardTS/compare/master...master