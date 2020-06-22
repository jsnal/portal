---
tags: xorg wiki
created: 06/22/20
---
[Xephyr](https://freedesktop.org/wiki/Software/Xephyr) is a nested X server that runs as an X application. You can start a basic nested X window by running the following.

```bash
$ Xephyr -br -ac -noreset -screen 800x600 :1
```

This will put a new "nested" X window on DISPLAY `:1`. You can then launch an application on that window by running the following.

```bash
$ DISPLAY=:1 st
```

You can unlock the pointer by pressing `Ctrl + Shift`. The same keys will lock the pointer.
