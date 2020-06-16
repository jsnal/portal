#!/bin/bash
#
# Deployment script for portal

dot_git() {
  dot_git="$(git rev-parse --git-dir 2>/dev/null)"
  printf '%s' $dot_git
}

is_repo() {
  if [[ -n "$(dot_git)" ]]; then
    return 0
  else
    return 1
  fi
}

if ! is_repo; then
  echo "Currently not in a .git directory. Exiting..."
  exit 1
fi

if [[ -z $(git diff --stat) ]]; then
  read -p "Current worktree is dirty... Continue? [Y/n] " -n 1 -r && echo
  [[ ! $REPLY =~ ^[Yy]$ ]] && exit 1
fi

# Update portal to the latest changes on master
echo "Fetching the latest changes..."
command git pull --all

echo "Current portal version $(git rev-parse HEAD)"

# Start the Docker containers
echo "Starting Docker..."
[ "$UID" -eq 0  ] || command sudo docker-compose up --build -d
