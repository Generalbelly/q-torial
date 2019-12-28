FROM node:10-alpine

RUN apk update && \
    apk upgrade && \
    apk --no-cache add gettext curl

RUN yarn global add firebase-tools

WORKDIR /app/functions

RUN yarn install

WORKDIR /app
