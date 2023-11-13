FROM node:20 as node_builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 5005

CMD [ "node", "./dist/server.js" ]