FROM node:latest
ADD . /usr/Dashboard
WORKDIR /usr/Dashboard
# RUN yarn
RUN yarn run development
CMD ["node", "www/api/app.js"]