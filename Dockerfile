# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.15.0-alpine as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.19.0-alpine

COPY --from=build-stage /app/.next/ /usr/share/nginx/html

# Copy the default nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
