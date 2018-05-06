# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [0.0.1] - 2018-05-06
### Added
- GraphQL schemas and resolvers

### Removed
- Webpack config from config directory. Gulpfile has been moved too.
- @Polish adnotation: Webpack się rzucał razem z typescriptem, bo nie mógł znaleźć modułów do ts'a i importował .mjs z node_modules 🤦‍

### Changed
- API and Client config in one webpack file.

[0.0.1]: https://gitlab.com/DevDigitalNomad/DashboardTS/compare/master...master