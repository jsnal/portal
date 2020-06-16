#!/bin/bash
#
# File:         deploy.sh
# Author:       Jason Long <jsnal>
# Description:  Automatic deployment script for portal

# Check if any of the docker services are still running. If the function finds
# any already running, it will instantly SIGTERM itself. All docker services must
# be down in order to issue a new deploy.
is_running() {
  echo "Checking if docker is running..."

  local docker_services=("mongodb_container" "client_container" "server_container")
  for service in "${docker_services[@]}"; do
    if [ ! -z $(docker-compose ps -q $service) ] || \
       [ ! -z $(docker ps -q --no-trunc | grep $(docker-compose ps -q $service) 2>/dev/null) ]; then
      printf "%s is still running\n" $service
      kill -TERM -$(pgrep "deploy.sh") && exit 1
    fi
  done
}

# Check if we are even in a git repository. If we aren't in the root directory of
# the portal git repository, all of the docker commands will fail.
is_repo() {
  local dot_git="$(git rev-parse --git-dir 2>/dev/null)"
  if [ -n "$dot_git" ]; then
    return 0
  else
    return 1
  fi
}

if ! is_repo; then
  echo "Currently not in a .git directory. Exiting..."
  exit 1
fi

if [[ ! -z $(git diff --stat) ]]; then
  read -p "Current worktree is dirty... Continue? [Y/n] " -n 1 -r && echo
  [[ ! $REPLY =~ ^[Yy]$ ]] && exit 1
fi

# Check if Docker is running while perserving the users environment. The problem
# is this funtionality is at the exspense of a single BASHism.
[ "$UID" -eq 0  ] || command sudo bash -c "$(declare -f is_running); is_running"

# Update portal to the latest changes on master
echo "Fetching the latest changes..."
command git pull --all

echo "Current portal version $(git rev-parse HEAD)"

# Build and start the Docker containers
echo "Starting Docker..."
[ "$UID" -eq 0  ] || command sudo docker-compose up --build -d
