FROM node:lts-buster as build-stage

# Build the code
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build

# Setup Nginx
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx/default.conf /etc/nginx/nginx.conf
