FROM node:20 as node_builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:20 

WORKDIR /app

COPY --from=node_builder /app/dist ./dist

COPY --from=node_builder /app/node_modules ./node_modules

CMD [ "node", "./dist/server.js" ]
