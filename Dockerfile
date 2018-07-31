FROM node:latest
ADD . /usr/app/Dashboard
WORKDIR /usr/app/Dashboard
RUN mkdir /Dashboard; mkdir /Dashboard/client; mkdir /Dashboard/api
RUN yarn
RUN yarn api:prod
RUN yarn client:prod
RUN cp -a app/api/dist/. /Dashboard/api
RUN cp -a node_modules /Dashboard/api
RUN cp -a app/client/dist/. /Dashboard/client
RUN cp -a app/client/nginx.conf /Dashboard
RUN cp -a app/client/fullchain.pem /Dashboard/client
RUN cp -a app/client/privkey.pem /Dashboard/client
#RUN yes | cp -a traefik.toml /etc/traefik/traefik.toml