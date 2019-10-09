FROM node:alpine

WORKDIR /app

CMD yarn install && yarn run build
