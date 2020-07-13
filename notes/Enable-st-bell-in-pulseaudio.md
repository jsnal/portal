---
tags: terminal wiki
created: 07/12/20
---
Edit `/etc/pulse/default.pa` and add the following lines

```
# audible bell
load-sample-lazy x11-bell /usr/share/sounds/freedesktop/stereo/bell.oga
load-module module-x11-bell sample=x11-bell
```

Restart pulseaudio

```sh
$ pulseaudio -k
```

If that doesn't work check volume and see if there is something specific you have to do for your window manager or desktop environment.
