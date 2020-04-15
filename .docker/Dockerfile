FROM node:10-alpine

RUN apk update && \
    apk upgrade && \
    apk --no-cache add gettext curl

RUN npm install -g firebase-tools

WORKDIR /app
