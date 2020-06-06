FROM node:latest as build-stage

# Build the code
WORKDIR /app
COPY ./ .
WORKDIR /app/server
RUN npm ci
RUN npm run build

# Add the notes worktree
RUN git worktree add content origin/content

# Run the code
CMD [ "npm", "run", "start" ]
