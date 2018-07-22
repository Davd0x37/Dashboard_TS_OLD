FROM node:latest
ADD . /usr/Dashboard
WORKDIR /usr/Dashboard
RUN yarn
RUN yarn run api:prod
RUN yarn run client:prod
RUN yarn run serve
#CMD ["ls"]