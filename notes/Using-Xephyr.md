---
tags: xorg wiki
created: 06/22/20
---
[Xephyr](https://freedesktop.org/wiki/Software/Xephyr) is a nested X server that runs as an X application. You can start a basic nested X window by running the following.

```sh
$ Xephyr -br -ac -noreset -screen 800x600 :1
```

This will put a new "nested" X window on DISPLAY `:1`. You can then launch an application on that window by running the following.

```sh
$ DISPLAY=:1 st
```

You can unlock the pointer by pressing `Ctrl + Shift`. The same keys will lock the pointer. Sometimes the keyboard configuration on the opened display may be wrong. This happens especially often in a window manager or desktop environment. To solve this you can copy the keyboard configure of display `:0` to display `:1`.

```sh
$ setxkbmap -display :0 -print | xkbcomp - :1
```
