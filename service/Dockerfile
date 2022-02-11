FROM node:13.1.0-alpine

WORKDIR /usr/app

COPY main/ .

RUN npm install --quiet

RUN npm i --g vue-cli

RUN cd application && npm install --quiet

RUN npm i nodemon -g
