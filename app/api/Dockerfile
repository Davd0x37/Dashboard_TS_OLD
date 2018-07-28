FROM node:latest
ADD . /usr/app/Dashboard/api
WORKDIR /usr/app/Dashboard/api
RUN yarn
RUN yarn run prod
RUN yarn run serve