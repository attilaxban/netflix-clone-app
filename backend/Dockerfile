FROM node:22-alpine3.18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD [ "node", "index.js" ]
