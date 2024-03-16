FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY tsconfig*.json /app
COPY src /app/src

RUN npm run build 

EXPOSE 5005

CMD [ "node", "./dist/server.js" ]