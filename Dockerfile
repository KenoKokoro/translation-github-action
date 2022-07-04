FROM node:slim

RUN apt-get update && apt-get install -y git

COPY . .

RUN npm install --production

ENTRYPOINT ["node", "dist/main.js"]
