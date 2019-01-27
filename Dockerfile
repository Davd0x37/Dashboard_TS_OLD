FROM node:latest

RUN groupadd -g 999 vernon && useradd -r -u 999 -g vernon vernon
USER vernon

ADD . /Triton
WORKDIR /Triton

# RUN yarn
# RUN yarn lerna bootstrap
# RUN sudo yarn lerna exec build