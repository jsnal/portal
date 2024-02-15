---
title: Faster Git in WSL2
tags: [linux, wiki]
updated: Feb 15 2024
---

For some reason, the file system is super slow on `/mnt` in WSL2. I have tried both Debian and Ubuntu WSL with similar results. The main thing I use WSL for on my Windows file system is Git. [This](https://github.com/microsoft/WSL/issues/4401) thread has a good description of the problem and some solutions. Here is a suggestion someone made that I like. These lines go in my shell config somewhere:

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

I am putting this here so I don't have to commit it to my zshrc.
