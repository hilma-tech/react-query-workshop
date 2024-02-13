FROM node:18-alpine

WORKDIR /app

COPY ./types ./types

WORKDIR /app/client

COPY ./client/package*.json .
RUN npm install

COPY ./client .
CMD npm run build
