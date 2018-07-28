FROM nginx:stable
ADD . /usr/app/Dashboard/client
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/app/Dashboard/client
RUN yarn
RUN yarn run prod