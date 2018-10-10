FROM node:latest
ADD . /Dashboard
WORKDIR /Dashboard
RUN yarn
RUN yarn lerna bootstrap
RUN yarn api:build
RUN yarn client_vanilla:build:build