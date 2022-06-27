FROM node:slim

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

ENTRYPOINT ["node", "/lib/main.js"]
