---
tags: git wiki
created: 10/17/20
---

## Install

[https://git-scm.com](https://git-scm.com)

## Setup

Set a name that is identifiable for credit when review version history.

```sh
$ git config --global user.name “[firstname lastname]"
```

Set an email address that will be associated with each history marker.

```sh
$ git config --global user.email “[valid-email]”
```

## Repository Setup

Initialize current directory as a Git repository.

```sh
$ git init
```

Retrieve a remote repository from a host such as Github or Gitlab.

```sh
$ git clone [url]
```

## Staging

Show the current status of all the files in your Git repository.

```sh
$ git status
```

Stage a new file for commit.

```sh
$ git add [file]
```

Unstage a file so it doesn't get committed.

```sh
$ git reset [file]
```

Show the difference between your changes and the last commit.

```sh
$ git diff
```

Commit the staged files and create a new commit.

```sh
$ git commit -m "[message]"
```

## Remote Sharing

Add a valid Git host as a new remote server.

```sh
$ git remote add [alias] [url]
```

Retrieve all of the new branches from the remote.

```sh
$ git fetch [alias]
```

Pull down changes from the remote to the local repository and merge if needed.

```sh
$ git pull [alias]
```

Push  local repository changes to the remote repository.

```sh
$ git push [alias] [branch]
```

## Branches

List all the current branches and tags.

```sh
$ git branch
```

Create a new branch with at the current commit.

```sh
$ git branch [name]
or
$ git checkout -b [name]
```

Checkout or switch to a different branch.

```sh
$ git checkout [branch]
```

Merge the specified branch into the current branch.

```sh
$ git merge [branch]
```

## Inspect

Show the commit history of the repository.

```sh
$ git log
```

Show the difference between two branches

```sh
$ git diff branchA...branchB
```
