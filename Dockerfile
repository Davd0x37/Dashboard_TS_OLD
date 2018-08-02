FROM node:latest
ADD . /Dashboard
WORKDIR /Dashboard
RUN yarn
RUN yarn api:prod
RUN yarn client:prod