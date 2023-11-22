---
title: Build st from Source
tags: [linux, wiki]
updated: Dec 31 2022
---
The general build for `st` is to just use `make`. There are some dependencies you will need first though. For obvious reasons, `make` is required to build and `fontconfig` is required to ask for a monospace font. Beyond that, you will also need `libX11` and `libXft`. You can get those packages on a Debian based system by running:

```sh
# apt install libx11-dev libxft-dev
```

The last thing you will need (specifically for my build) is my NERD font. My font is called Fantasque Sans Mono and you can install it on a Debian based system by running:

```sh
# apt search fonts-fantasque-sans
```

Now to build and install st, you can simply run:

```sh
# make install
```

Find my st build [here](https://github.com/jsnal/st)
