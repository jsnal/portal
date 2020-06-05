FROM node:latest as build-stage

# Build the code
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build

# Run the code
CMD [ "node", "build/app.js" ]
