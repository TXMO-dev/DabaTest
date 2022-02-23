FROM node:current-alpine3.15

LABEL version="1.0"
LABEL maintainer="Timothy Asigbey"
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install
COPY .env /app/
COPY . /app/

ENTRYPOINT [ "npm","start" ]   