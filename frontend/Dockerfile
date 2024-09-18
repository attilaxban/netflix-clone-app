FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:latest AS prod

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
