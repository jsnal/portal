---
title: Gitconfig
tags: [git, wiki]
---

This is a living version of my gitconfig.

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
    # email = jasonl@signalscape.com
    # Personal
    # name = Jason Long
    # email = jasonlongball@gmail.com
```
