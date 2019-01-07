FROM node:latest

USER userxd

ADD . /Dashboard
WORKDIR /Dashboard

RUN yarn
RUN yarn lerna bootstrap
RUN yarn lerna exec build