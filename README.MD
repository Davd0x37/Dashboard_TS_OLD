![Logo of the project](https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-489361.png)

# Dashboard

> Still in development

Dashboard for social media, communication and connect everything into one tool.

## Installing / Getting started

@TODO

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
git clone https://gitlab.com/DevDigitalNomad/DashboardTS.git
cd DashboardTS/
yarn
yarn run serve
yarn run daemon
```

## Developing

### Built With

Typescript <br>
Express <br>
GraphQL <br>
Apollo server express <br>
Argon2 | Argon-Node https://github.com/ranisalt/node-argon2

### Prerequisites

Just clone repo and use command listed below. Yarn will do everything for you.

```shell
yarn
```

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing the project further:

```shell
git clone https://gitlab.com/DevDigitalNomad/DashboardTS.git

cd DashboardTS/

yarn
```

And run 
```shell
yarn run serve
```

### Building

> Webpack watch (watching whole app dir)
- Builds scss, typescript client and server, html

```shell
yarn run serve
```

> Nodemon server

```shell
yarn run daemon
```

Building backend

> Production

```shell
yarn run generate-api
```
> Development

```shell
yarn run generate-api-dev
```

Building frontend

> Development (sourcemaps)

```shell
yarn run generate-client-dev
```

> Production (without sourcemaps and with minify html)

```shell
yarn run generate-client
```


### Deploying / Publishing

@TODO: Add docker

## Versioning

We are using [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Configuration

If you want to change default locations of files, change paths in config.ts file.


## Licensing

#### LICENSE MIT
