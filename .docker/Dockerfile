FROM node:8-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache

WORKDIR /app

RUN yarn install

# TODO: firebase login
# I haven't implemented firebase login:ci thing yet.

WORKDIR /app/functions

RUN yarn install

WORKDIR /app

