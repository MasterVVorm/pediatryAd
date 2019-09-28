FROM node

WORKDIR /app

CMD yarn install && yarn run build
