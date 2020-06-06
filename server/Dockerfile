FROM node:lts-buster

# Build the code
WORKDIR /app
COPY ./ .
WORKDIR /app/server
RUN npm ci
RUN npm run build

# Add the notes worktree
RUN git worktree add content content

# Run the code
CMD [ "npm", "run", "start" ]
