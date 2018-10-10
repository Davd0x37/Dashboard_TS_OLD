![Logo of the project](https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-489361.png)

# Dashboard

> Still in development

Dashboard for social media, communication and connect everything into one tool.

## Installing / Getting started

A quick introduction of the minimal setup you need to get up &
running.

```shell
git clone https://gitlab.com/DevDigitalNomad/DashboardTS.git
cd DashboardTS/
yarn
yarn lerna bootstrap
yarn run api:build
yarn run client_vanilla:build:build
yarn run deploy
```

## Developing

### Prerequisites

Just clone repo and use command listed below. Yarn will do everything for you.

```shell
yarn
yarn lerna bootstrap
```

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing the project further:

```shell
git clone https://gitlab.com/DevDigitalNomad/DashboardTS.git
cd DashboardTS/
yarn
yarn lerna bootstrap
```

### Building

> Production

```shell
yarn run api:build
yarn run client_vanilla:build:build
```
> Development

```shell
yarn run api:serve
yarn run api:deploy
yarn run client_vanilla:serve
```

### Deploying / Publishing
> It will run test as well
```shell
yarn run deploy
```

## Licensing

#### LICENSE MIT
