FROM node:latest as build-stage
WORKDIR /app
RUN mkdir -p client
COPY client/package*.json ./client/
RUN npm --prefix /app/client ci
COPY ./ .
RUN npm --prefix /app/client run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/client/dist /app/client
COPY nginx/default.conf /etc/nginx/nginx.conf
