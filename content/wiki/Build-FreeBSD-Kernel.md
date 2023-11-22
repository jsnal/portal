---
title: Build FreeBSD Kernel
tags: [freebsd, wiki]
updated: Oct 10 2023
---

## Setup

FreeBSD usually stores the source code in `/usr/src`. If the source isn't there it can be cloned from [here](https://git.freebsd.org). The kernel doesn't need to be built in a specific location, it's just the convention.

## Building

1. Change into the directory

```sh
# cd /usr/src
```

2. Compile the new kernel
```sh
# make buildkernel KERNCONF=GENERIC -DNO_CLEAN
```

3. Install it
```sh
# make installkernel KERNCONF=GENERIC
```

## Build File

There is a build configuration file located in `/usr/src/sys/amd64/conf`. This file controls different parts of the build and allows you to turn off and on different options and modules. It's recommended to copy the `GENERIC` build configuration and editing it to your needs.

## Building a module

1. Change into the module directory

```sh
# cd /usr/src/sys/modules/mlx5
```

2. Compile the module
```sh
# make -j8
```

3. Install it the module if it's an external. If it's a module built in with the kernel, it can't be installed.
```sh
# make install
```
