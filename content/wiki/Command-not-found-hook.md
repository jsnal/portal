---
title: Command not found hook
tags: [shell, wiki]
---
Getting output on commands in the arch repositories

For Example:

```
$ htop
htop may be found in the following packages:
extra/htop
```

Install pkgfile:

```
$ sudo pacman -S pkgfile
```

Creates a directory in `/usr/share/doc/pkgfile` that contains bash, zsh and fish

```
$ source /usr/share/doc/pkgfile/command-not-found.zsh
```

You can also just put the source code straight into your `.zshrc`

Make sure the function name is the same.

```
command_not_found_handler() {
  local pkgs cmd="$1"

  pkgs=(${(f)"$(pkgfile -i -b -- "$cmd" 2>/dev/null)"})
  if [[ -n "$pkgs"  ]]; then
    printf '%s may be found in the following packages:\n' "$cmd"
    printf '  %s\n' $pkgs[@]
    return 0
  fi

  printf 'zsh: command not found: %s\n' "$cmd" 1>&2
  return 127

}
```
