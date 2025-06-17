---
title: Git
description: Tips and tricks related to Git
---

## Cheatsheet

### Install

[https://git-scm.com](https://git-scm.com)

### Setup

Set a name that is identifiable for credit when review version history.

```sh
$ git config --global user.name “[firstname lastname]"
```

Set an email address that will be associated with each history marker.

```sh
$ git config --global user.email “[valid-email]”
```

### Repository Setup

Initialize current directory as a Git repository.

```sh
$ git init
```

Retrieve a remote repository from a host such as Github or Gitlab.

```sh
$ git clone [url]
```

### Staging

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

### Remote Sharing

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

### Branches

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

### Inspect

Show the commit history of the repository.

```sh
$ git log
```

Show the difference between two branches

```sh
$ git diff branchA...branchB
```

## Remove a Submodule

1. Delete the relevant section from the `.gitmodules` file.
2. Stage the `.gitmodules` changes:

```
git add .gitmodules
```

3. Delete the relevant section from `.git/config`.
4. Remove the submodule files from the working tree and index:

```
git rm --cached path_to_submodule (no trailing slash).
```

5. Remove the submodule's `.git` directory:

```
rm -rf .git/modules/path_to_submodule
```

6. Commit the changes:

```
git commit -m "Removed submodule NAME"
```

7. Delete the now untracked submodule files:

```
rm -rf path_to_submodule
```

## Hard reset file or directory

Usually I just want to reset the whole project using the following command:

```bash
git reset --hard
```

But, sometimes I just need to reset a single file (or a couple of files):

```bash
git checkout HEAD -- path/to/file
```

Since Git 2.23, there is a `restore` command that does the same thing

```bash
git restore path/to/file
```

Or even get the file from another branch/commit.

```bash
git restore -s branch path/to/file
```

## Change Author

Change the author for the last commit:

```
git commit --amend --author 'Jason Long <jasonlongball@gmail.com>'
```

Change the author for the last N commits:

```
git rebase -i HEAD~4 -x "git commit --amend --author 'Jason Long<jasonlongball@gmail.com>' --no-edit"
```

Drop the `--no-edit` flag to get confirmation from amend operation. Use
`git rebase -i` for manual rebasing for each commit.

## Search Log

Search across all commits on all branches:

```
git log --all --grep="needle"
```

Walk reglogs to find commits that are dangling:

```
git log -g --grep="needle"
```

Search through the diff changes between commits. Useful for finding commits that
have changed a specific block of code:

```
git log -S"needle"
git log -G"needle with regex"
```

## Patches

### Creating a Patch

First make sure the branch you're on has the commits you want to patch. Find a
log of your branch with.

```
$ git log --pretty=oneline -3
```

When you're on the branch you want to make patch of run

```
$ git format-patch master --stdout > PATCHNAME.patch
```

### Applying the patch

Before applying you should probably look at the changes that patch comes with.

```
$ git apply --stat PATCHNAME.patch
 CMakeLists.txt |   13 +++++++++++++
 1 file changed, 13 insertions(+)
```

You can also check if there will be any conflicts before applying using

```
$ git apply --check PATCHNAME.patch
```

To actually apply the patch you can run

```
$ git apply PATCHNAME.patch
```

but you may want to sign off on the patch to verify that you checked for
conflicts

```
$ git am --signoff < PATCHNAME.patch
```

More info [here](https://git-scm.com/docs/git-apply) and
[here](https://git-scm.com/docs/git-am)

## Faster WSL

For some reason, the file system is super slow on `/mnt` in WSL2. I have tried
both Debian and Ubuntu WSL with similar results. The main thing I use WSL for on
my Windows file system is Git.
[This](https://github.com/microsoft/WSL/issues/4401) thread has a good
description of the problem and some solutions. Here is a suggestion someone made
that I like. These lines go in my shell config somewhere:

```
function isWinDir {
  case $PWD/ in
    /mnt/*) return $(true);;
    *) return $(false);;
  esac
}

function git {
  if isWinDir; then
    git.exe "$@"
  else
    /usr/bin/git "$@"
  fi
}
```

## Config

Copy of my most recent Git config.

```
[push]
    default = matching
[alias]
    # Branch
    co = checkout
    cob = checkout -b
    br = branch
    st = -c color.status=always status -sb
    cm = commit -v
    rrh = reset --hard

    # Pushing/Pulling
    p = push
    po = push origin
    pom = push origin master
    plo = pull origin
    plom = pull origin master
    a = add
    aa = add -A

    # Submodules
    subi = submodule init
    suba = submodule add
    subu = submodule update --recursive --remote

    # Misc
    ack = grep --break --heading
    lg = log --pretty=format:'%C(auto)%h%Creset%C(auto)%d%Creset %s %C(magenta bold)(%cr)%Creset %C(cyan)<%aN>%Creset'
[core]
    autocrlf = true
[color]
    ui = true
[status]
    submodulesummary = true
[diff]
    tool = vimdiff
[difftool]
    prompt = false
[pull]
    rebase = false
[user]
    # Work
    # name = Long, Jason
    # email = <work-email>
    # Personal
    # name = Jason Long
    # email = jasonlongball@gmail.com
```
