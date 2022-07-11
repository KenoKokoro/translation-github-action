FROM node:slim

COPY . .

RUN npm install --production
RUN npm run build

ENTRYPOINT ["node", "dist/main.js"]
