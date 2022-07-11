FROM node:slim

COPY . .

RUN npm install --production
RUN npm build

ENTRYPOINT ["node", "dist/main.js"]
