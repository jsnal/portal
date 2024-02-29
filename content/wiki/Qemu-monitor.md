---
title: QEMU Monitor
tags: [linux, wiki]
updated: Feb 29 2024
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

QEMU can also take advantage of GDB using the following commands.

1. Enable GDB server in QEMU

```
-S -s
```

2. Connect to it with GDB

```
$ gdb kernel.bin

(gdb) target remote localhost:1234
```

3. Start execution

```
(gdb) continue
```

4. Normal GDB commands should work

I like to use GDB with the following commands:


```
db Kernel -ex 'target remote localhost:1234' -ex 'layout asm' -ex 'layout regs'
```
