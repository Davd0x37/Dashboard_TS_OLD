FROM node:latest
ADD . /usr/app/Dashboard
WORKDIR /usr/app/Dashboard
RUN mkdir /Dashboard; mkdir /Dashboard/client; mkdir /Dashboard/api; mkdir /Dashboard/config
RUN yarn
RUN yarn api:prod
RUN yarn client:prod
RUN cp -a app/api/dist/. /Dashboard/api
RUN cp -a node_modules /Dashboard/api
RUN cp -a app/client/dist/. /Dashboard/client
RUN cp -a app/client/server.ts /Dashboard/client
RUN cp -a app/client/fullchain.pem /Dashboard/config
RUN cp -a app/client/privkey.pem /Dashboard/config
RUN cp -a app/client/nginx.conf /Dashboard/config