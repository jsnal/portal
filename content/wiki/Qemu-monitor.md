---
title: QEMU Monitor
tags: [linux, wiki]
updated: Jan 28 2024
---
QEMU Monitor is a tool to inspect the running instance of QEMU, similar to GDB.

1. Add the following to the QEMU command

```
-monitor tcp:127.0.0.1:55555,server,nowait
```

2. Connect to it using netcat

```
nc localhost 55555
```

3. List some memory

```
x/80hx 0x000100a8
```

More information [here](https://qemu-project.gitlab.io/qemu/system/monitor.html)
